'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

import { countries, Country } from '@/data/countries';
import { formatNumber } from '@/lib/formatters';
import Card from '@/components/ui/Card';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ChartTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="rounded-xl bg-bg-tertiary border border-border-medium px-4 py-3 shadow-2xl">
      <p className="text-sm font-semibold text-text-primary">{d.name}</p>
      <p className="text-xs text-text-secondary mt-1">
        Facility potential:&nbsp;
        <span className="font-mono text-accent-gold">{d.facilityPotential}</span>
      </p>
      <p className="text-xs text-text-secondary">
        Coal production:&nbsp;
        <span className="font-mono text-text-primary">{formatNumber(d.coalProduction)} Mt</span>
      </p>
    </div>
  );
}

interface CoalProductionChartProps {
  selectedCountry: Country | null;
}

export default function CoalProductionChart({ selectedCountry }: CoalProductionChartProps) {
  const sortedCountries = useMemo(
    () => [...countries].sort((a, b) => b.facilityPotential - a.facilityPotential),
    [],
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.35 }}
    >
      <Card hover={false}>
        <div className="flex items-center gap-2 mb-6">
          <div className="w-2 h-2 rounded-full bg-data-blue animate-pulse" />
          <p className="text-xs uppercase tracking-[0.2em] font-medium text-text-tertiary">
            Facility Potential by Country
          </p>
        </div>

        <div className="h-[380px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={sortedCountries}
              layout="vertical"
              margin={{ top: 0, right: 30, left: 0, bottom: 0 }}
              barCategoryGap="20%"
            >
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" horizontal={false} />
              <XAxis
                type="number"
                tick={{ fill: 'var(--text-tertiary)', fontSize: 11, fontFamily: 'JetBrains Mono, monospace' }}
                axisLine={{ stroke: 'var(--border-subtle)' }}
                tickLine={false}
              />
              <YAxis
                dataKey="name"
                type="category"
                width={110}
                tick={{ fill: 'var(--text-secondary)', fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<ChartTooltip />} cursor={{ fill: 'rgba(212,168,83,0.05)' }} />
              <Bar dataKey="facilityPotential" radius={[0, 6, 6, 0]} maxBarSize={28}>
                {sortedCountries.map((country) => (
                  <Cell
                    key={country.code}
                    fill={country.color}
                    fillOpacity={selectedCountry ? (selectedCountry.code === country.code ? 1 : 0.3) : 0.85}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </motion.div>
  );
}
