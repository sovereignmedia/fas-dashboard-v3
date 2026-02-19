'use client';

import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';

import { macroTailwinds } from '@/data/macro';
import { container, item, viewport } from '@/lib/animations';
import Card from '@/components/ui/Card';
import SectionHeader from '@/components/ui/SectionHeader';

export default function MacroTailwinds() {
  return (
    <section>
      <SectionHeader
        overline="Operating Environment"
        title="Market & Macro Environment"
        subtitle="Structural forces across energy demand, policy, industry, and technology that define the operating environment for Frontieras' commercial entry."
      />

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={viewport.section}
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
      >
        {macroTailwinds.map((tailwind) => (
          <motion.div key={tailwind.category} variants={item}>
            <TailwindCard
              category={tailwind.category}
              headline={tailwind.headline}
              body={tailwind.body}
              dataAnchor={tailwind.dataAnchor}
              source={tailwind.source}
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

function TailwindCard({
  category,
  headline,
  body,
  dataAnchor,
  source,
}: {
  category: string;
  headline: string;
  body: string;
  dataAnchor: string;
  source: string;
}) {
  return (
    <Card hover={false} className="h-full flex flex-col">
      {/* Category label */}
      <p className="text-[10px] uppercase tracking-[0.25em] font-semibold text-accent-gold/70 mb-3">
        {category}
      </p>

      {/* Headline */}
      <h3 className="text-base font-medium leading-snug text-text-primary mb-3">
        {headline}
      </h3>

      {/* Body */}
      <p className="text-sm leading-relaxed text-text-secondary flex-1 mb-5">
        {body}
      </p>

      {/* Data anchor */}
      <div className="rounded-xl bg-bg-primary/60 border border-border-subtle px-4 py-3">
        <div className="flex items-start gap-2.5">
          <TrendingUp size={14} className="text-accent-gold/60 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-xs font-medium text-text-primary leading-snug">
              {dataAnchor}
            </p>
            <p className="text-[10px] text-text-tertiary mt-1">
              Source: {source}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
