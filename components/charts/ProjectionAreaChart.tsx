'use client';

import { motion } from 'framer-motion';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

import { yearlyProjections } from '@/data/financials';
import { CHART_COLORS } from '@/lib/colors';
import { formatCurrency } from '@/lib/formatters';
import Card from '@/components/ui/Card';

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

const chartData = yearlyProjections.map((y) => ({
  name: y.year,
  Revenue: Math.max(y.revenue, 0),
  EBITDA: y.ebitda,
  'Net Income': y.netIncome,
}));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl bg-bg-tertiary border border-border-medium px-4 py-3 shadow-2xl">
      <p className="text-xs font-medium text-text-secondary mb-2">{label}</p>
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {payload.map((entry: any) => (
        <div key={entry.name} className="flex items-center gap-2 mb-1 last:mb-0">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
          <span className="text-xs text-text-secondary">{entry.name}:</span>
          <span className="text-xs font-mono font-semibold text-text-primary">
            {formatCurrency(entry.value, true)}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function ProjectionAreaChart() {
  return (
    <motion.div variants={item}>
      <Card className="p-8">
        <div className="mb-8">
          <p className="text-xs uppercase tracking-[0.2em] font-medium text-accent-gold mb-2">5-Year Projection</p>
          <h3 className="text-2xl font-semibold text-text-primary">Profit & Loss Trajectory</h3>
          <p className="text-sm text-text-secondary mt-1">
            Revenue, EBITDA, and Net Income across the initial five-year horizon
          </p>
        </div>

        <div className="flex flex-wrap gap-6 mb-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-data-blue" />
            <span className="text-xs text-text-secondary font-medium">Revenue</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-data-green" />
            <span className="text-xs text-text-secondary font-medium">EBITDA</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-accent-gold" />
            <span className="text-xs text-text-secondary font-medium">Net Income</span>
          </div>
        </div>

        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
              <defs>
                <linearGradient id="gradRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={CHART_COLORS.blue} stopOpacity={0.3} />
                  <stop offset="100%" stopColor={CHART_COLORS.blue} stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradEBITDA" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={CHART_COLORS.green} stopOpacity={0.3} />
                  <stop offset="100%" stopColor={CHART_COLORS.green} stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradNetIncome" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={CHART_COLORS.gold} stopOpacity={0.3} />
                  <stop offset="100%" stopColor={CHART_COLORS.gold} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" vertical={false} />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'var(--text-tertiary)', fontSize: 12, fontFamily: 'monospace' }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'var(--text-tertiary)', fontSize: 11, fontFamily: 'monospace' }}
                tickFormatter={(v) => formatCurrency(v, true)}
                width={70}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="Revenue"
                stroke={CHART_COLORS.blue}
                strokeWidth={2}
                fill="url(#gradRevenue)"
                dot={{ r: 4, fill: CHART_COLORS.blue, stroke: 'var(--bg-primary)', strokeWidth: 2 }}
                activeDot={{ r: 6, fill: CHART_COLORS.blue, stroke: 'var(--bg-primary)', strokeWidth: 2 }}
              />
              <Area
                type="monotone"
                dataKey="EBITDA"
                stroke={CHART_COLORS.green}
                strokeWidth={2}
                fill="url(#gradEBITDA)"
                dot={{ r: 4, fill: CHART_COLORS.green, stroke: 'var(--bg-primary)', strokeWidth: 2 }}
                activeDot={{ r: 6, fill: CHART_COLORS.green, stroke: 'var(--bg-primary)', strokeWidth: 2 }}
              />
              <Area
                type="monotone"
                dataKey="Net Income"
                stroke={CHART_COLORS.gold}
                strokeWidth={2}
                fill="url(#gradNetIncome)"
                dot={{ r: 4, fill: CHART_COLORS.gold, stroke: 'var(--bg-primary)', strokeWidth: 2 }}
                activeDot={{ r: 6, fill: CHART_COLORS.gold, stroke: 'var(--bg-primary)', strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-5 gap-2 mt-4 pt-4 border-t border-border-subtle">
          {yearlyProjections.map((y) => (
            <div key={y.year} className="text-center">
              <p className="text-xs font-mono text-text-tertiary">{y.year}</p>
              <p className="text-[10px] text-text-tertiary mt-0.5">{y.label}</p>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
