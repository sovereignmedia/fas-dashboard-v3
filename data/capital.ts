export const capitalPhases = [
  {
    phase: 1,
    name: 'Bridge Capital',
    amount: 25_000_000,
    status: 'active' as const,
    description: 'Current raise. Preferred equity with warrant coverage. Funds FEL3, long-lead procurement, permits, corporate overhead.',
    use: ['FEL3 Engineering ($11.2M)', 'Long-Lead Equipment ($5M)', 'Permits & Applications', 'Corporate & Legal', 'Working Capital'],
  },
  {
    phase: 2,
    name: 'FEL3 Completion',
    amount: 0,
    status: 'upcoming' as const,
    description: 'Front-End Loading Phase 3 engineering. Produces bankable feasibility study. Triggers project finance conversations.',
    use: ['Detailed Engineering ($26.2M)', 'Updated Cost Estimates', 'Construction Schedule', 'Equipment Specifications'],
  },
  {
    phase: 3,
    name: 'Project Finance',
    amount: 850_000_000,
    status: 'planned' as const,
    description: 'Senior secured project finance for Plant 1 construction. ~$850M+ including contingency, interest reserve, insurance. Standard project finance structure.',
    use: ['Plant Construction', 'Equipment Procurement', 'Contingency ($150M)', 'Interest Reserve', 'Insurance'],
  },
  {
    phase: 4,
    name: 'IPO',
    amount: 250_000_000,
    status: 'planned' as const,
    description: '$250M+ offering. Provides growth capital, liquidity for early investors, public currency for acquisitions. Pre-money valuation guidance: $1B-$1.5B conservative.',
    use: ['Growth Capital', 'Early Investor Liquidity', 'Acquisition Currency', 'Corporate Treasury'],
  },
  {
    phase: 5,
    name: 'Post-IPO Execution',
    amount: 150_000_000,
    status: 'planned' as const,
    description: 'GEM $150M equity line plus public market access. Funds multi-facility replication strategy. Public stock as currency for acquiring abandoned refinery assets.',
    use: ['Multi-Facility Replication', 'Asset Acquisitions', 'International Expansion', 'R&D'],
  },
];

export const useOfProceeds = [
  { label: 'FEL3 Engineering', amount: 11_200_000, pct: 0.448, color: '#4088e8' },
  { label: 'Long-Lead Equipment', amount: 5_000_000, pct: 0.20, color: '#00cc88' },
  { label: 'Permits & Applications', amount: 3_800_000, pct: 0.152, color: '#d4a852' },
  { label: 'Corporate & Legal', amount: 3_000_000, pct: 0.12, color: '#c084fc' },
  { label: 'Working Capital', amount: 2_000_000, pct: 0.08, color: '#e88a30' },
];

export const strategicPartners = [
  {
    name: 'Market Street Capital',
    role: 'IPO Advisory',
    iconKey: 'TrendingUp' as const,
    detail: 'Advising on IPO readiness, valuation positioning, and public market strategy for $250M+ offering.',
  },
  {
    name: 'RF Lafferty',
    role: 'Investment Banking',
    iconKey: 'Building2' as const,
    detail: 'Full-service investment banking relationship covering capital raises, M&A advisory, and institutional placement.',
  },
  {
    name: 'Texas Capital',
    role: 'Banking Relationship',
    iconKey: 'DollarSign' as const,
    detail: 'Primary commercial banking partner providing treasury management and corporate banking services.',
  },
  {
    name: 'Hybrid Financial',
    role: 'Institutional Distribution',
    iconKey: 'Users' as const,
    detail: '1,900 institutional followers. Driving institutional awareness and demand ahead of public listing.',
  },
  {
    name: 'GEM',
    role: 'Post-IPO Equity Line',
    iconKey: 'Briefcase' as const,
    detail: '$150M committed equity facility. Provides post-IPO growth capital on demand without dilutive financing terms.',
  },
];

export const regAPerformance = {
  totalRaised: 9_000_000,
  shareholders: 3_700,
  sharePrice: 7.77,
  singleDayRecord: 3_000_000,
  regCFRaised: 4_491_176,
  regCFSpend: 904_115,
  regCFROAS: 4.97,
  regCFFunded: 1_615,
  regCFTOFU: 13_852_456,
  regCFConversion: 0.3337,
};
