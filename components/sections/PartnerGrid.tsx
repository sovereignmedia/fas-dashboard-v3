'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Clock, Circle, Award } from 'lucide-react';

import Card from '@/components/ui/Card';
import { container, item, viewport } from '@/lib/animations';
import { PARTNERS, type Partner } from '@/data/partnerships';
import { CHART_COLORS } from '@/lib/colors';

type Category = 'all' | Partner['category'];

const CATEGORY_TABS: { value: Category; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'operations', label: 'Operations' },
  { value: 'engineering', label: 'Engineering' },
  { value: 'infrastructure', label: 'Infrastructure' },
  { value: 'procurement', label: 'Procurement' },
  { value: 'insurance', label: 'Insurance' },
  { value: 'licensing', label: 'Licensing' },
  { value: 'capital-markets', label: 'Capital Markets' },
];

const statusConfig: Record<string, { label: string; color: string; Icon: typeof CheckCircle2 }> = {
  executed: { label: 'Executed', color: CHART_COLORS.green, Icon: CheckCircle2 },
  'in-progress': { label: 'In Progress', color: CHART_COLORS.blue, Icon: Clock },
  planned: { label: 'Planned', color: '#6b7280', Icon: Circle },
};

export default function PartnerGrid() {
  const [active, setActive] = useState<Category>('all');

  const filtered = active === 'all' ? PARTNERS : PARTNERS.filter((p) => p.category === active);
  const cams = filtered.find((p) => p.id === 'cams');
  const others = filtered.filter((p) => p.id !== 'cams');

  return (
    <motion.section
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={viewport.section}
    >
      {/* Filter tabs */}
      <motion.div variants={item} className="flex gap-2 flex-wrap mb-6">
        {CATEGORY_TABS.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActive(tab.value)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
              active === tab.value
                ? 'bg-accent-gold/15 text-accent-gold border border-accent-gold/30'
                : 'text-text-tertiary hover:text-text-secondary border border-border-subtle hover:border-border-subtle/80'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
        >
          {/* CAMS featured card */}
          {cams && (
            <div className="mb-6">
              <Card hover={false} className="!p-6 border-accent-gold/20">
                <div className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${CHART_COLORS.gold}15` }}
                  >
                    <Award size={20} style={{ color: CHART_COLORS.gold }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-lg font-semibold text-text-primary">{cams.name}</h3>
                      <StatusBadge status={cams.agreementStatus} />
                      {cams.aum && (
                        <span className="text-xs text-text-tertiary">{cams.aum} AUM</span>
                      )}
                    </div>
                    <p className="text-sm text-accent-gold/80 font-medium mb-2">{cams.role}</p>
                    <p className="text-sm text-text-secondary mb-3">{cams.description}</p>
                    {cams.highlights && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {cams.highlights.map((h, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <div className="w-1 h-1 rounded-full bg-accent-gold flex-shrink-0" />
                            <span className="text-xs text-text-tertiary">{h}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Other partners */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {others.map((partner) => (
              <Card key={partner.id} hover={false} className="!p-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-sm font-semibold text-text-primary truncate">{partner.name}</h4>
                    <StatusBadge status={partner.agreementStatus} />
                  </div>
                  <p className="text-xs font-medium text-accent-gold/70">{partner.role}</p>
                  <p className="text-xs text-text-secondary leading-relaxed">{partner.description}</p>
                  <p className="text-[10px] text-text-tertiary">{partner.credentials}</p>
                </div>
              </Card>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.section>
  );
}

function StatusBadge({ status }: { status: string }) {
  const config = statusConfig[status];
  if (!config) return null;
  const { label, color, Icon } = config;
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-medium uppercase tracking-wider flex-shrink-0"
      style={{ color, backgroundColor: `${color}18`, border: `1px solid ${color}30` }}
    >
      <Icon size={10} />
      {label}
    </span>
  );
}
