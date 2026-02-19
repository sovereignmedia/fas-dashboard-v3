'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { container, item, viewport } from '@/lib/animations';
import SectionHeader from '@/components/ui/SectionHeader';
import {
  CAPEX_ITEMS,
  CAPEX_TOTAL,
  CAPEX_CATEGORY_LABELS,
  CAPEX_CATEGORY_COLORS,
  getCapExByCategory,
} from '@/data/capex';

function formatM(value: number): string {
  if (value >= 1_000_000_000) return `$${(value / 1_000_000_000).toFixed(2)}B`;
  return `$${(value / 1_000_000).toFixed(1)}M`;
}

type ViewMode = 'chart' | 'table';

export default function CapExWaterfall() {
  const [view, setView] = useState<ViewMode>('chart');
  const categories = getCapExByCategory();
  const categoryKeys = Object.keys(categories) as Array<keyof typeof CAPEX_CATEGORY_LABELS>;

  return (
    <section className="mb-16">
      <SectionHeader
        overline="Capital Expenditure"
        title="CapEx Breakdown"
        subtitle={`Detailed $${(CAPEX_TOTAL / 1_000_000).toFixed(0)}M facility capital expenditure across engineering, long-lead procurement, construction, and project management.`}
      />

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={viewport.section}
        className="space-y-6"
      >
        {/* Toggle */}
        <motion.div variants={item} className="flex items-center gap-2">
          {(['chart', 'table'] as ViewMode[]).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className="px-4 py-2 rounded-lg text-xs font-medium uppercase tracking-wider transition-all duration-200"
              style={{
                background: view === v ? 'rgba(212,168,82,0.15)' : 'rgba(255,255,255,0.03)',
                color: view === v ? '#d4a852' : 'var(--text-tertiary)',
                border: `1px solid ${view === v ? 'rgba(212,168,82,0.3)' : 'rgba(255,255,255,0.06)'}`,
              }}
            >
              {v === 'chart' ? 'Category View' : 'Line Items'}
            </button>
          ))}
          <span className="ml-auto text-sm text-text-secondary">
            Total: <span className="text-text-primary font-medium">{formatM(CAPEX_TOTAL)}</span>
          </span>
        </motion.div>

        <AnimatePresence mode="wait">
          {view === 'chart' ? (
            <motion.div
              key="chart"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div
                className="relative overflow-hidden rounded-2xl backdrop-blur-sm p-8"
                style={{ background: 'var(--card-gradient)', boxShadow: 'var(--shadow-card)' }}
              >
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent-gold/20 to-transparent" />

                <div className="space-y-6">
                  {categoryKeys.map((catKey) => {
                    const catAgg = categories[catKey];
                    const catTotal = catAgg.totalCost;
                    const pct = (catTotal / CAPEX_TOTAL) * 100;
                    const color = CAPEX_CATEGORY_COLORS[catKey] || '#888';
                    const catLineItems = CAPEX_ITEMS.filter((i) => i.category === catKey);

                    return (
                      <div key={catKey}>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-sm" style={{ background: color }} />
                            <span className="text-sm font-medium text-text-primary">
                              {CAPEX_CATEGORY_LABELS[catKey]}
                            </span>
                            <span className="text-xs text-text-tertiary">
                              ({catAgg.items} items)
                            </span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-sm text-text-secondary">{formatM(catTotal)}</span>
                            <span
                              className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium"
                              style={{ background: `${color}18`, color }}
                            >
                              {pct.toFixed(1)}%
                            </span>
                          </div>
                        </div>

                        <div className="relative h-8 rounded-lg overflow-hidden" style={{ background: 'rgba(255,255,255,0.03)' }}>
                          <motion.div
                            className="absolute inset-y-0 left-0 rounded-lg"
                            style={{ background: `${color}60` }}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${pct}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, ease: 'easeOut' }}
                          />
                        </div>

                        {/* Sub-items */}
                        <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-1.5">
                          {catLineItems.slice(0, 8).map((ci) => (
                            <div key={ci.id} className="flex items-center justify-between px-2 py-1 rounded text-[11px]" style={{ background: 'rgba(255,255,255,0.02)' }}>
                              <span className="text-text-tertiary truncate mr-2">{ci.name}</span>
                              <span className="text-text-secondary shrink-0">{formatM(ci.totalCost)}</span>
                            </div>
                          ))}
                          {catLineItems.length > 8 && (
                            <div className="flex items-center px-2 py-1 text-[11px] text-text-tertiary">
                              +{catLineItems.length - 8} more
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="table"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div
                className="relative overflow-hidden rounded-2xl backdrop-blur-sm"
                style={{ background: 'var(--card-gradient)', boxShadow: 'var(--shadow-card)' }}
              >
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent-gold/20 to-transparent" />
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/5">
                        <th className="text-left py-3 px-6 text-[11px] uppercase tracking-[0.15em] font-medium text-text-tertiary">Line Item</th>
                        <th className="text-left py-3 px-6 text-[11px] uppercase tracking-[0.15em] font-medium text-text-tertiary">Category</th>
                        <th className="text-right py-3 px-6 text-[11px] uppercase tracking-[0.15em] font-medium text-text-tertiary">Base Cost</th>
                        <th className="text-right py-3 px-6 text-[11px] uppercase tracking-[0.15em] font-medium text-text-tertiary">Contingency</th>
                        <th className="text-right py-3 px-6 text-[11px] uppercase tracking-[0.15em] font-medium text-text-tertiary">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {CAPEX_ITEMS.map((ci, idx) => {
                        const color = CAPEX_CATEGORY_COLORS[ci.category as keyof typeof CAPEX_CATEGORY_COLORS] || '#888';
                        return (
                          <tr
                            key={ci.id}
                            className={idx < CAPEX_ITEMS.length - 1 ? 'border-b border-white/5' : ''}
                          >
                            <td className="py-2.5 px-6 text-xs text-text-primary">{ci.name}</td>
                            <td className="py-2.5 px-6">
                              <span
                                className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium"
                                style={{ background: `${color}15`, color }}
                              >
                                {CAPEX_CATEGORY_LABELS[ci.category as keyof typeof CAPEX_CATEGORY_LABELS]}
                              </span>
                            </td>
                            <td className="py-2.5 px-6 text-xs text-text-secondary text-right font-mono">{formatM(ci.baseCost)}</td>
                            <td className="py-2.5 px-6 text-xs text-text-tertiary text-right font-mono">{(ci.contingencyPct * 100).toFixed(0)}%</td>
                            <td className="py-2.5 px-6 text-xs text-text-primary text-right font-mono font-medium">{formatM(ci.totalCost)}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                    <tfoot>
                      <tr className="border-t border-white/10">
                        <td colSpan={4} className="py-3 px-6 text-sm font-medium text-text-primary">Total Capital Expenditure</td>
                        <td className="py-3 px-6 text-sm font-medium text-accent-gold text-right font-mono">{formatM(CAPEX_TOTAL)}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
