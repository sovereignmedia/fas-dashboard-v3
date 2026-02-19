'use client';

import { useState } from 'react';

import SectionHeader from '@/components/ui/SectionHeader';
import Card from '@/components/ui/Card';
import InteractiveGlobeV3 from '@/components/charts/InteractiveGlobeV3';
import ExpansionGrid from '@/components/sections/ExpansionGrid';
import CoalProductionChart from '@/components/charts/CoalProductionChart';
import PenetrationCalculator from '@/components/sections/PenetrationCalculator';
import Disclaimer from '@/components/ui/Disclaimer';

export default function ExpansionPage() {
  const [penetration, setPenetration] = useState(25);

  return (
    <div>
      <SectionHeader
        overline="Global Expansion"
        title="Market Command Center"
        subtitle="9 patent-protected markets spanning 143 facility opportunities across major coal-producing nations."
      />

      <Card className="!p-10 mb-12 flex justify-center !overflow-visible" hover={false}>
        <InteractiveGlobeV3 />
      </Card>

      <ExpansionGrid />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <PenetrationCalculator penetration={penetration} onChange={setPenetration} />
        <CoalProductionChart selectedCountry={null} />
      </div>

      <div className="mt-12">
        <Disclaimer type="projectionDisclaimer" size="md" collapsed />
      </div>
    </div>
  );
}
