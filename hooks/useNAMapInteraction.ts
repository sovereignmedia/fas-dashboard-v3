'use client';

import { useRef, useState, useEffect } from 'react';
import * as d3 from 'd3';

import { NA_MAP_SIZE, NA_FACILITIES, NA_GEOJSON_STATES_URL, NA_GEOJSON_COUNTRIES_URL, NAFacility } from '@/data/na-map';
import { generateDotsInPolygon } from '@/lib/globe-utils';
import { renderNAMap } from '@/lib/na-map-renderer';

type MapDot = [number, number];

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

    // Projection: Conic conformal covering US + Canada + Mexico
    const projection = d3.geoConicConformal()
      .parallels([25, 55])
      .rotate([98, 0])
      .center([0, 42])
      .scale(650)
      .translate([width / 2, height / 2]);
    projectionRef.current = projection;

    // Pulse animation for active facility
    let pulsePhase = 0;

    function render() {
      renderNAMap(
        ctx!, projection, dotsRef.current, featuresRef.current,
        hoveredRef.current, width, height, pulsePhase
      );
    }

    // Pulse timer (gentle animation for the active marker)
    const pulseTimer = d3.timer(() => {
      pulsePhase = (pulsePhase + 0.008) % 1;
      render();
    });

    // Load GeoJSON — states/provinces for US+Canada, country-level for Mexico
    const loadData = async () => {
      try {
        const [statesRes, countriesRes] = await Promise.all([
          fetch(NA_GEOJSON_STATES_URL),
          fetch(NA_GEOJSON_COUNTRIES_URL),
        ]);
        if (!statesRes.ok || !countriesRes.ok) throw new Error('Failed to load NA map data');

        const statesData = await statesRes.json() as GeoJSON.FeatureCollection;
        const countriesData = await countriesRes.json() as GeoJSON.FeatureCollection;

        // US + Canada states/provinces
        const stateFeatures = statesData.features.filter((f) => {
          const admin = f.properties?.admin;
          return admin === 'United States of America' || admin === 'Canada';
        });

        // Mexico from country-level dataset
        const mexicoFeatures = countriesData.features.filter((f) => {
          const iso = f.properties?.ISO_A2;
          return iso === 'MX';
        });

        const allFeatures = [...stateFeatures, ...mexicoFeatures];
        featuresRef.current = allFeatures;

        // Generate dot-matrix fill
        const allDots: MapDot[] = [];
        allFeatures.forEach((f) => {
          generateDotsInPolygon(f, 10).forEach((d) => allDots.push(d));
        });
        dotsRef.current = allDots;

        render();
        setIsLoading(false);
      } catch (err) {
        console.error('NA map data load error:', err);
        setIsLoading(false);
      }
    };

    // Hover hit-testing on facility markers
    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mx = (event.clientX - rect.left) * (width / rect.width);
      const my = (event.clientY - rect.top) * (height / rect.height);

      let found: NAFacility | null = null;
      const hitRadius = 18; // px tolerance for marker hit

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

      hoveredRef.current = found;
      setHoveredFacility(found);
    };

    const handleMouseLeave = () => {
      hoveredRef.current = null;
      setHoveredFacility(null);
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    loadData();

    return () => {
      pulseTimer.stop();
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return { hoveredFacility, tooltipPos, isLoading };
}
