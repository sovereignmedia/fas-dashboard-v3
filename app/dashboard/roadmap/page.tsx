'use client';

import SectionHeader from '@/components/ui/SectionHeader';
import CapitalTimeline from '@/components/sections/CapitalTimeline';
import MilestoneTracker from '@/components/sections/MilestoneTracker';
import Disclaimer from '@/components/ui/Disclaimer';

export default function RoadmapPage() {
  return (
    <div>
      <SectionHeader
        overline="Project Roadmap"
        title="Capital Roadmap & Fundraising"
        subtitle="Five-phase capital strategy from bridge financing through post-IPO execution. $1.275B total capital deployment across the full lifecycle."
      />

      <CapitalTimeline />

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
