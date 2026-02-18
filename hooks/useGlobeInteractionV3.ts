'use client';

import { useRef, useState, useEffect } from 'react';
import * as d3 from 'd3';

import {
  GLOBE_SIZE, PATENT_COORDS, PATENT_ISO_CODES,
  GLOBE_COUNTRIES, GEOJSON_URL, GlobeCountry,
} from '@/data/globe';
import { isVisible, pointInFeature, generateDotsInPolygon } from '@/lib/globe-utils';
import { renderGlobeComposited } from '@/lib/globe-renderer-v3';

type GlobeDot = [number, number, string | null];

interface GlobeState {
  projection: d3.GeoProjection | null;
  allDots: GlobeDot[];
  landFeatures: GeoJSON.FeatureCollection | null;
  patentFeatures: Record<string, GeoJSON.Feature>;
}

type ZoomPhase = 'idle' | 'zooming-in' | 'focused' | 'zooming-out';

interface AnimationState {
  phase: ZoomPhase;
  startTime: number;
  duration: number;
  fromScale: number;
  toScale: number;
  fromBlur: number;
  toBlur: number;
  targetCountry: GlobeCountry | null;
}

// Animation parameters
const ZOOM_SCALE_MULTIPLIER = 1.4;
const MAX_BLUR_RADIUS = 5;
const ZOOM_IN_DURATION = 500;
const ZOOM_OUT_DURATION = 400;

