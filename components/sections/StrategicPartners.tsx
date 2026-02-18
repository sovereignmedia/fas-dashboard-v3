'use client';

import { motion } from 'framer-motion';
import {
  DollarSign,
  Users,
  TrendingUp,
  Building2,
  Briefcase,
  Shield,
  Settings,
  Hammer,
  type LucideIcon,
} from 'lucide-react';

import { strategicPartners } from '@/data/capital';
import Card from '@/components/ui/Card';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const iconMap: Record<string, LucideIcon> = {
  TrendingUp,
  Building2,
  DollarSign,
  Users,
  Briefcase,
  Shield,
  Settings,
  Hammer,
};

export default function StrategicPartnersSection() {
  return (
    <motion.section
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-50px' }}
    >
      <motion.div variants={item}>
        <h3 className="text-sm uppercase tracking-[0.2em] font-medium text-text-tertiary mb-6">Key Relationships</h3>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {strategicPartners.map((partner) => {
          const Icon = iconMap[partner.iconKey];
          return (
            <motion.div key={partner.name} variants={item}>
              <Card>
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-accent-gold/10 shrink-0">
                    {Icon && <Icon size={20} className="text-accent-gold" />}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm font-semibold text-text-primary truncate">{partner.name}</h4>
                    <p className="text-xs uppercase tracking-wider text-accent-gold mt-0.5">{partner.role}</p>
                    <p className="text-xs leading-relaxed text-text-secondary mt-2">{partner.detail}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}
