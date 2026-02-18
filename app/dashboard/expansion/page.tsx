'use client';

import { useState, useMemo } from 'react';
import { countries, Country } from '@/data/countries';
import SectionHeader from '@/components/ui/SectionHeader';
import Card from '@/components/ui/Card';
import { formatCurrency, formatNumber } from '@/lib/formatters';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, MapPin, Shield, Factory } from 'lucide-react';

// ── Constants ────────────────────────────────────────────────────────
const TOTAL_FACILITY_POTENTIAL = 143;
const SINGLE_FACILITY_EBITDA = 837_513_709;
const SINGLE_FACILITY_REVENUE = 1_079_142_402;
const TOTAL_GLOBAL_COAL = countries.reduce((sum, c) => sum + c.coalProduction, 0);

// ── Grid position mapping (approximate world‑map placement) ──────────
// Row/col positions on a 12-col × 5-row conceptual grid to give a
// geographic "war room" feel without an actual map projection.
const gridPositions: Record<string, { row: number; col: number }> = {
  CA: { row: 0, col: 1 },
  US: { row: 1, col: 1 },
  CO: { row: 2, col: 2 },
  PL: { row: 0, col: 5 },
  ZA: { row: 3, col: 5 },
  IN: { row: 1, col: 7 },
  CN: { row: 0, col: 8 },
  ID: { row: 2, col: 8 },
  AU: { row: 3, col: 9 },
};

// ── Animation variants ──────────────────────────────────────────────
const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

// ── Tooltip for the bar chart ────────────────────────────────────────
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ChartTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="rounded-xl bg-bg-tertiary border border-border-medium px-4 py-3 shadow-2xl">
      <p className="text-sm font-semibold text-text-primary">{d.name}</p>
      <p className="text-xs text-text-secondary mt-1">
        Facility potential:&nbsp;
        <span className="font-mono text-accent-gold">{d.facilityPotential}</span>
      </p>
      <p className="text-xs text-text-secondary">
        Coal production:&nbsp;
        <span className="font-mono text-text-primary">{formatNumber(d.coalProduction)} Mt</span>
      </p>
    </div>
  );
}

