'use client';

import SectionHeader from '@/components/ui/SectionHeader';
import CollapsibleSection from '@/components/ui/CollapsibleSection';
import RiskAnalysis from '@/components/sections/RiskAnalysis';
import SWOTAnalysis from '@/components/sections/SWOTAnalysis';
import MilestoneTracker from '@/components/sections/MilestoneTracker';
import DiligenceQA from '@/components/sections/DiligenceQA';
import Disclaimer from '@/components/ui/Disclaimer';

export default function RiskAnalysisPage() {
  return (
    <div>
      <CollapsibleSection
        overline="Risk Analysis"
        title="Risk Mitigation Framework"
        subtitle="Institutional-grade risk assessment across 14 categories — covering technology, capital, construction, environmental, cybersecurity, and more."
        summaryBadge="14 categories"
      >
        <RiskAnalysis />
      </CollapsibleSection>

      <CollapsibleSection
        overline="Strategic Analysis"
        title="SWOT Analysis"
        subtitle="Strengths, weaknesses, opportunities, and threats — institutional-grade strategic assessment of Frontieras' competitive position."
        summaryBadge="19 items"
      >
        <SWOTAnalysis />
      </CollapsibleSection>

      <CollapsibleSection
        overline="Institutional Diligence"
        title="Risk Mitigation Q&A"
        subtitle="30 institutional-grade risk mitigation questions across 10 categories — addressing concerns sophisticated investors raise during diligence."
        summaryBadge="30 questions"
      >
        <DiligenceQA />
      </CollapsibleSection>

      <SectionHeader
        overline="Execution Tracking"
        title="Milestone Timeline"
        subtitle="16 milestones tracked against original guidance. 100% accuracy rate on completed items — no delays, no missed targets."
      />

      <MilestoneTracker />

      <div className="mt-12">
        <Disclaimer type="forwardLooking" size="md" collapsed />
      </div>
    </div>
  );
}
