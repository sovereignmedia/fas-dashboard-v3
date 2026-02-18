'use client';

import { motion } from 'framer-motion';
import { Globe, MapPin, Shield, Factory } from 'lucide-react';

import { countries, Country } from '@/data/countries';
import { TOTAL_FACILITY_POTENTIAL, TOTAL_GLOBAL_COAL, gridPositions } from '@/data/expansion';
import { formatNumber } from '@/lib/formatters';
import Card from '@/components/ui/Card';
import CountryCard from '@/components/cards/CountryCard';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

interface ExpansionGridProps {
  selectedCountry: Country | null;
  onSelect: (country: Country | null) => void;
}

export default function ExpansionGrid({ selectedCountry, onSelect }: ExpansionGridProps) {
  return (
    <>
      {/* Top stats bar */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10"
      >
        <StatPill icon={<Globe className="w-4 h-4" />} label="Target Markets" value="9" />
        <StatPill icon={<Factory className="w-4 h-4" />} label="Total Facilities" value={String(TOTAL_FACILITY_POTENTIAL)} />
        <StatPill icon={<Shield className="w-4 h-4" />} label="Patents Granted" value={String(countries.filter((c) => c.patentStatus === 'Granted').length)} />
        <StatPill icon={<MapPin className="w-4 h-4" />} label="Global Coal (Mt)" value={formatNumber(TOTAL_GLOBAL_COAL)} />
      </motion.div>

      {/* Country grid "war room" */}
      <Card className="!p-0 mb-10 overflow-visible" accentLine hover={false}>
        <div className="px-6 pt-6 pb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-accent-gold animate-pulse" />
            <p className="text-xs uppercase tracking-[0.2em] font-medium text-text-tertiary">Global Operations Map</p>
          </div>
          <div className="flex items-center gap-4 text-[10px] text-text-tertiary uppercase tracking-wider">
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-2 h-2 rounded-full bg-data-green" />
              Patent Granted
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-2 h-2 rounded-full bg-accent-gold" />
              Patent Filed
            </span>
          </div>
        </div>

        <div className="relative px-4 pb-6">
          {/* Subtle grid lines */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.04]"
            style={{
              backgroundImage: 'linear-gradient(to right, var(--text-primary) 1px, transparent 1px), linear-gradient(to bottom, var(--text-primary) 1px, transparent 1px)',
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
              return (
                <CountryCard
                  key={country.code}
                  country={country}
                  gridRow={pos.row + 1}
                  gridColumn={pos.col + 1}
                  isSelected={selectedCountry?.code === country.code}
                  onSelect={() => onSelect(selectedCountry?.code === country.code ? null : country)}
                />
              );
            })}
          </motion.div>
        </div>
      </Card>
    </>
  );
}

function StatPill({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
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
