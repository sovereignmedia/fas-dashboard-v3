'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import SectionHeader from '@/components/ui/SectionHeader';
import MetricCard from '@/components/ui/MetricCard';
import { facilityEconomics } from '@/data/products';
import { formatCurrency, formatPercent } from '@/lib/formatters';

const overviewMetrics = [
  {
    label: 'Single Facility Revenue',
    value: '$1.08B',
    subtitle: 'Year 4 Steady State',
    href: '/dashboard/financials',
    color: '#4088e8',
  },
  {
    label: 'Single Facility EBITDA',
    value: '$838M',
    subtitle: 'Year 4 Steady State',
    href: '/dashboard/financials',
    color: '#00cc88',
  },
  {
    label: 'Gross Margin',
    value: '87.5%',
    subtitle: '6 Revenue Streams',
    href: '/dashboard/economics',
    color: '#d4a852',
  },
  {
    label: 'Patent-Protected Countries',
    value: '9',
    subtitle: 'Global IP Portfolio',
    href: '/dashboard/expansion',
    color: '#c084fc',
  },
  {
    label: 'Reg A+ Raised',
    value: '$9M+',
    subtitle: '3,700+ Shareholders',
    href: '/dashboard/capital',
    color: '#00cc88',
  },
  {
    label: 'Shareholders',
    value: '3,700+',
    subtitle: 'Proven Public Demand',
    href: '/dashboard/team',
    color: '#e88a30',
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
        <QuickStat label="Coal Throughput" value="7,500 t/day" />
        <QuickStat label="Max Facilities" value="143" />
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
