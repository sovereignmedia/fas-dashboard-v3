'use client';

import { motion } from 'framer-motion';

import { useOfProceeds } from '@/data/capital';
import { CAPITAL } from '@/data/model';
import { formatCurrency } from '@/lib/formatters';
import Card from '@/components/ui/Card';
import { container, item, viewport } from '@/lib/animations';

export default function UseOfProceedsSection() {
  return (
    <motion.section
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={viewport.section}
      className="mb-16"
    >
      <motion.div variants={item}>
        <h3 className="text-sm uppercase tracking-[0.2em] font-medium text-text-tertiary mb-6">
          Use of Proceeds — {formatCurrency(CAPITAL.bridgeRoundTotal, true)} Bridge Round
        </h3>
      </motion.div>

      <motion.div variants={item}>
        <Card hover={false}>
          <div className="h-4 rounded-full overflow-hidden flex mb-6">
            {useOfProceeds.map((row) => (
              <motion.div
                key={row.label}
                initial={{ width: 0 }}
                whileInView={{ width: `${row.pct * 100}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="h-full first:rounded-l-full last:rounded-r-full"
                style={{ backgroundColor: row.color }}
              />
            ))}
          </div>

          <div className="space-y-4">
            {useOfProceeds.map((row) => (
              <div key={row.label} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-sm shrink-0" style={{ backgroundColor: row.color }} />
                  <span className="text-sm text-text-secondary">{row.label}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-mono text-sm tabular-nums text-text-secondary">{formatCurrency(row.amount, true)}</span>
                  <span className="font-mono text-xs tabular-nums w-12 text-right" style={{ color: row.color }}>
                    {(row.pct * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-border-subtle flex items-center justify-between">
            <span className="text-sm font-semibold text-text-primary">Total Bridge Round</span>
            <span className="font-mono text-sm font-bold tabular-nums text-accent-gold">{formatCurrency(CAPITAL.bridgeRoundTotal, true)}</span>
          </div>
        </Card>
      </motion.div>
    </motion.section>
  );
}
