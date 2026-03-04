'use client';

import type { ReactNode } from 'react';
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Info, ArrowUpDown, RefreshCw, Wifi, WifiOff } from 'lucide-react';

import { type PeerQuote } from '@/data/market-context';
import { useMarketQuotes, type EnrichedPeerQuote } from '@/hooks/useMarketQuotes';
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

function formatTimestamp(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZoneName: 'short',
  });
}

// ─── P/E color logic ─────────────────────────────────────────────────────────

function getPEColor(pe: number): string {
  if (pe < 0) return CHART_COLORS.goldDim;     // Negative earnings — muted
  if (pe > 100) return CHART_COLORS.red;        // Extreme valuation
  if (pe > 50) return CHART_COLORS.orange;      // High valuation
  return 'inherit';                              // Normal range
}

// ─── Sort Configuration ──────────────────────────────────────────────────────

type SortKey = 'name' | 'symbol' | 'price' | 'changePct' | 'marketCap' | 'pe';
type SortDirection = 'asc' | 'desc';

const sortFunctions: Record<SortKey, (a: PeerQuote, b: PeerQuote) => number> = {
  name: (a, b) => a.name.localeCompare(b.name),
  symbol: (a, b) => a.symbol.localeCompare(b.symbol),
  price: (a, b) => a.price - b.price,
  changePct: (a, b) => a.changePct - b.changePct,
  marketCap: (a, b) => a.marketCap - b.marketCap,
  pe: (a, b) => {
    // Push negative P/E to the bottom always
    if (a.pe < 0 && b.pe < 0) return 0;
    if (a.pe < 0) return 1;
    if (b.pe < 0) return -1;
    return a.pe - b.pe;
  },
};

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

// ─── Relevance Tooltip ───────────────────────────────────────────────────────

function RelevanceTooltip({ text }: { text: string }) {
  return (
    <span className="group/tip relative inline-flex items-center ml-1.5">
      <Info size={11} className="text-text-tertiary/60 cursor-help transition-colors group-hover/tip:text-accent-gold/80" />
      <span className="absolute left-full ml-2 top-1/2 -translate-y-1/2 z-50 invisible opacity-0 group-hover/tip:visible group-hover/tip:opacity-100 transition-all duration-200 whitespace-nowrap text-[10px] text-text-secondary bg-bg-primary/95 border border-border-subtle rounded-lg px-3 py-2 shadow-lg backdrop-blur-sm">
        {text}
      </span>
    </span>
  );
}

// ─── Table Row ────────────────────────────────────────────────────────────────

