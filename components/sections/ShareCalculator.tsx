'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';

import { valuationScenarios, calculateMultiFacility } from '@/data/financials';
import { CAPITAL, FACILITY } from '@/data/model';
import { formatCurrency, formatNumber } from '@/lib/formatters';
import Card from '@/components/ui/Card';

const TOTAL_SHARES_OUTSTANDING = CAPITAL.totalSharesOutstanding;

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

interface Props {
  selectedMultiple: number;
}

export default function ShareCalculator({ selectedMultiple }: Props) {
  const [shareCount, setShareCount] = useState(10000);
  const [shareFacilities, setShareFacilities] = useState(1);

  const activeScenario = valuationScenarios.find((s) => s.multiple === selectedMultiple);

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

  return (
    <motion.div variants={item}>
      <Card className="p-8">
        <div className="mb-8">
          <p className="text-xs uppercase tracking-[0.2em] font-medium text-accent-gold mb-2">Investor Tool</p>
          <h3 className="text-2xl font-semibold text-text-primary">Share Value Calculator</h3>
          <p className="text-sm text-text-secondary mt-1">
            Model projected share value across facility count and valuation scenarios
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Inputs */}
          <div className="space-y-6">
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
                className="w-full h-12 px-4 bg-bg-primary border border-border-subtle rounded-xl font-mono text-lg font-semibold text-text-primary focus:outline-none focus:border-accent-gold/60 focus:shadow-[0_0_15px_rgba(212,168,83,0.1)] transition-all duration-300 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
              <p className="text-xs text-text-tertiary mt-1 font-mono">
                {formatNumber(shareCount)} shares of {formatNumber(TOTAL_SHARES_OUTSTANDING)} total outstanding
              </p>
            </div>

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

            <div className="rounded-xl bg-bg-primary border border-border-subtle p-4">
              <p className="text-xs uppercase tracking-[0.2em] font-medium text-text-tertiary mb-1">
                Active EBITDA Multiple
              </p>
              <p className="font-mono text-2xl font-bold text-accent-gold tabular-nums">{selectedMultiple}x</p>
              <p className="text-xs text-text-tertiary mt-1">
                {activeScenario ? `${activeScenario.name} methodology` : `Custom ${selectedMultiple}x multiple`}
              </p>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-4">
            <div className="rounded-2xl bg-gradient-to-br from-accent-gold/10 to-accent-gold/5 border border-accent-gold/20 p-6">
              <p className="text-xs uppercase tracking-[0.2em] font-medium text-accent-gold mb-2">
                Projected Share Value
              </p>
              <p
                className="font-mono text-4xl lg:text-5xl font-bold text-accent-gold tabular-nums leading-tight"
                style={{ textShadow: '0 0 30px rgba(212,168,83,0.2)' }}
              >
                {formatCurrency(shareValuation.totalValue, true)}
              </p>
              <p className="text-sm text-text-secondary mt-2">for {formatNumber(shareCount)} shares</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-bg-primary border border-border-subtle p-4">
                <p className="text-xs uppercase tracking-[0.2em] font-medium text-text-tertiary mb-1">Price / Share</p>
                <p className="font-mono text-xl font-semibold text-data-blue tabular-nums">
                  {formatCurrency(shareValuation.pricePerShare)}
                </p>
              </div>
              <div className="rounded-xl bg-bg-primary border border-border-subtle p-4">
                <p className="text-xs uppercase tracking-[0.2em] font-medium text-text-tertiary mb-1">Enterprise Value</p>
                <p className="font-mono text-xl font-semibold text-data-green tabular-nums">
                  {formatCurrency(shareValuation.enterpriseValue, true)}
                </p>
              </div>
            </div>

            <div className="rounded-xl bg-bg-primary border border-border-subtle p-4">
              <p className="text-xs uppercase tracking-[0.2em] font-medium text-text-tertiary mb-1">Calculation Breakdown</p>
              <p className="font-mono text-xs text-text-tertiary leading-relaxed">
                {shareFacilities} {shareFacilities === 1 ? 'facility' : 'facilities'} &times; {formatCurrency(FACILITY.ebitda, true)} EBITDA &times; {selectedMultiple}x = {formatCurrency(shareValuation.enterpriseValue, true)} EV
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
  );
}
