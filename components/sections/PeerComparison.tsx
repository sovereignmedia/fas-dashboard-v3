'use client';

import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

import { peerQuotes, type PeerQuote } from '@/data/market-context';
import { container, item, viewport } from '@/lib/animations';
import { CHART_COLORS } from '@/lib/colors';
import Card from '@/components/ui/Card';
import SectionHeader from '@/components/ui/SectionHeader';

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatMarketCap(value: number): string {
  if (value >= 1_000_000_000_000) {
    return `$${(value / 1_000_000_000_000).toFixed(1)}T`;
  }
  if (value >= 1_000_000_000) {
    return `$${(value / 1_000_000_000).toFixed(1)}B`;
  }
  if (value >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(1)}M`;
  }
  return `$${value.toLocaleString()}`;
}

function formatPE(pe: number): string {
  if (pe < 0) return 'N/A';
  return pe.toFixed(1) + 'x';
}

function formatPrice(price: number): string {
  return `$${price.toFixed(2)}`;
}

// ─── 52-Week Range Bar ────────────────────────────────────────────────────────

function RangeBar({ price, yearLow, yearHigh }: { price: number; yearLow: number; yearHigh: number }) {
  const range = yearHigh - yearLow;
  const positionPct = range > 0 ? ((price - yearLow) / range) * 100 : 50;
  const clampedPct = Math.min(100, Math.max(0, positionPct));

  return (
    <div className="flex flex-col gap-1 min-w-[80px]">
      {/* Bar track */}
      <div className="relative h-1.5 rounded-full bg-bg-primary/60 border border-border-subtle overflow-visible">
        {/* Filled portion (yearLow to current) */}
        <div
          className="absolute left-0 top-0 h-full rounded-full"
          style={{
            width: `${clampedPct}%`,
            background: `linear-gradient(90deg, ${CHART_COLORS.blueDim}, ${CHART_COLORS.blue})`,
          }}
        />
        {/* Current price dot */}
        <div
          className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full border-2 border-bg-primary z-10"
          style={{
            left: `calc(${clampedPct}% - 5px)`,
            backgroundColor: CHART_COLORS.blue,
          }}
        />
      </div>
      {/* Low / High labels */}
      <div className="flex justify-between">
        <span className="text-[9px] font-mono text-text-tertiary tabular-nums">
          ${yearLow.toFixed(0)}
        </span>
        <span className="text-[9px] font-mono text-text-tertiary tabular-nums">
          ${yearHigh.toFixed(0)}
        </span>
      </div>
    </div>
  );
}

// ─── Table Row ────────────────────────────────────────────────────────────────

function PeerRow({ quote, index }: { quote: PeerQuote; index: number }) {
  const isNegative = quote.changePct < 0;
  const changeColor = isNegative ? CHART_COLORS.red : CHART_COLORS.green;

  return (
    <motion.tr
      variants={item}
      className={`border-b border-border-subtle/50 transition-colors duration-200 hover:bg-white/[0.02] ${
        index % 2 === 0 ? '' : 'bg-white/[0.01]'
      }`}
    >
      {/* Company */}
      <td className="py-3 pl-6 pr-4 whitespace-nowrap">
        <div className="flex flex-col">
          <span className="text-sm font-medium text-text-primary">{quote.name}</span>
          <span className="text-[10px] text-text-tertiary mt-0.5">{quote.sector}</span>
        </div>
      </td>

      {/* Ticker */}
      <td className="py-3 px-4 whitespace-nowrap">
        <span
          className="font-mono text-sm font-semibold tabular-nums"
          style={{ color: CHART_COLORS.blue }}
        >
          {quote.symbol}
        </span>
      </td>

      {/* Price */}
      <td className="py-3 px-4 whitespace-nowrap">
        <span className="font-mono text-sm text-text-primary tabular-nums">
          {formatPrice(quote.price)}
        </span>
      </td>

      {/* Change % */}
      <td className="py-3 px-4 whitespace-nowrap">
        <span
          className="font-mono text-sm font-semibold tabular-nums"
          style={{ color: changeColor }}
        >
          {isNegative ? '' : '+'}{quote.changePct.toFixed(2)}%
        </span>
      </td>

      {/* Market Cap */}
      <td className="py-3 px-4 whitespace-nowrap">
        <span className="font-mono text-sm text-text-secondary tabular-nums">
          {formatMarketCap(quote.marketCap)}
        </span>
      </td>

      {/* P/E */}
      <td className="py-3 px-4 whitespace-nowrap">
        <span
          className="font-mono text-sm tabular-nums"
          style={{ color: quote.pe < 0 ? CHART_COLORS.goldDim : 'inherit' }}
        >
          {formatPE(quote.pe)}
        </span>
      </td>

      {/* 52W Range */}
      <td className="py-3 px-4">
        <RangeBar price={quote.price} yearLow={quote.yearLow} yearHigh={quote.yearHigh} />
      </td>
    </motion.tr>
  );
}

// ─── Column Header ────────────────────────────────────────────────────────────

function ColHeader({ children, align = 'left' }: { children: ReactNode; align?: 'left' | 'right' }) {
  return (
    <th
      className={`pb-3 text-[10px] uppercase tracking-[0.2em] font-semibold text-text-tertiary whitespace-nowrap ${
        align === 'right' ? 'text-right pr-6' : 'text-left pl-4 first:pl-6'
      }`}
    >
      {children}
    </th>
  );
}

// ─── Component ───────────────────────────────────────────────────────────────

// Sort by market cap descending
const sortedPeers = [...peerQuotes].sort((a, b) => b.marketCap - a.marketCap);

export default function PeerComparison() {
  return (
    <section className="mt-12">
      <SectionHeader
        overline="Sector Comps"
        title="Energy & Infrastructure Peers"
        subtitle="Public market comparables across power generation, grid equipment, nuclear, and data center infrastructure."
      />

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={viewport.section}
      >
        <motion.div variants={item}>
          <Card hover={false} className="!p-0 overflow-hidden">
            {/* Horizontal scroll wrapper */}
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px]">
                <thead>
                  <tr className="border-b border-border-medium">
                    <ColHeader>Company</ColHeader>
                    <ColHeader>Ticker</ColHeader>
                    <ColHeader>Price</ColHeader>
                    <ColHeader>Chg %</ColHeader>
                    <ColHeader>Mkt Cap</ColHeader>
                    <ColHeader>P/E</ColHeader>
                    <ColHeader>52-Week Range</ColHeader>
                  </tr>
                </thead>
                <motion.tbody variants={container}>
                  {sortedPeers.map((quote, index) => (
                    <PeerRow key={quote.symbol} quote={quote} index={index} />
                  ))}
                </motion.tbody>
              </table>
            </div>

            {/* Footer */}
            <div className="px-6 py-3 border-t border-border-subtle">
              <p className="text-[10px] text-text-tertiary">
                Market data as of March 3, 2026. P/E shown as trailing twelve months; N/A indicates negative earnings.
                52-week range dot indicates current price relative to annual high/low.
              </p>
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </section>
  );
}
