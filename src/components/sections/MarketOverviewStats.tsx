'use client';

import { motion } from 'framer-motion';

import { marketStats, type MarketStat } from '@/data/market-context';
import { container, item, viewport } from '@/lib/animations';
import { CHART_COLORS } from '@/lib/colors';
import Card from '@/components/ui/Card';

const deltaColorMap: Record<MarketStat['deltaColor'], string> = {
  green: CHART_COLORS.green,
  blue: CHART_COLORS.blue,
  gold: CHART_COLORS.gold,
  orange: CHART_COLORS.orange,
  red: CHART_COLORS.red,
  purple: CHART_COLORS.purple,
};

export default function MarketOverviewStats() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={viewport.section}
      className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 mb-10"
    >
      {marketStats.map((stat) => (
        <motion.div key={stat.label} variants={item}>
          <StatCard stat={stat} />
        </motion.div>
      ))}
    </motion.div>
  );
}

function StatCard({ stat }: { stat: MarketStat }) {
  const accentColor = deltaColorMap[stat.deltaColor];

  return (
    <Card hover={false} accentLine className="!p-5 h-full flex flex-col justify-between">
      {/* Label */}
      <p className="text-[10px] uppercase tracking-[0.25em] font-semibold text-accent-gold/70 mb-3 leading-tight">
        {stat.label}
      </p>

      {/* Value */}
      <p className="font-mono text-lg font-semibold tabular-nums text-text-primary leading-none mb-2">
        {stat.value}
      </p>

      {/* Delta badge */}
      <span
        className="inline-block text-[10px] font-semibold uppercase tracking-[0.15em] rounded px-1.5 py-0.5 mb-2"
        style={{ color: accentColor, backgroundColor: `${accentColor}18` }}
      >
        {stat.delta}
      </span>

      {/* Context */}
      <p className="text-[10px] leading-relaxed text-text-tertiary">
        {stat.deltaContext}
      </p>
    </Card>
  );
}
