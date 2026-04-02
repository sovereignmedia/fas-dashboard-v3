'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { TAM_TIERS, TAM_SENSITIVITY, type TamTier } from '@/data/tam';
import { CHART_COLORS } from '@/lib/colors';
import { container, item, viewport } from '@/lib/animations';
import Card from '@/components/ui/Card';

type Scenario = 'base' | 'elevated' | 'high';

const SCENARIO_LABELS: Record<Scenario, string> = {
  base: 'Base Case ($90/bbl diesel)',
  elevated: 'Elevated ($100 Brent)',
  high: 'High ($150 Brent)',
};

function getRevenue(tier: TamTier, scenario: Scenario): number {
  if (scenario === 'elevated') return tier.elevatedRevenue;
  if (scenario === 'high') return tier.highRevenue;
  return tier.baseRevenue;
}

function fmt(value: number, unit: 'B' | 'T'): string {
  return `$${value.toFixed(1)}${unit}`;
}

export default function TamTiers() {
  const [scenario, setScenario] = useState<Scenario>('base');

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={viewport.section}
    >
      {/* Scenario toggle */}
      <motion.div variants={item} className="flex flex-wrap gap-2 mb-8">
        {(Object.keys(SCENARIO_LABELS) as Scenario[]).map((key) => (
          <button
            key={key}
            onClick={() => setScenario(key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              scenario === key
                ? 'bg-accent-gold/20 text-accent-gold border border-accent-gold/30'
                : 'bg-bg-secondary text-text-tertiary border border-border-subtle hover:text-text-secondary'
            }`}
          >
            {SCENARIO_LABELS[key]}
          </button>
        ))}
      </motion.div>

      {/* Tier cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {TAM_TIERS.map((tier) => {
          const rev = getRevenue(tier, scenario);
          const low = rev * TAM_SENSITIVITY.conservative;
          const high = rev * TAM_SENSITIVITY.optimistic;
          const isReserves = tier.tier === 2 || tier.tier === 4;

          return (
            <motion.div key={tier.tier} variants={item}>
              <Card hover={false} className="relative overflow-hidden">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-text-tertiary mb-1">
                      Tier {tier.tier}
                    </p>
                    <p className="text-sm font-medium text-text-primary">{tier.label}</p>
                    <p className="text-xs text-text-tertiary mt-1">{tier.scope}</p>
                  </div>
                  <div className="text-right">
                    <p
                      className="font-mono text-3xl font-extralight tabular-nums"
                      style={{ color: CHART_COLORS.gold, textShadow: `0 0 20px ${CHART_COLORS.gold}40` }}
                    >
                      {fmt(rev, tier.unit)}
                    </p>
                    <p className="text-[10px] text-text-tertiary mt-1 font-mono">
                      {fmt(low, tier.unit)} – {fmt(high, tier.unit)}
                    </p>
                  </div>
                </div>

                {scenario === 'base' && (
                  <div className="flex items-center gap-2 text-xs text-text-tertiary">
                    <span className="font-mono" style={{ color: CHART_COLORS.green }}>
                      EBITDA: {fmt(tier.baseEbitda, tier.unit)}
                    </span>
                  </div>
                )}

                {isReserves && (
                  <p className="text-[10px] text-text-tertiary mt-3 italic border-t border-border-subtle pt-3">
                    Theoretical maximum. Not a revenue forecast. Reserves data: end-2020.
                  </p>
                )}
              </Card>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
