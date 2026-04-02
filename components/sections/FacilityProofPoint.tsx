'use client';

import { motion } from 'framer-motion';
import { FACILITY, OPERATIONS } from '@/data/model';
import { products } from '@/data/products';
import { CHART_COLORS } from '@/lib/colors';
import { item, viewport } from '@/lib/animations';
import { formatCurrency, formatNumber, formatPercent } from '@/lib/formatters';
import Card from '@/components/ui/Card';

export default function FacilityProofPoint() {
  const steps = [
    { label: 'Feedstock Cost', value: formatCurrency(OPERATIONS.annualCoalCost, true), color: 'var(--text-secondary)' },
    { label: 'Annual Revenue', value: formatCurrency(FACILITY.totalRevenue, true), color: CHART_COLORS.gold },
    { label: 'Annual EBITDA', value: formatCurrency(FACILITY.ebitda, true), color: CHART_COLORS.green },
  ];

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={viewport.section}
      variants={item}
    >
      <Card hover={false} className="border-t-2 border-t-accent-gold/30">
        <p className="text-[10px] uppercase tracking-[0.2em] text-accent-gold mb-6">
          The Unit Economics Behind Every Number on This Page
        </p>

        {/* Flow: Cost → Revenue → EBITDA */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-2 mb-6">
          {steps.map((step, i) => (
            <div key={step.label} className="flex items-center gap-2">
              <div className="text-center">
                <p className="text-xs text-text-tertiary mb-1">{step.label}</p>
                <p className="font-mono text-2xl font-bold" style={{ color: step.color }}>
                  {step.value}
                </p>
              </div>
              {i < steps.length - 1 && (
                <span className="text-text-tertiary text-xl hidden md:block mx-2">&rarr;</span>
              )}
            </div>
          ))}
        </div>

        {/* Supporting stats */}
        <div className="grid grid-cols-3 gap-4 py-4 border-t border-border-subtle">
          <div className="text-center">
            <p className="font-mono text-lg font-bold text-text-primary">
              {formatPercent(FACILITY.ebitdaMargin)}
            </p>
            <p className="text-[10px] text-text-tertiary uppercase tracking-wider">EBITDA Margin</p>
          </div>
          <div className="text-center">
            <p className="font-mono text-lg font-bold text-text-primary">
              {formatNumber(OPERATIONS.coalThroughputTonsPerDay)}
            </p>
            <p className="text-[10px] text-text-tertiary uppercase tracking-wider">Tons/Day</p>
          </div>
          <div className="text-center">
            <p className="font-mono text-lg font-bold text-text-primary">{products.length}</p>
            <p className="text-[10px] text-text-tertiary uppercase tracking-wider">Revenue Streams</p>
          </div>
        </div>

        {/* Framing text */}
        <p className="text-sm text-text-tertiary mt-4 leading-relaxed">
          A single FASForm&trade; facility converts {formatCurrency(OPERATIONS.annualCoalCost, true)} of Pittsburgh #8 coal into {formatCurrency(FACILITY.totalRevenue, true)} of commodity products annually. These unit economics — validated by the Operis financial model — are the building blocks of every projection on this page.
        </p>
      </Card>
    </motion.div>
  );
}
