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

import {
  coalProductionData,
  coalStats,
  type CoalProductionDataPoint,
} from '@/data/coal-production';
import { CHART_COLORS } from '@/lib/colors';
import Card from '@/components/ui/Card';

// ─── Custom Tooltip ──────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload || !payload.length) return null;

  const point = coalProductionData.find(
    (d: CoalProductionDataPoint) => d.year === label,
  );
  if (!point) return null;

  return (
    <div
      className="rounded-xl border border-border-subtle px-4 py-3"
      style={{
        background: 'var(--card-gradient)',
        boxShadow: 'var(--shadow-card)',
      }}
    >
      <p
        className="text-[10px] uppercase tracking-[0.2em] font-semibold mb-1.5"
        style={{ color: CHART_COLORS.green }}
      >
        {label}
      </p>
      <p className="font-mono text-lg font-semibold tabular-nums text-text-primary">
        {point.twh.toLocaleString()} TWh
      </p>
      <p className="font-mono text-sm tabular-nums text-text-tertiary mt-0.5">
        {point.mt.toLocaleString()} Mt
      </p>
    </div>
  );
}

// ─── Component ───────────────────────────────────────────────────────────────

// Show a subset of years on x-axis to avoid crowding (every 10 years + last)
const TICK_YEARS = [1950, 1960, 1970, 1980, 1990, 2000, 2010, 2020, 2024];

export default function CoalProductionChart() {
  const { current, since1950, since2000 } = coalStats;

  return (
    <Card hover={false} className="!p-8">
      {/* Header */}
      <div className="mb-6">
        <p className="text-[10px] uppercase tracking-[0.25em] font-semibold text-accent-gold/70 mb-1">
          Historical Data
        </p>
        <h3 className="text-lg font-semibold text-text-primary">
          Global Coal Production
        </h3>
        <p className="text-sm text-text-tertiary mt-0.5">
          Annual production, 1950 – 2024
        </p>
      </div>

      {/* Context paragraph */}
      <div className="mb-6 max-w-3xl">
        <p className="text-sm leading-relaxed text-text-secondary">
          Despite the global push toward renewables, coal production has climbed
          steadily — rising nearly 89% since 2000 to a record 8,773 million
          metric tons in 2024. This growth is driven by surging electricity
          demand in Asia, the expansion of AI-scale data centers requiring
          firm baseload power, and the ongoing role of coal in steel,
          fertilizer, and chemical manufacturing. For the energy
          infrastructure sector, this trend underscores a structural reality:
          coal remains deeply embedded in the global energy mix, and
          technologies that can convert coal reserves into higher-value
          products sit at the intersection of existing supply chains and
          accelerating demand.
        </p>
      </div>

      {/* KPI Row */}
      <div className="flex flex-wrap gap-x-8 gap-y-3 mb-6">
        <div>
          <p className="text-[10px] uppercase tracking-[0.15em] text-text-tertiary mb-0.5">
            2024 Production
          </p>
          <p className="font-mono text-xl font-semibold tabular-nums text-text-primary leading-tight">
            {current.twh.toLocaleString()} TWh
          </p>
          <p className="font-mono text-sm tabular-nums text-text-tertiary">
            {current.mt.toLocaleString()} Mt
          </p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-[0.15em] text-text-tertiary mb-0.5">
            Since 1950
          </p>
          <p
            className="font-mono text-lg font-semibold tabular-nums"
            style={{ color: CHART_COLORS.green }}
          >
            +{since1950}%
          </p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-[0.15em] text-text-tertiary mb-0.5">
            Since 2000
          </p>
          <p
            className="font-mono text-lg font-semibold tabular-nums"
            style={{ color: CHART_COLORS.green }}
          >
            +{since2000}%
          </p>
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={380}>
        <AreaChart
          data={coalProductionData}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="coalGradient" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor={CHART_COLORS.green}
                stopOpacity={0.2}
              />
              <stop
                offset="95%"
                stopColor={CHART_COLORS.green}
                stopOpacity={0.02}
              />
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
            ticks={TICK_YEARS}
          />

          <YAxis
            domain={[0, 60000]}
            tickCount={6}
            tick={{ fill: CHART_COLORS.goldDim, fontSize: 11, fontFamily: 'monospace' }}
            tickFormatter={(v: number) =>
              v >= 1000 ? `${(v / 1000).toFixed(0)}k` : `${v}`
            }
            axisLine={false}
            tickLine={false}
            width={48}
            label={{
              value: 'TWh',
              position: 'insideTopLeft',
              offset: -2,
              fill: CHART_COLORS.goldDim,
              fontSize: 10,
              fontFamily: 'monospace',
            }}
          />

          <Tooltip
            content={<CustomTooltip />}
            cursor={{ stroke: `${CHART_COLORS.gold}30`, strokeWidth: 1 }}
          />

          <Area
            type="monotone"
            dataKey="twh"
            stroke={CHART_COLORS.green}
            strokeWidth={2}
            fill="url(#coalGradient)"
            dot={false}
            activeDot={{
              r: 5,
              fill: CHART_COLORS.green,
              strokeWidth: 0,
            }}
          />
        </AreaChart>
      </ResponsiveContainer>

      {/* Source attribution */}
      <div className="flex items-center gap-6 mt-4 pt-4 border-t border-border-subtle">
        <div className="flex items-center gap-2">
          <div
            className="w-4 h-0.5"
            style={{ backgroundColor: CHART_COLORS.green }}
          />
          <span className="text-[10px] text-text-tertiary uppercase tracking-[0.15em]">
            Annual Production
          </span>
        </div>
        <div className="ml-auto">
          <span className="text-[10px] text-text-tertiary font-mono tabular-nums">
            Source: Our World in Data · EI Statistical Review 2025 · IEA
          </span>
        </div>
      </div>
    </Card>
  );
}
