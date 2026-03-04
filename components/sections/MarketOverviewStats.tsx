'use client';

import { motion } from 'framer-motion';

import { marketStats, type MarketStat } from '@/data/market-context';
import { container, item, viewport } from '@/lib/animations';
import { CHART_COLORS } from '@/lib/colors';
import Card from '@/components/ui/Card';

const deltaColorMap: Record<MarketStat['deltaColor'], string> = {
  green: CHART_COLORS.green,
  blue: CHART_COLORS.blue,
  gold: CHART_COLORS.gold,
  orange: CHART_COLORS.orange,
  red: CHART_COLORS.red,
  purple: CHART_COLORS.purple,
};

// ─── Sparkline Data ──────────────────────────────────────────────────────────
// Mini trend data for each stat card (normalized 0–1 range).
// These represent directional trends, not precise values.

const sparklineData: Record<string, number[]> = {
  'Hyperscaler CapEx':   [0.15, 0.22, 0.28, 0.35, 0.45, 0.55, 0.70, 0.85, 1.0],
  'DC Power Demand':     [0.10, 0.15, 0.22, 0.32, 0.42, 0.55, 0.68, 0.82, 1.0],
  'PJM Capacity Price':  [0.30, 0.25, 0.35, 0.40, 0.55, 0.62, 0.75, 0.90, 1.0],
  'Grid Queue':          [0.20, 0.28, 0.35, 0.42, 0.52, 0.60, 0.72, 0.85, 0.95],
  'Coal Retirements':    [0.90, 0.85, 0.75, 0.65, 0.55, 0.50, 0.42, 0.38, 0.37],
  'Transformer Lead Time': [0.18, 0.25, 0.35, 0.48, 0.58, 0.68, 0.80, 0.92, 1.0],
};

// ─── Sparkline SVG ───────────────────────────────────────────────────────────

function Sparkline({ data, color }: { data: number[]; color: string }) {
  const width = 80;
  const height = 24;
  const padding = 2;
  const stepX = (width - padding * 2) / (data.length - 1);

  const points = data.map((v, i) => {
    const x = padding + i * stepX;
    const y = height - padding - v * (height - padding * 2);
    return `${x},${y}`;
  }).join(' ');

  const linePoints = data.map((v, i) => {
    const x = padding + i * stepX;
    const y = height - padding - v * (height - padding * 2);
    return { x, y };
  });

  const linePath = linePoints.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');
  const areaPath = `${linePath} L${linePoints[linePoints.length - 1].x},${height - padding} L${linePoints[0].x},${height - padding} Z`;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className="overflow-visible"
      style={{ opacity: 0.5 }}
    >
      <defs>
        <linearGradient id={`spark-fill-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={0.2} />
          <stop offset="100%" stopColor={color} stopOpacity={0.02} />
        </linearGradient>
      </defs>
      <path d={areaPath} fill={`url(#spark-fill-${color.replace('#', '')})`} />
      <polyline points={points} fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={linePoints[linePoints.length - 1].x} cy={linePoints[linePoints.length - 1].y} r={2} fill={color} />
    </svg>
  );
}

// ─── Stat Card ───────────────────────────────────────────────────────────────

function StatCard({ stat }: { stat: MarketStat }) {
  const accentColor = deltaColorMap[stat.deltaColor];
  const sparkData = sparklineData[stat.label];

  return (
    <Card hover={false} accentLine className="!p-5 h-full flex flex-col justify-between">
      <p className="text-[10px] uppercase tracking-[0.25em] font-semibold text-accent-gold/70 mb-3 leading-tight">
        {stat.label}
      </p>
      <div className="flex items-end justify-between mb-2">
        <p className="font-mono text-lg font-semibold tabular-nums text-text-primary leading-none">
          {stat.value}
        </p>
        {sparkData && <Sparkline data={sparkData} color={accentColor} />}
      </div>
      <span
        className="inline-block text-[10px] font-semibold uppercase tracking-[0.15em] rounded px-1.5 py-0.5 mb-2"
        style={{ color: accentColor, backgroundColor: `${accentColor}18` }}
      >
        {stat.delta}
      </span>
      <p className="text-[10px] leading-relaxed text-text-tertiary">
        {stat.deltaContext}
      </p>
    </Card>
  );
}

export default function MarketOverviewStats() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={viewport.section}
      className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 mb-10"
    >
      {marketStats.map((stat) => (
        <motion.div key={stat.label} variants={item}>
          <StatCard stat={stat} />
        </motion.div>
      ))}
    </motion.div>
  );
}
