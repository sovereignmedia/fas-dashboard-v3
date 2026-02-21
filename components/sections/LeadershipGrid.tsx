'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { team } from '@/data/team';
import SectionHeader from '@/components/ui/SectionHeader';
import Card from '@/components/ui/Card';
import InitialsAvatar from '@/components/ui/InitialsAvatar';
import { container, item, viewport, spring } from '@/lib/animations';

function ExecutiveCard({ member }: { member: (typeof team)[number] }) {
  const [expanded, setExpanded] = useState(false);
  const hasFullBio = 'fullBio' in member && member.fullBio;

  return (
    <motion.div variants={item}>
      <Card className="h-full">
        <div className="flex items-start gap-4">
          <InitialsAvatar name={member.name} />
          <div className="min-w-0">
            <h4 className="text-lg font-semibold text-text-primary truncate">{member.name}</h4>
            <p className="text-xs uppercase tracking-[0.15em] font-medium text-accent-gold mt-0.5">
              {member.title}
            </p>
          </div>
        </div>
        <p className="text-sm leading-relaxed text-text-secondary mt-4">{member.description}</p>

        {hasFullBio && (
          <>
            <button
              onClick={() => setExpanded(!expanded)}
              className="mt-3 text-xs font-medium uppercase tracking-wider transition-colors duration-200"
              style={{ color: expanded ? '#d4a852' : 'var(--text-tertiary)' }}
            >
              {expanded ? '▲ Hide Full Bio' : '▼ Read Full Bio'}
            </button>

            <AnimatePresence>
              {expanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={spring.default}
                  className="overflow-hidden"
                >
                  <div className="pt-3 mt-3 border-t border-white/5">
                    <p className="text-sm leading-relaxed text-text-secondary">
                      {member.fullBio}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </Card>
    </motion.div>
  );
}

export default function LeadershipGrid() {
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
        whileInView="show"
        viewport={viewport.section}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {team.map((member) => (
          <ExecutiveCard key={member.name} member={member} />
        ))}
      </motion.div>
    </section>
  );
}