// ── Main page component ──────────────────────────────────────────────
export default function ExpansionPage() {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [penetration, setPenetration] = useState(25);

  // Derived penetration metrics
  const penetrationMetrics = useMemo(() => {
    const coalProcessed = (TOTAL_GLOBAL_COAL * penetration) / 100;
    const facilities = Math.round((TOTAL_FACILITY_POTENTIAL * penetration) / 100);
    const annualRevenue = facilities * SINGLE_FACILITY_REVENUE;
    const ebitda = facilities * SINGLE_FACILITY_EBITDA;
    const evMultiple = 12;
    const enterpriseValue = ebitda * evMultiple;

    return { coalProcessed, facilities, annualRevenue, ebitda, enterpriseValue };
  }, [penetration]);

  // Sort countries by facility potential descending for the bar chart
  const sortedCountries = useMemo(
    () => [...countries].sort((a, b) => b.facilityPotential - a.facilityPotential),
    [],
  );

  return (
    <div>
      {/* ── Header ─────────────────────────────────────────────── */}
      <SectionHeader
        overline="Global Expansion"
        title="Market Command Center"
        subtitle="9 patent-protected markets spanning 143 facility opportunities across major coal-producing nations. Click a country to explore."
      />

      {/* ── Top stats bar ──────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10"
      >
        <StatPill icon={<Globe className="w-4 h-4" />} label="Target Markets" value="9" />
        <StatPill
          icon={<Factory className="w-4 h-4" />}
          label="Total Facilities"
          value={String(TOTAL_FACILITY_POTENTIAL)}
        />
        <StatPill
          icon={<Shield className="w-4 h-4" />}
          label="Patents Granted"
          value={String(countries.filter((c) => c.patentStatus === 'Granted').length)}
        />
        <StatPill
          icon={<MapPin className="w-4 h-4" />}
          label="Global Coal (Mt)"
          value={formatNumber(TOTAL_GLOBAL_COAL)}
        />
      </motion.div>

      {/* ── Country grid  "war room" ───────────────────────────── */}
      <Card className="!p-0 mb-10 overflow-visible" accentLine hover={false}>
        <div className="px-6 pt-6 pb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-accent-gold animate-pulse" />
            <p className="text-xs uppercase tracking-[0.2em] font-medium text-text-tertiary">
              Global Operations Map
            </p>
          </div>
          <div className="flex items-center gap-4 text-[10px] text-text-tertiary uppercase tracking-wider">
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-2 h-2 rounded-full bg-[#00cc88]" />
              Patent Granted
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-2 h-2 rounded-full bg-accent-gold" />
              Patent Filed
            </span>
          </div>
        </div>

        {/* Grid positions mimic a world map layout */}
        <div className="relative px-4 pb-6">
          {/* Subtle grid lines for "war room" look */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.04]"
            style={{
              backgroundImage:
                'linear-gradient(to right, var(--text-primary) 1px, transparent 1px), linear-gradient(to bottom, var(--text-primary) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-rows-[repeat(4,1fr)] grid-cols-[repeat(10,1fr)] gap-3 min-h-[420px] relative z-10 py-4"
          >
            {countries.map((country) => {
              const pos = gridPositions[country.code];
              const isSelected = selectedCountry?.code === country.code;
              const isGranted = country.patentStatus === 'Granted';

              return (
                <motion.div
                  key={country.code}
                  variants={cardVariant}
                  style={{
                    gridRow: pos.row + 1,
                    gridColumn: pos.col + 1,
                  }}
                  className="col-span-2"
                >
                  <button
                    onClick={() => setSelectedCountry(isSelected ? null : country)}
                    className={`
                      w-full text-left rounded-xl p-4 transition-all duration-300
                      border backdrop-blur-sm group relative overflow-hidden
                      ${
                        isSelected
                          ? 'bg-bg-tertiary border-accent-gold/60 shadow-[0_0_30px_rgba(212,168,83,0.12)]'
                          : 'bg-bg-secondary/80 border-border-subtle hover:border-border-medium hover:bg-bg-hover'
                      }
                    `}
                  >
                    {/* Accent top line */}
                    <div
                      className="absolute top-0 left-0 right-0 h-[2px]"
                      style={{
                        background: `linear-gradient(90deg, transparent, ${country.color}, transparent)`,
                        opacity: isSelected ? 1 : 0.5,
                      }}
                    />

                    {/* Country header */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span
                          className="font-mono text-[11px] font-bold px-1.5 py-0.5 rounded"
                          style={{ backgroundColor: `${country.color}20`, color: country.color }}
                        >
                          {country.code}
                        </span>
                        <span className="text-sm font-semibold text-text-primary truncate">
                          {country.name}
                        </span>
                      </div>
                      <span
                        className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                          isGranted
                            ? 'bg-[#00cc88]/15 text-[#00cc88]'
                            : 'bg-accent-gold/15 text-accent-gold'
                        }`}
                      >
                        {country.patentStatus}
                      </span>
                    </div>

                    {/* Metrics row */}
                    <div className="grid grid-cols-3 gap-2 mt-3">
                      <div>
                        <p className="text-[9px] uppercase tracking-wider text-text-tertiary">
                          Facilities
                        </p>
                        <p className="font-mono text-lg font-bold text-text-primary">
                          {country.facilityPotential}
                        </p>
                      </div>
                      <div>
                        <p className="text-[9px] uppercase tracking-wider text-text-tertiary">
                          Coal (Mt)
                        </p>
                        <p className="font-mono text-sm font-semibold text-text-secondary">
                          {formatNumber(country.coalProduction)}
                        </p>
                      </div>
                      <div>
                        <p className="text-[9px] uppercase tracking-wider text-text-tertiary">
                          Market
                        </p>
                        <p className="font-mono text-sm font-semibold text-text-secondary">
                          {country.marketPotential}
                        </p>
                      </div>
                    </div>

                    {/* Facility potential bar */}
                    <div className="mt-3 w-full h-1 rounded-full bg-border-subtle overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{
                          width: `${(country.facilityPotential / 64) * 100}%`,
                        }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: country.color }}
                      />
                    </div>
                  </button>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </Card>

      {/* ── Country Detail Panel ───────────────────────────────── */}
      <AnimatePresence mode="wait">
        {selectedCountry && (
          <motion.div
            key={selectedCountry.code}
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
                  background: `linear-gradient(90deg, ${selectedCountry.color}, ${selectedCountry.color}40, transparent)`,
                }}
              />
              <div className="p-8">
                {/* Detail header */}
                <div className="flex items-start justify-between mb-8">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span
                        className="font-mono text-sm font-bold px-2 py-1 rounded-md"
                        style={{
                          backgroundColor: `${selectedCountry.color}20`,
                          color: selectedCountry.color,
                        }}
                      >
                        {selectedCountry.code}
                      </span>
                      <h3 className="text-2xl font-semibold text-text-primary">
                        {selectedCountry.name}
                      </h3>
                    </div>
                    <p className="text-sm text-text-secondary mt-1">
                      Detailed market analysis and facility deployment overview
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedCountry(null)}
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
                    value={String(selectedCountry.facilityPotential)}
                    sub={`${((selectedCountry.facilityPotential / TOTAL_FACILITY_POTENTIAL) * 100).toFixed(1)}% of global`}
                    color={selectedCountry.color}
                  />
                  <DetailMetric
                    label="Coal Production"
                    value={`${formatNumber(selectedCountry.coalProduction)} Mt`}
                    sub={`${((selectedCountry.coalProduction / TOTAL_GLOBAL_COAL) * 100).toFixed(1)}% of target markets`}
                    color={selectedCountry.color}
                  />
                  <DetailMetric
                    label="Market Potential"
                    value={selectedCountry.marketPotential}
                    sub="Total addressable market"
                    color={selectedCountry.color}
                  />
                  <DetailMetric
                    label="Patent Status"
                    value={selectedCountry.patentStatus}
                    sub={
                      selectedCountry.patentStatus === 'Granted'
                        ? 'IP protection secured'
                        : 'Application in progress'
                    }
                    color={
                      selectedCountry.patentStatus === 'Granted' ? '#00cc88' : '#D4A853'
                    }
                  />
                </div>

                {/* Projected financials for this country */}
                <div className="border-t border-border-subtle pt-6">
                  <p className="text-xs uppercase tracking-[0.2em] font-medium text-text-tertiary mb-4">
                    Projected Country-Level Financials (Full Deployment)
                  </p>
                  <div className="grid grid-cols-3 gap-6">
                    <div>
                      <p className="text-xs text-text-tertiary mb-1">Annual Revenue</p>
                      <p className="font-mono text-xl font-bold text-text-primary">
                        {formatCurrency(
                          selectedCountry.facilityPotential * SINGLE_FACILITY_REVENUE,
                          true,
                        )}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-text-tertiary mb-1">Annual EBITDA</p>
                      <p className="font-mono text-xl font-bold text-data-green">
                        {formatCurrency(
                          selectedCountry.facilityPotential * SINGLE_FACILITY_EBITDA,
                          true,
                        )}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-text-tertiary mb-1">Enterprise Value (12x)</p>
                      <p className="font-mono text-xl font-bold text-accent-gold">
                        {formatCurrency(
                          selectedCountry.facilityPotential * SINGLE_FACILITY_EBITDA * 12,
                          true,
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Bottom two-column: Penetration Calculator + Bar Chart ─ */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* ── Market Penetration Calculator ─────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card hover={false}>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-2 h-2 rounded-full bg-accent-gold animate-pulse" />
              <p className="text-xs uppercase tracking-[0.2em] font-medium text-text-tertiary">
                Market Penetration Calculator
              </p>
            </div>

            {/* Slider */}
            <div className="mb-8">
              <div className="flex items-end justify-between mb-3">
                <p className="text-sm text-text-secondary">Global coal processing penetration</p>
                <p className="font-mono text-3xl font-bold text-accent-gold">{penetration}%</p>
              </div>
              <input
                type="range"
                min={1}
                max={100}
                value={penetration}
                onChange={(e) => setPenetration(Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer
                  bg-border-subtle accent-accent-gold
                  [&::-webkit-slider-thumb]:appearance-none
                  [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5
                  [&::-webkit-slider-thumb]:rounded-full
                  [&::-webkit-slider-thumb]:bg-accent-gold
                  [&::-webkit-slider-thumb]:shadow-[0_0_12px_rgba(212,168,83,0.5)]
                  [&::-webkit-slider-thumb]:border-2
                  [&::-webkit-slider-thumb]:border-bg-primary
                  [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5
                  [&::-moz-range-thumb]:rounded-full
                  [&::-moz-range-thumb]:bg-accent-gold
                  [&::-moz-range-thumb]:border-2
                  [&::-moz-range-thumb]:border-bg-primary"
              />
              <div className="flex justify-between text-[10px] text-text-tertiary mt-1 font-mono">
                <span>1%</span>
                <span>25%</span>
                <span>50%</span>
                <span>75%</span>
                <span>100%</span>
              </div>
            </div>

            {/* Calculated results */}
            <div className="space-y-4">
              <CalcRow
                label="Facilities Required"
                value={formatNumber(penetrationMetrics.facilities)}
                color="#4088e8"
              />
              <CalcRow
                label="Annual Revenue"
                value={formatCurrency(penetrationMetrics.annualRevenue, true)}
                color="var(--text-primary)"
              />
              <CalcRow
                label="Annual EBITDA"
                value={formatCurrency(penetrationMetrics.ebitda, true)}
                color="#00cc88"
              />
              <div className="border-t border-border-subtle pt-4">
                <CalcRow
                  label="Enterprise Value (12x EBITDA)"
                  value={formatCurrency(penetrationMetrics.enterpriseValue, true)}
                  color="#D4A853"
                  large
                />
              </div>
            </div>
          </Card>
        </motion.div>

        {/* ── Expansion Bar Chart ──────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
        >
          <Card hover={false}>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-2 h-2 rounded-full bg-[#4088e8] animate-pulse" />
              <p className="text-xs uppercase tracking-[0.2em] font-medium text-text-tertiary">
                Facility Potential by Country
              </p>
            </div>

            <div className="h-[380px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={sortedCountries}
                  layout="vertical"
                  margin={{ top: 0, right: 30, left: 0, bottom: 0 }}
                  barCategoryGap="20%"
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="var(--border-subtle)"
                    horizontal={false}
                  />
                  <XAxis
                    type="number"
                    tick={{ fill: 'var(--text-tertiary)', fontSize: 11, fontFamily: 'JetBrains Mono, monospace' }}
                    axisLine={{ stroke: 'var(--border-subtle)' }}
                    tickLine={false}
                  />
                  <YAxis
                    dataKey="name"
                    type="category"
                    width={110}
                    tick={{ fill: 'var(--text-secondary)', fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip content={<ChartTooltip />} cursor={{ fill: 'rgba(212,168,83,0.05)' }} />
                  <Bar
                    dataKey="facilityPotential"
                    radius={[0, 6, 6, 0]}
                    maxBarSize={28}
                  >
                    {sortedCountries.map((country) => (
                      <Cell
                        key={country.code}
                        fill={country.color}
                        fillOpacity={
                          selectedCountry
                            ? selectedCountry.code === country.code
                              ? 1
                              : 0.3
                            : 0.85
                        }
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

// ── Sub-components ──────────────────────────────────────────────────

function StatPill({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-bg-secondary border border-border-subtle px-4 py-3">
      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-accent-gold-muted text-accent-gold">
        {icon}
      </div>
      <div>
        <p className="text-[10px] uppercase tracking-[0.15em] text-text-tertiary">{label}</p>
        <p className="font-mono text-lg font-bold text-text-primary">{value}</p>
      </div>
    </div>
  );
}

function DetailMetric({
  label,
  value,
  sub,
  color,
}: {
  label: string;
  value: string;
  sub: string;
  color: string;
}) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-[0.15em] text-text-tertiary mb-2">{label}</p>
      <p
        className="font-mono text-2xl font-bold mb-1"
        style={{ color, textShadow: `0 0 20px ${color}30` }}
      >
        {value}
      </p>
      <p className="text-xs text-text-secondary">{sub}</p>
    </div>
  );
}

function CalcRow({
  label,
  value,
  color,
  large = false,
}: {
  label: string;
  value: string;
  color: string;
  large?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <p className={`${large ? 'text-sm font-medium' : 'text-sm'} text-text-secondary`}>{label}</p>
      <p
        className={`font-mono font-bold tabular-nums ${large ? 'text-2xl' : 'text-lg'}`}
        style={{ color, textShadow: `0 0 16px ${color}30` }}
      >
        {value}
      </p>
    </div>
  );
}
