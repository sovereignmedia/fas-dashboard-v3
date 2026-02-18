'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';

import {
  TOTAL_FACILITY_POTENTIAL,
  SINGLE_FACILITY_EBITDA,
  SINGLE_FACILITY_REVENUE,
  TOTAL_GLOBAL_COAL,
} from '@/data/expansion';
import { VALUATION } from '@/data/model';
import { CHART_COLORS } from '@/lib/colors';
import { formatCurrency, formatNumber } from '@/lib/formatters';
import Card from '@/components/ui/Card';

interface PenetrationCalculatorProps {
  penetration: number;
  onChange: (value: number) => void;
}

export default function PenetrationCalculator({ penetration, onChange }: PenetrationCalculatorProps) {
  const metrics = useMemo(() => {
    const coalProcessed = (TOTAL_GLOBAL_COAL * penetration) / 100;
    const facilities = Math.round((TOTAL_FACILITY_POTENTIAL * penetration) / 100);
    const annualRevenue = facilities * SINGLE_FACILITY_REVENUE;
    const ebitda = facilities * SINGLE_FACILITY_EBITDA;
    const enterpriseValue = ebitda * VALUATION.defaultEbitdaMultiple;
    return { coalProcessed, facilities, annualRevenue, ebitda, enterpriseValue };
  }, [penetration]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card hover={false}>
        <div className="flex items-center gap-2 mb-6">
          <div className="w-2 h-2 rounded-full bg-accent-gold animate-pulse" />
          <p className="text-xs uppercase tracking-[0.2em] font-medium text-text-tertiary">
            Market Penetration Calculator
          </p>
        </div>

        {/* Slider */}
        <div className="mb-8">
          <div className="flex items-end justify-between mb-3">
            <p className="text-sm text-text-secondary">Global coal processing penetration</p>
            <p className="font-mono text-3xl font-bold text-accent-gold">{penetration}%</p>
          </div>
          <input
            type="range"
            min={1}
            max={100}
            value={penetration}
            onChange={(e) => onChange(Number(e.target.value))}
            className="w-full h-2 rounded-full appearance-none cursor-pointer
              bg-border-subtle accent-accent-gold
              [&::-webkit-slider-thumb]:appearance-none
              [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5
              [&::-webkit-slider-thumb]:rounded-full
              [&::-webkit-slider-thumb]:bg-accent-gold
              [&::-webkit-slider-thumb]:shadow-[0_0_12px_rgba(212,168,83,0.5)]
              [&::-webkit-slider-thumb]:border-2
              [&::-webkit-slider-thumb]:border-bg-primary
              [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5
              [&::-moz-range-thumb]:rounded-full
              [&::-moz-range-thumb]:bg-accent-gold
              [&::-moz-range-thumb]:border-2
              [&::-moz-range-thumb]:border-bg-primary"
          />
          <div className="flex justify-between text-[10px] text-text-tertiary mt-1 font-mono">
            <span>1%</span>
            <span>25%</span>
            <span>50%</span>
            <span>75%</span>
            <span>100%</span>
          </div>
        </div>

        {/* Calculated results */}
        <div className="space-y-4">
          <CalcRow label="Facilities Required" value={formatNumber(metrics.facilities)} color={CHART_COLORS.blue} />
          <CalcRow label="Annual Revenue" value={formatCurrency(metrics.annualRevenue, true)} color="var(--text-primary)" />
          <CalcRow label="Annual EBITDA" value={formatCurrency(metrics.ebitda, true)} color={CHART_COLORS.green} />
          <div className="border-t border-border-subtle pt-4">
            <CalcRow label={`Enterprise Value (${VALUATION.defaultEbitdaMultiple}x EBITDA)`} value={formatCurrency(metrics.enterpriseValue, true)} color={CHART_COLORS.gold} large />
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

function CalcRow({ label, value, color, large = false }: { label: string; value: string; color: string; large?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <p className={`${large ? 'text-sm font-medium' : 'text-sm'} text-text-secondary`}>{label}</p>
      <p
        className={`font-mono font-bold tabular-nums ${large ? 'text-2xl' : 'text-lg'}`}
        style={{ color, textShadow: `0 0 16px ${color}30` }}
      >
        {value}
      </p>
    </div>
  );
}
