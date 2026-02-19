'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import SectionHeader from '@/components/ui/SectionHeader';
import MetricCard from '@/components/ui/MetricCard';
import { facilityEconomics } from '@/data/products';
import { EXPANSION, CAPITAL, OPERATIONS, CAPEX } from '@/data/model';
import Card from '@/components/ui/Card';
import NACommercialization from '@/components/charts/NACommercialization';
import { CHART_COLORS } from '@/lib/colors';
import { formatCurrency, formatNumber } from '@/lib/formatters';
import { container, item } from '@/lib/animations';

const overviewMetrics = [
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
    href: '/dashboard/capital',
    color: CHART_COLORS.orange,
  },
];

export default function DashboardOverview() {
  const router = useRouter();

  return (
    <div>
      <SectionHeader
        overline="Executive Summary"
        title="Frontieras North America"
        subtitle="Patented clean energy technology converting coal into six high-value products. First commercial facility: Mason County, West Virginia."
      />

      {/* Company description */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={item}>
          <Card className="mb-10" hover={false}>
            <div className="max-w-3xl">
              <p className="text-base leading-relaxed text-text-secondary">
                Frontieras North America is developing the first commercial-scale deployment of its patented FASForm™ process — a thermal cracking technology that converts coal into six distinct, high-value product streams with zero waste and no direct CO₂ emissions. The company&apos;s first facility is under development in Mason County, West Virginia, with all major engineering, operations, and infrastructure partners under executed MSAs.
              </p>
              <p className="text-base leading-relaxed text-text-secondary mt-4">
                Frontieras is pre-revenue and preparing for IPO. The company has raised $20M+ through Regulation A+ from 3,700+ shareholders, validating public market demand ahead of institutional capital deployment.
              </p>
            </div>
          </Card>
        </motion.div>

        {/* Key metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
        </div>
      </motion.div>

      <Card className="!p-10 mt-12 mb-2" hover={false}>
        <div className="text-center mb-6">
          <p className="text-xs uppercase tracking-[0.2em] font-medium text-text-tertiary">
            Commercialization Roadmap
          </p>
          <h3 className="text-lg font-semibold text-text-primary mt-1">
            North America Facility Pipeline
          </h3>
        </div>
        <NACommercialization />
      </Card>

      <div className="mt-16 grid grid-cols-2 gap-8">
        <QuickStat label="Total CapEx" value={formatCurrency(CAPEX.total, true)} />
        <QuickStat label="Coal Throughput" value={`${formatNumber(OPERATIONS.coalThroughputTonsPerDay)} t/day`} />
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
