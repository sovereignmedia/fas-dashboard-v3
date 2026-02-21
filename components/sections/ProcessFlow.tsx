'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Flame, Zap } from 'lucide-react';

import Card from '@/components/ui/Card';
import { container, item, viewport } from '@/lib/animations';
import { PROCESS_INPUT, PROCESS_OUTPUTS, PROCESS_ECONOMICS } from '@/data/process';
import { formatCurrency, formatPercent } from '@/lib/formatters';
import { CHART_COLORS } from '@/lib/colors';

const categoryColors: Record<string, string> = {
  solid: CHART_COLORS.green,
  liquid: CHART_COLORS.blue,
  gas: CHART_COLORS.purple,
  chemical: CHART_COLORS.orange,
};

const categoryLabels: Record<string, string> = {
  solid: 'Solid',
  liquid: 'Liquid',
  gas: 'Gas',
  chemical: 'Chemical',
};

export default function ProcessFlow() {
  const revenueOutputs = PROCESS_OUTPUTS.filter((p) => p.annualRevenue > 0);
  const internalOutputs = PROCESS_OUTPUTS.filter((p) => p.annualRevenue === 0);

  return (
    <motion.section
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={viewport.section}
    >
      {/* Three-stage flow */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_2fr] gap-6 lg:gap-8 items-start">

        {/* Stage 1: Input */}
        <motion.div variants={item}>
          <Card hover={false}>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${CHART_COLORS.orange}15` }}>
                  <Flame size={16} style={{ color: CHART_COLORS.orange }} />
                </div>
                <h3 className="text-sm uppercase tracking-[0.15em] font-medium text-text-tertiary">Input</h3>
              </div>
              <p className="text-lg font-semibold text-text-primary">{PROCESS_INPUT.name}</p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-text-tertiary">Annual Volume</span>
                  <span className="text-text-primary font-medium">{PROCESS_INPUT.annualVolume}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-tertiary">Unit Cost</span>
                  <span className="text-text-primary font-medium">{PROCESS_INPUT.unitCost}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-tertiary">Annual Cost</span>
                  <span className="font-mono font-bold text-text-primary">{formatCurrency(PROCESS_INPUT.totalAnnualCost, true)}</span>
                </div>
              </div>
              <p className="text-[10px] text-text-tertiary leading-relaxed">{PROCESS_INPUT.contractDetails}</p>
            </div>
          </Card>
        </motion.div>

        {/* Stage 2: FASForm™ Process */}
        <motion.div variants={item} className="flex flex-col items-center justify-center py-6 lg:py-0">
          <div className="hidden lg:flex flex-col items-center gap-4">
            <ArrowRight size={24} className="text-accent-gold" />
            <div className="w-px h-8 bg-border-subtle" />
            <div className="rounded-2xl border border-accent-gold/30 bg-accent-gold/5 px-6 py-5 text-center">
              <Zap size={20} className="text-accent-gold mx-auto mb-2" />
              <p className="text-[10px] uppercase tracking-[0.2em] text-accent-gold/70 font-medium mb-1">FASForm™</p>
              <p className="text-3xl font-bold text-accent-gold">{PROCESS_ECONOMICS.valueMultiplier}</p>
              <p className="text-[10px] text-text-tertiary mt-1">$1 in → $8 out</p>
            </div>
            <div className="w-px h-8 bg-border-subtle" />
            <ArrowRight size={24} className="text-accent-gold" />
          </div>
          {/* Mobile version */}
          <div className="lg:hidden flex items-center gap-4">
            <div className="h-px flex-1 bg-border-subtle" />
            <div className="rounded-2xl border border-accent-gold/30 bg-accent-gold/5 px-6 py-4 text-center">
              <p className="text-[10px] uppercase tracking-[0.2em] text-accent-gold/70 font-medium">FASForm™</p>
              <p className="text-2xl font-bold text-accent-gold">{PROCESS_ECONOMICS.valueMultiplier}</p>
              <p className="text-[10px] text-text-tertiary">$1 in → $8 out</p>
            </div>
            <div className="h-px flex-1 bg-border-subtle" />
          </div>
        </motion.div>

        {/* Stage 3: Outputs */}
        <motion.div variants={item}>
          <div className="space-y-4">
            {/* Revenue products */}
            <h3 className="text-sm uppercase tracking-[0.15em] font-medium text-text-tertiary">Revenue Products</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {revenueOutputs.map((product, i) => {
                const color = categoryColors[product.category];
                return (
                  <motion.div
                    key={product.id}
                    variants={item}
                    custom={i}
                  >
                    <Card hover={false} className="!p-4">
                      <div className="flex items-start gap-3">
                        <div
                          className="w-1.5 h-full min-h-[48px] rounded-full flex-shrink-0"
                          style={{ backgroundColor: color }}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-semibold text-text-primary truncate">{product.name}</span>
                            <span
                              className="text-[9px] uppercase tracking-wider rounded-full px-1.5 py-0.5 flex-shrink-0"
                              style={{ color, backgroundColor: `${color}18` }}
                            >
                              {categoryLabels[product.category]}
                            </span>
                          </div>
                          <p className="text-xs text-text-tertiary">{product.annualProduction}</p>
                          <p className="font-mono text-sm font-bold mt-1" style={{ color }}>
                            {formatCurrency(product.annualRevenue, true)}
                            <span className="text-text-tertiary font-normal text-[10px]">/yr</span>
                          </p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>

            {/* Internal use products */}
            <h3 className="text-sm uppercase tracking-[0.15em] font-medium text-text-tertiary mt-4">Internal Use</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {internalOutputs.map((product) => {
                const color = categoryColors[product.category];
                return (
                  <Card key={product.id} hover={false} className="!p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-1.5 h-full min-h-[32px] rounded-full flex-shrink-0 opacity-40" style={{ backgroundColor: color }} />
                      <div>
                        <p className="text-sm font-medium text-text-secondary">{product.name}</p>
                        <p className="text-xs text-text-tertiary">{product.annualProduction}</p>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Summary stats */}
      <motion.div variants={item} className="mt-8">
        <Card hover={false} className="!p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <p className="text-[10px] uppercase tracking-[0.15em] text-text-tertiary mb-1">Annual Revenue</p>
              <p className="font-mono text-xl font-bold text-data-green">{formatCurrency(PROCESS_ECONOMICS.totalAnnualRevenue, true)}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.15em] text-text-tertiary mb-1">Gross Margin</p>
              <p className="font-mono text-xl font-bold text-data-blue">{formatPercent(PROCESS_ECONOMICS.grossMargin)}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.15em] text-text-tertiary mb-1">EBITDA</p>
              <p className="font-mono text-xl font-bold text-accent-gold">{formatCurrency(PROCESS_ECONOMICS.ebitda, true)}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.15em] text-text-tertiary mb-1">EBITDA Margin</p>
              <p className="font-mono text-xl font-bold text-data-purple">{formatPercent(PROCESS_ECONOMICS.ebitdaMargin)}</p>
            </div>
          </div>
          <p className="text-xs text-text-tertiary mt-4 leading-relaxed">{PROCESS_ECONOMICS.keyInsight}</p>
        </Card>
      </motion.div>
    </motion.section>
  );
}
