'use client';

import { motion } from 'framer-motion';
import { COUNTRY_YIELD_PROFILES } from '@/data/tam';
import { CHART_COLORS } from '@/lib/colors';
import { item, viewport } from '@/lib/animations';

const sorted = [...COUNTRY_YIELD_PROFILES].sort((a, b) => b.annualRevenue - a.annualRevenue);

function yieldColor(factor: number): string {
  if (factor >= 0.9) return CHART_COLORS.green;
  if (factor >= 0.5) return CHART_COLORS.gold;
  return CHART_COLORS.red;
}

export default function CountryEconomicsTable() {
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
              <th className="text-left px-4 py-3 text-[10px] uppercase tracking-wider text-text-tertiary font-medium">Country</th>
              <th className="text-left px-4 py-3 text-[10px] uppercase tracking-wider text-text-tertiary font-medium">Coal Type</th>
              <th className="text-right px-4 py-3 text-[10px] uppercase tracking-wider text-text-tertiary font-medium">Yield</th>
              <th className="text-right px-4 py-3 text-[10px] uppercase tracking-wider text-text-tertiary font-medium">Rev/Ton</th>
              <th className="text-right px-4 py-3 text-[10px] uppercase tracking-wider text-text-tertiary font-medium">EBITDA/Ton</th>
              <th className="text-right px-4 py-3 text-[10px] uppercase tracking-wider text-text-tertiary font-medium">Margin</th>
              <th className="text-right px-4 py-3 text-[10px] uppercase tracking-wider text-text-tertiary font-medium">Uplift</th>
              <th className="text-right px-4 py-3 text-[10px] uppercase tracking-wider text-text-tertiary font-medium">Annual Rev</th>
              <th className="text-right px-4 py-3 text-[10px] uppercase tracking-wider text-text-tertiary font-medium">Facilities</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((c) => {
              const isNegative = c.adjEbitdaPerTon < 0;
              return (
                <tr key={c.code} className="border-b border-border-subtle last:border-0 hover:bg-bg-tertiary transition-colors">
                  <td className="px-4 py-3 text-text-primary font-medium">{c.name}</td>
                  <td className="px-4 py-3 text-text-secondary text-xs">{c.coalType}</td>
                  <td className="px-4 py-3 text-right font-mono" style={{ color: yieldColor(c.yieldFactor) }}>
                    {(c.yieldFactor * 100).toFixed(1)}%
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-text-primary">${c.adjRevenuePerTon}</td>
                  <td className="px-4 py-3 text-right font-mono" style={{ color: isNegative ? CHART_COLORS.red : CHART_COLORS.green }}>
                    {isNegative ? `−$${Math.abs(c.adjEbitdaPerTon)}` : `$${c.adjEbitdaPerTon}`}
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-text-secondary">
                    {isNegative ? 'N/A' : `${(c.ebitdaMargin * 100).toFixed(1)}%`}
                  </td>
                  <td className="px-4 py-3 text-right font-mono font-bold" style={{ color: isNegative ? CHART_COLORS.red : CHART_COLORS.gold }}>
                    {c.valueUplift}x
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-text-primary">
                    {c.annualRevenue >= 1000 ? `$${(c.annualRevenue / 1000).toFixed(1)}T` : `$${c.annualRevenue.toFixed(1)}B`}
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-text-secondary">
                    {c.facilitiesSupported.toLocaleString()}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="text-[10px] text-text-tertiary mt-3">
        Yield factors are directional estimates based on coal chemistry fundamentals. CTO validation required before external distribution.
      </p>
    </motion.div>
  );
}
