'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

import { capitalPhases } from '@/data/capital';
import { CHART_COLORS } from '@/lib/colors';
import { formatCurrency } from '@/lib/formatters';
import Card from '@/components/ui/Card';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

function statusColor(status: string) {
  switch (status) {
    case 'active': return CHART_COLORS.gold;
    case 'upcoming': return CHART_COLORS.blue;
    default: return 'var(--text-tertiary)';
  }
}

function statusLabel(status: string) {
  switch (status) {
    case 'active': return 'Active';
    case 'upcoming': return 'Upcoming';
    default: return 'Planned';
  }
}

export default function CapitalTimeline() {
  const [expandedPhase, setExpandedPhase] = useState<number | null>(1);

  return (
    <motion.section variants={container} initial="hidden" animate="show" className="mb-16">
      <motion.div variants={item}>
        <h3 className="text-sm uppercase tracking-[0.2em] font-medium text-text-tertiary mb-6">Capital Roadmap</h3>
      </motion.div>

      <motion.div variants={item} className="relative">
        <div className="hidden md:block absolute top-[28px] left-0 right-0 h-[2px] bg-border-subtle z-0" />

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-0 relative z-10">
          {capitalPhases.map((phase) => {
            const isActive = phase.status === 'active';
            const isExpanded = expandedPhase === phase.phase;
            const color = statusColor(phase.status);

            return (
              <motion.div key={phase.phase} variants={item} className="flex flex-col items-center">
                <button
                  onClick={() => setExpandedPhase(isExpanded ? null : phase.phase)}
                  className="group flex flex-col items-center focus:outline-none"
                >
                  <div
                    className="relative flex items-center justify-center w-14 h-14 rounded-full border-2 transition-all duration-300"
                    style={{
                      borderColor: color,
                      backgroundColor: isActive ? 'rgba(212,168,83,0.12)' : 'var(--bg-secondary)',
                      boxShadow: isActive ? '0 0 20px rgba(212,168,83,0.35), 0 0 40px rgba(212,168,83,0.15)' : 'none',
                    }}
                  >
                    <span className="font-mono text-sm font-bold" style={{ color }}>{phase.phase}</span>
                    {isActive && (
                      <span className="absolute inset-0 rounded-full animate-ping opacity-20 border-2 border-accent-gold" />
                    )}
                  </div>
                  <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-center transition-colors duration-200" style={{ color }}>
                    {phase.name}
                  </p>
                  <p className="mt-1 font-mono text-sm tabular-nums text-text-secondary">
                    {phase.amount > 0 ? formatCurrency(phase.amount, true) : 'Funded via Phase 1'}
                  </p>
                  <span
                    className="mt-2 inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider"
                    style={{ color, backgroundColor: `${color}18`, border: `1px solid ${color}30` }}
                  >
                    {statusLabel(phase.status)}
                  </span>
                  <ChevronRight
                    size={14}
                    className="mt-2 transition-transform duration-200 text-text-tertiary group-hover:text-text-secondary"
                    style={{ transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)' }}
                  />
                </button>
              </motion.div>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          {expandedPhase !== null && (() => {
            const phase = capitalPhases.find((p) => p.phase === expandedPhase);
            if (!phase) return null;
            const color = statusColor(phase.status);

            return (
              <motion.div
                key={expandedPhase}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <Card className="mt-6" hover={false}>
                  <div className="flex flex-col md:flex-row md:items-start gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span
                          className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-xs font-bold"
                          style={{ color, backgroundColor: `${color}18` }}
                        >
                          {phase.phase}
                        </span>
                        <h4 className="text-lg font-semibold text-text-primary">{phase.name}</h4>
                        {phase.amount > 0 && (
                          <span className="font-mono text-sm text-accent-gold">{formatCurrency(phase.amount, true)}</span>
                        )}
                      </div>
                      <p className="text-sm leading-relaxed text-text-secondary">{phase.description}</p>
                    </div>
                    <div className="md:w-72 shrink-0">
                      <p className="text-[10px] uppercase tracking-[0.2em] font-medium text-text-tertiary mb-3">Key Deliverables</p>
                      <ul className="space-y-2">
                        {phase.use.map((u, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                            <ChevronRight size={12} className="mt-1 shrink-0" style={{ color }} />
                            {u}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })()}
        </AnimatePresence>
      </motion.div>
    </motion.section>
  );
}
