'use client';

import { useRef, useState, useEffect } from 'react';
import * as d3 from 'd3';

import {
  GLOBE_SIZE, TAU, PATENT_COORDS, PATENT_ISO_CODES,
  GLOBE_COUNTRIES, GEOJSON_URL, GlobeCountry,
} from '@/data/globe';
import { markerRadius, isInBounds, pointInFeature, isVisible } from '@/lib/globe-utils';
import { CHART_COLORS } from '@/lib/colors';
import GlobeTooltip from '@/components/charts/GlobeTooltip';

type GlobeDot = [number, number, string | null];

interface GlobeState {
  projection: d3.GeoProjection | null;
  allDots: GlobeDot[];
  landFeatures: GeoJSON.FeatureCollection | null;
  patentFeatures: Record<string, GeoJSON.Feature>;
}

export default function InteractiveGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
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

    // Dual projections: clipped (front) and unclipped (back-side markers)
    const projection = d3.geoOrthographic().scale(radius).translate([cx, cy]).clipAngle(90);
    const projectionUnclipped = d3.geoOrthographic().scale(radius).translate([cx, cy]);
    const path = d3.geoPath().projection(projection).context(context);
    const graticule = d3.geoGraticule();
    globeStateRef.current.projection = projection;

    // Dot generation: fills land polygons with a grid of points
    function generateDotsInPolygon(feature: GeoJSON.Feature, dotSpacing: number): [number, number][] {
      const dots: [number, number][] = [];
      const bounds = d3.geoBounds(feature);
      const [[minLng, minLat], [maxLng, maxLat]] = bounds;
      const step = dotSpacing * 0.08;
      const lngRanges: [number, number][] =
        minLng > maxLng ? [[minLng, 180], [-180, maxLng]] : [[minLng, maxLng]];
      for (const [lngStart, lngEnd] of lngRanges) {
        for (let lng = lngStart; lng <= lngEnd; lng += step) {
          for (let lat = minLat; lat <= maxLat; lat += step) {
            if (pointInFeature([lng, lat], feature)) dots.push([lng, lat]);
          }
        }
      }
      return dots;
    }

    // Canvas render: called every frame during rotation and after drag/hover
    function render() {
      context.clearRect(0, 0, size, size);
      const currentScale = projection.scale();
      const sf = currentScale / radius;

      // 1. Atmospheric glow
      const atmoGrad = context.createRadialGradient(cx, cy, currentScale * 0.9, cx, cy, currentScale * 1.15);
      atmoGrad.addColorStop(0, 'transparent');
      atmoGrad.addColorStop(0.5, 'rgba(75,140,200,0.12)');
      atmoGrad.addColorStop(0.8, 'rgba(80,150,220,0.16)');
      atmoGrad.addColorStop(1, 'rgba(75,140,200,0.05)');
      context.beginPath();
      context.arc(cx, cy, currentScale * 1.15, 0, TAU);
      context.fillStyle = atmoGrad;
      context.fill();

      // 2. Globe sphere with directional lighting
      const globeGrad = context.createRadialGradient(cx * 0.85, cy * 0.85, 0, cx, cy, currentScale);
      globeGrad.addColorStop(0, '#0d1825');
      globeGrad.addColorStop(1, '#040810');
      context.beginPath();
      context.arc(cx, cy, currentScale, 0, TAU);
      context.fillStyle = globeGrad;
      context.fill();
      context.strokeStyle = 'rgba(75,140,200,0.25)';
      context.lineWidth = 1 * sf;
      context.stroke();

      const { landFeatures: land, allDots } = globeStateRef.current;
      if (!land) return;

      // 3. Graticule
      context.beginPath();
      path(graticule());
      context.strokeStyle = 'rgba(75,140,200,0.12)';
      context.lineWidth = 0.4 * sf;
      context.stroke();

      // 4. Land outlines
      context.beginPath();
      land.features.forEach((f) => path(f));
      context.strokeStyle = 'rgba(75,140,200,0.4)';
      context.lineWidth = 0.8 * sf;
      context.stroke();

      // 5. Dot-matrix fill
      allDots.forEach((dot) => {
        const projected = projection([dot[0], dot[1]]) as [number, number] | null;
        if (isInBounds(projected, size)) {
          context.beginPath();
          context.arc(projected![0], projected![1], 1.0 * sf, 0, TAU);
          context.fillStyle = 'rgba(75,140,200,0.85)';
          context.fill();
        }
      });

      // 6. Hovered country dot highlight
      const hovered = hoveredCountryRef.current;
      if (hovered) {
        allDots.forEach((dot) => {
          if (dot[2] === hovered.code) {
            const projected = projection([dot[0], dot[1]]) as [number, number] | null;
            if (isInBounds(projected, size)) {
              context.beginPath();
              context.arc(projected![0], projected![1], 1.3 * sf, 0, TAU);
              context.fillStyle = 'rgba(0,204,136,0.9)';
              context.fill();
            }
          }
        });
      }

      const rot = projection.rotate() as [number, number, number];

      // 7. Back-side patent markers (dimmed, see-through)
      GLOBE_COUNTRIES.forEach((c) => {
        const coord = PATENT_COORDS[c.code];
        if (!coord || isVisible(coord.lon, coord.lat, rot)) return;
        const projected = projectionUnclipped([coord.lon, coord.lat]) as [number, number] | null;
        if (!projected || !isInBounds(projected, size)) return;
        const r = markerRadius(c.production);
        context.beginPath();
        context.arc(projected[0], projected[1], r * 0.8 * sf, 0, TAU);
        context.fillStyle = 'rgba(0,204,136,0.55)';
        context.fill();
        context.fillStyle = 'rgba(255,255,255,0.45)';
        context.font = `bold ${10 * sf}px 'MicroSquare', sans-serif`;
        context.textAlign = 'center';
        context.fillText(c.name, projected[0], projected[1] - r * 0.6 * sf - 5 * sf);
      });

      // 8. Front-side patent markers (full brightness + bloom)
      GLOBE_COUNTRIES.forEach((c) => {
        const coord = PATENT_COORDS[c.code];
        if (!coord || !isVisible(coord.lon, coord.lat, rot)) return;
        const projected = projection([coord.lon, coord.lat]) as [number, number] | null;
        if (!projected) return;
        const r = markerRadius(c.production);
        // Bloom glow
        context.beginPath();
        context.arc(projected[0], projected[1], r * 2.5 * sf, 0, TAU);
        const glow = context.createRadialGradient(
          projected[0], projected[1], 0,
          projected[0], projected[1], r * 2.5 * sf
        );
        glow.addColorStop(0, 'rgba(0,204,136,0.3)');
        glow.addColorStop(1, 'rgba(0,204,136,0)');
        context.fillStyle = glow;
        context.fill();
        // Core marker
        context.beginPath();
        context.arc(projected[0], projected[1], r * sf, 0, TAU);
        context.fillStyle = CHART_COLORS.green;
        context.fill();
        context.strokeStyle = 'rgba(0,204,136,0.5)';
        context.lineWidth = 1 * sf;
        context.stroke();
        // Label
        context.fillStyle = 'rgba(255,255,255,0.9)';
        context.font = `bold ${13 * sf}px 'MicroSquare', sans-serif`;
        context.textAlign = 'center';
        context.fillText(c.name, projected[0], projected[1] - r * sf - 6 * sf);
      });

      // 9. Edge ring
      context.beginPath();
      context.arc(cx, cy, currentScale, 0, TAU);
      context.strokeStyle = 'rgba(75,140,200,0.15)';
      context.lineWidth = 1.5 * sf;
      context.stroke();
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

    // Auto-rotation: starts showing Americas, rotates east at 0.08 deg/frame
    const rotation: [number, number, number] = [-40, -20, 0];
    let autoRotate = true;
    projection.rotate(rotation);
    projectionUnclipped.rotate(rotation);

    const rotationTimer = d3.timer(() => {
      if (autoRotate) {
        rotation[0] += 0.08;
        projection.rotate(rotation);
        projectionUnclipped.rotate(rotation);
        render();
      }
    });

    // Drag-to-rotate
    let dragOnMove: ((e: MouseEvent) => void) | null = null;
    let dragOnUp: (() => void) | null = null;

    const handleMouseDown = (event: MouseEvent) => {
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

    // Hover hit-testing
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

      hoveredCountryRef.current = found;
      setHoveredCountry(found);
      autoRotate = !found;
      render();
    };

    const handleMouseLeave = () => {
      hoveredCountryRef.current = null;
      setHoveredCountry(null);
      autoRotate = true;
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

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="relative cursor-grab active:cursor-grabbing">
        <canvas ref={canvasRef} className="block rounded-2xl" />

        {isLoading && (
          <div
            className="absolute inset-0 flex items-center justify-center text-text-tertiary text-sm"
            style={{ width: GLOBE_SIZE, height: GLOBE_SIZE }}
          >
            Loading globe data...
          </div>
        )}

        {hoveredCountry && (
          <GlobeTooltip
            country={hoveredCountry}
            tooltipPos={tooltipPos}
            globeSize={GLOBE_SIZE}
          />
        )}
      </div>

      <p className="text-base font-semibold text-text-tertiary uppercase tracking-[0.1em]">
        Click &amp; Drag to Rotate
      </p>
    </div>
  );
}
