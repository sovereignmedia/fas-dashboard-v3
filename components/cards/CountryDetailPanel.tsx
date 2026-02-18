'use client';

import { motion } from 'framer-motion';
import { Country } from '@/data/countries';
import {
  TOTAL_FACILITY_POTENTIAL,
  SINGLE_FACILITY_EBITDA,
  SINGLE_FACILITY_REVENUE,
  TOTAL_GLOBAL_COAL,
} from '@/data/expansion';
import { CHART_COLORS } from '@/lib/colors';
import { formatCurrency, formatNumber } from '@/lib/formatters';
import Card from '@/components/ui/Card';

interface CountryDetailPanelProps {
  country: Country;
  onClose: () => void;
}

export default function CountryDetailPanel({ country, onClose }: CountryDetailPanelProps) {
  return (
    <motion.div
      key={country.code}
      initial={{ opacity: 0, height: 0, marginBottom: 0 }}
      animate={{ opacity: 1, height: 'auto', marginBottom: 40 }}
      exit={{ opacity: 0, height: 0, marginBottom: 0 }}
      transition={{ duration: 0.35 }}
      className="overflow-hidden"
    >
      <Card className="!p-0" hover={false}>
        <div
          className="h-1 w-full"
          style={{
            background: `linear-gradient(90deg, ${country.color}, ${country.color}40, transparent)`,
          }}
        />
        <div className="p-8">
          {/* Detail header */}
          <div className="flex items-start justify-between mb-8">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <span
                  className="font-mono text-sm font-bold px-2 py-1 rounded-md"
                  style={{ backgroundColor: `${country.color}20`, color: country.color }}
                >
                  {country.code}
                </span>
                <h3 className="text-2xl font-semibold text-text-primary">{country.name}</h3>
              </div>
              <p className="text-sm text-text-secondary mt-1">
                Detailed market analysis and facility deployment overview
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-text-tertiary hover:text-text-primary transition-colors text-xl leading-none p-2"
              aria-label="Close detail panel"
            >
              &times;
            </button>
          </div>

          {/* Detail metrics grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <DetailMetric
              label="Facility Potential"
              value={String(country.facilityPotential)}
              sub={`${((country.facilityPotential / TOTAL_FACILITY_POTENTIAL) * 100).toFixed(1)}% of global`}
              color={country.color}
            />
            <DetailMetric
              label="Coal Production"
              value={`${formatNumber(country.coalProduction)} Mt`}
              sub={`${((country.coalProduction / TOTAL_GLOBAL_COAL) * 100).toFixed(1)}% of target markets`}
              color={country.color}
            />
            <DetailMetric
              label="Market Potential"
              value={country.marketPotential}
              sub="Total addressable market"
              color={country.color}
            />
            <DetailMetric
              label="Patent Status"
              value={country.patentStatus}
              sub={country.patentStatus === 'Granted' ? 'IP protection secured' : 'Application in progress'}
              color={country.patentStatus === 'Granted' ? CHART_COLORS.green : CHART_COLORS.gold}
            />
          </div>

          {/* Projected financials */}
          <div className="border-t border-border-subtle pt-6">
            <p className="text-xs uppercase tracking-[0.2em] font-medium text-text-tertiary mb-4">
              Projected Country-Level Financials (Full Deployment)
            </p>
            <div className="grid grid-cols-3 gap-6">
              <div>
                <p className="text-xs text-text-tertiary mb-1">Annual Revenue</p>
                <p className="font-mono text-xl font-bold text-text-primary">
                  {formatCurrency(country.facilityPotential * SINGLE_FACILITY_REVENUE, true)}
                </p>
              </div>
              <div>
                <p className="text-xs text-text-tertiary mb-1">Annual EBITDA</p>
                <p className="font-mono text-xl font-bold text-data-green">
                  {formatCurrency(country.facilityPotential * SINGLE_FACILITY_EBITDA, true)}
                </p>
              </div>
              <div>
                <p className="text-xs text-text-tertiary mb-1">Enterprise Value (12x)</p>
                <p className="font-mono text-xl font-bold text-accent-gold">
                  {formatCurrency(country.facilityPotential * SINGLE_FACILITY_EBITDA * 12, true)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

function DetailMetric({ label, value, sub, color }: { label: string; value: string; sub: string; color: string }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-[0.15em] text-text-tertiary mb-2">{label}</p>
      <p className="font-mono text-2xl font-bold mb-1" style={{ color, textShadow: `0 0 20px ${color}30` }}>
        {value}
      </p>
      <p className="text-xs text-text-secondary">{sub}</p>
    </div>
  );
}
