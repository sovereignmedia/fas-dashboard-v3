'use client';

import { useRef, useState, useEffect } from 'react';
import * as d3 from 'd3';

import {
  GLOBE_SIZE, TAU, PATENT_COORDS, PATENT_ISO_CODES,
  GLOBE_COUNTRIES, GEOJSON_URL, GlobeCountry,
} from '@/data/globe';
import { isVisible, pointInFeature, generateDotsInPolygon } from '@/lib/globe-utils';
import { renderGlobe } from '@/lib/globe-renderer';

type GlobeDot = [number, number, string | null];

interface GlobeState {
  projection: d3.GeoProjection | null;
  allDots: GlobeDot[];
  landFeatures: GeoJSON.FeatureCollection | null;
  patentFeatures: Record<string, GeoJSON.Feature>;
}

export function useGlobeInteraction(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
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
    const graticule = d3.geoGraticule();
    globeStateRef.current.projection = projection;

    // Render helper — delegates to the extracted renderer
    function render() {
      renderGlobe(
        context, projection, projectionUnclipped, graticule,
        globeStateRef.current.allDots, globeStateRef.current.landFeatures,
        hoveredCountryRef.current, size, radius
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

  return { hoveredCountry, tooltipPos, isLoading };
}
