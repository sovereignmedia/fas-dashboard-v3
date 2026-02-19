'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, CheckCircle2, Clock, Circle } from 'lucide-react';

import Card from '@/components/ui/Card';
import { RiskCategory, RiskStatus } from '@/data/risks';
import { CHART_COLORS } from '@/lib/colors';

interface RiskCardProps {
  risk: RiskCategory;
  defaultExpanded?: boolean;
}

const severityColors: Record<string, string> = {
  high: CHART_COLORS.red,
  medium: CHART_COLORS.orange,
  low: CHART_COLORS.green,
};

const statusConfig: Record<RiskStatus, { label: string; color: string; Icon: typeof CheckCircle2 }> = {
  executed: { label: 'Executed', color: CHART_COLORS.green, Icon: CheckCircle2 },
  'in-progress': { label: 'In Progress', color: CHART_COLORS.blue, Icon: Clock },
  planned: { label: 'Planned', color: '#6b7280', Icon: Circle },
};

export default function RiskCard({ risk, defaultExpanded = false }: RiskCardProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const severityColor = severityColors[risk.severity];
  const executedCount = risk.mitigations.filter((m) => m.status === 'executed').length;

  return (
    <Card hover={false}>
      {/* Severity bar */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl"
        style={{ background: `linear-gradient(90deg, ${severityColor}, ${severityColor}40)` }}
      />

      <div className="space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-base font-semibold text-text-primary">{risk.name}</h3>
            <p className="text-sm text-text-secondary mt-1">{risk.description}</p>
          </div>
          <span
            className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider ml-3 flex-shrink-0"
            style={{ color: severityColor, backgroundColor: `${severityColor}18`, border: `1px solid ${severityColor}30` }}
          >
            {risk.severity}
          </span>
        </div>

        {/* Institutional concern */}
        <p className="text-xs text-text-tertiary italic">{risk.institutionalConcern}</p>

        {/* Toggle */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-2 text-xs text-accent-gold hover:text-accent-gold-hover transition-colors"
        >
          <span>{executedCount} of {risk.mitigations.length} mitigations executed</span>
          <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown size={14} />
          </motion.div>
        </button>

        {/* Mitigations */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <div className="space-y-4 pt-2 border-t border-border-subtle">
                {risk.mitigations.map((m, i) => {
                  const { label, color, Icon } = statusConfig[m.status];
                  return (
                    <div key={i} className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Icon size={14} style={{ color }} />
                        <span className="text-sm font-medium text-text-primary">{m.strategy}</span>
                        <span
                          className="inline-flex items-center rounded-full px-2 py-0.5 text-[9px] font-medium uppercase tracking-wider"
                          style={{ color, backgroundColor: `${color}18`, border: `1px solid ${color}30` }}
                        >
                          {label}
                        </span>
                      </div>
                      <p className="text-xs text-text-secondary pl-[22px]">{m.detail}</p>
                      {m.partner && (
                        <p className="text-[10px] text-accent-gold pl-[22px]">Partner: {m.partner}</p>
                      )}
                      {m.evidence && (
                        <p className="text-[10px] text-text-tertiary italic pl-[22px]">{m.evidence}</p>
                      )}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Card>
  );
}
