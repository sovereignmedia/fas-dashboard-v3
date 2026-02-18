'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Building2, Calendar } from 'lucide-react';

import { timeline } from '@/data/team';
import SectionHeader from '@/components/ui/SectionHeader';
import Card from '@/components/ui/Card';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' as const } },
};

const fadeIn = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

function TimelineEvent({
  event,
  isExpanded,
  onToggle,
  isLast,
}: {
  event: (typeof timeline)[number];
  isExpanded: boolean;
  onToggle: () => void;
  isLast: boolean;
}) {
  return (
    <motion.div variants={item} className="relative flex gap-6 group">
      <div className="flex flex-col items-center flex-shrink-0 w-20">
        <span className="text-xs font-mono font-semibold text-accent-gold tracking-wide mb-3 whitespace-nowrap">
          {event.year}
        </span>
        <div className="relative z-10">
          <div
            className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
              isExpanded
                ? 'bg-accent-gold border-accent-gold shadow-[0_0_12px_rgba(212,168,83,0.4)]'
                : 'bg-bg-primary border-accent-gold/50 group-hover:border-accent-gold'
            }`}
          />
        </div>
        {!isLast && (
          <div className="w-[1px] flex-1 bg-gradient-to-b from-accent-gold/40 to-accent-gold/10 mt-0" />
        )}
      </div>

      <div className="flex-1 pb-8">
        <button onClick={onToggle} className="w-full text-left group/btn">
          <div
            className={`rounded-xl border transition-all duration-300 px-5 py-4 ${
              isExpanded
                ? 'bg-bg-secondary border-accent-gold/30 shadow-[0_0_20px_rgba(212,168,83,0.06)]'
                : 'bg-bg-secondary/60 border-border-subtle hover:border-border-medium hover:bg-bg-secondary'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-text-tertiary" />
                <h4 className="text-[15px] font-semibold text-text-primary">{event.title}</h4>
              </div>
              <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.25 }}>
                <ChevronDown className="w-4 h-4 text-text-tertiary group-hover/btn:text-text-secondary transition-colors" />
              </motion.div>
            </div>

            <AnimatePresence initial={false}>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <p className="text-sm leading-relaxed text-text-secondary mt-3 pt-3 border-t border-border-subtle">
                    {event.description}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </button>
      </div>
    </motion.div>
  );
}

export function CompanyOverview() {
  return (
    <motion.section variants={fadeIn} initial="hidden" animate="show">
      <Card className="mb-12">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 mt-1">
            <div className="w-10 h-10 rounded-xl bg-accent-gold/10 border border-accent-gold/20 flex items-center justify-center">
              <Building2 className="w-5 h-5 text-accent-gold" />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text-primary mb-3">Industrial Restorationist Thesis</h3>
            <p className="text-[15px] leading-relaxed text-text-secondary">
              Frontieras North America is an industrial restoration company converting coal
              &mdash; the world&rsquo;s most abundant and underutilized hydrocarbon resource
              &mdash; into six high-value products through patented FASForm&trade; and
              FASGen&trade; processes. This is not speculative technology. It is a novel
              configuration of proven industrial equipment, validated through a 12-month pilot,
              ASTM testing, SGS Labs verification, and Lloyd&rsquo;s syndicate insurance
              underwriting.
            </p>
          </div>
        </div>
      </Card>
    </motion.section>
  );
}

export default function CompanyTimeline() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <section className="mb-16">
      <SectionHeader
        overline="Company History"
        title="Milestones"
        subtitle="From technology origins to IPO preparation — a decade of systematic de-risking."
      />
      <motion.div variants={container} initial="hidden" animate="show" className="mt-8 ml-2">
        {timeline.map((event, index) => (
          <TimelineEvent
            key={`${event.year}-${event.title}`}
            event={event}
            isExpanded={expandedIndex === index}
            onToggle={() => setExpandedIndex(expandedIndex === index ? null : index)}
            isLast={index === timeline.length - 1}
          />
        ))}
      </motion.div>
    </section>
  );
}
