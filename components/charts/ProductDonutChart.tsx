'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { motion } from 'framer-motion';

import { products } from '@/data/products';
import { formatCurrency } from '@/lib/formatters';
import Card from '@/components/ui/Card';

const singleFacilityRevenue = products.reduce((sum, p) => sum + p.annualRevenue, 0);

const donutData = products.map((p) => ({
  ...p,
  pct: (p.annualRevenue / singleFacilityRevenue) * 100,
}));

function DonutTooltip({ active, payload }: { active?: boolean; payload?: Array<{ payload: { displayName: string; annualRevenue: number; pct: number; color: string } }> }) {
  if (!active || !payload || !payload.length) return null;
  const data = payload[0].payload;
  return (
    <div className="bg-bg-tertiary border border-border-medium rounded-xl px-4 py-3 shadow-2xl">
      <p className="text-sm font-medium text-text-primary mb-1">{data.displayName}</p>
      <p className="text-xs text-text-secondary">
        {formatCurrency(data.annualRevenue, true)} &middot; {data.pct.toFixed(1)}%
      </p>
    </div>
  );
}

export default function ProductDonutChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
    >
      <Card className="h-full">
        <p className="text-xs uppercase tracking-[0.15em] font-medium text-accent-gold mb-4">
          Product Mix
        </p>
        <p className="text-sm text-text-secondary mb-4">
          Revenue contribution by product (single facility)
        </p>
        <div className="w-full h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={donutData}
                dataKey="annualRevenue"
                nameKey="displayName"
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={110}
                paddingAngle={2}
                strokeWidth={0}
              >
                {donutData.map((entry) => (
                  <Cell key={entry.id} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<DonutTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        {/* Legend */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-4">
          {donutData.map((entry) => (
            <div key={entry.id} className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: entry.color }} />
              <span className="text-xs text-text-secondary truncate">{entry.displayName}</span>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
