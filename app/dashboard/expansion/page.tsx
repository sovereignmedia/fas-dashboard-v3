'use client';

import { useState } from 'react';

import SectionHeader from '@/components/ui/SectionHeader';
import Card from '@/components/ui/Card';
import InteractiveGlobeV2 from '@/components/charts/InteractiveGlobeV2';
import InteractiveGlobeV3 from '@/components/charts/InteractiveGlobeV3';
import ExpansionGrid from '@/components/sections/ExpansionGrid';
import CoalProductionChart from '@/components/charts/CoalProductionChart';
import PenetrationCalculator from '@/components/sections/PenetrationCalculator';

export default function ExpansionPage() {
  const [penetration, setPenetration] = useState(25);

  return (
    <div>
      <SectionHeader
        overline="Global Expansion"
        title="Market Command Center"
        subtitle="9 patent-protected markets spanning 143 facility opportunities across major coal-producing nations."
      />

      <Card className="!p-8 mb-10 flex justify-center" hover={false}>
        <InteractiveGlobeV2 />
      </Card>

      <Card className="!p-8 mb-10 flex justify-center" hover={false}>
        <div className="text-center">
          <p className="text-xs text-text-tertiary mb-4 uppercase tracking-widest">V3 — Cinematic Hover</p>
          <InteractiveGlobeV3 />
        </div>
      </Card>

      <ExpansionGrid />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <PenetrationCalculator penetration={penetration} onChange={setPenetration} />
        <CoalProductionChart selectedCountry={null} />
      </div>
    </div>
  );
}
