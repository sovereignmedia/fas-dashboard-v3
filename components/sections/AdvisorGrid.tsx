'use client';

import { motion } from 'framer-motion';

import { advisors } from '@/data/team';
import SectionHeader from '@/components/ui/SectionHeader';
import Card from '@/components/ui/Card';
import InitialsAvatar from '@/components/ui/InitialsAvatar';
import { container, item, viewport } from '@/lib/animations';

function AdvisorCard({ advisor }: { advisor: (typeof advisors)[number] }) {
  return (
    <motion.div variants={item}>
      <Card className="h-full">
        <div className="flex items-start gap-4">
          <InitialsAvatar name={advisor.name} size="sm" />
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-3">
              <h4 className="text-base font-semibold text-text-primary truncate">{advisor.name}</h4>
              <span className="flex-shrink-0 text-[10px] uppercase tracking-[0.15em] font-semibold px-2.5 py-1 rounded-full bg-accent-gold/10 border border-accent-gold/20 text-accent-gold whitespace-nowrap">
                {advisor.role}
              </span>
            </div>
          </div>
        </div>
        <p className="text-sm leading-relaxed text-text-secondary mt-4">{advisor.description}</p>
      </Card>
    </motion.div>
  );
}

export default function AdvisorGrid() {
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
        whileInView="show"
        viewport={viewport.section}
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
      >
        {advisors.map((advisor) => (
          <AdvisorCard key={advisor.name} advisor={advisor} />
        ))}
      </motion.div>
    </section>
  );
}
