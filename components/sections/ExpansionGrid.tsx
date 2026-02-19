'use client';

import { motion } from 'framer-motion';
import { Globe, MapPin, Shield, Factory } from 'lucide-react';

import { countries } from '@/data/countries';
import { TOTAL_FACILITY_POTENTIAL, TOTAL_GLOBAL_COAL } from '@/data/expansion';
import { formatNumber } from '@/lib/formatters';

export default function ExpansionGrid() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10"
    >
      <StatPill icon={<Globe className="w-4 h-4" />} label="Patent Markets" value="9" />
      <StatPill icon={<Shield className="w-4 h-4" />} label="Patents Granted" value={String(countries.filter((c) => c.patentStatus === 'Granted').length)} />
      <StatPill icon={<Factory className="w-4 h-4" />} label="Addressable Sites" value={String(TOTAL_FACILITY_POTENTIAL)} />
      <StatPill icon={<MapPin className="w-4 h-4" />} label="Global Coal (Mt)" value={formatNumber(TOTAL_GLOBAL_COAL)} />
    </motion.div>
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
