'use client';

import { motion } from 'framer-motion';
import { Country, countries } from '@/data/countries';
import { formatNumber } from '@/lib/formatters';

const MAX_FACILITIES = Math.max(...countries.map(c => c.facilityPotential));

const cardVariant = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

interface CountryCardProps {
  country: Country;
  gridRow: number;
  gridColumn: number;
  isSelected: boolean;
  onSelect: () => void;
}

export default function CountryCard({ country, gridRow, gridColumn, isSelected, onSelect }: CountryCardProps) {
  const isGranted = country.patentStatus === 'Granted';

  return (
    <motion.div
      variants={cardVariant}
      style={{ gridRow, gridColumn }}
      className="col-span-2"
    >
      <button
        onClick={onSelect}
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
                ? 'bg-data-green/15 text-data-green'
                : 'bg-accent-gold/15 text-accent-gold'
            }`}
          >
            {country.patentStatus}
          </span>
        </div>

        {/* Metrics row */}
        <div className="grid grid-cols-3 gap-2 mt-3">
          <div>
            <p className="text-[9px] uppercase tracking-wider text-text-tertiary">Facilities</p>
            <p className="font-mono text-lg font-bold text-text-primary">{country.facilityPotential}</p>
          </div>
          <div>
            <p className="text-[9px] uppercase tracking-wider text-text-tertiary">Coal (Mt)</p>
            <p className="font-mono text-sm font-semibold text-text-secondary">{formatNumber(country.coalProduction)}</p>
          </div>
          <div>
            <p className="text-[9px] uppercase tracking-wider text-text-tertiary">Market</p>
            <p className="font-mono text-sm font-semibold text-text-secondary">{country.marketPotential}</p>
          </div>
        </div>

        {/* Facility potential bar */}
        <div className="mt-3 w-full h-1 rounded-full bg-border-subtle overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(country.facilityPotential / MAX_FACILITIES) * 100}%` }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-full rounded-full"
            style={{ backgroundColor: country.color }}
          />
        </div>
      </button>
    </motion.div>
  );
}
