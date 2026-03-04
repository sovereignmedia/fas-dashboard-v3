'use client';

import { motion } from 'framer-motion';
import Card from '@/components/ui/Card';
import { CHART_COLORS } from '@/lib/colors';
import { container, item } from '@/lib/animations';
import {
  bottleneckMetrics,
  bottleneckFunnel,
  type BottleneckMetric,
  type BottleneckFunnelStep,
} from '@/data/market-context';

// ─── Funnel step widths: proportional to GW, max bar = 100%
const MAX_GW = 2600;

function getBarWidth(gw: number): number {
  return Math.round((gw / MAX_GW) * 100);
}

// Color gradient from top (urgent red) to bottom (dim)
const FUNNEL_COLORS: string[] = [
  CHART_COLORS.red,      // Requested
  '#c73030',             // Under Study — slightly dimmer red
  CHART_COLORS.orange,   // Approved
  CHART_COLORS.gold,     // Built
  CHART_COLORS.blue,     // Annual Additions
];

const FUNNEL_BG_COLORS: string[] = [
  'rgba(232,64,64,0.12)',
  'rgba(199,48,48,0.10)',
  'rgba(232,138,48,0.10)',
  'rgba(212,168,82,0.10)',
  'rgba(64,136,232,0.10)',
];

interface FunnelBarProps {
  step: BottleneckFunnelStep;
  index: number;
  isLast: boolean;
}

function FunnelBar({ step, index, isLast }: FunnelBarProps) {
  const widthPct = getBarWidth(step.gw);
  const color = FUNNEL_COLORS[index] ?? CHART_COLORS.blue;
  const bgColor = FUNNEL_BG_COLORS[index] ?? 'rgba(64,136,232,0.10)';

  return (
    <motion.div
      variants={item}
      className="flex flex-col gap-1"
    >
      {/* Stage label row */}
      <div className="flex items-center justify-between px-1">
        <span className="text-text-secondary text-xs font-medium tracking-wide uppercase" style={{ fontFamily: 'var(--font-sans, Inter, sans-serif)' }}>
          {step.stage}
        </span>
        <span className="text-text-tertiary text-xs" style={{ fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)' }}>
          {step.note}
        </span>
      </div>

      {/* Bar row */}
      <div className="relative h-10 w-full flex items-center">
        <motion.div
          className="relative h-full rounded flex items-center justify-between px-3"
          style={{
            width: `${widthPct}%`,
            backgroundColor: bgColor,
            border: `1px solid ${color}33`,
            minWidth: '120px',
          }}
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: `${widthPct}%`, opacity: 1 }}
          transition={{ duration: 0.7, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Left accent line */}
          <div
            className="absolute left-0 top-0 bottom-0 w-0.5 rounded-l"
            style={{ backgroundColor: color }}
          />

          {/* GW value */}
          <span
            className="text-sm font-bold pl-1"
            style={{ color, fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)' }}
          >
            {step.gw.toLocaleString()} GW
          </span>

          {/* Percentage badge */}
          <span
            className="text-xs font-semibold px-2 py-0.5 rounded-full ml-2 shrink-0"
            style={{
              color,
              backgroundColor: `${color}22`,
              fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)',
            }}
          >
            {step.pct}
          </span>
        </motion.div>
      </div>

      {/* Connector arrow between steps */}
      {!isLast && (
        <div className="flex items-center px-1 py-0.5">
          <svg width="12" height="10" viewBox="0 0 12 10" fill="none" aria-hidden="true">
            <path d="M6 0L6 8M6 8L2 4M6 8L10 4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
          </svg>
          <span className="text-text-tertiary text-xs ml-2" style={{ fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)' }}>
            ↓ attrition
          </span>
        </div>
      )}
    </motion.div>
  );
}

type MetricColorKey = BottleneckMetric['color'];

const COLOR_MAP: Record<MetricColorKey, string> = {
  red: CHART_COLORS.red,
  orange: CHART_COLORS.orange,
  gold: CHART_COLORS.gold,
  blue: CHART_COLORS.blue,
  green: CHART_COLORS.green,
};

interface MetricCardProps {
  metric: BottleneckMetric;
}

function MetricCard({ metric }: MetricCardProps) {
  const valueColor = COLOR_MAP[metric.color];

  return (
    <motion.div
      variants={item}
      className="flex flex-col gap-1.5 p-4 rounded-lg border border-border-subtle"
      style={{ backgroundColor: `${valueColor}08` }}
    >
      <span className="text-text-secondary text-xs font-medium tracking-widest uppercase">
        {metric.label}
      </span>
      <span
        className="text-2xl font-bold leading-none"
        style={{
          color: valueColor,
          fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)',
        }}
      >
        {metric.value}
      </span>
      <span className="text-text-tertiary text-xs leading-snug">
        {metric.subtext}
      </span>
    </motion.div>
  );
}

export default function GridBottleneck() {
  return (
    <Card>
      {/* ── Header ─────────────────────────────────────────────── */}
      <div className="mb-6">
        <p className="text-xs font-semibold tracking-widest uppercase text-accent-gold mb-1">
          The Bottleneck
        </p>
        <h2 className="text-xl font-bold text-text-primary leading-tight">
          Why New Power Can't Be Built Fast Enough
        </h2>
        <p className="text-text-tertiary text-xs mt-1">
          Sources: LBNL Queued Up 2024, FERC, EIA — Interconnection queue attrition by stage
        </p>
      </div>

      {/* ── Funnel Visualization ────────────────────────────────── */}
      <div className="mb-8">
        <p className="text-text-secondary text-xs font-medium uppercase tracking-widest mb-4">
          Interconnection Queue — What Happens to 2,600 GW of Requests
        </p>
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-2"
        >
          {bottleneckFunnel.map((step, i) => (
            <FunnelBar
              key={step.stage}
              step={step}
              index={i}
              isLast={i === bottleneckFunnel.length - 1}
            />
          ))}
        </motion.div>

        {/* Summary callout */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-5 p-3 rounded-lg border border-border-subtle flex items-start gap-3"
          style={{ backgroundColor: `${CHART_COLORS.red}0a` }}
        >
          <div
            className="w-1 self-stretch rounded-full shrink-0"
            style={{ backgroundColor: CHART_COLORS.red }}
          />
          <p className="text-text-secondary text-xs leading-relaxed">
            Of every <span className="text-text-primary font-semibold">100 GW</span> requested, only{' '}
            <span style={{ color: CHART_COLORS.blue }} className="font-bold">3.3 GW</span> reaches the grid annually.
            The median project waits{' '}
            <span style={{ color: CHART_COLORS.orange }} className="font-semibold">5 years</span> for
            interconnection approval — before construction even begins.
          </p>
        </motion.div>
      </div>

      {/* ── Divider ─────────────────────────────────────────────── */}
      <div className="border-t border-border-subtle mb-6" />

      {/* ── Metric Cards Grid ───────────────────────────────────── */}
      <div className="mb-2">
        <p className="text-text-secondary text-xs font-medium uppercase tracking-widest mb-4">
          Key Constraint Indicators
        </p>
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 md:grid-cols-3 gap-3"
        >
          {bottleneckMetrics.map((metric) => (
            <MetricCard key={metric.label} metric={metric} />
          ))}
        </motion.div>
      </div>
    </Card>
  );
}
