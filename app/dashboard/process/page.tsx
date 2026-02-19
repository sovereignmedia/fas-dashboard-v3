'use client';

import SectionHeader from '@/components/ui/SectionHeader';
import ProcessFlow from '@/components/sections/ProcessFlow';
import MarginExplainer from '@/components/sections/MarginExplainer';
import CTLComparison from '@/components/sections/CTLComparison';
import MarketOpportunity from '@/components/sections/MarketOpportunity';
import Disclaimer from '@/components/ui/Disclaimer';

export default function ProcessPage() {
  return (
    <div>
      <SectionHeader
        overline="FASForm™ Process"
        title="Input → Process → Output"
        subtitle="Single-feedstock thermal cracking process converting Pittsburgh #8 coal into six high-value product streams — plus two internal-use gas streams enabling zero-waste closed-loop operation."
      />

      <ProcessFlow />

      <MarginExplainer />

      <SectionHeader
        overline="Technology Comparison"
        title="FASForm™ vs. Coal-to-Liquids"
        subtitle="Side-by-side comparison of FASForm™ solid carbon fractionation against traditional Fischer-Tropsch coal-to-liquids technology."
      />

      <CTLComparison />

      <MarketOpportunity />

      <div className="mt-12">
        <Disclaimer type="projectionDisclaimer" size="md" collapsed />
      </div>
    </div>
  );
}
