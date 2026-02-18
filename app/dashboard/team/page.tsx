'use client';

import SectionHeader from '@/components/ui/SectionHeader';
import { CompanyOverview } from '@/components/sections/CompanyTimeline';
import CompanyTimeline from '@/components/sections/CompanyTimeline';
import LeadershipGrid from '@/components/sections/LeadershipGrid';
import AdvisorGrid from '@/components/sections/AdvisorGrid';

export default function TeamPage() {
  return (
    <div>
      <SectionHeader
        overline="Team & Genesis"
        title="The People Behind Frontieras"
        subtitle="From a 30-year industrial engineering career to a world-class advisory network — the team assembling to deliver the reindustrialization thesis."
      />

      <CompanyOverview />
      <CompanyTimeline />
      <LeadershipGrid />
      <AdvisorGrid />
    </div>
  );
}
