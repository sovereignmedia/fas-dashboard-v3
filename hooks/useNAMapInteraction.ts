'use client';

import { useRef, useState, useEffect } from 'react';
import * as d3 from 'd3';

import { NA_MAP_SIZE, NA_FACILITIES, NA_GEOJSON_STATES_URL, NA_GEOJSON_COUNTRIES_URL, NAFacility } from '@/data/na-map';
import { generateDotsInPolygon } from '@/lib/globe-utils';
import { renderNAMapComposited } from '@/lib/na-map-renderer';

type MapDot = [number, number];
type ZoomPhase = 'idle' | 'zooming-in' | 'focused' | 'zooming-out';

interface AnimationState {
  phase: ZoomPhase;
  startTime: number;
  duration: number;
  fromScale: number;
  toScale: number;
  fromTranslateX: number;
  toTranslateX: number;
  fromTranslateY: number;
  toTranslateY: number;
  fromBlur: number;
  toBlur: number;
  targetFacility: NAFacility | null;
}

const ZOOM_SCALE_MULTIPLIER = 1.35;
const MAX_BLUR_RADIUS = 4;
const ZOOM_IN_DURATION = 450;
const ZOOM_OUT_DURATION = 350;

export function useNAMapInteraction(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  const [hoveredFacility, setHoveredFacility] = useState<NAFacility | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(true);

  const dotsRef = useRef<MapDot[]>([]);
  const featuresRef = useRef<GeoJSON.Feature[]>([]);
  const projectionRef = useRef<d3.GeoProjection | null>(null);
  const hoveredRef = useRef<NAFacility | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = NA_MAP_SIZE;

    // HiDPI
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.scale(dpr, dpr);

    // OffscreenCanvas for blur compositing
    let offscreenCanvas: HTMLCanvasElement | OffscreenCanvas;
    let offscreenCtx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D;
    if (typeof OffscreenCanvas !== 'undefined') {
      offscreenCanvas = new OffscreenCanvas(width * dpr, height * dpr);
      offscreenCtx = offscreenCanvas.getContext('2d')!;
    } else {
      const fallback = document.createElement('canvas');
      fallback.width = width * dpr;
      fallback.height = height * dpr;
      offscreenCanvas = fallback;
      offscreenCtx = fallback.getContext('2d')!;
    }
    offscreenCtx.scale(dpr, dpr);

    // Base projection values
    const baseScale = 816;
    const baseTx = width / 2;
    const baseTy = height / 2;

    // Projection: Conic conformal — US + Canada + Mexico (tighter framing)
    const projection = d3.geoConicConformal()
      .parallels([25, 55])
      .rotate([98, 0])
      .center([0, 43])
      .scale(baseScale)
      .translate([baseTx, baseTy]);
    projectionRef.current = projection;

    // Animation state
    const anim: AnimationState = {
      phase: 'idle',
      startTime: 0,
      duration: ZOOM_IN_DURATION,
      fromScale: baseScale,
      toScale: baseScale,
      fromTranslateX: baseTx,
      toTranslateX: baseTx,
      fromTranslateY: baseTy,
      toTranslateY: baseTy,
      fromBlur: 0,
      toBlur: 0,
      targetFacility: null,
    };

    let currentBlur = 0;
    let pulsePhase = 0;

    function render() {
      renderNAMapComposited(
        ctx!, offscreenCtx as CanvasRenderingContext2D, offscreenCanvas,
        projection, dotsRef.current, featuresRef.current,
        hoveredRef.current, width, height, pulsePhase, currentBlur
      );
    }

    // Animation + pulse timer
    const timer = d3.timer(() => {
      pulsePhase = (pulsePhase + 0.008) % 1;

      if (anim.phase === 'idle') {
        currentBlur = 0;
        render();
        return;
      }

      if (anim.phase === 'focused') {
        currentBlur = anim.toBlur;
        render();
        return;
      }

      // Interpolate zooming-in / zooming-out
      const elapsed = d3.now() - anim.startTime;
      const rawT = Math.min(elapsed / anim.duration, 1);
      const t = d3.easeCubicInOut(rawT);

      const currentScale = d3.interpolateNumber(anim.fromScale, anim.toScale)(t);
      const currentTx = d3.interpolateNumber(anim.fromTranslateX, anim.toTranslateX)(t);
      const currentTy = d3.interpolateNumber(anim.fromTranslateY, anim.toTranslateY)(t);
      currentBlur = d3.interpolateNumber(anim.fromBlur, anim.toBlur)(t);

      projection.scale(currentScale).translate([currentTx, currentTy]);
      render();

      if (rawT >= 1) {
        if (anim.phase === 'zooming-in') {
          anim.phase = 'focused';
        } else if (anim.phase === 'zooming-out') {
          anim.phase = 'idle';
          projection.scale(baseScale).translate([baseTx, baseTy]);
          currentBlur = 0;
        }
      }
    });

    // Compute zoom target: translate so facility is centered
    function zoomTarget(facility: NAFacility) {
      projection.scale(baseScale).translate([baseTx, baseTy]);
      const pos = projection([facility.coords.lon, facility.coords.lat]);
      if (!pos) return { scale: baseScale, tx: baseTx, ty: baseTy };

      const targetScale = baseScale * ZOOM_SCALE_MULTIPLIER;
      const scaleFactor = targetScale / baseScale;
      const tx = baseTx + (baseTx - pos[0]) * (scaleFactor - 1);
      const ty = baseTy + (baseTy - pos[1]) * (scaleFactor - 1);

      return { scale: targetScale, tx, ty };
    }

    // Load GeoJSON
    const loadData = async () => {
      try {
        const [statesRes, countriesRes] = await Promise.all([
          fetch(NA_GEOJSON_STATES_URL),
          fetch(NA_GEOJSON_COUNTRIES_URL),
        ]);
        if (!statesRes.ok || !countriesRes.ok) throw new Error('Failed to load NA map data');

        const statesData = await statesRes.json() as GeoJSON.FeatureCollection;
        const countriesData = await countriesRes.json() as GeoJSON.FeatureCollection;

        const stateFeatures = statesData.features.filter((f) => {
          const admin = f.properties?.admin;
          return admin === 'United States of America' || admin === 'Canada';
        });

        const mexicoFeatures = countriesData.features.filter((f) => {
          const iso = f.properties?.ISO_A2;
          return iso === 'MX';
        });

        const allFeatures = [...stateFeatures, ...mexicoFeatures];
        featuresRef.current = allFeatures;

        // Dot density ~10% higher than original (spacing 10 → 9)
        const allDots: MapDot[] = [];
        allFeatures.forEach((f) => {
          generateDotsInPolygon(f, 9).forEach((d) => allDots.push(d));
        });
        dotsRef.current = allDots;

        render();
        setIsLoading(false);
      } catch (err) {
        console.error('NA map data load error:', err);
        setIsLoading(false);
      }
    };

    // Hover hit-testing with cinematic zoom trigger
    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mx = (event.clientX - rect.left) * (width / rect.width);
      const my = (event.clientY - rect.top) * (height / rect.height);

      let found: NAFacility | null = null;
      const hitRadius = 20;

      for (const facility of NA_FACILITIES) {
        const projected = projection([facility.coords.lon, facility.coords.lat]);
        if (!projected) continue;
        const dx = mx - projected[0];
        const dy = my - projected[1];
        if (dx * dx + dy * dy <= hitRadius * hitRadius) {
          found = facility;
          setTooltipPos({ x: projected[0], y: projected[1] });
          break;
        }
      }

      // Trigger cinematic zoom on new facility hover
      if (found && found.state !== anim.targetFacility?.state) {
        const target = zoomTarget(found);

        anim.fromScale = projection.scale();
        const [curTx, curTy] = projection.translate();
        anim.fromTranslateX = curTx;
        anim.fromTranslateY = curTy;
        anim.fromBlur = currentBlur;

        anim.toScale = target.scale;
        anim.toTranslateX = target.tx;
        anim.toTranslateY = target.ty;
        anim.toBlur = MAX_BLUR_RADIUS;
        anim.phase = 'zooming-in';
        anim.startTime = d3.now();
        anim.duration = ZOOM_IN_DURATION;
        anim.targetFacility = found;
      } else if (!found && anim.targetFacility) {
        anim.fromScale = projection.scale();
        const [curTx, curTy] = projection.translate();
        anim.fromTranslateX = curTx;
        anim.fromTranslateY = curTy;
        anim.fromBlur = currentBlur;

        anim.toScale = baseScale;
        anim.toTranslateX = baseTx;
        anim.toTranslateY = baseTy;
        anim.toBlur = 0;
        anim.phase = 'zooming-out';
        anim.startTime = d3.now();
        anim.duration = ZOOM_OUT_DURATION;
        anim.targetFacility = null;
      }

      hoveredRef.current = found;
      setHoveredFacility(found);
    };

    const handleMouseLeave = () => {
      hoveredRef.current = null;
      setHoveredFacility(null);

      if (anim.phase === 'zooming-in' || anim.phase === 'focused') {
        anim.fromScale = projection.scale();
        const [curTx, curTy] = projection.translate();
        anim.fromTranslateX = curTx;
        anim.fromTranslateY = curTy;
        anim.fromBlur = currentBlur;

        anim.toScale = baseScale;
        anim.toTranslateX = baseTx;
        anim.toTranslateY = baseTy;
        anim.toBlur = 0;
        anim.phase = 'zooming-out';
        anim.startTime = d3.now();
        anim.duration = ZOOM_OUT_DURATION;
        anim.targetFacility = null;
      } else if (anim.phase === 'idle') {
        projection.scale(baseScale).translate([baseTx, baseTy]);
        currentBlur = 0;
      }
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    loadData();

    return () => {
      timer.stop();
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return { hoveredFacility, tooltipPos, isLoading };
}
