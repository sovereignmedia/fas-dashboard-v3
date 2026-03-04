'use client';

import { useMemo } from 'react';
import {
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  ReferenceArea,
} from 'recharts';

import {
  supplyDemandData,
  supplyDemandAnnotations,
  type SupplyDemandDataPoint,
} from '@/data/market-context';
import { CHART_COLORS } from '@/lib/colors';
import Card from '@/components/ui/Card';

// ─── Derived chart data ──────────────────────────────────────────────────────

interface ChartDataPoint {
  year: number;
  totalGeneration: number;
  totalDemand: number;
  dcDemandMid: number;
  dcDemandHigh: number;
  gap: number;
  isProjected: boolean;
}

// ─── Custom Tooltip ──────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload || !payload.length) return null;

  const data = payload[0]?.payload as ChartDataPoint | undefined;
  if (!data) return null;

  const gap = data.totalDemand - data.totalGeneration;
  const isDeficit = gap > 0;

  return (
    <div
      className="rounded-xl border border-border-subtle px-4 py-3 max-w-[240px]"
      style={{
        background: 'var(--card-gradient)',
        boxShadow: 'var(--shadow-card)',
      }}
    >
      <p
        className="text-[10px] uppercase tracking-[0.2em] font-semibold mb-2"
        style={{ color: CHART_COLORS.gold }}
      >
        {label}
        {data.isProjected && (
          <span className="ml-1.5 text-[9px] opacity-60">PROJECTED</span>
        )}
      </p>

      <div className="space-y-1.5">
        <div className="flex items-center justify-between gap-4">
          <span className="text-[11px] text-text-tertiary">Generation Capacity</span>
          <span className="font-mono text-[12px] font-semibold tabular-nums text-text-primary">
            {data.totalGeneration.toLocaleString()} TWh
          </span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <span className="text-[11px] text-text-tertiary">Projected Demand</span>
          <span className="font-mono text-[12px] font-semibold tabular-nums text-text-primary">
            {data.totalDemand.toLocaleString()} TWh
          </span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <span className="text-[11px] text-text-tertiary">DC Demand (Mid)</span>
          <span
            className="font-mono text-[12px] font-semibold tabular-nums"
            style={{ color: CHART_COLORS.blue }}
          >
            {data.dcDemandMid.toLocaleString()} TWh
          </span>
        </div>

        <div className="pt-1.5 mt-1.5 border-t border-border-subtle">
          <div className="flex items-center justify-between gap-4">
            <span className="text-[11px] font-semibold" style={{ color: isDeficit ? CHART_COLORS.red : CHART_COLORS.green }}>
              {isDeficit ? 'Supply Gap' : 'Surplus'}
            </span>
            <span
              className="font-mono text-[13px] font-bold tabular-nums"
              style={{ color: isDeficit ? CHART_COLORS.red : CHART_COLORS.green }}
            >
              {isDeficit ? '-' : '+'}{Math.abs(gap).toLocaleString()} TWh
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function SupplyDemandChart() {
  const chartData: ChartDataPoint[] = useMemo(() => {
    return supplyDemandData.map((d: SupplyDemandDataPoint) => ({
      year: d.year,
      totalGeneration: d.totalGeneration,
      totalDemand: d.totalDemand,
      dcDemandMid: d.dcDemandMid,
      dcDemandHigh: d.dcDemandHigh,
      gap: d.totalDemand - d.totalGeneration,
      isProjected: d.isProjected,
    }));
  }, []);

  // Find first projected year for reference line
  const firstProjected = chartData.find((d) => d.isProjected);
  // Find the crossover point
  const crossoverYear = chartData.find((d) => d.totalDemand > d.totalGeneration);

  return (
    <Card hover={false} className="!p-8">
      {/* Header */}
      <div className="mb-6">
        <p className="text-[10px] uppercase tracking-[0.25em] font-semibold text-accent-gold/70 mb-1">
          Supply vs. Demand
        </p>
        <h3 className="text-lg font-semibold text-text-primary">
          U.S. Power Generation vs. Projected Demand
        </h3>
        <p className="text-sm text-text-tertiary mt-0.5">
          Sources: EIA, Lawrence Berkeley, Goldman Sachs, Belfer Center, IEA
        </p>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={360}>
        <ComposedChart
          data={chartData}
          margin={{ top: 16, right: 16, left: 0, bottom: 0 }}
        >
          <defs>
            {/* Supply area gradient */}
            <linearGradient id="supplyGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={CHART_COLORS.green} stopOpacity={0.15} />
              <stop offset="95%" stopColor={CHART_COLORS.green} stopOpacity={0.02} />
            </linearGradient>
            {/* Demand area gradient */}
            <linearGradient id="demandGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={CHART_COLORS.red} stopOpacity={0.08} />
              <stop offset="95%" stopColor={CHART_COLORS.red} stopOpacity={0.01} />
            </linearGradient>
            {/* DC demand area gradient */}
            <linearGradient id="dcDemandGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={CHART_COLORS.blue} stopOpacity={0.2} />
              <stop offset="95%" stopColor={CHART_COLORS.blue} stopOpacity={0.03} />
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
            domain={[3000, 7000]}
            tickCount={9}
            tick={{ fill: CHART_COLORS.goldDim, fontSize: 11, fontFamily: 'monospace' }}
            tickFormatter={(v: number) => `${(v / 1000).toFixed(1)}k`}
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

          <Tooltip
            content={<CustomTooltip />}
            cursor={{ stroke: `${CHART_COLORS.gold}30`, strokeWidth: 1 }}
          />

          {/* Gap shading (projected area where demand > supply) */}
          {crossoverYear && (
            <ReferenceArea
              x1={crossoverYear.year}
              x2={2035}
              y1={3000}
              y2={7000}
              fill={CHART_COLORS.red}
              fillOpacity={0.03}
              strokeOpacity={0}
            />
          )}

          {/* Projected divider */}
          {firstProjected && (
            <ReferenceLine
              x={firstProjected.year}
              stroke={`${CHART_COLORS.gold}30`}
              strokeDasharray="4 4"
              label={{
                value: 'Projected →',
                position: 'top',
                fill: CHART_COLORS.goldDim,
                fontSize: 9,
                fontFamily: 'monospace',
              }}
            />
          )}

          {/* Supply area */}
          <Area
            type="monotone"
            dataKey="totalGeneration"
            stroke={CHART_COLORS.green}
            strokeWidth={2}
            fill="url(#supplyGradient)"
            dot={{ r: 3, fill: 'var(--bg-primary, #0a0a0f)', stroke: CHART_COLORS.green, strokeWidth: 1.5 }}
            activeDot={{ r: 5, fill: CHART_COLORS.green, strokeWidth: 0 }}
            name="Generation Capacity"
          />

          {/* Total demand line */}
          <Line
            type="monotone"
            dataKey="totalDemand"
            stroke={CHART_COLORS.red}
            strokeWidth={2}
            strokeDasharray="6 3"
            dot={{ r: 3, fill: 'var(--bg-primary, #0a0a0f)', stroke: CHART_COLORS.red, strokeWidth: 1.5 }}
            activeDot={{ r: 5, fill: CHART_COLORS.red, strokeWidth: 0 }}
            name="Projected Demand"
          />

          {/* DC demand area (stacked on bottom) */}
          <Area
            type="monotone"
            dataKey="dcDemandMid"
            stroke={CHART_COLORS.blue}
            strokeWidth={1.5}
            fill="url(#dcDemandGradient)"
            dot={{ r: 2.5, fill: CHART_COLORS.blue, strokeWidth: 0 }}
            activeDot={{ r: 4, fill: CHART_COLORS.blue, strokeWidth: 0 }}
            name="Data Center Demand"
          />
        </ComposedChart>
      </ResponsiveContainer>

      {/* Key Metrics Strip */}
      <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t border-border-subtle">
        <div>
          <p className="text-[10px] uppercase tracking-[0.15em] text-text-tertiary mb-0.5">
            2030 Supply Gap
          </p>
          <p className="font-mono text-base font-bold tabular-nums" style={{ color: CHART_COLORS.red }}>
            {supplyDemandAnnotations.gapBy2030}
          </p>
          <p className="text-[10px] text-text-tertiary mt-0.5">
            Demand outpaces generation
          </p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-[0.15em] text-text-tertiary mb-0.5">
            DC Share by 2030
          </p>
          <p className="font-mono text-base font-bold tabular-nums" style={{ color: CHART_COLORS.blue }}>
            {supplyDemandAnnotations.dcShare2030Mid}
          </p>
          <p className="text-[10px] text-text-tertiary mt-0.5">
            Of total U.S. electricity
          </p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-[0.15em] text-text-tertiary mb-0.5">
            Grid Investment
          </p>
          <p className="font-mono text-base font-bold tabular-nums" style={{ color: CHART_COLORS.gold }}>
            {supplyDemandAnnotations.gridInvestmentNeeded}
          </p>
          <p className="text-[10px] text-text-tertiary mt-0.5">
            Needed through 2030 (GS est.)
          </p>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-4 pt-3 border-t border-border-subtle">
        <div className="flex items-center gap-2">
          <div className="w-4 h-0.5" style={{ backgroundColor: CHART_COLORS.green }} />
          <span className="text-[10px] text-text-tertiary uppercase tracking-[0.12em]">
            Generation Capacity
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="w-4 h-0.5 border-t-2 border-dashed"
            style={{ borderColor: CHART_COLORS.red }}
          />
          <span className="text-[10px] text-text-tertiary uppercase tracking-[0.12em]">
            Projected Demand
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-2 rounded-sm opacity-60" style={{ backgroundColor: CHART_COLORS.blue }} />
          <span className="text-[10px] text-text-tertiary uppercase tracking-[0.12em]">
            Data Center Load
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-2 rounded-sm opacity-20" style={{ backgroundColor: CHART_COLORS.red }} />
          <span className="text-[10px] text-text-tertiary uppercase tracking-[0.12em]">
            Supply Deficit Zone
          </span>
        </div>
      </div>
    </Card>
  );
}
