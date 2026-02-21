'use client';

import { useState } from 'react';

import SectionHeader from '@/components/ui/SectionHeader';
import Card from '@/components/ui/Card';
import InteractiveGlobeV3 from '@/components/charts/InteractiveGlobeV3';
import ExpansionGrid from '@/components/sections/ExpansionGrid';
import CoalProductionChart from '@/components/charts/CoalProductionChart';
import PenetrationCalculator from '@/components/sections/PenetrationCalculator';
import CollapsibleSection from '@/components/ui/CollapsibleSection';
import Disclaimer from '@/components/ui/Disclaimer';

export default function ExpansionPage() {
  const [penetration, setPenetration] = useState(25);

  return (
    <div>
      <SectionHeader
        overline="Global IP Portfolio"
        title="Expansion Optionality"
        subtitle="Patent-protected market access across 9 countries. The company's global IP portfolio secures the right to deploy FASForm™ technology as the first facility proves the commercial model."
      />

      {/* Strategic framing */}
      <Card className="mb-10" hover={false}>
        <div className="max-w-3xl">
          <p className="text-base leading-relaxed text-text-secondary">
            Frontieras holds granted patents across 9 major coal-producing nations — representing strategic optionality, not a near-term deployment plan. The company&apos;s immediate focus is executing Facility 1 in Mason County, West Virginia. These patents protect Frontieras&apos; ability to license or deploy the FASForm™ process internationally once the first commercial facility validates the technology at scale.
          </p>
          <p className="text-sm leading-relaxed text-text-tertiary mt-4">
            This is a land-and-expand thesis: prove the model domestically, then exercise global optionality from a position of demonstrated performance.
          </p>
        </div>
      </Card>

      <Card className="!p-10 mb-12 flex justify-center !overflow-visible" hover={false}>
        <InteractiveGlobeV3 />
      </Card>

      <ExpansionGrid />

      <div className="mt-14">
        <CoalProductionChart selectedCountry={null} />
      </div>

      <div className="mt-14">
        <CollapsibleSection
          overline="Deep Dive"
          title="Market Penetration Modeling"
          subtitle="Theoretical modeling tool for global deployment scenarios"
        >
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            <PenetrationCalculator penetration={penetration} onChange={setPenetration} />
            <div />
          </div>
        </CollapsibleSection>
      </div>

      <div className="mt-12">
        <Disclaimer type="projectionDisclaimer" size="md" collapsed />
      </div>
    </div>
  );
}
