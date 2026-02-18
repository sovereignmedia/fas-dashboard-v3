'use client';

import SectionHeader from '@/components/ui/SectionHeader';
import CapitalTimeline from '@/components/sections/CapitalTimeline';
import RegAPerformanceSection from '@/components/sections/RegAPerformance';
import UseOfProceedsSection from '@/components/sections/UseOfProceeds';
import StrategicPartnersSection from '@/components/sections/StrategicPartners';

export default function CapitalStructurePage() {
  return (
    <div>
      <SectionHeader
        overline="Capital Structure"
        title="Capital Roadmap & Fundraising"
        subtitle="Five-phase capital strategy from bridge financing through post-IPO execution. $1.275B total capital deployment across the full lifecycle."
      />

      <CapitalTimeline />
      <RegAPerformanceSection />
      <UseOfProceedsSection />
      <StrategicPartnersSection />
    </div>
  );
}
