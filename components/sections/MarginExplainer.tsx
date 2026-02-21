'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { products } from '@/data/products';
import { FACILITY, OPERATIONS } from '@/data/model';
import { formatCurrency, formatNumber } from '@/lib/formatters';
import { PRODUCT_COLORS } from '@/lib/colors';
import Card from '@/components/ui/Card';
import SectionHeader from '@/components/ui/SectionHeader';
import { container, item, viewport } from '@/lib/animations';

const TOTAL_OPEX = 123_000_000; // ~$123M estimated annual OpEx

const STEPS = [
  { id: 1, label: 'Input Cost', short: 'Input' },
  { id: 2, label: 'Product Revenue', short: 'Output' },
  { id: 3, label: 'Gross Profit', short: 'Margin' },
  { id: 4, label: 'Operating Costs', short: 'EBITDA' },
  { id: 5, label: 'Why This Works', short: 'Why' },
] as const;

const productColorMap: Record<string, string> = {
  fascarbon: PRODUCT_COLORS.fascarbon,
  diesel: PRODUCT_COLORS.diesel,
  naphtha: PRODUCT_COLORS.naphtha,
  'sulfuric-acid': PRODUCT_COLORS.sulfuricAcid,
  fertilizer: PRODUCT_COLORS.ammoniumSulfate,
};

