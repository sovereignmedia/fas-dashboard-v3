'use client';

import { motion } from 'framer-motion';
import Card from '@/components/ui/Card';
import { CHART_COLORS } from '@/lib/colors';
import { container, item } from '@/lib/animations';
import {
  generationMix,
  totalInstalledCapacity,
  type GenerationSource,
} from '@/data/market-context';

// Max GW is the first entry (largest) — used for bar proportions
const MAX_GW = generationMix[0]?.capacityGW ?? totalInstalledCapacity;

interface SourceRowProps {
  source: GenerationSource;
  maxGw: number;
}

function SourceRow({ source, maxGw }: SourceRowProps) {
  const barWidthPct = Math.round((source.capacityGW / maxGw) * 100);

  return (
    <motion.div
      variants={item}
      className="grid items-center gap-3"
      style={{ gridTemplateColumns: '130px 1fr 110px' }}
    >
      {/* Source name */}
      <span
        className="text-text-secondary text-sm font-medium truncate"
        title={source.source}
      >
        {source.source}
      </span>

      {/* Bar track */}
      <div className="relative h-7 w-full rounded overflow-hidden bg-white/[0.04]">
        <motion.div
          className="absolute left-0 top-0 bottom-0 rounded"
          style={{ backgroundColor: `${source.color}22`, borderLeft: `2px solid ${source.color}` }}
          initial={{ width: 0 }}
          animate={{ width: `${barWidthPct}%` }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        />
        {/* Inner fill bar */}
        <motion.div
          className="absolute left-0 top-0 bottom-0"
          style={{ backgroundColor: `${source.color}18` }}
          initial={{ width: 0 }}
          animate={{ width: `${barWidthPct}%` }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        />
        {/* Note text inside bar (only if enough room) */}
        {barWidthPct > 35 && (
          <motion.span
            className="absolute left-3 top-1/2 -translate-y-1/2 text-xs truncate"
            style={{
              color: `${source.color}bb`,
              fontFamily: 'var(--font-sans, Inter, sans-serif)',
              maxWidth: `calc(${barWidthPct}% - 120px)`,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.3 }}
          >
            {source.note}
          </motion.span>
        )}
      </div>

      {/* Value label */}
      <div className="flex flex-col items-end gap-0.5 shrink-0">
        <span
          className="text-sm font-bold leading-none"
          style={{
            color: source.color,
            fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)',
          }}
        >
          {source.capacityGW} GW
        </span>
        <span
          className="text-xs text-text-tertiary"
          style={{ fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)' }}
        >
          {source.pctOfTotal.toFixed(1)}%
        </span>
      </div>
    </motion.div>
  );
}

export default function GenerationMix() {
  // Sort by capacityGW descending (data is already sorted, but enforce it)
  const sorted = [...generationMix].sort((a, b) => b.capacityGW - a.capacityGW);

  // Highlight coal for investor note
  const coal = sorted.find((s) => s.source === 'Coal');

  return (
    <Card>
      {/* ── Header ─────────────────────────────────────────────── */}
      <div className="mb-6">
        <p className="text-xs font-semibold tracking-widest uppercase text-accent-gold mb-1">
          Installed Capacity
        </p>
        <h2 className="text-xl font-bold text-text-primary leading-tight">
          U.S. Power Generation by Source
        </h2>
        <p className="text-text-tertiary text-xs mt-1">
          Total:{' '}
          <span
            className="font-semibold text-text-secondary"
            style={{ fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)' }}
          >
            {totalInstalledCapacity.toLocaleString()} GW
          </span>{' '}
          — Source: American Public Power Association (2025)
        </p>
      </div>

      {/* ── Legend pills ───────────────────────────────────────── */}
      <div className="flex flex-wrap gap-2 mb-5">
        {sorted.map((s) => (
          <div
            key={s.source}
            className="flex items-center gap-1.5 px-2 py-1 rounded-full border border-border-subtle text-xs text-text-tertiary"
          >
            <span
              className="inline-block w-2 h-2 rounded-full shrink-0"
              style={{ backgroundColor: s.color }}
            />
            {s.source}
          </div>
        ))}
      </div>

      {/* ── Bar Chart ──────────────────────────────────────────── */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="flex flex-col gap-3"
      >
        {sorted.map((source) => (
          <SourceRow
            key={source.source}
            source={source}
            maxGw={MAX_GW}
          />
        ))}
      </motion.div>

      {/* ── Total bar ──────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.4 }}
        className="mt-4 pt-4 border-t border-border-subtle"
      >
        <div
          className="grid items-center gap-3"
          style={{ gridTemplateColumns: '130px 1fr 110px' }}
        >
          <span className="text-text-primary text-sm font-semibold">Total</span>
          <div className="relative h-7 w-full rounded overflow-hidden bg-white/[0.06]">
            <div
              className="absolute left-0 top-0 bottom-0 w-full rounded"
              style={{ backgroundColor: 'rgba(255,255,255,0.04)', borderLeft: '2px solid rgba(255,255,255,0.2)' }}
            />
          </div>
          <div className="flex flex-col items-end gap-0.5">
            <span
              className="text-sm font-bold text-text-primary leading-none"
              style={{ fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)' }}
            >
              {totalInstalledCapacity.toLocaleString()} GW
            </span>
            <span
              className="text-xs text-text-tertiary"
              style={{ fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)' }}
            >
              100%
            </span>
          </div>
        </div>
      </motion.div>

      {/* ── Investor Note ───────────────────────────────────────── */}
      {coal && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="mt-5 p-3 rounded-lg border border-border-subtle flex items-start gap-3"
          style={{ backgroundColor: `${CHART_COLORS.gold}08` }}
        >
          <div
            className="w-1 self-stretch rounded-full shrink-0"
            style={{ backgroundColor: CHART_COLORS.gold }}
          />
          <div className="flex flex-col gap-1">
            <p className="text-text-secondary text-xs leading-relaxed">
              <span
                className="font-bold"
                style={{ color: CHART_COLORS.gold, fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)' }}
              >
                {coal.capacityGW} GW
              </span>{' '}
              of coal capacity represents grid-connected, transmission-ready infrastructure —
              permitted and operational.
            </p>
            <p className="text-text-tertiary text-xs leading-relaxed">
              Unlike greenfield projects facing 5-year interconnection queues, these sites have
              existing grid ties, switchgear, and substations — assets that cannot be replicated
              quickly at any price.
            </p>
          </div>
        </motion.div>
      )}
    </Card>
  );
}
