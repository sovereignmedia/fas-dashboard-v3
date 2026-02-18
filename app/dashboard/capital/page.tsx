'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronRight,
  DollarSign,
  Users,
  TrendingUp,
  Zap,
  Building2,
  Briefcase,
} from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import Card from '@/components/ui/Card';
import { capitalPhases, regAPerformance } from '@/data/capital';
import { formatCurrency, formatNumber } from '@/lib/formatters';

/* ────────────────────────────────────────────────────────────
   Framer Motion Variants
   ──────────────────────────────────────────────────────────── */

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

/* ────────────────────────────────────────────────────────────
   Status helpers
   ──────────────────────────────────────────────────────────── */

function statusColor(status: string) {
  switch (status) {
    case 'active':
      return 'var(--accent-gold)';
    case 'upcoming':
      return '#4A9EFF';
    default:
      return 'var(--text-tertiary)';
  }
}

function statusLabel(status: string) {
  switch (status) {
    case 'active':
      return 'Active';
    case 'upcoming':
      return 'Upcoming';
    default:
      return 'Planned';
  }
}

/* ────────────────────────────────────────────────────────────
   Use of Proceeds data ($25M bridge allocation)
   ──────────────────────────────────────────────────────────── */

const useOfProceeds = [
  { label: 'FEL3 Engineering', amount: 11_200_000, pct: 0.448, color: '#4A9EFF' },
  { label: 'Long-Lead Equipment', amount: 5_000_000, pct: 0.20, color: '#00D4AA' },
  { label: 'Permits & Applications', amount: 3_800_000, pct: 0.152, color: '#D4A853' },
  { label: 'Corporate & Legal', amount: 3_000_000, pct: 0.12, color: '#8B5CF6' },
  { label: 'Working Capital', amount: 2_000_000, pct: 0.08, color: '#FF8C42' },
];

/* ────────────────────────────────────────────────────────────
   Strategic Partners data
   ──────────────────────────────────────────────────────────── */

const strategicPartners = [
  {
    name: 'Market Street Capital',
    role: 'IPO Advisory',
    icon: TrendingUp,
    detail: 'Advising on IPO readiness, valuation positioning, and public market strategy for $250M+ offering.',
  },
  {
    name: 'RF Lafferty',
    role: 'Investment Banking',
    icon: Building2,
    detail: 'Full-service investment banking relationship covering capital raises, M&A advisory, and institutional placement.',
  },
  {
    name: 'Texas Capital',
    role: 'Banking Relationship',
    icon: DollarSign,
    detail: 'Primary commercial banking partner providing treasury management and corporate banking services.',
  },
  {
    name: 'Hybrid Financial',
    role: 'Institutional Distribution',
    icon: Users,
    detail: '1,900 institutional followers. Driving institutional awareness and demand ahead of public listing.',
  },
  {
    name: 'GEM',
    role: 'Post-IPO Equity Line',
    icon: Briefcase,
    detail: '$150M committed equity facility. Provides post-IPO growth capital on demand without dilutive financing terms.',
  },
];

/* ────────────────────────────────────────────────────────────
   Page Component
   ──────────────────────────────────────────────────────────── */

