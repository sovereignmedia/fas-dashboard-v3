'use client';

import { motion } from 'framer-motion';
import { container, item, viewport } from '@/lib/animations';
import SectionHeader from '@/components/ui/SectionHeader';
import { MARKET_SEGMENTS } from '@/data/competitors';

export default function CompetitorTable() {
  return (
    <section className="mb-16">
      <SectionHeader
        overline="Competitive Landscape"
        title="Market Competitors"
        subtitle="Frontieras competes across 8 market segments against established incumbents. Competitive advantage comes from multi-product integration and cost structure."
      />

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={viewport.section}
        className="space-y-4"
      >
        {/* Desktop Table */}
        <motion.div variants={item} className="hidden lg:block">
          <div
            className="relative overflow-hidden rounded-2xl backdrop-blur-sm"
            style={{ background: 'var(--card-gradient)', boxShadow: 'var(--shadow-card)' }}
          >
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent-gold/20 to-transparent" />
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/5">
                    <th className="text-left py-4 px-6 text-[11px] uppercase tracking-[0.15em] font-medium text-text-tertiary">Market</th>
                    <th className="text-left py-4 px-6 text-[11px] uppercase tracking-[0.15em] font-medium text-text-tertiary">Direct Competitors</th>
                    <th className="text-left py-4 px-6 text-[11px] uppercase tracking-[0.15em] font-medium text-text-tertiary">Indirect Competitors</th>
                    <th className="text-left py-4 px-6 text-[11px] uppercase tracking-[0.15em] font-medium text-text-tertiary">Competitive Landscape</th>
                  </tr>
                </thead>
                <tbody>
                  {MARKET_SEGMENTS.map((seg, idx) => (
                    <tr
                      key={seg.id}
                      className={idx < MARKET_SEGMENTS.length - 1 ? 'border-b border-white/5' : ''}
                    >
                      <td className="py-4 px-6">
                        <span className="text-sm font-medium text-text-primary">{seg.market}</span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex flex-wrap gap-2">
                          {seg.directCompetitors.map((c) => (
                            <span
                              key={c.name}
                              className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs"
                              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
                            >
                              <span className="text-text-primary font-medium">{c.name}</span>
                              {c.marketCap && (
                                <span className="text-text-tertiary">{c.marketCap}</span>
                              )}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-xs text-text-secondary">{seg.indirectCompetitors}</span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-xs text-text-tertiary leading-relaxed">{seg.competitiveConcentration}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        {/* Mobile Cards */}
        <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
          {MARKET_SEGMENTS.map((seg) => (
            <motion.div key={seg.id} variants={item}>
              <div
                className="relative overflow-hidden rounded-2xl backdrop-blur-sm p-6"
                style={{ background: 'var(--card-gradient)', boxShadow: 'var(--shadow-card)' }}
              >
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent-gold/20 to-transparent" />
                <h4 className="text-sm font-semibold text-text-primary mb-3">{seg.market}</h4>

                <div className="space-y-3">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-text-tertiary mb-1.5">Direct Competitors</p>
                    <div className="flex flex-wrap gap-1.5">
                      {seg.directCompetitors.map((c) => (
                        <span
                          key={c.name}
                          className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px]"
                          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
                        >
                          <span className="text-text-primary">{c.name}</span>
                          {c.marketCap && <span className="text-text-tertiary">{c.marketCap}</span>}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-text-tertiary mb-1">Indirect</p>
                    <p className="text-xs text-text-secondary">{seg.indirectCompetitors}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
