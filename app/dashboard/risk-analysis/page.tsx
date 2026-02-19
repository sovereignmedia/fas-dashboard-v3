'use client';

import SectionHeader from '@/components/ui/SectionHeader';
import RiskAnalysis from '@/components/sections/RiskAnalysis';
import MilestoneTracker from '@/components/sections/MilestoneTracker';
import Disclaimer from '@/components/ui/Disclaimer';

export default function RiskAnalysisPage() {
  return (
    <div>
      <SectionHeader
        overline="Risk Analysis"
        title="Risk Mitigation Framework"
        subtitle="Institutional-grade risk assessment covering technology scale-up, capital structure, and construction execution. Each risk includes executed mitigations and partner commitments."
      />

      <RiskAnalysis />

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