export function useGlobeInteractionV3(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  const [hoveredCountry, setHoveredCountry] = useState<GlobeCountry | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const globeStateRef = useRef<GlobeState>({
    projection: null, allDots: [], landFeatures: null, patentFeatures: {},
  });
  const hoveredCountryRef = useRef<GlobeCountry | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const context = ctx;

    const size = GLOBE_SIZE;
    const radius = size / 2.5;
    const cx = size / 2;
    const cy = size / 2;

    // HiDPI
    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = size + 'px';
    canvas.style.height = size + 'px';
    context.scale(dpr, dpr);

    // OffscreenCanvas for blur compositing
    let offscreenCanvas: HTMLCanvasElement | OffscreenCanvas;
    let offscreenCtx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D;
    if (typeof OffscreenCanvas !== 'undefined') {
      offscreenCanvas = new OffscreenCanvas(size * dpr, size * dpr);
      offscreenCtx = offscreenCanvas.getContext('2d')!;
    } else {
      const fallback = document.createElement('canvas');
      fallback.width = size * dpr;
      fallback.height = size * dpr;
      offscreenCanvas = fallback;
      offscreenCtx = fallback.getContext('2d')!;
    }
    offscreenCtx.scale(dpr, dpr);

    // Dual projections: clipped (front) and unclipped (back-side markers)
    const projection = d3.geoOrthographic().scale(radius).translate([cx, cy]).clipAngle(90);
    const projectionUnclipped = d3.geoOrthographic().scale(radius).translate([cx, cy]);
    const graticule = d3.geoGraticule();
    globeStateRef.current.projection = projection;

    // Animation state (mutable, not React state — perf critical in 60fps loop)
    const anim: AnimationState = {
      phase: 'idle',
      startTime: 0,
      duration: ZOOM_IN_DURATION,
      fromScale: radius,
      toScale: radius,
      fromBlur: 0,
      toBlur: 0,
      targetCountry: null,
    };

    // Current interpolated blur for the render loop
    let currentBlur = 0;
    let pulsePhase = 0;

    // Render helper
    function render() {
      renderGlobeComposited(
        context, offscreenCtx as CanvasRenderingContext2D, offscreenCanvas,
        projection, projectionUnclipped, graticule,
        globeStateRef.current.allDots, globeStateRef.current.landFeatures,
        hoveredCountryRef.current, size, radius, currentBlur, pulsePhase
      );
    }

    // Data loading
    const loadData = async () => {
      try {
        const res = await fetch(GEOJSON_URL);
        if (!res.ok) throw new Error('Failed to load globe data');
        const landData = await res.json() as GeoJSON.FeatureCollection;
        globeStateRef.current.landFeatures = landData;

        const patentFeatures: Record<string, GeoJSON.Feature> = {};
        landData.features.forEach((f) => {
          const iso = f.properties?.ISO_A2;
          if (iso && PATENT_ISO_CODES.has(iso)) patentFeatures[iso] = f;
        });
        globeStateRef.current.patentFeatures = patentFeatures;

        const allDots: GlobeDot[] = [];
        landData.features.forEach((f) => {
          const iso = f.properties?.ISO_A2;
          const tag = iso && PATENT_ISO_CODES.has(iso) ? iso : null;
          generateDotsInPolygon(f, 16).forEach((d) => allDots.push([d[0], d[1], tag]));
        });
        globeStateRef.current.allDots = allDots;
        render();
        setIsLoading(false);
      } catch (err) {
        console.error('Globe data load error:', err);
        setIsLoading(false);
      }
    };

    // Auto-rotation
    const rotation: [number, number, number] = [-40, -20, 0];
    let autoRotate = true;
    projection.rotate(rotation);
    projectionUnclipped.rotate(rotation);

    const rotationTimer = d3.timer(() => {
      pulsePhase = (pulsePhase + 0.008) % 1;

      if (anim.phase === 'idle') {
        // Normal auto-rotation
        if (autoRotate) {
          rotation[0] += 0.08;
          projection.rotate(rotation);
          projectionUnclipped.rotate(rotation);
        }
        currentBlur = 0;
        render();
        return;
      }

      // Animated phases: zooming-in, focused, zooming-out
      const elapsed = d3.now() - anim.startTime;
      const rawT = Math.min(elapsed / anim.duration, 1);
      const t = d3.easeCubicInOut(rawT);

      if (anim.phase === 'focused') {
        // Hold at zoomed values, keep rendering
        currentBlur = anim.toBlur;
        render();
        return;
      }

      // Interpolate scale
      const currentScale = d3.interpolateNumber(anim.fromScale, anim.toScale)(t);

      // Interpolate blur
      currentBlur = d3.interpolateNumber(anim.fromBlur, anim.toBlur)(t);

      // Apply scale to both projections (rotation stays fixed during zoom)
      projection.scale(currentScale);
      projectionUnclipped.scale(currentScale);

      render();

      // Phase completion
      if (rawT >= 1) {
        if (anim.phase === 'zooming-in') {
          anim.phase = 'focused';
        } else if (anim.phase === 'zooming-out') {
          anim.phase = 'idle';
          // Restore base scale
          projection.scale(radius);
          projectionUnclipped.scale(radius);
          currentBlur = 0;
          autoRotate = true;
        }
      }
    });

    // Drag-to-rotate
    let dragOnMove: ((e: MouseEvent) => void) | null = null;
    let dragOnUp: (() => void) | null = null;

    const handleMouseDown = (event: MouseEvent) => {
      // Cancel any zoom animation on drag
      if (anim.phase !== 'idle') {
        anim.phase = 'idle';
        projection.scale(radius);
        projectionUnclipped.scale(radius);
        currentBlur = 0;
        anim.targetCountry = null;
        hoveredCountryRef.current = null;
        setHoveredCountry(null);
      }

      autoRotate = false;
      const startX = event.clientX;
      const startY = event.clientY;
      const startRot: [number, number, number] = [...rotation];

      const onMove = (e: MouseEvent) => {
        rotation[0] = startRot[0] + (e.clientX - startX) * 0.4;
        rotation[1] = Math.max(-90, Math.min(90, startRot[1] - (e.clientY - startY) * 0.4));
        projection.rotate(rotation);
        projectionUnclipped.rotate(rotation);
        render();
      };

      const onUp = () => {
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseup', onUp);
        dragOnMove = null;
        dragOnUp = null;
        setTimeout(() => { autoRotate = true; }, 1500);
      };

      dragOnMove = onMove;
      dragOnUp = onUp;
      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', onUp);
    };

    // Hover hit-testing with cinematic zoom trigger
    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mx = (event.clientX - rect.left) * (size / rect.width);
      const my = (event.clientY - rect.top) * (size / rect.height);
      let found: GlobeCountry | null = null;

      const dx = mx - cx, dy = my - cy;
      const globeR = projection.scale();
      if (dx * dx + dy * dy <= globeR * globeR) {
        const geo = projection.invert!([mx, my]);
        if (geo) {
          const pf = globeStateRef.current.patentFeatures;
          const isoCodes = Array.from(PATENT_ISO_CODES);
          for (const code of isoCodes) {
            const feature = pf[code];
            if (!feature) continue;
            if (pointInFeature([geo[0], geo[1]] as [number, number], feature)) {
              found = GLOBE_COUNTRIES.find((c) => c.code === code) ?? null;
              if (found) {
                const coord = PATENT_COORDS[code];
                const rot = projection.rotate() as [number, number, number];
                if (coord && isVisible(coord.lon, coord.lat, rot)) {
                  const proj = projection([coord.lon, coord.lat]) as [number, number] | null;
                  if (proj) setTooltipPos({ x: proj[0], y: proj[1] });
                } else {
                  setTooltipPos({ x: mx, y: my });
                }
              }
              break;
            }
          }
        }
      }

      // Trigger cinematic zoom if hovering a new country
      if (found && found.code !== anim.targetCountry?.code) {
        const coord = PATENT_COORDS[found.code];
        if (coord) {
          // Snapshot current state as starting point
          anim.fromScale = projection.scale();
          anim.fromBlur = currentBlur;

          // Target: zoom in-place (no rotation change), blur background
          anim.toScale = radius * ZOOM_SCALE_MULTIPLIER;
          anim.toBlur = MAX_BLUR_RADIUS;
          anim.phase = 'zooming-in';
          anim.startTime = d3.now();
          anim.duration = ZOOM_IN_DURATION;
          anim.targetCountry = found;
        }
      } else if (!found && anim.targetCountry) {
        // Mouse moved off country but still on globe — start zooming out
        anim.fromScale = projection.scale();
        anim.fromBlur = currentBlur;

        anim.toScale = radius;
        anim.toBlur = 0;
        anim.phase = 'zooming-out';
        anim.startTime = d3.now();
        anim.duration = ZOOM_OUT_DURATION;
        anim.targetCountry = null;
      }

      hoveredCountryRef.current = found;
      setHoveredCountry(found);
      autoRotate = !found && anim.phase === 'idle';
    };

    const handleMouseLeave = () => {
      hoveredCountryRef.current = null;
      setHoveredCountry(null);

      if (anim.phase === 'zooming-in' || anim.phase === 'focused') {
        // Reverse animation
        anim.fromScale = projection.scale();
        anim.fromBlur = currentBlur;

        anim.toScale = radius;
        anim.toBlur = 0;
        anim.phase = 'zooming-out';
        anim.startTime = d3.now();
        anim.duration = ZOOM_OUT_DURATION;
        anim.targetCountry = null;
      } else if (anim.phase === 'idle') {
        autoRotate = true;
      }
      // If already zooming-out, let it finish naturally
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    loadData();

    return () => {
      rotationTimer.stop();
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      if (dragOnMove) document.removeEventListener('mousemove', dragOnMove);
      if (dragOnUp) document.removeEventListener('mouseup', dragOnUp);
    };
  }, []);

  return { hoveredCountry, tooltipPos, isLoading };
}
