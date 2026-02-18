'use client';

import { useState, useMemo } from 'react';
import { products, facilityEconomics, Product } from '@/data/products';
import SectionHeader from '@/components/ui/SectionHeader';
import Card from '@/components/ui/Card';
import { formatCurrency, formatPercent, formatNumber } from '@/lib/formatters';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { motion } from 'framer-motion';
import { RotateCcw } from 'lucide-react';

// ─── Animation Variants ─────────────────────────────────────────────────────

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

// ─── Custom Tooltip for Donut ────────────────────────────────────────────────

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

// ─── Main Page Component ─────────────────────────────────────────────────────

export default function EconomicsPage() {
  // Price adjustment state: maps product id to adjusted price
  const defaultPrices: Record<string, number> = {};
  products.forEach((p) => {
    defaultPrices[p.id] = p.modeledPrice;
  });

  const [adjustedPrices, setAdjustedPrices] = useState<Record<string, number>>(defaultPrices);

  const handlePriceChange = (id: string, price: number) => {
    setAdjustedPrices((prev) => ({ ...prev, [id]: price }));
  };

  const resetPrices = () => {
    setAdjustedPrices({ ...defaultPrices });
  };

  const isModified = useMemo(() => {
    return products.some((p) => adjustedPrices[p.id] !== p.modeledPrice);
  }, [adjustedPrices]);

  // ─── Derived revenue calculations ───────────────────────────────────────

  const adjustedProducts = useMemo(() => {
    return products.map((p) => {
      const adjPrice = adjustedPrices[p.id] ?? p.modeledPrice;
      const adjRevenue = p.annualVolume * adjPrice;
      const delta = adjRevenue - p.annualRevenue;
      return { ...p, adjPrice, adjRevenue, delta };
    });
  }, [adjustedPrices]);

  const totalAdjustedRevenue = useMemo(() => {
    return adjustedProducts.reduce((sum, p) => sum + p.adjRevenue, 0);
  }, [adjustedProducts]);

  const totalRevenueDelta = totalAdjustedRevenue - facilityEconomics.totalRevenue;

  // ─── Donut data ─────────────────────────────────────────────────────────

  const singleFacilityRevenue = products.reduce((sum, p) => sum + p.annualRevenue, 0);

  const donutData = products.map((p) => ({
    ...p,
    pct: (p.annualRevenue / singleFacilityRevenue) * 100,
  }));

  // ─── Waterfall data ─────────────────────────────────────────────────────

  const opEx = facilityEconomics.grossProfit - facilityEconomics.ebitda;

  const waterfallData = [
    {
      label: 'Revenue',
      invisible: 0,
      value: facilityEconomics.totalRevenue,
      displayValue: facilityEconomics.totalRevenue,
      type: 'total',
      fill: '#4088e8',
    },
    {
      label: 'Direct Costs',
      invisible: facilityEconomics.totalRevenue - facilityEconomics.totalDirectCost,
      value: facilityEconomics.totalDirectCost,
      displayValue: facilityEconomics.totalDirectCost,
      type: 'subtract',
      fill: '#e84040',
    },
    {
      label: 'Gross Profit',
      invisible: 0,
      value: facilityEconomics.grossProfit,
      displayValue: facilityEconomics.grossProfit,
      type: 'total',
      fill: '#00cc88',
    },
    {
      label: 'Operating Costs',
      invisible: facilityEconomics.grossProfit - opEx,
      value: opEx,
      displayValue: opEx,
      type: 'subtract',
      fill: '#e88a30',
    },
    {
      label: 'EBITDA',
      invisible: 0,
      value: facilityEconomics.ebitda,
      displayValue: facilityEconomics.ebitda,
      type: 'total',
      fill: '#d4a852',
    },
  ];

  // ─── Key Metrics ────────────────────────────────────────────────────────

  const keyMetrics = [
    {
      label: 'Total Revenue',
      value: formatCurrency(facilityEconomics.totalRevenue, true),
      color: '#4088e8',
    },
    {
      label: 'Gross Margin',
      value: formatPercent(facilityEconomics.grossMargin),
      color: '#00cc88',
    },
    {
      label: 'EBITDA',
      value: formatCurrency(facilityEconomics.ebitda, true),
      color: '#d4a852',
    },
    {
      label: 'Coal Cost / Day',
      value: formatCurrency(facilityEconomics.coalThroughput * facilityEconomics.coalCostPerTon),
      subtitle: `${formatNumber(facilityEconomics.coalThroughput)} t/day × $${facilityEconomics.coalCostPerTon}/t`,
      color: '#c084fc',
    },
  ];

  // ─── Price slider bounds ────────────────────────────────────────────────

  function getSliderBounds(product: Product) {
    const base = product.modeledPrice;
    const min = Math.round(base * 0.5);
    const max = Math.round(base * 2.0);
    const step = base >= 100 ? 1 : 0.5;
    return { min, max, step };
  }

  // ─── Render ─────────────────────────────────────────────────────────────

  return (
    <div>
      <SectionHeader
        overline="Facility Economics"
        title="Product Economics & Revenue"
        subtitle="Single-facility steady-state economics across six product lines. All figures represent Year 4+ annual projections at modeled pricing."
      />

      {/* ── Section 1: Key Metric Cards ────────────────────────────────── */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-10"
      >
        {keyMetrics.map((metric) => (
          <motion.div key={metric.label} variants={item}>
            <Card>
              <div className="flex items-start gap-3">
                <div
                  className="mt-1 w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: metric.color }}
                />
                <div>
                  <p className="text-xs uppercase tracking-[0.15em] font-medium text-text-tertiary mb-1">
                    {metric.label}
                  </p>
                  <p className="text-2xl font-semibold font-mono tabular-nums text-text-primary">
                    {metric.value}
                  </p>
                  {'subtitle' in metric && metric.subtitle && (
                    <p className="text-xs text-text-secondary mt-1">{metric.subtitle}</p>
                  )}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* ── Section 2: Product Mix Donut + Product Cards Grid ──────────── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-10">
        {/* Donut Chart */}
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
                  <div
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: entry.color }}
                  />
                  <span className="text-xs text-text-secondary truncate">
                    {entry.displayName}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Product Cards Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="xl:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {products.map((product) => (
            <motion.div key={product.id} variants={item}>
              <div
                className="relative overflow-hidden rounded-2xl bg-bg-secondary border border-border-subtle hover:border-border-medium transition-all duration-300 p-5 h-full"
              >
                {/* Color-coded left border */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-[3px]"
                  style={{ backgroundColor: product.color }}
                />
                <p className="text-sm font-semibold text-text-primary mb-3 pl-2">
                  {product.displayName}
                </p>
                <div className="space-y-2 pl-2">
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs text-text-tertiary">Volume</span>
                    <span className="text-xs font-mono tabular-nums text-text-secondary">
                      {formatNumber(product.annualVolume)} {product.volumeUnit}
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs text-text-tertiary">Price</span>
                    <span className="text-xs font-mono tabular-nums text-text-secondary">
                      {formatCurrency(product.modeledPrice)}{' '}
                      <span className="text-text-tertiary">{product.priceUnit}</span>
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs text-text-tertiary">Revenue</span>
                    <span className="text-sm font-mono tabular-nums font-semibold text-text-primary">
                      {formatCurrency(product.annualRevenue, true)}
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs text-text-tertiary">Market Size</span>
                    <span className="text-xs font-mono tabular-nums text-text-secondary">
                      {product.globalMarketSize}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ── Section 3: Pricing Sensitivity Tool ───────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mb-10"
      >
        <Card>
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-xs uppercase tracking-[0.15em] font-medium text-accent-gold mb-1">
                Pricing Sensitivity
              </p>
              <p className="text-sm text-text-secondary">
                Adjust product pricing to model revenue impact
              </p>
            </div>
            <button
              onClick={resetPrices}
              disabled={!isModified}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium
                transition-all duration-200
                ${
                  isModified
                    ? 'bg-bg-hover text-text-primary hover:bg-bg-tertiary border border-border-medium'
                    : 'bg-bg-secondary text-text-tertiary border border-border-subtle cursor-not-allowed'
                }
              `}
            >
              <RotateCcw size={14} />
              Reset All
            </button>
          </div>

          {/* Summary row */}
          {isModified && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mb-6 px-4 py-3 rounded-xl bg-bg-primary border border-border-subtle"
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-text-tertiary">Adjusted Total Revenue</span>
                  <p className="text-xl font-mono tabular-nums font-semibold text-text-primary">
                    {formatCurrency(totalAdjustedRevenue, true)}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-text-tertiary">Delta from Base Case</span>
                  <p
                    className={`text-xl font-mono tabular-nums font-semibold ${
                      totalRevenueDelta >= 0 ? 'text-data-green' : 'text-data-red'
                    }`}
                  >
                    {totalRevenueDelta >= 0 ? '+' : ''}
                    {formatCurrency(totalRevenueDelta, true)}
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Product sliders */}
          <div className="space-y-5">
            {adjustedProducts.map((product) => {
              const bounds = getSliderBounds(product);
              const priceDiff = product.adjPrice - product.modeledPrice;
              const pctChange = ((product.adjPrice - product.modeledPrice) / product.modeledPrice) * 100;
              const isChanged = Math.abs(priceDiff) > 0.01;

              return (
                <div
                  key={product.id}
                  className="grid grid-cols-1 lg:grid-cols-[200px_1fr_180px_140px] gap-4 items-center py-3 border-b border-border-subtle last:border-0"
                >
                  {/* Product name */}
                  <div className="flex items-center gap-2">
                    <div
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: product.color }}
                    />
                    <span className="text-sm font-medium text-text-primary truncate">
                      {product.displayName}
                    </span>
                  </div>

                  {/* Slider */}
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-text-tertiary w-14 text-right">
                      {formatCurrency(bounds.min)}
                    </span>
                    <div className="relative flex-1">
                      <input
                        type="range"
                        min={bounds.min}
                        max={bounds.max}
                        step={bounds.step}
                        value={product.adjPrice}
                        onChange={(e) => handlePriceChange(product.id, parseFloat(e.target.value))}
                        className="w-full h-1.5 rounded-full appearance-none cursor-pointer
                          [&::-webkit-slider-thumb]:appearance-none
                          [&::-webkit-slider-thumb]:w-4
                          [&::-webkit-slider-thumb]:h-4
                          [&::-webkit-slider-thumb]:rounded-full
                          [&::-webkit-slider-thumb]:border-2
                          [&::-webkit-slider-thumb]:border-accent-gold
                          [&::-webkit-slider-thumb]:bg-bg-primary
                          [&::-webkit-slider-thumb]:shadow-[0_0_8px_rgba(212,168,83,0.3)]
                          [&::-webkit-slider-thumb]:cursor-pointer
                          [&::-moz-range-thumb]:w-4
                          [&::-moz-range-thumb]:h-4
                          [&::-moz-range-thumb]:rounded-full
                          [&::-moz-range-thumb]:border-2
                          [&::-moz-range-thumb]:border-accent-gold
                          [&::-moz-range-thumb]:bg-bg-primary
                          [&::-moz-range-thumb]:cursor-pointer
                        "
                        style={{
                          background: `linear-gradient(to right, ${product.color} 0%, ${product.color} ${
                            ((product.adjPrice - bounds.min) / (bounds.max - bounds.min)) * 100
                          }%, var(--border-subtle) ${
                            ((product.adjPrice - bounds.min) / (bounds.max - bounds.min)) * 100
                          }%, var(--border-subtle) 100%)`,
                        }}
                      />
                    </div>
                    <span className="text-xs font-mono text-text-tertiary w-14">
                      {formatCurrency(bounds.max)}
                    </span>
                  </div>

                  {/* Current price + delta */}
                  <div className="text-right">
                    <p className="text-sm font-mono tabular-nums font-semibold text-text-primary">
                      {formatCurrency(product.adjPrice)}
                    </p>
                    {isChanged && (
                      <p
                        className={`text-xs font-mono tabular-nums ${
                          priceDiff >= 0 ? 'text-data-green' : 'text-data-red'
                        }`}
                      >
                        {priceDiff >= 0 ? '+' : ''}
                        {pctChange.toFixed(1)}%
                      </p>
                    )}
                  </div>

                  {/* Revenue delta */}
                  <div className="text-right">
                    {isChanged ? (
                      <p
                        className={`text-sm font-mono tabular-nums font-semibold ${
                          product.delta >= 0 ? 'text-data-green' : 'text-data-red'
                        }`}
                      >
                        {product.delta >= 0 ? '+' : ''}
                        {formatCurrency(product.delta, true)}
                      </p>
                    ) : (
                      <p className="text-sm font-mono tabular-nums text-text-tertiary">
                        {formatCurrency(product.annualRevenue, true)}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </motion.div>

      {/* ── Section 4: Margin Waterfall ────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="mb-10"
      >
        <Card>
          <p className="text-xs uppercase tracking-[0.15em] font-medium text-accent-gold mb-1">
            Margin Waterfall
          </p>
          <p className="text-sm text-text-secondary mb-6">
            Revenue to EBITDA bridge (single facility, steady state)
          </p>

          {/* Visual waterfall using bars */}
          <div className="space-y-4">
            {waterfallData.map((step) => {
              const maxVal = facilityEconomics.totalRevenue;
              const barWidth = (step.value / maxVal) * 100;
              const offsetWidth = (step.invisible / maxVal) * 100;
              const isSubtract = step.type === 'subtract';

              return (
                <div key={step.label} className="group">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-medium text-text-primary">{step.label}</span>
                    <span className="text-sm font-mono tabular-nums text-text-secondary">
                      {isSubtract ? '−' : ''}{formatCurrency(step.displayValue, true)}
                    </span>
                  </div>
                  <div className="relative w-full h-8 rounded-lg bg-bg-primary overflow-hidden">
                    {/* Invisible spacer for waterfall offset */}
                    <div
                      className="absolute top-0 left-0 h-full"
                      style={{ width: `${offsetWidth}%` }}
                    />
                    {/* Visible bar */}
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${barWidth}%` }}
                      transition={{ duration: 0.8, delay: 0.8, ease: 'easeOut' }}
                      className="absolute top-0 h-full rounded-lg"
                      style={{
                        left: `${offsetWidth}%`,
                        backgroundColor: step.fill,
                        opacity: isSubtract ? 0.7 : 0.9,
                      }}
                    />
                    {/* Connector dashed line for subtract items */}
                    {isSubtract && (
                      <div
                        className="absolute top-0 h-full border-l border-dashed border-border-medium"
                        style={{ left: `${offsetWidth + barWidth}%` }}
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Summary stats below waterfall */}
          <div className="grid grid-cols-3 gap-6 mt-8 pt-6 border-t border-border-subtle">
            <div className="text-center">
              <p className="text-xs uppercase tracking-[0.15em] text-text-tertiary mb-1">
                Direct Cost Ratio
              </p>
              <p className="text-lg font-mono tabular-nums font-semibold text-text-primary">
                {formatPercent(facilityEconomics.totalDirectCost / facilityEconomics.totalRevenue)}
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs uppercase tracking-[0.15em] text-text-tertiary mb-1">
                Gross Margin
              </p>
              <p className="text-lg font-mono tabular-nums font-semibold text-data-green">
                {formatPercent(facilityEconomics.grossMargin)}
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs uppercase tracking-[0.15em] text-text-tertiary mb-1">
                EBITDA Margin
              </p>
              <p className="text-lg font-mono tabular-nums font-semibold text-accent-gold">
                {formatPercent(facilityEconomics.ebitdaMargin)}
              </p>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
