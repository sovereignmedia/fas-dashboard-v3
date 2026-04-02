'use client';

import { motion } from 'framer-motion';
import { CRUDE_COMPARISON } from '@/data/tam';
import { CHART_COLORS } from '@/lib/colors';
import { container, item, viewport } from '@/lib/animations';
import Card from '@/components/ui/Card';

function fmtT(v: number): string {
  return v >= 1_000 ? `$${(v / 1_000).toFixed(1)}T` : `$${v}B`;
}

export default function CrudeOilComparison() {
  const c = CRUDE_COMPARISON;

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={viewport.section}
    >
      {/* Headline */}
      <motion.p
        variants={item}
        className="text-lg text-text-secondary text-center mb-6 font-medium"
      >
        78% the scale of crude oil refining.{' '}
        <span style={{ color: CHART_COLORS.gold }}>6x the margin.</span>
      </motion.p>

      {/* Side-by-side cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* Crude Oil */}
        <motion.div variants={item}>
          <Card hover={false}>
            <p className="text-[10px] uppercase tracking-[0.2em] text-text-tertiary mb-4">
              Global Crude Oil Refining
            </p>
            <div className="space-y-3">
              <Stat label="Revenue" value={fmtT(c.globalRefiningRevenue)} />
              <Stat label="Operating Margin" value={`${(c.crudeRefiningMargin * 100).toFixed(1)}%`} />
              <Stat label="EBITDA" value={fmtT(c.crudeRefiningEbitda)} />
            </div>
            <p className="text-xs text-text-tertiary mt-4">Established industry</p>
          </Card>
        </motion.div>

        {/* FASForm */}
        <motion.div variants={item}>
          <Card hover={false} className="border border-accent-gold/20">
            <p className="text-[10px] uppercase tracking-[0.2em] text-accent-gold mb-4">
              FASForm&trade; TAM (9 Patent Countries)
            </p>
            <div className="space-y-3">
              <Stat label="Revenue" value={fmtT(c.fasformTamRevenue)} color={CHART_COLORS.gold} />
              <Stat label="Operating Margin" value={`${(c.fasformMargin * 100).toFixed(0)}%`} color={CHART_COLORS.green} />
              <Stat label="EBITDA" value={fmtT(c.fasformEbitda)} color={CHART_COLORS.green} />
            </div>
            <p className="text-xs text-accent-gold/60 mt-4">Patent-protected</p>
          </Card>
        </motion.div>
      </div>

      {/* Margin comparison bars */}
      <motion.div variants={item}>
        <Card hover={false}>
          <p className="text-[10px] uppercase tracking-[0.2em] text-text-tertiary mb-4">
            Operating Margin Comparison
          </p>
          <div className="space-y-3">
            <MarginBar
              label="Crude Oil Refining"
              pct={c.crudeRefiningMargin * 100}
              color="rgba(255,255,255,0.15)"
            />
            <MarginBar
              label="FASForm™"
              pct={c.fasformMargin * 100}
              color={CHART_COLORS.gold}
            />
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}

function Stat({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-text-secondary">{label}</span>
      <span
        className="font-mono text-lg font-bold tabular-nums"
        style={{ color: color || 'var(--text-primary)' }}
      >
        {value}
      </span>
    </div>
  );
}

function MarginBar({ label, pct, color }: { label: string; pct: number; color: string }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm text-text-secondary">{label}</span>
        <span className="font-mono text-sm font-bold" style={{ color }}>{pct.toFixed(1)}%</span>
      </div>
      <div className="h-5 rounded-full bg-bg-tertiary overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: color }}
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        />
      </div>
    </div>
  );
}