function PeerRow({ quote, index }: { quote: EnrichedPeerQuote; index: number }) {
  const isNegative = quote.changePct < 0;
  const changeColor = isNegative ? CHART_COLORS.red : CHART_COLORS.green;
  const peColor = getPEColor(quote.pe);

  return (
    <motion.tr
      variants={item}
      className={`border-b border-border-subtle/50 transition-colors duration-200 hover:bg-white/[0.02] ${
        index % 2 === 0 ? '' : 'bg-white/[0.01]'
      }`}
    >
      {/* Company */}
      <td className="py-3 pl-6 pr-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex flex-col">
            <span className="text-sm font-medium text-text-primary">{quote.name}</span>
            <span className="text-[10px] text-text-tertiary mt-0.5">{quote.sector}</span>
          </div>
          <RelevanceTooltip text={quote.relevance} />
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

      {/* P/E with conditional coloring */}
      <td className="py-3 px-4 whitespace-nowrap">
        <span
          className="font-mono text-sm tabular-nums"
          style={{ color: peColor }}
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

// ─── Sortable Column Header ──────────────────────────────────────────────────

function ColHeader({
  children,
  sortKey,
  currentSort,
  currentDirection,
  onSort,
  align = 'left',
}: {
  children: ReactNode;
  sortKey?: SortKey;
  currentSort: SortKey;
  currentDirection: SortDirection;
  onSort: (key: SortKey) => void;
  align?: 'left' | 'right';
}) {
  const isSorted = sortKey && sortKey === currentSort;
  const canSort = !!sortKey;

  return (
    <th
      className={`pb-3 text-[10px] uppercase tracking-[0.2em] font-semibold text-text-tertiary whitespace-nowrap ${
        align === 'right' ? 'text-right pr-6' : 'text-left pl-4 first:pl-6'
      } ${canSort ? 'cursor-pointer select-none transition-colors hover:text-text-secondary' : ''}`}
      onClick={canSort && sortKey ? () => onSort(sortKey) : undefined}
    >
      <span className="inline-flex items-center gap-1">
        {children}
        {canSort && (
          <ArrowUpDown
            size={9}
            className={`transition-opacity ${isSorted ? 'opacity-80' : 'opacity-30'}`}
            style={isSorted ? { color: CHART_COLORS.gold } : undefined}
          />
        )}
        {isSorted && (
          <span className="text-[8px]" style={{ color: CHART_COLORS.gold }}>
            {currentDirection === 'asc' ? '↑' : '↓'}
          </span>
        )}
      </span>
    </th>
  );
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function PeerComparison() {
  const { quotes, lastUpdated, isLive, isLoading, refresh } = useMarketQuotes();
  const [sortKey, setSortKey] = useState<SortKey>('marketCap');
  const [sortDir, setSortDir] = useState<SortDirection>('desc');

  const handleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('desc');
    }
  };

  const sortedPeers = useMemo(() => {
    const sorted = [...quotes].sort(sortFunctions[sortKey]);
    return sortDir === 'desc' ? sorted.reverse() : sorted;
  }, [quotes, sortKey, sortDir]);

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
                    <ColHeader sortKey="name" currentSort={sortKey} currentDirection={sortDir} onSort={handleSort}>Company</ColHeader>
                    <ColHeader sortKey="symbol" currentSort={sortKey} currentDirection={sortDir} onSort={handleSort}>Ticker</ColHeader>
                    <ColHeader sortKey="price" currentSort={sortKey} currentDirection={sortDir} onSort={handleSort}>Price</ColHeader>
                    <ColHeader sortKey="changePct" currentSort={sortKey} currentDirection={sortDir} onSort={handleSort}>Chg %</ColHeader>
                    <ColHeader sortKey="marketCap" currentSort={sortKey} currentDirection={sortDir} onSort={handleSort}>Mkt Cap</ColHeader>
                    <ColHeader sortKey="pe" currentSort={sortKey} currentDirection={sortDir} onSort={handleSort}>P/E</ColHeader>
                    <ColHeader currentSort={sortKey} currentDirection={sortDir} onSort={handleSort}>52-Week Range</ColHeader>
                  </tr>
                </thead>
                <motion.tbody variants={container}>
                  {sortedPeers.map((quote, index) => (
                    <PeerRow key={quote.symbol} quote={quote} index={index} />
                  ))}
                </motion.tbody>
              </table>
            </div>

            {/* Footer — live status + last updated */}
            <div className="px-6 py-3 border-t border-border-subtle flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* Live/static indicator */}
                <span className="inline-flex items-center gap-1.5">
                  {isLive ? (
                    <>
                      <Wifi size={10} style={{ color: CHART_COLORS.green }} />
                      <span className="text-[10px] font-semibold uppercase tracking-[0.15em]" style={{ color: CHART_COLORS.green }}>
                        Live
                      </span>
                    </>
                  ) : (
                    <>
                      <WifiOff size={10} className="text-text-tertiary" />
                      <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-text-tertiary">
                        Static
                      </span>
                    </>
                  )}
                </span>

                {/* Refresh button */}
                <button
                  onClick={refresh}
                  className="inline-flex items-center gap-1 text-[10px] text-text-tertiary hover:text-text-secondary transition-colors"
                  disabled={isLoading}
                >
                  <RefreshCw size={10} className={isLoading ? 'animate-spin' : ''} />
                  Refresh
                </button>
              </div>

              <div className="flex flex-col items-end gap-0.5">
                {lastUpdated && (
                  <p className="text-[10px] text-text-tertiary">
                    Updated {formatTimestamp(lastUpdated)}
                  </p>
                )}
                <p className="text-[10px] text-text-tertiary">
                  P/E shown as trailing twelve months; N/A indicates negative earnings.
                  Click column headers to sort.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </section>
  );
}
