'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import SectionHeader from '@/components/ui/SectionHeader';
import MetricCard from '@/components/ui/MetricCard';
import { facilityEconomics } from '@/data/products';
import { FACILITY, EXPANSION, CAPITAL, OPERATIONS } from '@/data/model';
import { CHART_COLORS } from '@/lib/colors';
import { formatCurrency, formatPercent, formatNumber } from '@/lib/formatters';

const overviewMetrics = [
  {
    label: 'Single Facility Revenue',
    value: formatCurrency(FACILITY.totalRevenue, true),
    subtitle: 'Year 4 Steady State',
    href: '/dashboard/financials',
    color: CHART_COLORS.blue,
  },
  {
    label: 'Single Facility EBITDA',
    value: formatCurrency(FACILITY.ebitda, true),
    subtitle: 'Year 4 Steady State',
    href: '/dashboard/financials',
    color: CHART_COLORS.green,
  },
  {
    label: 'Gross Margin',
    value: formatPercent(FACILITY.grossMargin),
    subtitle: '6 Revenue Streams',
    href: '/dashboard/economics',
    color: CHART_COLORS.gold,
  },
  {
    label: 'Patent-Protected Countries',
    value: String(EXPANSION.patentCountries),
    subtitle: 'Global IP Portfolio',
    href: '/dashboard/expansion',
    color: CHART_COLORS.purple,
  },
  {
    label: 'Reg A+ Raised',
    value: `${formatCurrency(CAPITAL.totalRaised, true)}+`,
    subtitle: `${formatNumber(CAPITAL.shareholders)}+ Shareholders`,
    href: '/dashboard/capital',
    color: CHART_COLORS.green,
  },
  {
    label: 'Shareholders',
    value: `${formatNumber(CAPITAL.shareholders)}+`,
    subtitle: 'Proven Public Demand',
    href: '/dashboard/team',
    color: CHART_COLORS.orange,
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function DashboardOverview() {
  const router = useRouter();

  return (
    <div>
      <SectionHeader
        overline="Executive Summary"
        title="Frontieras North America"
        subtitle="Converting coal into six high-value products through patented clean energy technology. One facility. Nine countries. A new asset class."
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
      >
        {overviewMetrics.map((metric) => (
          <motion.div key={metric.label} variants={item}>
            <MetricCard
              label={metric.label}
              value={metric.value}
              subtitle={metric.subtitle}
              color={metric.color}
              onClick={() => router.push(metric.href)}
            />
          </motion.div>
        ))}
      </motion.div>

      <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
        <QuickStat label="Total CapEx" value={formatCurrency(facilityEconomics.totalCapex, true)} />
        <QuickStat label="Net Margin" value={formatPercent(facilityEconomics.netMargin)} />
        <QuickStat label="Coal Throughput" value={`${formatNumber(OPERATIONS.coalThroughputTonsPerDay)} t/day`} />
        <QuickStat label="Max Facilities" value={String(EXPANSION.totalFacilityPotential)} />
      </div>
    </div>
  );
}

function QuickStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center py-4">
      <p className="text-xs uppercase tracking-[0.2em] font-medium text-text-tertiary mb-1">{label}</p>
      <p className="font-mono text-xl font-semibold tabular-nums text-text-secondary">{value}</p>
    </div>
  );
}
