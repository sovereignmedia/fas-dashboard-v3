'use client';

import { motion } from 'framer-motion';
import { container, item, viewport } from '@/lib/animations';
import SectionHeader from '@/components/ui/SectionHeader';

const OPEX_ITEMS = [
  {
    name: 'CAMS Operations Management',
    percentage: '5%',
    detail: 'Full-scope O&M, safety, environmental, IT/OT, and compliance. Paid as percentage of gross revenue.',
    color: '#00cc88',
    annualEstimate: '$54M',
  },
  {
    name: 'Broker & Distribution Fees',
    percentage: '3.5%',
    detail: 'Product distribution and broker commissions across all output streams.',
    color: '#4088e8',
    annualEstimate: '$38M',
  },
  {
    name: 'Natural Gas (Supplemental)',
    percentage: '~1%',
    detail: 'TransCanada supply for start-up and supplemental process heat. FASGas™ methane reduces ongoing dependency.',
    color: '#e88a30',
    annualEstimate: '$11M',
  },
  {
    name: 'Professional Services',
    percentage: 'Fixed',
    detail: 'Legal, audit, insurance, environmental compliance, and regulatory filings.',
    color: '#d4a852',
    annualEstimate: '$8M',
  },
  {
    name: 'G&A / Corporate',
    percentage: 'Fixed',
    detail: 'Executive compensation, IT systems, office operations, investor relations.',
    color: '#c084fc',
    annualEstimate: '$12M',
  },
];

export default function OpExBreakdown() {
  const totalOpex = 123; // ~$123M estimated

  return (
    <section className="mb-16">
      <SectionHeader
        overline="Operating Expenses"
        title="OpEx Breakdown"
        subtitle="Steady-state annual operating cost structure. CAMS partnership converts what would be fixed headcount into a variable cost tied to revenue performance."
      />

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={viewport.section}
        className="space-y-6"
      >
        {/* Summary stat */}
        <motion.div variants={item} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: 'Total Annual OpEx', value: `~$${totalOpex}M`, sub: 'Estimated steady-state' },
            { label: 'OpEx as % of Revenue', value: '~11.4%', sub: 'vs. $1.08B revenue' },
            { label: 'EBITDA Margin', value: '77.6%', sub: 'After all operating costs' },
          ].map((card) => (
            <div
              key={card.label}
              className="relative overflow-hidden rounded-2xl backdrop-blur-sm p-6 text-center"
              style={{ background: 'var(--card-gradient)', boxShadow: 'var(--shadow-card)' }}
            >
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent-gold/20 to-transparent" />
              <p className="text-[10px] uppercase tracking-[0.15em] font-medium text-text-tertiary mb-2">{card.label}</p>
              <p className="text-3xl font-light text-text-primary">{card.value}</p>
              <p className="text-xs text-text-secondary mt-1">{card.sub}</p>
            </div>
          ))}
        </motion.div>

        {/* OpEx Items */}
        <motion.div variants={item}>
          <div
            className="relative overflow-hidden rounded-2xl backdrop-blur-sm p-8"
            style={{ background: 'var(--card-gradient)', boxShadow: 'var(--shadow-card)' }}
          >
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent-gold/20 to-transparent" />

            <div className="space-y-5">
              {OPEX_ITEMS.map((opex) => (
                <div key={opex.name}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="w-3 h-3 rounded-sm" style={{ background: opex.color }} />
                      <span className="text-sm font-medium text-text-primary">{opex.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-text-secondary">{opex.annualEstimate}/yr</span>
                      <span
                        className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium"
                        style={{ background: `${opex.color}18`, color: opex.color }}
                      >
                        {opex.percentage}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-text-tertiary ml-6 leading-relaxed">{opex.detail}</p>
                </div>
              ))}
            </div>

            {/* Key insight */}
            <div className="mt-6 pt-5 border-t border-white/5">
              <p className="text-xs text-text-tertiary leading-relaxed">
                <span className="text-accent-gold font-medium">Key insight:</span> The CAMS variable cost model means OpEx scales with revenue rather than requiring fixed headcount.
                During ramp-up years, operating costs are proportionally lower. At steady state, the 77.6% EBITDA margin reflects best-in-class operational efficiency for industrial processing.
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
