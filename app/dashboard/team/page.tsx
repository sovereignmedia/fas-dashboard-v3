'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Building2, Calendar } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import Card from '@/components/ui/Card';
import { team, advisors, timeline } from '@/data/team';

// ---------------------------------------------------------------------------
// Animation variants
// ---------------------------------------------------------------------------

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.07 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' as const } },
};

const fadeIn = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

// ---------------------------------------------------------------------------
// Company Overview
// ---------------------------------------------------------------------------

function CompanyOverview() {
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
            <h3 className="text-lg font-semibold text-text-primary mb-3">
              Industrial Restorationist Thesis
            </h3>
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

// ---------------------------------------------------------------------------
// Interactive Timeline
// ---------------------------------------------------------------------------

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
    <motion.div
      variants={item}
      className="relative flex gap-6 group"
    >
      {/* Connector line + dot */}
      <div className="flex flex-col items-center flex-shrink-0 w-20">
        {/* Year label */}
        <span className="text-xs font-mono font-semibold text-accent-gold tracking-wide mb-3 whitespace-nowrap">
          {event.year}
        </span>
        {/* Dot */}
        <div className="relative z-10">
          <div
            className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
              isExpanded
                ? 'bg-accent-gold border-accent-gold shadow-[0_0_12px_rgba(212,168,83,0.4)]'
                : 'bg-bg-primary border-accent-gold/50 group-hover:border-accent-gold'
            }`}
          />
        </div>
        {/* Vertical line */}
        {!isLast && (
          <div className="w-[1px] flex-1 bg-gradient-to-b from-accent-gold/40 to-accent-gold/10 mt-0" />
        )}
      </div>

      {/* Content card */}
      <div className="flex-1 pb-8">
        <button
          onClick={onToggle}
          className="w-full text-left group/btn"
        >
          <div
            className={`
              rounded-xl border transition-all duration-300 px-5 py-4
              ${
                isExpanded
                  ? 'bg-bg-secondary border-accent-gold/30 shadow-[0_0_20px_rgba(212,168,83,0.06)]'
                  : 'bg-bg-secondary/60 border-border-subtle hover:border-border-medium hover:bg-bg-secondary'
              }
            `}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-text-tertiary" />
                <h4 className="text-[15px] font-semibold text-text-primary">
                  {event.title}
                </h4>
              </div>
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.25 }}
              >
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

function InteractiveTimeline() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section className="mb-16">
      <SectionHeader
        overline="Company History"
        title="Milestones"
        subtitle="From technology origins to IPO preparation — a decade of systematic de-risking."
      />
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mt-8 ml-2"
      >
        {timeline.map((event, index) => (
          <TimelineEvent
            key={`${event.year}-${event.title}`}
            event={event}
            isExpanded={expandedIndex === index}
            onToggle={() => handleToggle(index)}
            isLast={index === timeline.length - 1}
          />
        ))}
      </motion.div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Initials Avatar
// ---------------------------------------------------------------------------

function InitialsAvatar({ name, size = 'md' }: { name: string; size?: 'sm' | 'md' }) {
  const initials = name
    .split(/[\s(]+/)
    .filter((s) => s.length > 0)
    .map((s) => s[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const sizeClasses = size === 'md' ? 'w-12 h-12 text-base' : 'w-10 h-10 text-sm';

  return (
    <div
      className={`${sizeClasses} rounded-full bg-accent-gold/10 border border-accent-gold/20 flex items-center justify-center font-semibold text-accent-gold tracking-wide flex-shrink-0`}
    >
      {initials}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Management Grid
// ---------------------------------------------------------------------------

function ExecutiveCard({ member }: { member: (typeof team)[number] }) {
  return (
    <motion.div variants={item}>
      <Card className="h-full">
        <div className="flex items-start gap-4">
          <InitialsAvatar name={member.name} />
          <div className="min-w-0">
            <h4 className="text-lg font-semibold text-text-primary truncate">
              {member.name}
            </h4>
            <p className="text-xs uppercase tracking-[0.15em] font-medium text-accent-gold mt-0.5">
              {member.title}
            </p>
          </div>
        </div>
        <p className="text-sm leading-relaxed text-text-secondary mt-4">
          {member.description}
        </p>
      </Card>
    </motion.div>
  );
}

function ManagementGrid() {
  return (
    <section className="mb-16">
      <SectionHeader
        overline="Leadership"
        title="Executive Team"
        subtitle="Experienced operators assembling the team to take Frontieras public."
      />
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {team.map((member) => (
          <ExecutiveCard key={member.name} member={member} />
        ))}
      </motion.div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Advisory Partners Grid
// ---------------------------------------------------------------------------

function AdvisorCard({ advisor }: { advisor: (typeof advisors)[number] }) {
  return (
    <motion.div variants={item}>
      <Card className="h-full">
        <div className="flex items-start gap-4">
          <InitialsAvatar name={advisor.name} size="sm" />
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-3">
              <h4 className="text-base font-semibold text-text-primary truncate">
                {advisor.name}
              </h4>
              <span className="flex-shrink-0 text-[10px] uppercase tracking-[0.15em] font-semibold px-2.5 py-1 rounded-full bg-accent-gold/10 border border-accent-gold/20 text-accent-gold whitespace-nowrap">
                {advisor.role}
              </span>
            </div>
          </div>
        </div>
        <p className="text-sm leading-relaxed text-text-secondary mt-4">
          {advisor.description}
        </p>
      </Card>
    </motion.div>
  );
}

function AdvisoryPartnersGrid() {
  return (
    <section className="mb-8">
      <SectionHeader
        overline="Strategic Partners"
        title="Advisory Network"
        subtitle="Institutional-grade advisory partners supporting IPO execution and growth."
      />
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
      >
        {advisors.map((advisor) => (
          <AdvisorCard key={advisor.name} advisor={advisor} />
        ))}
      </motion.div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function TeamPage() {
  return (
    <div>
      <SectionHeader
        overline="Team & Genesis"
        title="The People Behind Frontieras"
        subtitle="From a 30-year industrial engineering career to a world-class advisory network — the team assembling to deliver the reindustrialization thesis."
      />

      <CompanyOverview />
      <InteractiveTimeline />
      <ManagementGrid />
      <AdvisoryPartnersGrid />
    </div>
  );
}
