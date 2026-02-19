'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';

import { calculateMultiFacility } from '@/data/financials';
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
  facilityCount: number;
}

export default function ShareCalculator({ selectedMultiple, facilityCount }: Props) {
  const shareValuation = useMemo(() => {
    const metrics = calculateMultiFacility(facilityCount, selectedMultiple);
    const pricePerShare = metrics.enterpriseValue / TOTAL_SHARES_OUTSTANDING;
    return {
      enterpriseValue: metrics.enterpriseValue,
      pricePerShare,
      ebitda: metrics.ebitda,
    };
  }, [facilityCount, selectedMultiple]);

  return (
    <motion.div variants={item}>
      <Card className="p-8">
        <div className="mb-8">
          <p className="text-xs uppercase tracking-[0.2em] font-medium text-accent-gold mb-2">Valuation Model</p>
          <h3 className="text-2xl font-semibold text-text-primary">Implied Share Price</h3>
          <p className="text-sm text-text-secondary mt-1">
            Enterprise valuation divided by total shares outstanding
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Primary: Price per Share */}
          <div className="rounded-2xl bg-gradient-to-br from-accent-gold/10 to-accent-gold/5 border border-accent-gold/20 p-6">
            <p className="text-xs uppercase tracking-[0.2em] font-medium text-accent-gold mb-2">
              Implied Price / Share
            </p>
            <p
              className="font-mono text-4xl lg:text-5xl font-bold text-accent-gold tabular-nums leading-tight"
              style={{ textShadow: '0 0 30px rgba(212,168,83,0.2)' }}
            >
              {formatCurrency(shareValuation.pricePerShare)}
            </p>
            <p className="text-sm text-text-secondary mt-2">
              {formatNumber(TOTAL_SHARES_OUTSTANDING)} shares outstanding
            </p>
          </div>

          {/* Enterprise Value */}
          <div className="rounded-xl bg-bg-primary border border-border-subtle p-6">
            <p className="text-xs uppercase tracking-[0.2em] font-medium text-text-tertiary mb-1">Enterprise Value</p>
            <p className="font-mono text-2xl font-semibold text-data-green tabular-nums">
              {formatCurrency(shareValuation.enterpriseValue, true)}
            </p>
            <p className="text-xs text-text-tertiary mt-2">
              {facilityCount} {facilityCount === 1 ? 'facility' : 'facilities'} × {selectedMultiple}x EBITDA
            </p>
          </div>

          {/* Calculation Breakdown */}
          <div className="rounded-xl bg-bg-primary border border-border-subtle p-6">
            <p className="text-xs uppercase tracking-[0.2em] font-medium text-text-tertiary mb-3">Calculation</p>
            <p className="font-mono text-xs text-text-tertiary leading-relaxed">
              {facilityCount} {facilityCount === 1 ? 'facility' : 'facilities'} × {formatCurrency(FACILITY.ebitda, true)} EBITDA × {selectedMultiple}x
            </p>
            <p className="font-mono text-xs text-text-tertiary leading-relaxed mt-1">
              = {formatCurrency(shareValuation.enterpriseValue, true)} EV
            </p>
            <p className="font-mono text-xs text-accent-gold leading-relaxed mt-2">
              {formatCurrency(shareValuation.enterpriseValue, true)} ÷ {formatNumber(TOTAL_SHARES_OUTSTANDING)} shares
            </p>
            <p className="font-mono text-xs text-accent-gold leading-relaxed mt-1">
              = {formatCurrency(shareValuation.pricePerShare)} / share
            </p>
          </div>
        </div>

        <p className="text-[11px] text-text-tertiary mt-6 leading-relaxed">
          Implied share price is a theoretical valuation metric based on modeled enterprise value divided by total shares outstanding. This is not a market price, offer price, or guarantee of future value. Forward-looking projections are subject to material risks and uncertainties.
        </p>
      </Card>
    </motion.div>
  );
}
