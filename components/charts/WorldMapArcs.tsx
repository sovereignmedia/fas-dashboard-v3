'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import DottedMap from 'dotted-map';

// Mason County, WV — Facility #1
const ORIGIN = { lat: 38.77, lng: -82.03 };

// Patent territory targets (from globe.ts PATENT_COORDS)
const EXPANSION_ARCS = [
  { lat: 35.0, lng: 105.0, label: 'China' },
  { lat: 20.6, lng: 78.9, label: 'India' },
  { lat: -2.5, lng: 118.0, label: 'Indonesia' },
  { lat: -25.3, lng: 133.8, label: 'Australia' },
  { lat: 61.5, lng: 105.3, label: 'Russia' },
  { lat: -30.6, lng: 22.9, label: 'South Africa' },
  { lat: 51.2, lng: 10.4, label: 'Germany' },
  { lat: 56.1, lng: -106.3, label: 'Canada' },
];

const LINE_COLOR = '#d4a852'; // accent-gold

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

        {/* Arcs from Mason County to each patent territory */}
        {EXPANSION_ARCS.map((target, i) => {
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
              transition={{ duration: 1.2, delay: 0.3 * i, ease: 'easeOut' }}
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
        {EXPANSION_ARCS.map((target, i) => {
          const pt = projectPoint(target.lat, target.lng);
          return (
            <g key={`pt-${i}`}>
              <circle cx={pt.x} cy={pt.y} r="2.5" fill={LINE_COLOR} />
              <circle cx={pt.x} cy={pt.y} r="2.5" fill={LINE_COLOR} opacity="0.4">
                <animate attributeName="r" from="2.5" to="8" dur="1.5s" begin={`${0.3 * i}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.4" to="0" dur="1.5s" begin={`${0.3 * i}s`} repeatCount="indefinite" />
              </circle>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
