'use client';

import { motion } from 'framer-motion';

import { facilityEconomics } from '@/data/products';
import { CHART_COLORS } from '@/lib/colors';
import { formatCurrency, formatPercent } from '@/lib/formatters';
import Card from '@/components/ui/Card';

const opEx = facilityEconomics.grossProfit - facilityEconomics.ebitda;

const waterfallData = [
  { label: 'Revenue', invisible: 0, value: facilityEconomics.totalRevenue, type: 'total', fill: CHART_COLORS.blue },
  { label: 'Direct Costs', invisible: facilityEconomics.totalRevenue - facilityEconomics.totalDirectCost, value: facilityEconomics.totalDirectCost, type: 'subtract', fill: CHART_COLORS.red },
  { label: 'Gross Profit', invisible: 0, value: facilityEconomics.grossProfit, type: 'total', fill: CHART_COLORS.green },
  { label: 'Operating Costs', invisible: facilityEconomics.grossProfit - opEx, value: opEx, type: 'subtract', fill: CHART_COLORS.orange },
  { label: 'EBITDA', invisible: 0, value: facilityEconomics.ebitda, type: 'total', fill: CHART_COLORS.gold },
];

export default function WaterfallChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7, duration: 0.5 }}
      className="mb-10"
    >
      <Card>
        <p className="text-xs uppercase tracking-[0.15em] font-medium text-accent-gold mb-1">
          Margin Waterfall
        </p>
        <p className="text-sm text-text-secondary mb-6">
          Revenue to EBITDA bridge (single facility, steady state)
        </p>

        <div className="space-y-4">
          {waterfallData.map((step) => {
            const maxVal = facilityEconomics.totalRevenue;
            const barWidth = (step.value / maxVal) * 100;
            const offsetWidth = (step.invisible / maxVal) * 100;
            const isSubtract = step.type === 'subtract';

            return (
              <div key={step.label} className="group">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-medium text-text-primary">{step.label}</span>
                  <span className="text-sm font-mono tabular-nums text-text-secondary">
                    {isSubtract ? '−' : ''}{formatCurrency(step.value, true)}
                  </span>
                </div>
                <div className="relative w-full h-8 rounded-lg bg-bg-primary overflow-hidden">
                  <div className="absolute top-0 left-0 h-full" style={{ width: `${offsetWidth}%` }} />
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${barWidth}%` }}
                    transition={{ duration: 0.8, delay: 0.8, ease: 'easeOut' }}
                    className="absolute top-0 h-full rounded-lg"
                    style={{ left: `${offsetWidth}%`, backgroundColor: step.fill, opacity: isSubtract ? 0.7 : 0.9 }}
                  />
                  {isSubtract && (
                    <div
                      className="absolute top-0 h-full border-l border-dashed border-border-medium"
                      style={{ left: `${offsetWidth + barWidth}%` }}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary stats */}
        <div className="grid grid-cols-3 gap-6 mt-8 pt-6 border-t border-border-subtle">
          <div className="text-center">
            <p className="text-xs uppercase tracking-[0.15em] text-text-tertiary mb-1">Direct Cost Ratio</p>
            <p className="text-lg font-mono tabular-nums font-semibold text-text-primary">
              {formatPercent(facilityEconomics.totalDirectCost / facilityEconomics.totalRevenue)}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs uppercase tracking-[0.15em] text-text-tertiary mb-1">Gross Margin</p>
            <p className="text-lg font-mono tabular-nums font-semibold text-data-green">
              {formatPercent(facilityEconomics.grossMargin)}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs uppercase tracking-[0.15em] text-text-tertiary mb-1">EBITDA Margin</p>
            <p className="text-lg font-mono tabular-nums font-semibold text-accent-gold">
              {formatPercent(facilityEconomics.ebitdaMargin)}
            </p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
