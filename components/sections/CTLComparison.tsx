'use client';

import { motion } from 'framer-motion';

import Card from '@/components/ui/Card';
import { container, item, viewport } from '@/lib/animations';
import { CTL_DIFFERENTIATION } from '@/data/process';
import { CHART_COLORS } from '@/lib/colors';

export default function CTLComparison() {
  const { fasform, ctl } = CTL_DIFFERENTIATION;

  return (
    <motion.section
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={viewport.section}
    >
      <motion.div variants={item}>
        <Card hover={false}>
          {/* Column headers */}
          <div className="grid grid-cols-[140px_1fr_1fr] gap-4 mb-4 pb-3 border-b border-border-subtle">
            <div />
            <div className="text-center">
              <p className="text-sm font-semibold" style={{ color: CHART_COLORS.gold }}>{fasform.label}</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-text-tertiary">{ctl.label}</p>
            </div>
          </div>

          {/* Comparison rows */}
          <div className="space-y-0">
            {fasform.rows.map((row, i) => {
              const ctlRow = ctl.rows[i];
              return (
                <motion.div
                  key={row.aspect}
                  variants={item}
                  className={`grid grid-cols-[140px_1fr_1fr] gap-4 py-3 ${
                    i < fasform.rows.length - 1 ? 'border-b border-border-subtle/50' : ''
                  }`}
                >
                  <p className="text-xs font-medium uppercase tracking-wider text-text-tertiary self-start pt-0.5">
                    {row.aspect}
                  </p>
                  <p className="text-sm text-text-primary leading-relaxed">{row.value}</p>
                  <p className="text-sm text-text-tertiary leading-relaxed">{ctlRow.value}</p>
                </motion.div>
              );
            })}
          </div>
        </Card>
      </motion.div>
    </motion.section>
  );
}
