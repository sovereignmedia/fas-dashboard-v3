'use client';

import { motion } from 'framer-motion';

import { valuationScenarios } from '@/data/financials';
import { formatCurrency } from '@/lib/formatters';
import Card from '@/components/ui/Card';

const SINGLE_FACILITY_EBITDA = 837_513_709;

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

interface Props {
  selectedMultiple: number;
  customMultiple: string;
  onSelectMultiple: (multiple: number) => void;
  onCustomMultipleChange: (value: string) => void;
}

export default function ValuationMethodology({ selectedMultiple, customMultiple, onSelectMultiple, onCustomMultipleChange }: Props) {
  return (
    <>
      {/* Scenario Cards */}
      <motion.div variants={item}>
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-text-primary">Valuation Methodology</h3>
          <p className="text-sm text-text-secondary mt-1">
            Select a valuation framework or enter a custom EBITDA multiple
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {valuationScenarios.map((scenario) => {
            const isActive = selectedMultiple === scenario.multiple && !customMultiple;
            return (
              <motion.button
                key={scenario.id}
                onClick={() => onSelectMultiple(scenario.multiple)}
                whileHover={{ scale: 1.015 }}
                whileTap={{ scale: 0.985 }}
                className="text-left transition-all duration-300"
              >
                <div
                  className={`relative overflow-hidden rounded-2xl p-6 border transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-bg-secondary border-accent-gold/60 shadow-[0_0_30px_rgba(212,168,83,0.08)]'
                      : 'bg-bg-secondary border-border-subtle hover:border-border-medium'
                  }`}
                >
                  <div
                    className="absolute top-0 left-0 right-0 h-[2px] transition-opacity duration-300"
                    style={{ background: `linear-gradient(90deg, transparent, ${scenario.color}${isActive ? 'AA' : '30'}, transparent)` }}
                  />
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className="w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300"
                      style={{ borderColor: isActive ? scenario.color : 'var(--border-medium)' }}
                    >
                      {isActive && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: scenario.color }}
                        />
                      )}
                    </div>
                    <span
                      className="font-mono text-2xl font-bold tabular-nums"
                      style={{ color: isActive ? scenario.color : 'var(--text-tertiary)' }}
                    >
                      {scenario.multiple}x
                    </span>
                  </div>
                  <h4
                    className="text-base font-semibold mb-1 transition-colors duration-300"
                    style={{ color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)' }}
                  >
                    {scenario.name}
                  </h4>
                  <p className="text-xs text-text-tertiary leading-relaxed">{scenario.description}</p>
                  <div className="mt-4 pt-3 border-t border-border-subtle">
                    <p className="text-xs text-text-tertiary">Single Facility EV</p>
                    <p
                      className="font-mono text-lg font-semibold tabular-nums mt-0.5"
                      style={{ color: isActive ? scenario.color : 'var(--text-tertiary)' }}
                    >
                      {formatCurrency(SINGLE_FACILITY_EBITDA * scenario.multiple, true)}
                    </p>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Custom EBITDA Multiple */}
      <motion.div variants={item}>
        <Card className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-text-primary mb-1">Custom EBITDA Multiple</h4>
              <p className="text-xs text-text-tertiary">Override the preset methodology with a custom multiple</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <input
                  type="number"
                  min={1}
                  max={100}
                  step={0.5}
                  value={customMultiple}
                  onChange={(e) => onCustomMultipleChange(e.target.value)}
                  placeholder={String(selectedMultiple)}
                  className="w-28 h-11 px-4 pr-8 bg-bg-primary border border-border-subtle rounded-xl font-mono text-lg font-semibold text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-accent-gold/60 focus:shadow-[0_0_15px_rgba(212,168,83,0.1)] transition-all duration-300 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-text-tertiary font-mono">x</span>
              </div>
              <div className="text-right">
                <p className="text-xs text-text-tertiary">Active Multiple</p>
                <p className="font-mono text-lg font-bold text-accent-gold tabular-nums">{selectedMultiple}x</p>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </>
  );
}
