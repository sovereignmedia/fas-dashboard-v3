'use client';

import { motion } from 'framer-motion';

import { team } from '@/data/team';
import SectionHeader from '@/components/ui/SectionHeader';
import Card from '@/components/ui/Card';
import InitialsAvatar from '@/components/ui/InitialsAvatar';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' as const } },
};

function ExecutiveCard({ member }: { member: (typeof team)[number] }) {
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