export default function CapitalStructurePage() {
  const [expandedPhase, setExpandedPhase] = useState<number | null>(1);

  return (
    <div>
      <SectionHeader
        overline="Capital Structure"
        title="Capital Roadmap & Fundraising"
        subtitle="Five-phase capital strategy from bridge financing through post-IPO execution. $1.275B total capital deployment across the full lifecycle."
      />

      {/* ── Section 1: Capital Roadmap ── */}
      <motion.section
        variants={container}
        initial="hidden"
        animate="show"
        className="mb-16"
      >
        <motion.div variants={item}>
          <h3 className="text-sm uppercase tracking-[0.2em] font-medium text-text-tertiary mb-6">
            Capital Roadmap
          </h3>
        </motion.div>

        {/* Horizontal Timeline */}
        <motion.div variants={item} className="relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-[28px] left-0 right-0 h-[2px] bg-border-subtle z-0" />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-0 relative z-10">
            {capitalPhases.map((phase) => {
              const isActive = phase.status === 'active';
              const isExpanded = expandedPhase === phase.phase;
              const color = statusColor(phase.status);

              return (
                <motion.div
                  key={phase.phase}
                  variants={item}
                  className="flex flex-col items-center"
                >
                  {/* Node */}
                  <button
                    onClick={() =>
                      setExpandedPhase(isExpanded ? null : phase.phase)
                    }
                    className="group flex flex-col items-center focus:outline-none"
                  >
                    {/* Circle */}
                    <div
                      className="relative flex items-center justify-center w-14 h-14 rounded-full border-2 transition-all duration-300"
                      style={{
                        borderColor: color,
                        backgroundColor: isActive
                          ? 'rgba(212,168,83,0.12)'
                          : 'var(--bg-secondary)',
                        boxShadow: isActive
                          ? '0 0 20px rgba(212,168,83,0.35), 0 0 40px rgba(212,168,83,0.15)'
                          : 'none',
                      }}
                    >
                      <span
                        className="font-mono text-sm font-bold"
                        style={{ color }}
                      >
                        {phase.phase}
                      </span>
                      {isActive && (
                        <span className="absolute inset-0 rounded-full animate-ping opacity-20 border-2 border-accent-gold" />
                      )}
                    </div>

                    {/* Label */}
                    <p
                      className="mt-3 text-xs font-semibold uppercase tracking-wider text-center transition-colors duration-200"
                      style={{ color }}
                    >
                      {phase.name}
                    </p>

                    {/* Amount */}
                    <p className="mt-1 font-mono text-sm tabular-nums text-text-secondary">
                      {phase.amount > 0
                        ? formatCurrency(phase.amount, true)
                        : 'Funded via Phase 1'}
                    </p>

                    {/* Status badge */}
                    <span
                      className="mt-2 inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider"
                      style={{
                        color,
                        backgroundColor: `${color}18`,
                        border: `1px solid ${color}30`,
                      }}
                    >
                      {statusLabel(phase.status)}
                    </span>

                    {/* Expand indicator */}
                    <ChevronRight
                      size={14}
                      className="mt-2 transition-transform duration-200 text-text-tertiary group-hover:text-text-secondary"
                      style={{
                        transform: isExpanded
                          ? 'rotate(90deg)'
                          : 'rotate(0deg)',
                      }}
                    />
                  </button>
                </motion.div>
              );
            })}
          </div>

          {/* Expanded Details */}
          <AnimatePresence mode="wait">
            {expandedPhase !== null && (
              <motion.div
                key={expandedPhase}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                {(() => {
                  const phase = capitalPhases.find(
                    (p) => p.phase === expandedPhase
                  );
                  if (!phase) return null;
                  const color = statusColor(phase.status);

                  return (
                    <Card className="mt-6" hover={false}>
                      <div className="flex flex-col md:flex-row md:items-start gap-6">
                        {/* Left: Description */}
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <span
                              className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-xs font-bold"
                              style={{
                                color,
                                backgroundColor: `${color}18`,
                              }}
                            >
                              {phase.phase}
                            </span>
                            <h4 className="text-lg font-semibold text-text-primary">
                              {phase.name}
                            </h4>
                            {phase.amount > 0 && (
                              <span className="font-mono text-sm text-accent-gold">
                                {formatCurrency(phase.amount, true)}
                              </span>
                            )}
                          </div>
                          <p className="text-sm leading-relaxed text-text-secondary">
                            {phase.description}
                          </p>
                        </div>

                        {/* Right: Use of Proceeds list */}
                        <div className="md:w-72 shrink-0">
                          <p className="text-[10px] uppercase tracking-[0.2em] font-medium text-text-tertiary mb-3">
                            Key Deliverables
                          </p>
                          <ul className="space-y-2">
                            {phase.use.map((item, i) => (
                              <li
                                key={i}
                                className="flex items-start gap-2 text-sm text-text-secondary"
                              >
                                <ChevronRight
                                  size={12}
                                  className="mt-1 shrink-0"
                                  style={{ color }}
                                />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </Card>
                  );
                })()}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.section>

      {/* ── Section 2: Reg A+ Performance Dashboard ── */}
      <motion.section
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-50px' }}
        className="mb-16"
      >
        <motion.div variants={item}>
          <h3 className="text-sm uppercase tracking-[0.2em] font-medium text-text-tertiary mb-6">
            Reg A+ Performance
          </h3>
        </motion.div>

        {/* Primary Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
          {[
            {
              label: 'Total Raised',
              value: formatCurrency(regAPerformance.totalRaised, true),
              icon: DollarSign,
              color: '#D4A853',
              subtitle: 'Reg A+ Offering',
            },
            {
              label: 'Shareholders',
              value: formatNumber(regAPerformance.shareholders) + '+',
              icon: Users,
              color: '#4A9EFF',
              subtitle: 'Verified Investors',
            },
            {
              label: 'Share Price',
              value: '$' + regAPerformance.sharePrice.toFixed(2),
              icon: TrendingUp,
              color: '#00D4AA',
              subtitle: 'Current Offering Price',
            },
            {
              label: 'Single-Day Record',
              value: formatCurrency(regAPerformance.singleDayRecord, true),
              icon: Zap,
              color: '#FF8C42',
              subtitle: 'Peak Demand Signal',
            },
          ].map((metric) => (
            <motion.div key={metric.label} variants={item}>
              <Card>
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="flex items-center justify-center w-10 h-10 rounded-xl"
                    style={{ backgroundColor: `${metric.color}15` }}
                  >
                    <metric.icon size={20} style={{ color: metric.color }} />
                  </div>
                </div>
                <p className="text-xs uppercase tracking-[0.15em] font-medium text-text-tertiary mb-1">
                  {metric.label}
                </p>
                <p
                  className="font-mono text-3xl font-bold tabular-nums tracking-tight"
                  style={{ color: metric.color }}
                >
                  {metric.value}
                </p>
                <p className="text-xs text-text-mid mt-1">{metric.subtitle}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Secondary Row: Reg CF Comparison */}
        <motion.div variants={item}>
          <Card hover={false}>
            <p className="text-[10px] uppercase tracking-[0.2em] font-medium text-text-tertiary mb-4">
              Reg CF Campaign Performance
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <p className="text-xs text-text-tertiary mb-1">Reg CF Raised</p>
                <p className="font-mono text-xl font-semibold tabular-nums text-text-primary">
                  {formatCurrency(regAPerformance.regCFRaised, true)}
                </p>
              </div>
              <div>
                <p className="text-xs text-text-tertiary mb-1">Ad Spend</p>
                <p className="font-mono text-xl font-semibold tabular-nums text-text-primary">
                  {formatCurrency(regAPerformance.regCFSpend, true)}
                </p>
              </div>
              <div>
                <p className="text-xs text-text-tertiary mb-1">ROAS</p>
                <p className="font-mono text-xl font-semibold tabular-nums text-data-cyan">
                  {regAPerformance.regCFROAS.toFixed(2)}x
                </p>
              </div>
              <div>
                <p className="text-xs text-text-tertiary mb-1">Investors Funded</p>
                <p className="font-mono text-xl font-semibold tabular-nums text-text-primary">
                  {formatNumber(regAPerformance.regCFFunded)}
                </p>
              </div>
            </div>

            {/* ROAS visual bar */}
            <div className="mt-5 pt-4 border-t border-border-subtle">
              <div className="flex items-center justify-between text-xs text-text-tertiary mb-2">
                <span>Return on Ad Spend</span>
                <span className="font-mono text-data-cyan">
                  {regAPerformance.regCFROAS.toFixed(2)}x
                </span>
              </div>
              <div className="h-2 rounded-full bg-border-subtle overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${Math.min((regAPerformance.regCFROAS / 6) * 100, 100)}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: 'easeOut' }}
                  className="h-full rounded-full bg-gradient-to-r from-[#00D4AA] to-[#4A9EFF]"
                />
              </div>
              <div className="flex justify-between text-[10px] text-text-tertiary mt-1">
                <span>0x</span>
                <span>3x</span>
                <span>6x</span>
              </div>
            </div>
          </Card>
        </motion.div>
      </motion.section>

      {/* ── Section 3: Use of Proceeds ── */}
      <motion.section
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-50px' }}
        className="mb-16"
      >
        <motion.div variants={item}>
          <h3 className="text-sm uppercase tracking-[0.2em] font-medium text-text-tertiary mb-6">
            Use of Proceeds — $25M Bridge Round
          </h3>
        </motion.div>

        <motion.div variants={item}>
          <Card hover={false}>
            {/* Stacked horizontal bar */}
            <div className="h-4 rounded-full overflow-hidden flex mb-6">
              {useOfProceeds.map((item) => (
                <motion.div
                  key={item.label}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${item.pct * 100}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className="h-full first:rounded-l-full last:rounded-r-full"
                  style={{ backgroundColor: item.color }}
                />
              ))}
            </div>

            {/* Breakdown rows */}
            <div className="space-y-4">
              {useOfProceeds.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-3 h-3 rounded-sm shrink-0"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm text-text-secondary">
                      {item.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-sm tabular-nums text-text-secondary">
                      {formatCurrency(item.amount, true)}
                    </span>
                    <span
                      className="font-mono text-xs tabular-nums w-12 text-right"
                      style={{ color: item.color }}
                    >
                      {(item.pct * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="mt-4 pt-4 border-t border-border-subtle flex items-center justify-between">
              <span className="text-sm font-semibold text-text-primary">
                Total Bridge Round
              </span>
              <span className="font-mono text-sm font-bold tabular-nums text-accent-gold">
                {formatCurrency(25_000_000, true)}
              </span>
            </div>
          </Card>
        </motion.div>
      </motion.section>

      {/* ── Section 4: Key Relationships ── */}
      <motion.section
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-50px' }}
      >
        <motion.div variants={item}>
          <h3 className="text-sm uppercase tracking-[0.2em] font-medium text-text-tertiary mb-6">
            Key Relationships
          </h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {strategicPartners.map((partner) => (
            <motion.div key={partner.name} variants={item}>
              <Card>
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-accent-gold/10 shrink-0">
                    <partner.icon size={20} className="text-accent-gold" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm font-semibold text-text-primary truncate">
                      {partner.name}
                    </h4>
                    <p className="text-xs uppercase tracking-wider text-accent-gold mt-0.5">
                      {partner.role}
                    </p>
                    <p className="text-xs leading-relaxed text-text-mid mt-2">
                      {partner.detail}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
