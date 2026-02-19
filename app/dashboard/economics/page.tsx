'use client';

import SectionHeader from '@/components/ui/SectionHeader';
import FacilityEconomicsSection from '@/components/sections/FacilityEconomics';
import ProductGrid from '@/components/sections/ProductGrid';
import PricingSensitivity from '@/components/sections/PricingSensitivity';
import WaterfallChart from '@/components/charts/WaterfallChart';
import OpExBreakdown from '@/components/sections/OpExBreakdown';

export default function EconomicsPage() {
  return (
    <div>
      <SectionHeader
        overline="Facility Economics"
        title="Product Economics & Revenue"
        subtitle="Single-facility steady-state economics across six product streams. All figures represent Year 4+ annual projections at modeled pricing."
      />

      <FacilityEconomicsSection />
      <ProductGrid />
      <PricingSensitivity />
      <WaterfallChart />

      <OpExBreakdown />
    </div>
  );
}
