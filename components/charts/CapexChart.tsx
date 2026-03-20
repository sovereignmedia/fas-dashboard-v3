'use client';

import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from 'recharts';
import Card from '@/components/ui/Card';
import { CHART_COLORS } from '@/lib/colors';
import { container, item } from '@/lib/animations';
import { hyperscalerCapex, type CapexDataPoint } from '@/data/market-context';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload || !payload.length) return null;

  const dataPoint = payload[0].payload as CapexDataPoint;

  return (
    <div
      className="rounded border border-border-medium bg-[#0d1424] px-3 py-2 shadow-lg"
      style={{ minWidth: 140 }}
    >
      <p className="mb-1 font-mono text-xs text-text-tertiary">{label}</p>
      {dataPoint.isProjected && (
        <p
          className="mb-1 font-mono text-xs font-semibold tracking-widest"
          style={{ color: CHART_COLORS.gold }}
        >
          PROJECTED
        </p>
      )}
      <p className="font-mono text-sm font-semibold text-text-primary">
        ${dataPoint.capex}B
      </p>
    </div>
  );
}

export default function CapexChart() {
  return (
    <motion.div variants={container} initial="hidden" animate="show">
      <motion.div variants={item}>
        <Card>
          {/* Header */}
          <div className="mb-6">
            <p
              className="mb-1 font-mono text-xs font-semibold tracking-widest text-text-tertiary"
              style={{ letterSpacing: '0.12em' }}
            >
              CAPITAL FLOWS
            </p>
            <h2 className="text-base font-semibold text-text-primary">
              Hyperscaler Capital Expenditure
            </h2>
            <p className="mt-0.5 font-mono text-xs text-text-tertiary">
              Sources: Goldman Sachs, company earnings reports
            </p>
          </div>

          {/* Chart */}
          <div className="w-full" style={{ height: 320 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={hyperscalerCapex}
                margin={{ top: 28, right: 16, left: 8, bottom: 4 }}
                barCategoryGap="28%"
              >
                <CartesianGrid
                  vertical={false}
                  stroke="#1e2a3d"
                  strokeDasharray="3 3"
                />
                <XAxis
                  dataKey="year"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: '#6b7280',
                    fontSize: 11,
                    fontFamily: "'JetBrains Mono', monospace",
                  }}
                  dy={8}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: '#6b7280',
                    fontSize: 11,
                    fontFamily: "'JetBrains Mono', monospace",
                  }}
                  tickFormatter={(v: number) => `$${v}B`}
                  domain={[0, 800]}
                  ticks={[0, 200, 400, 600, 800]}
                  width={52}
                />
                <Tooltip
                  content={<CustomTooltip />}
                  cursor={{ fill: 'rgba(255,255,255,0.04)' }}
                />
                <Bar
                  dataKey="capex"
                  radius={[3, 3, 0, 0]}
                  maxBarSize={64}
                >
                  {hyperscalerCapex.map((entry) => (
                    <Cell
                      key={`cell-${entry.year}`}
                      fill={
                        entry.isProjected
                          ? CHART_COLORS.gold
                          : CHART_COLORS.goldDim
                      }
                      fillOpacity={entry.isProjected ? 1 : 0.75}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Key stat strip */}
          <div className="mt-5 flex flex-wrap gap-4 border-t border-border-subtle pt-4">
            <div className="flex flex-col gap-0.5">
              <span className="font-mono text-xs text-text-tertiary uppercase tracking-wider">
                2026 Projected
              </span>
              <span
                className="font-mono text-lg font-bold"
                style={{ color: CHART_COLORS.gold }}
              >
                $675B
              </span>
            </div>
            <div
              className="w-px self-stretch bg-border-subtle"
              aria-hidden="true"
            />
            <div className="flex flex-col gap-0.5">
              <span className="font-mono text-xs text-text-tertiary uppercase tracking-wider">
                YoY Growth
              </span>
              <span
                className="font-mono text-lg font-bold"
                style={{ color: CHART_COLORS.green }}
              >
                +82%
              </span>
              <span className="font-mono text-xs text-text-tertiary">
                $371B → $675B
              </span>
            </div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}
