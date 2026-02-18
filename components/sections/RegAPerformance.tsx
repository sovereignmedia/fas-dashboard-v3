'use client';

import { motion } from 'framer-motion';
import { DollarSign, Users, TrendingUp, Zap } from 'lucide-react';

import { regAPerformance } from '@/data/capital';
import { CHART_COLORS } from '@/lib/colors';
import { formatCurrency, formatNumber } from '@/lib/formatters';
import Card from '@/components/ui/Card';

import { container, item, viewport } from '@/lib/animations';

const primaryMetrics = [
  { label: 'Total Raised', value: formatCurrency(regAPerformance.totalRaised, true), icon: DollarSign, color: CHART_COLORS.gold, subtitle: 'Reg A+ Offering' },
  { label: 'Shareholders', value: formatNumber(regAPerformance.shareholders) + '+', icon: Users, color: CHART_COLORS.blue, subtitle: 'Verified Investors' },
  { label: 'Share Price', value: '$' + regAPerformance.sharePrice.toFixed(2), icon: TrendingUp, color: CHART_COLORS.green, subtitle: 'Current Offering Price' },
  { label: 'Single-Day Record', value: formatCurrency(regAPerformance.singleDayRecord, true), icon: Zap, color: CHART_COLORS.orange, subtitle: 'Peak Demand Signal' },
];

export default function RegAPerformanceSection() {
  return (
    <motion.section
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={viewport.section}
      className="mb-16"
    >
      <motion.div variants={item}>
        <h3 className="text-sm uppercase tracking-[0.2em] font-medium text-text-tertiary mb-6">Reg A+ Performance</h3>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
        {primaryMetrics.map((metric) => (
          <motion.div key={metric.label} variants={item}>
            <Card>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl" style={{ backgroundColor: `${metric.color}15` }}>
                  <metric.icon size={20} style={{ color: metric.color }} />
                </div>
              </div>
              <p className="text-xs uppercase tracking-[0.15em] font-medium text-text-tertiary mb-1">{metric.label}</p>
              <p className="font-mono text-3xl font-bold tabular-nums tracking-tight" style={{ color: metric.color }}>
                {metric.value}
              </p>
              <p className="text-xs text-text-secondary mt-1">{metric.subtitle}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div variants={item}>
        <Card hover={false}>
          <p className="text-[10px] uppercase tracking-[0.2em] font-medium text-text-tertiary mb-4">Reg CF Campaign Performance</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <p className="text-xs text-text-tertiary mb-1">Reg CF Raised</p>
              <p className="font-mono text-xl font-semibold tabular-nums text-text-primary">{formatCurrency(regAPerformance.regCFRaised, true)}</p>
            </div>
            <div>
              <p className="text-xs text-text-tertiary mb-1">Ad Spend</p>
              <p className="font-mono text-xl font-semibold tabular-nums text-text-primary">{formatCurrency(regAPerformance.regCFSpend, true)}</p>
            </div>
            <div>
              <p className="text-xs text-text-tertiary mb-1">ROAS</p>
              <p className="font-mono text-xl font-semibold tabular-nums text-data-green">{regAPerformance.regCFROAS.toFixed(2)}x</p>
            </div>
            <div>
              <p className="text-xs text-text-tertiary mb-1">Investors Funded</p>
              <p className="font-mono text-xl font-semibold tabular-nums text-text-primary">{formatNumber(regAPerformance.regCFFunded)}</p>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-border-subtle">
            <div className="flex items-center justify-between text-xs text-text-tertiary mb-2">
              <span>Return on Ad Spend</span>
              <span className="font-mono text-data-green">{regAPerformance.regCFROAS.toFixed(2)}x</span>
            </div>
            <div className="h-2 rounded-full bg-border-subtle overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${Math.min((regAPerformance.regCFROAS / 6) * 100, 100)}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                className="h-full rounded-full bg-gradient-to-r from-data-green to-data-blue"
              />
            </div>
            <div className="flex justify-between text-[10px] text-text-tertiary mt-1">
              <span>0x</span>
              <span>3x</span>
              <span>6x</span>
            </div>
          </div>
        </Card>
      </motion.div>
    </motion.section>
  );
}
