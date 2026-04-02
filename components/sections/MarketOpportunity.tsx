'use client';

import { motion } from 'framer-motion';
import { container, item, viewport } from '@/lib/animations';
import SectionHeader from '@/components/ui/SectionHeader';
import { MARKETS, TOTAL_ADDRESSABLE_MARKET, TOTAL_PROJECTED_MARKET } from '@/data/markets';

function formatB(value: number): string {
  if (value >= 1000) return `$${(value / 1000).toFixed(1)}T`;
  return `$${value.toFixed(0)}B`;
}

export default function MarketOpportunity() {
  const maxProjected = Math.max(...MARKETS.map((m) => m.projectedValue));

  return (
    <section className="mb-16">
      <SectionHeader
        overline="Product Markets"
        title="Commodity Markets Addressed"
        subtitle="Frontieras' products address multiple large-scale commodity markets simultaneously — a key differentiator from single-product competitors."
      />

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={viewport.section}
        className="space-y-8"
      >
        {/* Summary Cards */}
        <motion.div variants={item} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: 'Current TAM', value: formatB(TOTAL_ADDRESSABLE_MARKET), sub: 'Combined market size today' },
            { label: 'Projected TAM', value: formatB(TOTAL_PROJECTED_MARKET), sub: 'Combined projected size' },
            { label: 'Markets Addressed', value: `${MARKETS.length}`, sub: 'Simultaneous market exposure' },
          ].map((card) => (
            <div
              key={card.label}
              className="relative overflow-hidden rounded-2xl backdrop-blur-sm p-6 text-center"
              style={{ background: 'var(--card-gradient)', boxShadow: 'var(--shadow-card)' }}
            >
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent-gold/20 to-transparent" />
              <p className="text-[10px] uppercase tracking-[0.15em] font-medium text-text-tertiary mb-2">{card.label}</p>
              <p className="text-3xl font-light text-text-primary">{card.value}</p>
              <p className="text-xs text-text-secondary mt-1">{card.sub}</p>
            </div>
          ))}
        </motion.div>

        {/* Market Bars */}
        <motion.div variants={item}>
          <div
            className="relative overflow-hidden rounded-2xl backdrop-blur-sm p-8"
            style={{ background: 'var(--card-gradient)', boxShadow: 'var(--shadow-card)' }}
          >
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent-gold/20 to-transparent" />
            <div className="space-y-5">
              {MARKETS.map((market) => {
                const currentPct = (market.currentValue / maxProjected) * 100;
                const projectedPct = (market.projectedValue / maxProjected) * 100;

                return (
                  <div key={market.id}>
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <span className="text-sm font-medium text-text-primary">{market.name}</span>
                        <span className="text-xs text-text-tertiary ml-2">→ {market.frontierasProduct}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-text-secondary">
                          {formatB(market.currentValue)} → {formatB(market.projectedValue)}
                        </span>
                        <span
                          className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium"
                          style={{ background: `${market.color}18`, color: market.color }}
                        >
                          {(market.cagr * 100).toFixed(1)}% CAGR
                        </span>
                      </div>
                    </div>

                    {/* Dual bar */}
                    <div className="relative h-6 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.03)' }}>
                      {/* Projected (background) */}
                      <motion.div
                        className="absolute inset-y-0 left-0 rounded-full"
                        style={{ background: `${market.color}15`, width: `${projectedPct}%` }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${projectedPct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
                      />
                      {/* Current (foreground) */}
                      <motion.div
                        className="absolute inset-y-0 left-0 rounded-full"
                        style={{ background: `${market.color}50`, width: `${currentPct}%` }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${currentPct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                      />
                    </div>

                    <div className="flex items-center justify-between mt-1">
                      <span className="text-[10px] text-text-tertiary">
                        {market.source} • {market.currentYear}–{market.projectedYear}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
