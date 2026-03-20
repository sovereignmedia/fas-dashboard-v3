'use client';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

import { dcPowerData, type DCPowerDataPoint } from '@/data/market-context';
import { CHART_COLORS } from '@/lib/colors';
import Card from '@/components/ui/Card';

// ─── Custom Tooltip ──────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload || !payload.length) return null;

  const value = payload[0]?.value as number | undefined;
  const point = dcPowerData.find((d: DCPowerDataPoint) => d.year === label);

  return (
    <div
      className="rounded-xl border border-border-subtle px-4 py-3"
      style={{ background: 'var(--card-gradient)', boxShadow: 'var(--shadow-card)' }}
    >
      <p
        className="text-[10px] uppercase tracking-[0.2em] font-semibold mb-1"
        style={{ color: CHART_COLORS.gold }}
      >
        {label}
        {point?.isEstimate && (
          <span className="ml-1.5 text-[9px] opacity-60">ESTIMATE</span>
        )}
      </p>
      <p className="font-mono text-lg font-semibold tabular-nums text-text-primary">
        {value?.toLocaleString()} TWh
      </p>
    </div>
  );
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function DCPowerChart() {
  return (
    <Card hover={false} className="!p-8">
      {/* Header */}
      <div className="mb-6">
        <p className="text-[10px] uppercase tracking-[0.25em] font-semibold text-accent-gold/70 mb-1">
          IEA Projection
        </p>
        <h3 className="text-lg font-semibold text-text-primary">
          Global Data Center Electricity Consumption
        </h3>
        <p className="text-sm text-text-tertiary mt-0.5">
          Source: IEA, S&amp;P Global, Gartner
        </p>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={320}>
        <AreaChart
          data={dcPowerData}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="dcPowerGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={CHART_COLORS.blue} stopOpacity={0.25} />
              <stop offset="95%" stopColor={CHART_COLORS.blue} stopOpacity={0.02} />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
            stroke={`${CHART_COLORS.gold}18`}
            vertical={false}
          />

          <XAxis
            dataKey="year"
            tick={{ fill: CHART_COLORS.goldDim, fontSize: 11, fontFamily: 'monospace' }}
            axisLine={{ stroke: `${CHART_COLORS.gold}20` }}
            tickLine={false}
          />

          <YAxis
            domain={[0, 1800]}
            tickCount={7}
            tick={{ fill: CHART_COLORS.goldDim, fontSize: 11, fontFamily: 'monospace' }}
            tickFormatter={(v: number) => `${v}`}
            axisLine={false}
            tickLine={false}
            width={42}
            label={{
              value: 'TWh',
              position: 'insideTopLeft',
              offset: -2,
              fill: CHART_COLORS.goldDim,
              fontSize: 10,
              fontFamily: 'monospace',
            }}
          />

          <Tooltip content={<CustomTooltip />} cursor={{ stroke: `${CHART_COLORS.gold}30`, strokeWidth: 1 }} />

          <Area
            type="monotone"
            dataKey="twh"
            stroke={CHART_COLORS.blue}
            strokeWidth={2}
            fill="url(#dcPowerGradient)"
            dot={{ r: 3.5, fill: 'var(--bg-primary, #0a0a0f)', stroke: CHART_COLORS.blue, strokeWidth: 1.5 }}
            activeDot={{ r: 5, fill: CHART_COLORS.blue, strokeWidth: 0 }}
          />
        </AreaChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="flex items-center gap-6 mt-4 pt-4 border-t border-border-subtle">
        <div className="flex items-center gap-2">
          <div className="w-4 h-0.5" style={{ backgroundColor: CHART_COLORS.blue }} />
          <span className="text-[10px] text-text-tertiary uppercase tracking-[0.15em]">Projection</span>
        </div>
        <div className="ml-auto">
          <span className="text-[10px] text-text-tertiary font-mono tabular-nums">
            2035 projection:{' '}
            <span className="font-semibold" style={{ color: CHART_COLORS.blue }}>
              1,580 TWh
            </span>
          </span>
        </div>
      </div>
    </Card>
  );
}
