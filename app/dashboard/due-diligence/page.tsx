'use client';

import SectionHeader from '@/components/ui/SectionHeader';
import PartnerGrid from '@/components/sections/PartnerGrid';
import DiligenceQA from '@/components/sections/DiligenceQA';
import Disclaimer from '@/components/ui/Disclaimer';

export default function DueDiligencePage() {
  return (
    <div>
      <SectionHeader
        overline="Due Diligence"
        title="Strategic Partners & Agreements"
        subtitle="Nine institutional-grade partners across operations, engineering, insurance, procurement, and capital markets. All MSAs executed."
      />

      <PartnerGrid />

      <SectionHeader
        overline="Institutional Diligence"
        title="Due Diligence Q&A Matrix"
        subtitle="30 institutional-grade diligence questions across 10 categories with detailed responses and management commentary."
      />

      <DiligenceQA />

      <div className="mt-12">
        <Disclaimer type="confidentiality" size="md" collapsed />
      </div>
    </div>
  );
}
