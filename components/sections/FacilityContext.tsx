'use client';

import { motion } from 'framer-motion';
import { FACILITY_CONTEXT } from '@/data/tam';
import { CHART_COLORS } from '@/lib/colors';
import { container, item, viewport } from '@/lib/animations';
import Card from '@/components/ui/Card';

export default function FacilityContext() {
  const pct = (FACILITY_CONTEXT.plannedFacilities / FACILITY_CONTEXT.totalFacilitiesSupported) * 100;

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={viewport.section}
    >
      {/* Progress bar */}
      <motion.div variants={item}>
        <Card hover={false}>
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-medium text-text-primary">
              10-Year Buildout: {FACILITY_CONTEXT.plannedFacilities} of {FACILITY_CONTEXT.totalFacilitiesSupported.toLocaleString()} Supportable Facilities
            </p>
            <p className="font-mono text-sm text-accent-gold">{pct.toFixed(2)}%</p>
          </div>
          <div className="relative h-6 rounded-full overflow-hidden bg-bg-tertiary">
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full"
              style={{ background: `linear-gradient(90deg, ${CHART_COLORS.gold}, ${CHART_COLORS.green})` }}
              initial={{ width: 0 }}
              whileInView={{ width: `${Math.max(pct, 1.5)}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
            />
            <div className="absolute inset-0 flex items-center pl-3">
              <span className="text-[10px] font-mono font-bold text-bg-primary">16</span>
            </div>
          </div>
          <p className="text-xs text-text-tertiary mt-3">
            The 16-facility plan leaves 99.5% of the addressable market untouched — the opportunity is structurally larger than any reasonable buildout.
          </p>
        </Card>
      </motion.div>

      {/* Stat row */}
      <motion.div variants={item} className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        <StatPill label="Supportable to Planned" value={`${FACILITY_CONTEXT.ratioSupportedToPlanned}:1`} />
        <StatPill label="16-Fac Revenue" value="$14.6B" />
        <StatPill label="16-Fac EBITDA" value="$11.1B" />
        <StatPill label="Market Unaddressed" value="99.5%" />
      </motion.div>
    </motion.div>
  );
}

function StatPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-center rounded-xl bg-bg-secondary border border-border-subtle px-4 py-3 text-center">
      <p className="text-[10px] uppercase tracking-[0.15em] text-text-tertiary mb-1">{label}</p>
      <p className="font-mono text-lg font-bold text-text-primary">{value}</p>
    </div>
  );
}
