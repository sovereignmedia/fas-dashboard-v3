'use client';

import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import Card from '@/components/ui/Card';
import SectionHeader from '@/components/ui/SectionHeader';
import { container, item, viewport } from '@/lib/animations';
import {
  policyTailwinds,
  policyCategories,
  type PolicyItem,
} from '@/data/market-context';

interface PolicyCardProps {
  policy: PolicyItem;
}

function CategoryBadge({ category }: { category: PolicyItem['category'] }) {
  const { label, color } = policyCategories[category];

  return (
    <span
      className="inline-flex items-center rounded px-2 py-0.5 font-mono text-xs font-semibold"
      style={{
        backgroundColor: `${color}18`,
        color,
        border: `1px solid ${color}40`,
      }}
    >
      {label}
    </span>
  );
}

function PolicyCard({ policy }: PolicyCardProps) {
  return (
    <Card className="flex h-full flex-col gap-3">
      {/* Top row: badge + date */}
      <div className="flex items-start justify-between gap-2">
        <CategoryBadge category={policy.category} />
        <span className="shrink-0 font-mono text-xs text-text-tertiary">
          {policy.date}
        </span>
      </div>

      {/* Title */}
      <p className="text-sm font-semibold leading-snug text-text-primary">
        {policy.title}
      </p>

      {/* Impact */}
      <p className="flex-1 text-xs leading-relaxed text-text-secondary">
        {policy.impact}
      </p>

      {/* Source link */}
      <a
        href={policy.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-1 inline-flex items-center gap-1 font-mono text-xs text-text-tertiary transition-colors duration-150 hover:text-text-secondary"
        aria-label={`${policy.source} — opens in new tab`}
      >
        <ExternalLink size={11} className="shrink-0" aria-hidden="true" />
        <span>{policy.source}</span>
      </a>
    </Card>
  );
}

export default function PolicyTailwinds() {
  return (
    <section aria-labelledby="policy-tailwinds-heading">
      <SectionHeader
        overline="REGULATORY LANDSCAPE"
        title="Policy Tailwinds"
        subtitle="Executive actions, regulatory shifts, and market signals supporting energy infrastructure investment."
        id="policy-tailwinds-heading"
      />

      <motion.div
        className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
      >
        {policyTailwinds.map((policy) => (
          <motion.div key={policy.title} variants={item} className="flex">
            <PolicyCard policy={policy} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
