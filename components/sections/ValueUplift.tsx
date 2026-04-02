'use client';

import { motion } from 'framer-motion';
import { COUNTRY_YIELD_PROFILES, VALUE_UPLIFT } from '@/data/tam';
import { CHART_COLORS } from '@/lib/colors';
import { container, item, viewport } from '@/lib/animations';
import Card from '@/components/ui/Card';

const sorted = [...COUNTRY_YIELD_PROFILES].sort((a, b) => b.valueUplift - a.valueUplift);
const maxRevPerTon = Math.max(...COUNTRY_YIELD_PROFILES.map((c) => c.adjRevenuePerTon));

export default function ValueUplift() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={viewport.section}
    >
      {/* Summary cards */}
      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <SummaryCard
          label="Current Coal Value"
          value={`$${VALUE_UPLIFT.totalAnnualCoalValue.toFixed(0)}B`}
          sub="Combustion pricing"
          color="var(--text-secondary)"
        />
        <SummaryCard
          label="FASForm Processed Value"
          value="$2.1T"
          sub="Yield-adjusted"
          color={CHART_COLORS.gold}
        />
        <SummaryCard
          label="Annual Found Value"
          value={`$${(VALUE_UPLIFT.annualFoundValue / 1_000).toFixed(1)}T`}
          sub={`${VALUE_UPLIFT.weightedAverageUplift}x weighted avg uplift`}
          color={CHART_COLORS.green}
        />
      </motion.div>

      {/* Country bars */}
      <motion.div variants={item}>
        <Card hover={false}>
          <p className="text-[10px] uppercase tracking-[0.2em] text-text-tertiary mb-6">
            Value Uplift by Country — Coal Price vs FASForm Revenue per Ton
          </p>
          <div className="space-y-4">
            {sorted.map((country) => {
              const coalPct = (country.coalPrice / maxRevPerTon) * 100;
              const revPct = (country.adjRevenuePerTon / maxRevPerTon) * 100;
              const isNegative = country.adjEbitdaPerTon < 0;

              return (
                <div key={country.code}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-text-primary font-medium">{country.name}</span>
                    <div className="flex items-center gap-3 text-xs">
                      <span className="text-text-tertiary">${country.coalPrice}/t</span>
                      <span className="text-text-tertiary">→</span>
                      <span style={{ color: isNegative ? CHART_COLORS.red : CHART_COLORS.gold }}>
                        ${country.adjRevenuePerTon}/t
                      </span>
                      <span
                        className="font-mono font-bold text-sm ml-1"
                        style={{ color: isNegative ? CHART_COLORS.red : CHART_COLORS.green }}
                      >
                        {country.valueUplift}x
                      </span>
                    </div>
                  </div>

                  <div className="relative h-5 rounded bg-bg-tertiary overflow-hidden">
                    {/* Coal price bar */}
                    <motion.div
                      className="absolute inset-y-0 left-0 rounded"
                      style={{ background: 'rgba(255,255,255,0.08)', width: `${coalPct}%` }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${coalPct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6 }}
                    />
                    {/* FASForm revenue bar */}
                    <motion.div
                      className="absolute inset-y-0 left-0 rounded"
                      style={{
                        background: isNegative
                          ? `${CHART_COLORS.red}40`
                          : `${CHART_COLORS.gold}40`,
                        width: `${revPct}%`,
                      }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${revPct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.1 }}
                    />
                  </div>

                  {isNegative && (
                    <p className="text-[10px] text-text-tertiary mt-1 italic">
                      EBITDA negative — lignite economics require pre-drying infrastructure
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex items-center gap-6 mt-6 pt-4 border-t border-border-subtle text-[10px] text-text-tertiary">
            <span className="flex items-center gap-2">
              <span className="inline-block w-3 h-2 rounded" style={{ background: 'rgba(255,255,255,0.08)' }} /> Coal price
            </span>
            <span className="flex items-center gap-2">
              <span className="inline-block w-3 h-2 rounded" style={{ background: `${CHART_COLORS.gold}40` }} /> FASForm rev/ton
            </span>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}

function SummaryCard({ label, value, sub, color }: { label: string; value: string; sub: string; color: string }) {
  return (
    <Card hover={false}>
      <p className="text-[10px] uppercase tracking-[0.2em] text-text-tertiary mb-2">{label}</p>
      <p className="font-mono text-3xl font-extralight tabular-nums" style={{ color, textShadow: `0 0 20px ${color}40` }}>
        {value}
      </p>
      <p className="text-xs text-text-secondary mt-1">{sub}</p>
    </Card>
  );
}
