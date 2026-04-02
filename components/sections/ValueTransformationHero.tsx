'use client';

import { motion } from 'framer-motion';
import { VALUE_UPLIFT } from '@/data/tam';
import { CHART_COLORS } from '@/lib/colors';
import { container, item, viewport, ease } from '@/lib/animations';
import Card from '@/components/ui/Card';

export default function ValueTransformationHero() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={viewport.section}
    >
      <Card className="!p-10" hover={false}>
        {/* Flow: Coal Value → FASForm → Product Value */}
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-4">
          {/* Left: Coal Value */}
          <motion.div variants={item} className="text-center md:text-left flex-1">
            <p className="text-[10px] uppercase tracking-[0.2em] text-text-tertiary mb-2">
              Annual Coal Value (Combustion)
            </p>
            <p className="font-mono text-5xl font-extralight text-text-secondary">
              ${VALUE_UPLIFT.totalAnnualCoalValue.toFixed(0)}B
            </p>
          </motion.div>

          {/* Center: Arrow */}
          <motion.div
            variants={item}
            className="flex flex-col items-center gap-1 px-4"
          >
            <p className="text-xs font-semibold tracking-wider text-accent-gold">
              FASForm&trade;
            </p>
            <div className="relative w-32 md:w-48 h-[2px] overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full"
                style={{
                  background: `linear-gradient(90deg, var(--text-tertiary), ${CHART_COLORS.gold})`,
                  boxShadow: `0 0 12px ${CHART_COLORS.gold}40`,
                }}
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: ease.default }}
              />
            </div>
          </motion.div>

          {/* Right: FASForm Value */}
          <motion.div variants={item} className="text-center md:text-right flex-1">
            <p className="text-[10px] uppercase tracking-[0.2em] text-text-tertiary mb-2">
              Annual FASForm Value (Fractionation)
            </p>
            <p
              className="font-mono text-5xl font-extralight"
              style={{ color: CHART_COLORS.gold, textShadow: `0 0 24px ${CHART_COLORS.gold}40` }}
            >
              $2.1T
            </p>
          </motion.div>
        </div>

        {/* Bottom: Found Value */}
        <motion.div
          variants={item}
          className="mt-8 pt-6 border-t border-border-subtle text-center"
        >
          <p
            className="font-mono text-3xl font-extralight mb-1"
            style={{ color: CHART_COLORS.green, textShadow: `0 0 20px ${CHART_COLORS.green}40` }}
          >
            ${(VALUE_UPLIFT.annualFoundValue / 1_000).toFixed(1)}T Found Value
          </p>
          <p className="text-sm text-text-tertiary">
            {VALUE_UPLIFT.weightedAverageUplift}x weighted average uplift across 9 patent countries
          </p>
        </motion.div>
      </Card>
    </motion.div>
  );
}
