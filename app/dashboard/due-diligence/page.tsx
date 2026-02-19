'use client';

import SectionHeader from '@/components/ui/SectionHeader';
import PartnerGrid from '@/components/sections/PartnerGrid';
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

      <div className="mt-12">
        <Disclaimer type="confidentiality" size="md" collapsed />
      </div>
    </div>
  );
}
