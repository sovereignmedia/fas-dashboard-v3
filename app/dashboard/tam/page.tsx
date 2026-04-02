'use client';

import SectionHeader from '@/components/ui/SectionHeader';
import MetricCard from '@/components/ui/MetricCard';
import CollapsibleSection from '@/components/ui/CollapsibleSection';
import Disclaimer from '@/components/ui/Disclaimer';
import ValueTransformationHero from '@/components/sections/ValueTransformationHero';
import CrudeOilComparison from '@/components/sections/CrudeOilComparison';
import MarketOpportunity from '@/components/sections/MarketOpportunity';
import TamTiers from '@/components/sections/TamTiers';
import FacilityProofPoint from '@/components/sections/FacilityProofPoint';
import ValueUplift from '@/components/sections/ValueUplift';
import CountryEconomicsTable from '@/components/sections/CountryEconomicsTable';
import ValuationBridge from '@/components/sections/ValuationBridge';
import FacilityContext from '@/components/sections/FacilityContext';
import { VALUE_UPLIFT, FACILITY_CONTEXT } from '@/data/tam';

export default function TamPage() {
  return (
    <div>
      <SectionHeader
        overline="Market Opportunity"
        title="Total Addressable Market"
        subtitle="Yield-adjusted economic analysis of the global FASForm™ opportunity across nine patent-protected countries representing 91% of global coal production."
      />

      {/* Headline Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-12">
        <MetricCard label="Annual Addressable Value" value="$2.1T" subtitle="9 patent countries, base case" />
        <MetricCard label="Average Value Uplift" value={`${VALUE_UPLIFT.weightedAverageUplift}x`} subtitle="Coal → FASForm products" />
        <MetricCard label="Facilities Supportable" value={FACILITY_CONTEXT.totalFacilitiesSupported.toLocaleString()} subtitle="Based on current production" />
        <MetricCard label="10-Year Plan Coverage" value={`${FACILITY_CONTEXT.plannedAsPercentOfMarket}%`} subtitle="16 facilities of 3,107" />
      </div>

      {/* Value Transformation Hero */}
      <ValueTransformationHero />

      {/* Crude Oil Comparison */}
      <div className="mt-10">
        <CrudeOilComparison />
      </div>

      {/* Product Markets */}
      <div className="mt-14">
        <MarketOpportunity />
      </div>

      {/* Four-Tier TAM */}
      <TamTiers />

      {/* Facility Proof Point */}
      <div className="mt-14">
        <FacilityProofPoint />
      </div>

      {/* Value Uplift */}
      <div className="mt-14">
        <SectionHeader
          overline="Value Creation"
          title="Coal-to-Product Value Uplift"
          subtitle="FASForm processing transforms low-value combustion fuel into high-value commodity products — creating $1.5 trillion in net new annual value."
        />
        <ValueUplift />
      </div>

      {/* Country Economics */}
      <div className="mt-14">
        <CollapsibleSection
          overline="Deep Dive"
          title="Country-Level Yield Economics"
          subtitle="Yield-adjusted revenue and EBITDA by country, based on coal chemistry fundamentals"
        >
          <CountryEconomicsTable />
        </CollapsibleSection>
      </div>

      {/* Valuation Bridge */}
      <div className="mt-14">
        <CollapsibleSection
          overline="Deep Dive"
          title="TAM-to-Valuation Bridge"
          subtitle="Market penetration scenarios mapped to enterprise value at institutional multiples"
        >
          <ValuationBridge />
        </CollapsibleSection>
      </div>

      {/* Facility Context */}
      <div className="mt-14">
        <SectionHeader
          overline="Context"
          title="Facility Buildout in Context"
          subtitle="The 10-year plan barely scratches the surface of the addressable opportunity."
        />
        <FacilityContext />
      </div>

      <div className="mt-12">
        <Disclaimer type="projectionDisclaimer" size="md" collapsed />
      </div>
    </div>
  );
}
