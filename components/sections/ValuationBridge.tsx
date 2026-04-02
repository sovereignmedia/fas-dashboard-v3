'use client';

import { motion } from 'framer-motion';
import { VALUATION_BRIDGE } from '@/data/tam';
import { CHART_COLORS } from '@/lib/colors';
import { item, viewport } from '@/lib/animations';
import Card from '@/components/ui/Card';

function fmtB(v: number): string {
  if (v >= 1_000) return `$${(v / 1_000).toFixed(1)}T`;
  return `$${v.toFixed(1)}B`;
}

export default function ValuationBridge() {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={viewport.section}
      variants={item}
    >
      <div className="overflow-x-auto rounded-xl border border-border-subtle">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border-subtle bg-bg-secondary">
              <th className="text-left px-4 py-3 text-[10px] uppercase tracking-wider text-text-tertiary font-medium">Penetration</th>
              <th className="text-right px-4 py-3 text-[10px] uppercase tracking-wider text-text-tertiary font-medium">Facilities</th>
              <th className="text-right px-4 py-3 text-[10px] uppercase tracking-wider text-text-tertiary font-medium">Revenue</th>
              <th className="text-right px-4 py-3 text-[10px] uppercase tracking-wider text-text-tertiary font-medium">EBITDA</th>
              <th className="text-right px-4 py-3 text-[10px] uppercase tracking-wider text-text-tertiary font-medium">EV @ 12x</th>
              <th className="text-right px-4 py-3 text-[10px] uppercase tracking-wider text-text-tertiary font-medium">EV @ 18x</th>
              <th className="text-right px-4 py-3 text-[10px] uppercase tracking-wider text-text-tertiary font-medium">EV @ 25x</th>
            </tr>
          </thead>
          <tbody>
            {VALUATION_BRIDGE.map((row) => {
              const is16 = row.facilities === 16;
              return (
                <tr
                  key={row.penetration}
                  className={`border-b border-border-subtle last:border-0 transition-colors ${
                    is16 ? 'bg-accent-gold/[0.04]' : 'hover:bg-bg-tertiary'
                  }`}
                >
                  <td className="px-4 py-3 font-mono text-text-primary">
                    {row.penetration < 1 ? `${row.penetration.toFixed(2)}%` : `${row.penetration.toFixed(1)}%`}
                    {is16 && (
                      <span className="ml-2 text-[10px] text-accent-gold font-sans">(10-yr plan)</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-text-primary">{row.facilities}</td>
                  <td className="px-4 py-3 text-right font-mono text-text-primary">{fmtB(row.annualRevenue)}</td>
                  <td className="px-4 py-3 text-right font-mono" style={{ color: CHART_COLORS.green }}>
                    {fmtB(row.annualEbitda)}
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-text-secondary">{fmtB(row.ev12x)}</td>
                  <td className="px-4 py-3 text-right font-mono" style={{ color: CHART_COLORS.gold }}>
                    {fmtB(row.ev18x)}
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-text-secondary">{fmtB(row.ev25x)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* IPO callout */}
      <Card hover={false} className="mt-4">
        <p className="text-sm text-text-secondary leading-relaxed">
          <span className="text-accent-gold font-medium">IPO context:</span>{' '}
          A $5B IPO enterprise value implies ~7.2x steady-state EBITDA from a single facility — conservative relative to comparable energy infrastructure assets. Even with a 50% technology discount, the implied multiple is ~14.5x, well within the range of energy growth companies.
        </p>
      </Card>
    </motion.div>
  );
}
