'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import DottedMap from 'dotted-map';

// Mason County, WV — Facility #1
const ORIGIN = { lat: 38.77, lng: -82.03 };

// Global product distribution destinations — major ports, industrial hubs, energy markets
const DISTRIBUTION_ARCS = [
  // North America
  { lat: 29.76, lng: -95.37, label: 'Houston' },
  { lat: 56.1, lng: -106.3, label: 'Canada' },
  { lat: 19.43, lng: -99.13, label: 'Mexico City' },
  // South America
  { lat: -23.55, lng: -46.63, label: 'São Paulo' },
  { lat: -34.6, lng: -58.38, label: 'Buenos Aires' },
  { lat: -33.45, lng: -70.67, label: 'Santiago' },
  // Europe
  { lat: 51.51, lng: -0.13, label: 'London' },
  { lat: 51.2, lng: 10.4, label: 'Germany' },
  { lat: 52.23, lng: 21.01, label: 'Warsaw' },
  { lat: 41.9, lng: 12.5, label: 'Rome' },
  { lat: 59.33, lng: 18.07, label: 'Stockholm' },
  // Middle East
  { lat: 25.28, lng: 55.3, label: 'Dubai' },
  { lat: 24.47, lng: 54.37, label: 'Abu Dhabi' },
  // Africa
  { lat: -30.6, lng: 22.9, label: 'South Africa' },
  { lat: 30.04, lng: 31.24, label: 'Cairo' },
  { lat: 6.52, lng: 3.38, label: 'Lagos' },
  // Asia
  { lat: 35.0, lng: 105.0, label: 'China' },
  { lat: 20.6, lng: 78.9, label: 'India' },
  { lat: 35.68, lng: 139.69, label: 'Tokyo' },
  { lat: 37.57, lng: 126.98, label: 'Seoul' },
  { lat: 1.35, lng: 103.82, label: 'Singapore' },
  { lat: -2.5, lng: 118.0, label: 'Indonesia' },
  // Oceania
  { lat: -33.87, lng: 151.21, label: 'Sydney' },
];

const LINE_COLOR = '#00cc88'; // CHART_COLORS.green — matches NA Pipeline map

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

  const origin = projectPoint(ORIGIN.lat, ORIGIN.lng);

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

        {/* Arcs from Mason County to global distribution points */}
        {DISTRIBUTION_ARCS.map((target, i) => {
          const end = projectPoint(target.lat, target.lng);
          return (
            <motion.path
              key={`arc-${i}`}
              d={createCurvedPath(origin, end)}
              fill="none"
              stroke="url(#arc-gradient)"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: 0.12 * i, ease: 'easeOut' }}
            />
          );
        })}

        {/* Origin point — Mason County */}
        <circle cx={origin.x} cy={origin.y} r="3" fill={LINE_COLOR} />
        <circle cx={origin.x} cy={origin.y} r="3" fill={LINE_COLOR} opacity="0.5">
          <animate attributeName="r" from="3" to="10" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" from="0.5" to="0" dur="2s" repeatCount="indefinite" />
        </circle>

        {/* Target points */}
        {DISTRIBUTION_ARCS.map((target, i) => {
          const pt = projectPoint(target.lat, target.lng);
          return (
            <g key={`pt-${i}`}>
              <circle cx={pt.x} cy={pt.y} r="2" fill={LINE_COLOR} />
              <circle cx={pt.x} cy={pt.y} r="2" fill={LINE_COLOR} opacity="0.4">
                <animate attributeName="r" from="2" to="7" dur="1.5s" begin={`${0.12 * i}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.4" to="0" dur="1.5s" begin={`${0.12 * i}s`} repeatCount="indefinite" />
              </circle>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
