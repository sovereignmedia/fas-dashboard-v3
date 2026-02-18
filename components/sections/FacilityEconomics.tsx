'use client';

import { motion } from 'framer-motion';

import { facilityEconomics } from '@/data/products';
import { CHART_COLORS } from '@/lib/colors';
import { formatCurrency, formatPercent, formatNumber } from '@/lib/formatters';
import Card from '@/components/ui/Card';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const keyMetrics = [
  { label: 'Total Revenue', value: formatCurrency(facilityEconomics.totalRevenue, true), color: CHART_COLORS.blue },
  { label: 'Gross Margin', value: formatPercent(facilityEconomics.grossMargin), color: CHART_COLORS.green },
  { label: 'EBITDA', value: formatCurrency(facilityEconomics.ebitda, true), color: CHART_COLORS.gold },
  {
    label: 'Coal Cost / Day',
    value: formatCurrency(facilityEconomics.coalThroughput * facilityEconomics.coalCostPerTon),
    subtitle: `${formatNumber(facilityEconomics.coalThroughput)} t/day × $${facilityEconomics.coalCostPerTon}/t`,
    color: CHART_COLORS.purple,
  },
];

export default function FacilityEconomicsSection() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-10"
    >
      {keyMetrics.map((metric) => (
        <motion.div key={metric.label} variants={item}>
          <Card>
            <div className="flex items-start gap-3">
              <div className="mt-1 w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: metric.color }} />
              <div>
                <p className="text-xs uppercase tracking-[0.15em] font-medium text-text-tertiary mb-1">{metric.label}</p>
                <p className="text-2xl font-semibold font-mono tabular-nums text-text-primary">{metric.value}</p>
                {'subtitle' in metric && metric.subtitle && (
                  <p className="text-xs text-text-secondary mt-1">{metric.subtitle}</p>
                )}
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}
