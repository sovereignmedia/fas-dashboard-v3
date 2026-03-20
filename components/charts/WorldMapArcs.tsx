'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import DottedMap from 'dotted-map';

// Trade route chains — products hop from city to city across the globe
// Each route is an array of points; arcs connect consecutive points
const TRADE_ROUTES = [
  // Route 1: Americas
  [
    { lat: 38.77, lng: -82.03, label: 'Mason County' },
    { lat: 29.76, lng: -95.37, label: 'Houston' },
    { lat: 19.43, lng: -99.13, label: 'Mexico City' },
    { lat: -23.55, lng: -46.63, label: 'São Paulo' },
    { lat: -34.6, lng: -58.38, label: 'Buenos Aires' },
  ],
  // Route 2: Transatlantic → Europe → Nordics
  [
    { lat: 38.77, lng: -82.03, label: 'Mason County' },
    { lat: 51.51, lng: -0.13, label: 'London' },
    { lat: 51.2, lng: 10.4, label: 'Germany' },
    { lat: 52.23, lng: 21.01, label: 'Warsaw' },
    { lat: 59.33, lng: 18.07, label: 'Stockholm' },
  ],
  // Route 3: Europe south → Middle East → East Africa
  [
    { lat: 38.77, lng: -82.03, label: 'Mason County' },
    { lat: 41.9, lng: 12.5, label: 'Rome' },
    { lat: 30.04, lng: 31.24, label: 'Cairo' },
    { lat: 25.28, lng: 55.3, label: 'Dubai' },
    { lat: 6.52, lng: 3.38, label: 'Lagos' },
    { lat: -30.6, lng: 22.9, label: 'South Africa' },
  ],
  // Route 4: Middle East → South Asia → Southeast Asia
  [
    { lat: 25.28, lng: 55.3, label: 'Dubai' },
    { lat: 20.6, lng: 78.9, label: 'India' },
    { lat: 1.35, lng: 103.82, label: 'Singapore' },
    { lat: -2.5, lng: 118.0, label: 'Indonesia' },
    { lat: -33.87, lng: 151.21, label: 'Sydney' },
  ],
  // Route 5: East Asia chain
  [
    { lat: 1.35, lng: 103.82, label: 'Singapore' },
    { lat: 35.0, lng: 105.0, label: 'China' },
    { lat: 37.57, lng: 126.98, label: 'Seoul' },
    { lat: 35.68, lng: 139.69, label: 'Tokyo' },
  ],
  // Route 6: Canada branch
  [
    { lat: 38.77, lng: -82.03, label: 'Mason County' },
    { lat: 56.1, lng: -106.3, label: 'Canada' },
  ],
  // Route 7: West coast South America
  [
    { lat: -23.55, lng: -46.63, label: 'São Paulo' },
    { lat: -33.45, lng: -70.67, label: 'Santiago' },
  ],
];

const LINE_COLOR = '#00cc88'; // CHART_COLORS.green — matches NA Pipeline map

// Build arc pairs and unique point set from routes
function buildArcsAndPoints() {
  const arcs: { start: { lat: number; lng: number }; end: { lat: number; lng: number }; routeIdx: number; segIdx: number }[] = [];
  const pointMap = new Map<string, { lat: number; lng: number; label: string }>();

  TRADE_ROUTES.forEach((route, routeIdx) => {
    route.forEach((pt, i) => {
      const key = `${pt.lat},${pt.lng}`;
      if (!pointMap.has(key)) pointMap.set(key, pt);
      if (i < route.length - 1) {
        arcs.push({ start: pt, end: route[i + 1], routeIdx, segIdx: i });
      }
    });
  });

  return { arcs, points: Array.from(pointMap.values()) };
}

export default function WorldMapArcs() {
  const svgRef = useRef<SVGSVGElement>(null);
  const map = new DottedMap({ height: 100, grid: 'diagonal' });

  const svgMap = map.getSVG({
    radius: 0.22,
    color: '#FFFFFF25',
    shape: 'circle',
    backgroundColor: 'transparent',
  });

  const projectPoint = (lat: number, lng: number) => {
    const x = (lng + 180) * (800 / 360);
    const y = (90 - lat) * (400 / 180);
    return { x, y };
  };

  const createCurvedPath = (
    start: { x: number; y: number },
    end: { x: number; y: number }
  ) => {
    const midX = (start.x + end.x) / 2;
    const midY = Math.min(start.y, end.y) - 50;
    return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
  };

  const { arcs, points } = buildArcsAndPoints();
  const originPt = projectPoint(38.77, -82.03);

  return (
    <div className="w-full aspect-[2/1] rounded-xl relative overflow-hidden">
      <img
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
        className="h-full w-full [mask-image:linear-gradient(to_bottom,transparent,white_10%,white_90%,transparent)] pointer-events-none select-none"
        alt="world map"
        height="495"
        width="1056"
        draggable={false}
      />
      <svg
        ref={svgRef}
        viewBox="0 0 800 400"
        className="w-full h-full absolute inset-0 pointer-events-none select-none"
      >
        <defs>
          <linearGradient id="arc-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="5%" stopColor={LINE_COLOR} stopOpacity="1" />
            <stop offset="95%" stopColor={LINE_COLOR} stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Trade route arcs — products hop city to city */}
        {arcs.map((arc, i) => {
          const start = projectPoint(arc.start.lat, arc.start.lng);
          const end = projectPoint(arc.end.lat, arc.end.lng);
          // Stagger: each segment in a route waits for the previous one
          const delay = arc.routeIdx * 0.5 + arc.segIdx * 1.2;
          return (
            <motion.path
              key={`arc-${i}`}
              d={createCurvedPath(start, end)}
              fill="none"
              stroke="url(#arc-gradient)"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.4, delay, ease: 'easeOut' }}
            />
          );
        })}

        {/* Origin point — Mason County (larger pulse) */}
        <circle cx={originPt.x} cy={originPt.y} r="3" fill={LINE_COLOR} />
        <circle cx={originPt.x} cy={originPt.y} r="3" fill={LINE_COLOR} opacity="0.5">
          <animate attributeName="r" from="3" to="10" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" from="0.5" to="0" dur="2s" repeatCount="indefinite" />
        </circle>

        {/* All distribution points */}
        {points.map((pt, i) => {
          const projected = projectPoint(pt.lat, pt.lng);
          const isOrigin = pt.lat === 38.77 && pt.lng === -82.03;
          if (isOrigin) return null;
          return (
            <g key={`pt-${i}`}>
              <circle cx={projected.x} cy={projected.y} r="2" fill={LINE_COLOR} />
              <circle cx={projected.x} cy={projected.y} r="2" fill={LINE_COLOR} opacity="0.4">
                <animate attributeName="r" from="2" to="7" dur="1.5s" begin={`${0.15 * i}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.4" to="0" dur="1.5s" begin={`${0.15 * i}s`} repeatCount="indefinite" />
              </circle>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
