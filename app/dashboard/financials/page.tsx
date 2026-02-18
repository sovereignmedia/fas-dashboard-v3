'use client';

import { useState, useMemo } from 'react';
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
import { yearlyProjections, valuationScenarios, calculateMultiFacility } from '@/data/financials';
import FacilityScaler from '@/components/charts/FacilityScaler';
import SectionHeader from '@/components/ui/SectionHeader';
import Card from '@/components/ui/Card';
import { formatCurrency, formatNumber } from '@/lib/formatters';

const TOTAL_SHARES_OUTSTANDING = 100_000_000;

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl bg-bg-tertiary border border-border-medium px-4 py-3 shadow-2xl">
      <p className="text-xs font-medium text-text-secondary mb-2">{label}</p>
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {payload.map((entry: any) => (
        <div key={entry.name} className="flex items-center gap-2 mb-1 last:mb-0">
          <div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-xs text-text-secondary">{entry.name}:</span>
          <span className="text-xs font-mono font-semibold text-text-primary">
            {formatCurrency(entry.value, true)}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function FinancialsPage() {
  const [selectedMultiple, setSelectedMultiple] = useState(12);
  const [customMultiple, setCustomMultiple] = useState('');
  const [shareCount, setShareCount] = useState(10000);
  const [shareFacilities, setShareFacilities] = useState(1);

  const activeScenario = valuationScenarios.find(
    (s) => s.multiple === selectedMultiple
  );

  const handleScenarioSelect = (multiple: number) => {
    setSelectedMultiple(multiple);
    setCustomMultiple('');
  };

  const handleCustomMultipleChange = (value: string) => {
    setCustomMultiple(value);
    const parsed = parseFloat(value);
    if (!isNaN(parsed) && parsed > 0 && parsed <= 100) {
      setSelectedMultiple(parsed);
    }
  };

  const shareValuation = useMemo(() => {
    const metrics = calculateMultiFacility(shareFacilities, selectedMultiple);
    const pricePerShare = metrics.enterpriseValue / TOTAL_SHARES_OUTSTANDING;
    const totalValue = pricePerShare * shareCount;
    return {
      enterpriseValue: metrics.enterpriseValue,
      pricePerShare,
      totalValue,
      ebitda: metrics.ebitda,
    };
  }, [shareFacilities, selectedMultiple, shareCount]);

  const chartData = yearlyProjections.map((y) => ({
    name: y.year,
    Revenue: Math.max(y.revenue, 0),
    EBITDA: y.ebitda,
    'Net Income': y.netIncome,
  }));

  return (
    <div>
      <SectionHeader
        overline="Financial Model"
        title="Financials & Valuation"
        subtitle="Interactive financial projections, valuation scenarios, and share value modeling across multi-facility scale."
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-8"
      >
        {/* ─── Valuation Methodology Toggle ─── */}
        <motion.div variants={item}>
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-text-primary">
              Valuation Methodology
            </h3>
            <p className="text-sm text-text-secondary mt-1">
              Select a valuation framework or enter a custom EBITDA multiple
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {valuationScenarios.map((scenario) => {
              const isActive = selectedMultiple === scenario.multiple && !customMultiple;
              return (
                <motion.button
                  key={scenario.id}
                  onClick={() => handleScenarioSelect(scenario.multiple)}
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.985 }}
                  className="text-left transition-all duration-300"
                >
                  <div
                    className={`
                      relative overflow-hidden rounded-2xl p-6
                      border transition-all duration-300 cursor-pointer
                      ${
                        isActive
                          ? 'bg-bg-secondary border-accent-gold/60 shadow-[0_0_30px_rgba(212,168,83,0.08)]'
                          : 'bg-bg-secondary border-border-subtle hover:border-border-medium'
                      }
                    `}
                  >
                    {/* Top accent */}
                    <div
                      className="absolute top-0 left-0 right-0 h-[2px] transition-opacity duration-300"
                      style={{
                        background: `linear-gradient(90deg, transparent, ${scenario.color}${isActive ? 'AA' : '30'}, transparent)`,
                      }}
                    />

                    {/* Selection indicator */}
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`
                          w-5 h-5 rounded-full border-2 flex items-center justify-center
                          transition-all duration-300
                        `}
                        style={{
                          borderColor: isActive ? scenario.color : 'var(--border-medium)',
                        }}
                      >
                        {isActive && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-2.5 h-2.5 rounded-full"
                            style={{ backgroundColor: scenario.color }}
                          />
                        )}
                      </div>
                      <span
                        className="font-mono text-2xl font-bold tabular-nums"
                        style={{ color: isActive ? scenario.color : 'var(--text-tertiary)' }}
                      >
                        {scenario.multiple}x
                      </span>
                    </div>

                    <h4
                      className="text-base font-semibold mb-1 transition-colors duration-300"
                      style={{
                        color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                      }}
                    >
                      {scenario.name}
                    </h4>
                    <p className="text-xs text-text-tertiary leading-relaxed">
                      {scenario.description}
                    </p>

                    {/* EV preview */}
                    <div className="mt-4 pt-3 border-t border-border-subtle">
                      <p className="text-xs text-text-tertiary">Single Facility EV</p>
                      <p
                        className="font-mono text-lg font-semibold tabular-nums mt-0.5"
                        style={{ color: isActive ? scenario.color : 'var(--text-tertiary)' }}
                      >
                        {formatCurrency(837_513_709 * scenario.multiple, true)}
                      </p>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* ─── Custom EBITDA Multiple ─── */}
        <motion.div variants={item}>
          <Card className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-text-primary mb-1">
                  Custom EBITDA Multiple
                </h4>
                <p className="text-xs text-text-tertiary">
                  Override the preset methodology with a custom multiple
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <input
                    type="number"
                    min={1}
                    max={100}
                    step={0.5}
                    value={customMultiple}
                    onChange={(e) => handleCustomMultipleChange(e.target.value)}
                    placeholder={String(selectedMultiple)}
                    className="
                      w-28 h-11 px-4 pr-8
                      bg-bg-primary border border-border-subtle rounded-xl
                      font-mono text-lg font-semibold text-text-primary
                      placeholder:text-text-tertiary
                      focus:outline-none focus:border-accent-gold/60
                      focus:shadow-[0_0_15px_rgba(212,168,83,0.1)]
                      transition-all duration-300
                      [appearance:textfield]
                      [&::-webkit-outer-spin-button]:appearance-none
                      [&::-webkit-inner-spin-button]:appearance-none
                    "
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-text-tertiary font-mono">
                    x
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-xs text-text-tertiary">Active Multiple</p>
                  <p className="font-mono text-lg font-bold text-accent-gold tabular-nums">
                    {selectedMultiple}x
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* ─── Facility Scaler ─── */}
        <motion.div variants={item}>
          <FacilityScaler ebitdaMultiple={selectedMultiple} />
        </motion.div>

        {/* ─── 5-Year P&L Chart ─── */}
        <motion.div variants={item}>
          <Card className="p-8">
            <div className="mb-8">
              <p className="text-xs uppercase tracking-[0.2em] font-medium text-accent-gold mb-2">
                5-Year Projection
              </p>
              <h3 className="text-2xl font-semibold text-text-primary">
                Profit & Loss Trajectory
              </h3>
              <p className="text-sm text-text-secondary mt-1">
                Revenue, EBITDA, and Net Income across the initial five-year horizon
              </p>
            </div>

            {/* Legend */}
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
                <AreaChart
                  data={chartData}
                  margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="gradRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#4088e8" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#4088e8" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gradEBITDA" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#00cc88" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#00cc88" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gradNetIncome" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#d4a852" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#d4a852" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="var(--border-subtle)"
                    vertical={false}
                  />
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
                    stroke="#4088e8"
                    strokeWidth={2}
                    fill="url(#gradRevenue)"
                    dot={{ r: 4, fill: '#4088e8', stroke: 'var(--bg-primary)', strokeWidth: 2 }}
                    activeDot={{ r: 6, fill: '#4088e8', stroke: 'var(--bg-primary)', strokeWidth: 2 }}
                  />
                  <Area
                    type="monotone"
                    dataKey="EBITDA"
                    stroke="#00cc88"
                    strokeWidth={2}
                    fill="url(#gradEBITDA)"
                    dot={{ r: 4, fill: '#00cc88', stroke: 'var(--bg-primary)', strokeWidth: 2 }}
                    activeDot={{ r: 6, fill: '#00cc88', stroke: 'var(--bg-primary)', strokeWidth: 2 }}
                  />
                  <Area
                    type="monotone"
                    dataKey="Net Income"
                    stroke="#d4a852"
                    strokeWidth={2}
                    fill="url(#gradNetIncome)"
                    dot={{ r: 4, fill: '#d4a852', stroke: 'var(--bg-primary)', strokeWidth: 2 }}
                    activeDot={{ r: 6, fill: '#d4a852', stroke: 'var(--bg-primary)', strokeWidth: 2 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Year labels beneath chart */}
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

        {/* ─── Share Value Calculator ─── */}
        <motion.div variants={item}>
          <Card className="p-8">
            <div className="mb-8">
              <p className="text-xs uppercase tracking-[0.2em] font-medium text-accent-gold mb-2">
                Investor Tool
              </p>
              <h3 className="text-2xl font-semibold text-text-primary">
                Share Value Calculator
              </h3>
              <p className="text-sm text-text-secondary mt-1">
                Model projected share value across facility count and valuation scenarios
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Inputs */}
              <div className="space-y-6">
                {/* Share Count Input */}
                <div>
                  <label className="block text-xs uppercase tracking-[0.2em] font-medium text-text-tertiary mb-2">
                    Number of Shares
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={shareCount}
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      if (!isNaN(val) && val > 0) setShareCount(val);
                    }}
                    className="
                      w-full h-12 px-4
                      bg-bg-primary border border-border-subtle rounded-xl
                      font-mono text-lg font-semibold text-text-primary
                      focus:outline-none focus:border-accent-gold/60
                      focus:shadow-[0_0_15px_rgba(212,168,83,0.1)]
                      transition-all duration-300
                      [appearance:textfield]
                      [&::-webkit-outer-spin-button]:appearance-none
                      [&::-webkit-inner-spin-button]:appearance-none
                    "
                  />
                  <p className="text-xs text-text-tertiary mt-1 font-mono">
                    {formatNumber(shareCount)} shares of {formatNumber(TOTAL_SHARES_OUTSTANDING)} total outstanding
                  </p>
                </div>

                {/* Facility Count Slider */}
                <div>
                  <div className="flex justify-between items-baseline mb-2">
                    <label className="text-xs uppercase tracking-[0.2em] font-medium text-text-tertiary">
                      Facility Count
                    </label>
                    <span className="font-mono text-xl font-bold text-accent-gold tabular-nums">
                      {shareFacilities}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={64}
                    value={shareFacilities}
                    onChange={(e) => setShareFacilities(Number(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-text-tertiary mt-1">
                    <span>1 Facility</span>
                    <span>64 Facilities</span>
                  </div>
                </div>

                {/* Active Multiple Display */}
                <div className="rounded-xl bg-bg-primary border border-border-subtle p-4">
                  <p className="text-xs uppercase tracking-[0.2em] font-medium text-text-tertiary mb-1">
                    Active EBITDA Multiple
                  </p>
                  <p className="font-mono text-2xl font-bold text-accent-gold tabular-nums">
                    {selectedMultiple}x
                  </p>
                  <p className="text-xs text-text-tertiary mt-1">
                    {activeScenario
                      ? `${activeScenario.name} methodology`
                      : `Custom ${selectedMultiple}x multiple`}
                  </p>
                </div>
              </div>

              {/* Results */}
              <div className="space-y-4">
                <div className="rounded-2xl bg-gradient-to-br from-accent-gold/10 to-accent-gold/5 border border-accent-gold/20 p-6">
                  <p className="text-xs uppercase tracking-[0.2em] font-medium text-accent-gold mb-2">
                    Projected Share Value
                  </p>
                  <p className="font-mono text-4xl lg:text-5xl font-bold text-accent-gold tabular-nums leading-tight"
                    style={{ textShadow: '0 0 30px rgba(212,168,83,0.2)' }}
                  >
                    {formatCurrency(shareValuation.totalValue, true)}
                  </p>
                  <p className="text-sm text-text-secondary mt-2">
                    for {formatNumber(shareCount)} shares
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-bg-primary border border-border-subtle p-4">
                    <p className="text-xs uppercase tracking-[0.2em] font-medium text-text-tertiary mb-1">
                      Price / Share
                    </p>
                    <p className="font-mono text-xl font-semibold text-data-blue tabular-nums">
                      {formatCurrency(shareValuation.pricePerShare)}
                    </p>
                  </div>
                  <div className="rounded-xl bg-bg-primary border border-border-subtle p-4">
                    <p className="text-xs uppercase tracking-[0.2em] font-medium text-text-tertiary mb-1">
                      Enterprise Value
                    </p>
                    <p className="font-mono text-xl font-semibold text-data-green tabular-nums">
                      {formatCurrency(shareValuation.enterpriseValue, true)}
                    </p>
                  </div>
                </div>

                <div className="rounded-xl bg-bg-primary border border-border-subtle p-4">
                  <p className="text-xs uppercase tracking-[0.2em] font-medium text-text-tertiary mb-1">
                    Calculation Breakdown
                  </p>
                  <p className="font-mono text-xs text-text-tertiary leading-relaxed">
                    {shareFacilities} {shareFacilities === 1 ? 'facility' : 'facilities'} &times; $838M EBITDA &times; {selectedMultiple}x = {formatCurrency(shareValuation.enterpriseValue, true)} EV
                  </p>
                  <p className="font-mono text-xs text-text-tertiary leading-relaxed mt-1">
                    {formatCurrency(shareValuation.enterpriseValue, true)} / {formatNumber(TOTAL_SHARES_OUTSTANDING)} shares = {formatCurrency(shareValuation.pricePerShare)} / share
                  </p>
                  <p className="font-mono text-xs text-accent-gold leading-relaxed mt-1">
                    {formatCurrency(shareValuation.pricePerShare)} &times; {formatNumber(shareCount)} shares = {formatCurrency(shareValuation.totalValue, true)}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* ─── Disclaimer ─── */}
        <motion.div variants={item}>
          <div className="text-center py-6">
            <p className="text-xs text-text-tertiary leading-relaxed max-w-2xl mx-auto">
              These projections are forward-looking estimates based on internal financial models.
              Actual results may vary. This is not investment advice. Past performance does not
              guarantee future results. All figures assume steady-state Year 4 single-facility EBITDA
              of $838M with linear multi-facility scaling.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