export default function MarginExplainer() {
  const [activeStep, setActiveStep] = useState(1);

  const canGoBack = activeStep > 1;
  const canGoForward = activeStep < 5;

  return (
    <section className="mb-16">
      <SectionHeader
        overline="Margin Analysis"
        title="Why 87.5% Gross Margin Is Real"
        subtitle="An interactive walkthrough of the economics — from coal input to EBITDA — using data from the financial model."
      />

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={viewport.section}
      >
        <motion.div variants={item}>
          <Card className="!p-0 overflow-hidden">
            {/* Step Navigation */}
            <div className="flex border-b border-white/5">
              {STEPS.map((step) => (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(step.id)}
                  className={`
                    flex-1 py-4 px-3 text-center transition-all duration-300 relative
                    ${activeStep === step.id
                      ? 'text-accent-gold'
                      : activeStep > step.id
                        ? 'text-text-secondary'
                        : 'text-text-tertiary'
                    }
                  `}
                >
                  <div className="flex flex-col items-center gap-1">
                    <span className={`
                      w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-semibold transition-all duration-300
                      ${activeStep === step.id
                        ? 'bg-accent-gold/20 text-accent-gold'
                        : activeStep > step.id
                          ? 'bg-data-green/20 text-data-green'
                          : 'bg-white/5 text-text-tertiary'
                      }
                    `}>
                      {activeStep > step.id ? '✓' : step.id}
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.15em] font-medium hidden sm:block">
                      {step.label}
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.15em] font-medium sm:hidden">
                      {step.short}
                    </span>
                  </div>
                  {activeStep === step.id && (
                    <motion.div
                      layoutId="step-indicator"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent-gold"
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Step Content */}
            <div className="p-8 min-h-[320px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35 }}
                >
                  {activeStep === 1 && <StepInput />}
                  {activeStep === 2 && <StepOutput />}
                  {activeStep === 3 && <StepGrossProfit />}
                  {activeStep === 4 && <StepEbitda />}
                  {activeStep === 5 && <StepWhy />}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Arrows */}
            <div className="flex items-center justify-between px-8 pb-8 pt-4">
              <button
                onClick={() => canGoBack && setActiveStep((s) => s - 1)}
                className={`
                  group flex items-center gap-2.5 h-12 pl-4 pr-5 rounded-full transition-all duration-300
                  ${canGoBack
                    ? 'bg-white/[0.07] border border-white/[0.12] text-text-secondary hover:bg-white/[0.14] hover:border-accent-gold/30 hover:text-text-primary active:scale-[0.97]'
                    : 'bg-white/[0.02] border border-white/[0.04] text-text-tertiary/20 cursor-default'
                  }
                `}
                disabled={!canGoBack}
              >
                <ChevronLeft size={18} className={canGoBack ? 'transition-transform duration-200 group-hover:-translate-x-0.5' : ''} />
                <span className="text-xs font-medium uppercase tracking-[0.12em]">Previous</span>
              </button>
              <span className="text-[10px] uppercase tracking-[0.2em] text-text-tertiary font-medium">
                Step {activeStep} of 5
              </span>
              <button
                onClick={() => canGoForward && setActiveStep((s) => s + 1)}
                className={`
                  group flex items-center gap-2.5 h-12 pl-5 pr-4 rounded-full transition-all duration-300
                  ${canGoForward
                    ? 'bg-white/[0.07] border border-white/[0.12] text-text-secondary hover:bg-white/[0.14] hover:border-accent-gold/30 hover:text-text-primary active:scale-[0.97]'
                    : 'bg-white/[0.02] border border-white/[0.04] text-text-tertiary/20 cursor-default'
                  }
                `}
                disabled={!canGoForward}
              >
                <span className="text-xs font-medium uppercase tracking-[0.12em]">Next</span>
                <ChevronRight size={18} className={canGoForward ? 'transition-transform duration-200 group-hover:translate-x-0.5' : ''} />
              </button>
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ─── Step 1: Input Cost ──────────────────────────────────── */

function StepInput() {
  const annualTons = OPERATIONS.coalThroughputTonsPerDay * 365;
  return (
    <div>
      <h4 className="text-lg font-semibold text-text-primary mb-2">Annual Feedstock Cost</h4>
      <p className="text-sm text-text-secondary mb-8 max-w-xl">
        A single FASForm™ facility processes {formatNumber(OPERATIONS.coalThroughputTonsPerDay)} tons of Pittsburgh #8 coal per day, 365 days per year.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mb-8">
        <MathPill label="Daily throughput" value={`${formatNumber(OPERATIONS.coalThroughputTonsPerDay)} t/day`} />
        <span className="text-text-tertiary text-lg">×</span>
        <MathPill label="Days per year" value="365" />
        <span className="text-text-tertiary text-lg">×</span>
        <MathPill label="Cost per ton" value={`$${OPERATIONS.coalCostPerTon}`} />
        <span className="text-text-tertiary text-lg">=</span>
        <MathPill label="Annual cost" value={formatCurrency(OPERATIONS.annualCoalCost, true)} highlight />
      </div>

      <div className="rounded-xl bg-bg-primary border border-border-subtle p-4 max-w-md">
        <p className="text-xs text-text-tertiary leading-relaxed">
          <span className="text-accent-gold font-medium">Locked pricing:</span> 10-year collared price contract with Greylock Energy for {formatNumber(annualTons * 10, true)} tons total. Feedstock cost is fixed and predictable.
        </p>
      </div>
    </div>
  );
}

/* ─── Step 2: Product Revenue ─────────────────────────────── */

function StepOutput() {
  const revenueProducts = products.filter((p) => p.annualRevenue > 0);
  const totalRevenue = revenueProducts.reduce((sum, p) => sum + p.annualRevenue, 0);

  return (
    <div>
      <h4 className="text-lg font-semibold text-text-primary mb-2">What Comes Out</h4>
      <p className="text-sm text-text-secondary mb-6 max-w-xl">
        Each ton of coal yields five distinct revenue-generating products simultaneously — all priced 17–18% below spot market.
      </p>

      <div className="space-y-3 mb-6">
        {revenueProducts.map((product) => {
          const pctOfTotal = (product.annualRevenue / totalRevenue) * 100;
          const color = productColorMap[product.id] || '#888';
          return (
            <div key={product.id}>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-sm" style={{ background: color }} />
                  <span className="text-sm text-text-primary">{product.displayName}</span>
                </div>
                <span className="font-mono text-sm font-medium tabular-nums" style={{ color }}>
                  {formatCurrency(product.annualRevenue, true)}
                </span>
              </div>
              <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${pctOfTotal}%` }}
                  transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-3 pt-4 border-t border-white/5">
        <span className="text-sm text-text-secondary">Total Annual Revenue</span>
        <span className="font-mono text-2xl font-bold text-accent-gold tabular-nums ml-auto">
          {formatCurrency(totalRevenue, true)}
        </span>
      </div>

      <p className="text-xs text-text-tertiary mt-3">
        Plus two internal-use gas streams (Hydrogen, Methane) enabling zero-waste closed-loop operation.
      </p>
    </div>
  );
}

/* ─── Step 3: Gross Profit ────────────────────────────────── */

function StepGrossProfit() {
  const barMax = FACILITY.totalRevenue;
  const inputPct = (OPERATIONS.annualCoalCost / barMax) * 100;
  const profitPct = (FACILITY.grossProfit / barMax) * 100;

  return (
    <div>
      <h4 className="text-lg font-semibold text-text-primary mb-2">The Delta</h4>
      <p className="text-sm text-text-secondary mb-8 max-w-xl">
        The gap between feedstock cost and product revenue produces an extraordinary gross margin.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <FlowCard label="Feedstock In" value={formatCurrency(OPERATIONS.annualCoalCost, true)} color="#e84040" />
        <FlowCard label="Revenue Out" value={formatCurrency(FACILITY.totalRevenue, true)} color="#00cc88" />
        <FlowCard label="Gross Profit" value={formatCurrency(FACILITY.grossProfit, true)} color="#d4a852" highlight />
      </div>

      {/* Visual bar */}
      <div className="mb-6">
        <div className="h-10 rounded-xl overflow-hidden flex bg-white/5">
          <motion.div
            className="h-full flex items-center justify-center"
            style={{ background: 'rgba(232, 64, 64, 0.5)' }}
            initial={{ width: 0 }}
            animate={{ width: `${inputPct}%` }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <span className="text-[10px] font-medium text-white/80 whitespace-nowrap px-1">
              {inputPct.toFixed(1)}%
            </span>
          </motion.div>
          <motion.div
            className="h-full flex items-center justify-center"
            style={{ background: 'rgba(0, 204, 136, 0.4)' }}
            initial={{ width: 0 }}
            animate={{ width: `${profitPct}%` }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <span className="text-[10px] font-medium text-white/80 whitespace-nowrap px-1">
              {profitPct.toFixed(1)}% Gross Profit
            </span>
          </motion.div>
        </div>
        <div className="flex justify-between mt-2 text-[10px] text-text-tertiary">
          <span>Feedstock cost</span>
          <span>Gross margin: {(FACILITY.grossMargin * 100).toFixed(1)}%</span>
        </div>
      </div>

      <div className="font-mono text-sm text-text-tertiary">
        {formatCurrency(FACILITY.totalRevenue, true)} − {formatCurrency(OPERATIONS.annualCoalCost, true)} = {' '}
        <span className="text-accent-gold font-medium">{formatCurrency(FACILITY.grossProfit, true)} gross profit</span>
      </div>
    </div>
  );
}

/* ─── Step 4: EBITDA ──────────────────────────────────────── */

function StepEbitda() {
  const opexPct = ((TOTAL_OPEX / FACILITY.totalRevenue) * 100).toFixed(1);

  return (
    <div>
      <h4 className="text-lg font-semibold text-text-primary mb-2">Operating Costs → EBITDA</h4>
      <p className="text-sm text-text-secondary mb-8 max-w-xl">
        Subtracting ~{formatCurrency(TOTAL_OPEX, true)} in operating expenses still yields a {(FACILITY.ebitdaMargin * 100).toFixed(1)}% EBITDA margin.
      </p>

      {/* Waterfall */}
      <div className="space-y-3 mb-8">
        <WaterfallRow label="Revenue" value={FACILITY.totalRevenue} color="#00cc88" isPositive />
        <WaterfallRow label="Feedstock (Coal)" value={OPERATIONS.annualCoalCost} color="#e84040" isPositive={false} />
        <WaterfallRow label={`OpEx (~${opexPct}% of revenue)`} value={TOTAL_OPEX} color="#e88a30" isPositive={false} />
        <div className="pt-3 border-t border-white/10">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-accent-gold">EBITDA</span>
            <span className="font-mono text-2xl font-bold text-accent-gold tabular-nums">
              {formatCurrency(FACILITY.ebitda, true)}
            </span>
          </div>
          <p className="text-xs text-text-tertiary mt-1 text-right">
            {(FACILITY.ebitdaMargin * 100).toFixed(1)}% EBITDA margin
          </p>
        </div>
      </div>

      <div className="font-mono text-xs text-text-tertiary leading-relaxed">
        {formatCurrency(FACILITY.totalRevenue, true)} − {formatCurrency(OPERATIONS.annualCoalCost, true)} − ~{formatCurrency(TOTAL_OPEX, true)} ={' '}
        <span className="text-accent-gold">{formatCurrency(FACILITY.ebitda, true)}</span>
      </div>
    </div>
  );
}

/* ─── Step 5: Why This Works ──────────────────────────────── */

function StepWhy() {
  const reasons = [
    {
      title: 'No Catalysts Required',
      detail: 'Unlike Fischer-Tropsch ($100M+ catalyst replacement cycles), FASForm™ uses thermal cracking — no expensive cobalt, iron, or ruthenium catalysts.',
      color: '#00cc88',
    },
    {
      title: 'Multiple Simultaneous Products',
      detail: 'Unlike crude refining (single input → single primary output), every ton of coal yields five revenue streams simultaneously — diversifying revenue risk.',
      color: '#4088e8',
    },
    {
      title: 'Locked Feedstock Pricing',
      detail: '10-year collared coal contract eliminates the feedstock price volatility that destroys margins in natural gas and oil-dependent processes.',
      color: '#d4a852',
    },
    {
      title: '100% Offtake Agreements',
      detail: 'All five revenue products have 10-year letters of intent covering 100% of production — eliminating demand-side risk at the facility level.',
      color: '#e88a30',
    },
    {
      title: 'Zero Waste / Closed Loop',
      detail: 'Hydrogen and methane gas streams are consumed internally for hydrotreating and process heat — nothing is wasted, no disposal costs.',
      color: '#c084fc',
    },
  ];

  return (
    <div>
      <h4 className="text-lg font-semibold text-text-primary mb-2">Why These Margins Are Structurally Defensible</h4>
      <p className="text-sm text-text-secondary mb-6 max-w-xl">
        The margin profile isn&apos;t a projection artifact — it&apos;s a structural consequence of the process design.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {reasons.map((reason) => (
          <div
            key={reason.title}
            className="rounded-xl bg-bg-primary border border-border-subtle p-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full" style={{ background: reason.color }} />
              <span className="text-sm font-medium text-text-primary">{reason.title}</span>
            </div>
            <p className="text-xs text-text-tertiary leading-relaxed">{reason.detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Shared Sub-Components ───────────────────────────────── */

function MathPill({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className={`
      rounded-xl px-4 py-3 text-center min-w-[100px]
      ${highlight
        ? 'bg-accent-gold/10 border border-accent-gold/30'
        : 'bg-bg-primary border border-border-subtle'
      }
    `}>
      <p className="text-[10px] uppercase tracking-[0.15em] text-text-tertiary mb-1">{label}</p>
      <p className={`font-mono text-base font-semibold tabular-nums ${highlight ? 'text-accent-gold' : 'text-text-primary'}`}>
        {value}
      </p>
    </div>
  );
}

function FlowCard({ label, value, color, highlight }: { label: string; value: string; color: string; highlight?: boolean }) {
  return (
    <div
      className={`rounded-xl p-5 text-center ${highlight ? 'border border-accent-gold/30' : ''}`}
      style={{
        background: highlight ? 'rgba(212,168,83,0.08)' : `${color}10`,
      }}
    >
      <p className="text-[10px] uppercase tracking-[0.15em] font-medium text-text-tertiary mb-2">{label}</p>
      <p
        className="font-mono text-2xl font-bold tabular-nums"
        style={{ color: highlight ? '#d4a852' : color }}
      >
        {value}
      </p>
    </div>
  );
}

function WaterfallRow({ label, value, color, isPositive }: { label: string; value: number; color: string; isPositive: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="text-sm" style={{ color: isPositive ? color : '#e84040' }}>
          {isPositive ? '+' : '−'}
        </span>
        <span className="text-sm text-text-secondary">{label}</span>
      </div>
      <span className="font-mono text-sm font-medium tabular-nums" style={{ color }}>
        {isPositive ? '' : '−'}{formatCurrency(value, true)}
      </span>
    </div>
  );
}
