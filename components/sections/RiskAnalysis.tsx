'use client';

import { motion } from 'framer-motion';

import { container, item, viewport } from '@/lib/animations';
import { RISK_CATEGORIES } from '@/data/risks';
import RiskCard from '@/components/cards/RiskCard';
import { CHART_COLORS } from '@/lib/colors';

export default function RiskAnalysis() {
  const totalMitigations = RISK_CATEGORIES.reduce((sum, r) => sum + r.mitigations.length, 0);
  const executedCount = RISK_CATEGORIES.reduce(
    (sum, r) => sum + r.mitigations.filter((m) => m.status === 'executed').length,
    0
  );

  return (
    <motion.section
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={viewport.section}
    >
      {/* Header stat */}
      <motion.div variants={item} className="mb-6 flex items-baseline gap-2">
        <span className="font-mono text-2xl font-bold" style={{ color: CHART_COLORS.green }}>
          {executedCount}/{totalMitigations}
        </span>
        <span className="text-sm text-text-tertiary">mitigations executed</span>
      </motion.div>

      {/* Risk cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {RISK_CATEGORIES.map((risk) => (
          <motion.div key={risk.id} variants={item}>
            <RiskCard risk={risk} defaultExpanded={false} />
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
