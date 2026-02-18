'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import SectionHeader from '@/components/ui/SectionHeader';
import Card from '@/components/ui/Card';
import InteractiveGlobe from '@/components/charts/InteractiveGlobe';
import ExpansionGrid from '@/components/sections/ExpansionGrid';
import CountryDetailPanel from '@/components/cards/CountryDetailPanel';
import CoalProductionChart from '@/components/charts/CoalProductionChart';
import PenetrationCalculator from '@/components/sections/PenetrationCalculator';
import { Country } from '@/data/countries';

export default function ExpansionPage() {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [penetration, setPenetration] = useState(25);

  return (
    <div>
      <SectionHeader
        overline="Global Expansion"
        title="Market Command Center"
        subtitle="9 patent-protected markets spanning 143 facility opportunities across major coal-producing nations. Click a country to explore."
      />

      <Card className="!p-8 mb-10 flex justify-center" hover={false}>
        <InteractiveGlobe />
      </Card>

      <ExpansionGrid selectedCountry={selectedCountry} onSelect={setSelectedCountry} />

      <AnimatePresence mode="wait">
        {selectedCountry && (
          <CountryDetailPanel
            country={selectedCountry}
            onClose={() => setSelectedCountry(null)}
          />
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <PenetrationCalculator penetration={penetration} onChange={setPenetration} />
        <CoalProductionChart selectedCountry={selectedCountry} />
      </div>
    </div>
  );
}
