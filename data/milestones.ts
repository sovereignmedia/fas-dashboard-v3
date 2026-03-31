// data/milestones.ts

export type MilestoneStatus = 'completed' | 'on-track' | 'delayed' | 'upcoming';

export interface Milestone {
  id: string;
  category: 'engineering' | 'capital' | 'legal' | 'partnerships' | 'construction' | 'regulatory';
  title: string;
  description: string;
  status: MilestoneStatus;
  guidanceAccuracy?: string;
}

export const MILESTONES: Milestone[] = [
  { id: 'demo-validation', category: 'engineering', title: 'FASForm™ Demo Validation', description: '12-month pilot validated by independent engineering firm with ASTM protocols.', status: 'completed', guidanceAccuracy: 'Completed' },
  { id: 'fel-1', category: 'engineering', title: 'FEL-1 Completed', description: 'Conceptual design and feasibility assessment.', status: 'completed', guidanceAccuracy: 'Completed' },
  { id: 'fel-2', category: 'engineering', title: 'FEL-2 Completed', description: 'Preliminary engineering and cost estimation.', status: 'completed', guidanceAccuracy: 'Completed' },
  { id: 'cams-msa', category: 'partnerships', title: 'CAMS MSA Executed', description: 'Full operations and maintenance partnership.', status: 'completed', guidanceAccuracy: 'Completed' },
  { id: 'epc-msas', category: 'partnerships', title: 'Engineering Partner MSAs', description: 'JOB EPC, KBC, and Yokogawa MSAs executed.', status: 'completed', guidanceAccuracy: 'Completed' },
  { id: 'perf-contractors', category: 'partnerships', title: 'Performance Contractors MSA', description: 'Procurement and contracting MSA executed.', status: 'completed', guidanceAccuracy: 'Completed' },
  { id: 'offtake', category: 'legal', title: '10-Year Off-Take LOIs', description: '100% production covered — ULSD, Naphtha, FASCarbon, Sulfuric Acid, Fertilizer.', status: 'completed', guidanceAccuracy: 'Completed' },
  { id: 'feedstock', category: 'legal', title: 'Feedstock Supply Contract', description: '10-year contract for 27M tons Pittsburgh #8 coal with collared pricing.', status: 'completed', guidanceAccuracy: 'Completed' },
  { id: 'land', category: 'construction', title: 'Site Acquisition', description: 'Mason County, WV — Ohio River access, CSX rail spur.', status: 'completed', guidanceAccuracy: 'Completed' },
  { id: 'reg-a', category: 'capital', title: 'Reg A+ Launched', description: '$11.5M+ raised from 4,700+ shareholders.', status: 'completed', guidanceAccuracy: 'Completed' },
  { id: 'board', category: 'legal', title: 'Board Placement (3 of 4)', description: 'Independent board members placed.', status: 'completed', guidanceAccuracy: '3 of 4 — final seat in progress' },
  { id: 'ir-firms', category: 'capital', title: 'IR Firms Engaged', description: 'Market Street IR + Hybrid Financial engaged.', status: 'completed', guidanceAccuracy: 'Completed' },
  { id: 'fel-3', category: 'engineering', title: 'FEL-3 In Progress', description: 'Detailed engineering and Class 3 cost estimate.', status: 'on-track' },
  { id: 'reg-a-75m', category: 'capital', title: 'Reg A Target: $75M', description: 'Scaling retail offering. $371M indicated interest in funnel.', status: 'on-track' },
  { id: 'ipo', category: 'capital', title: 'IPO Target: Q3 2026', description: 'Initial Public Offering.', status: 'upcoming' },
  { id: 'construction-start', category: 'construction', title: 'Construction Start', description: '26-month timeline to commissioning.', status: 'upcoming' },
];

export const MILESTONE_STATS = {
  totalCompleted: 12,
  totalOnTrack: 2,
  totalDelayed: 0,
  guidanceAccuracyRate: '100%',
};
