// data/risks.ts

export type RiskStatus = 'executed' | 'in-progress' | 'planned';

export interface RiskMitigation {
  strategy: string;
  detail: string;
  partner?: string;
  status: RiskStatus;
  evidence?: string;
}

export interface RiskCategory {
  id: string;
  name: string;
  severity: 'high' | 'medium' | 'low';
  description: string;
  institutionalConcern: string;
  mitigations: RiskMitigation[];
}

export const RISK_CATEGORIES: RiskCategory[] = [
  {
    id: 'real-estate',
    name: 'Real Estate & Site Readiness',
    severity: 'low',
    description: 'Land acquired. Focus shifts to site preparation, permitting, and infrastructure readiness for the Mason County, WV facility.',
    institutionalConcern: 'Site readiness — permitting, utility interconnects, and environmental clearances — must proceed on schedule to support construction timeline.',
    mitigations: [
      { strategy: 'Land Acquisition Completed', detail: 'Mason County, WV site purchased and under company ownership. Site selection risk fully retired.', status: 'executed', evidence: 'Land purchase closed' },
      { strategy: 'Strategic Site Advantages', detail: 'On-site CSX rail spur, Ohio River barge access, AEP power grid, TC Energy natural gas pipeline — all infrastructure partners under executed MSAs.', status: 'executed', evidence: 'CSX, AEP, TC Energy MSAs executed' },
      { strategy: 'Permitting & Environmental Compliance', detail: 'Working with West Virginia Department of Environmental Protection on permitting. Environmental management plans developed with CAMS.', partner: 'CAMS', status: 'in-progress' },
    ],
  },
  {
    id: 'capital',
    name: 'Capital & Debt Financing Risk',
    severity: 'high',
    description: 'Can the company secure the full $850M capital stack?',
    institutionalConcern: 'Complex capital structure requiring coordination of equity and debt financing.',
    mitigations: [
      { strategy: 'Conservative Capital Structure', detail: '15% equity ($125M) / 85% debt ($725M) \u2014 standard for large infrastructure projects.', status: 'in-progress' },
      { strategy: '10-Year Off-Take Agreements', detail: '100% of production covered by 10-year LOIs across all product lines. Provides debt holders revenue certainty.', status: 'executed', evidence: 'LOIs executed for all product lines' },
      { strategy: 'Collared Feedstock Contract', detail: '10-year contract for 27M tons of Pittsburgh #8 coal with collared pricing \u2014 eliminates input cost volatility.', status: 'executed' },
      { strategy: '$150M Contingency Reserve', detail: 'Built into $849M total project cost \u2014 18% buffer on top of 15% line-item contingencies.', status: 'planned' },
    ],
  },
  {
    id: 'licensing',
    name: 'Licensing Agreement Dependency',
    severity: 'medium',
    description: 'Reliance on the licensing agreement with Frontier Applied Sciences (FAS).',
    institutionalConcern: 'Default on licensing agreement could jeopardize technology access.',
    mitigations: [
      { strategy: 'Integrated Management Approach', detail: 'Strong collaboration and strategic alignment on financial commitments between FAS and Frontieras.', status: 'executed' },
      { strategy: 'Regular Payment Scheduling', detail: 'Automated payment systems to avoid defaulting on periodic payments.', status: 'executed' },
      { strategy: 'Operational Contingency', detail: 'Secondary plans to extend or renegotiate the agreement if necessary.', status: 'planned' },
    ],
  },
  {
    id: 'scale',
    name: 'Technology Scale-Up Risk',
    severity: 'high',
    description: 'Can FASForm\u2122 operate at commercial scale (7,500 tons/day)?',
    institutionalConcern: 'Demo unit validated but commercial-scale production is unproven.',
    mitigations: [
      { strategy: 'Third-Party Engineering Validation', detail: '12-month successful test period validated by independent engineering firm with ASTM protocols.', status: 'executed', evidence: 'Third-party ASTM test results on file' },
      { strategy: 'Technology Performance Bond', detail: 'Output performance bond placed with Ariel Green \u2014 financial guarantee of technology performance.', partner: 'Ariel Green', status: 'executed', evidence: 'WRAP Output Guarantee \u2014 $3.9M' },
      { strategy: 'World-Class Engineering Partners', detail: 'KBC (process design), Yokogawa (controls/automation), JOB EPC Co. (construction) \u2014 extensive refinery experience.', partner: 'KBC / Yokogawa / JOB EPC', status: 'executed', evidence: 'MSAs executed' },
    ],
  },
  {
    id: 'construction',
    name: 'Construction & Execution Risk',
    severity: 'medium',
    description: 'Can the facility be built on time and on budget (26 months)?',
    institutionalConcern: 'Large-scale industrial construction with first-of-kind technology integration.',
    mitigations: [
      { strategy: 'CAMS Operations Partnership', detail: 'CAMS manages $20B+ in assets with 82 Industry Best Practice Awards. MSA executed for full lifecycle.', partner: 'CAMS', status: 'executed', evidence: '15+ years managing energy infrastructure' },
      { strategy: 'Phased Front-End Loading (FEL)', detail: 'FEL-1 and FEL-2 completed. FEL-3 in progress. Staged engineering resolves design issues before breaking ground.', status: 'in-progress', evidence: 'FEL-1 and FEL-2 completed' },
      { strategy: 'Comprehensive Insurance', detail: "Lockton \u2014 world's largest independent insurance brokerage \u2014 providing full construction and operations coverage.", partner: 'Lockton', status: 'executed' },
      { strategy: 'Strategic Site Advantages', detail: 'Mason County, WV: On-site CSX rail spur, Ohio River barge access, proximity to coal supply.', status: 'executed' },
    ],
  },
  {
    id: 'environmental',
    name: 'Environmental & Regulatory Compliance',
    severity: 'medium',
    description: 'Non-compliance with environmental laws and potential delays in regulatory approvals.',
    institutionalConcern: 'Regulatory delays could stall construction and increase costs.',
    mitigations: [
      { strategy: 'Proactive Permitting', detail: 'Working closely with the West Virginia Department of Environmental Protection for timely approvals.', status: 'in-progress' },
      { strategy: 'Environmental Management Plans', detail: 'CAMS-led safety and environmental plans, including hazardous materials and personal protection protocols.', partner: 'CAMS', status: 'executed' },
      { strategy: 'Wildlife Mitigation', detail: 'Strategies developed to mitigate impact on endangered species through environmentally friendly construction practices.', status: 'planned' },
    ],
  },
  {
    id: 'revenue',
    name: 'Revenue & Commercialization Risk',
    severity: 'medium',
    description: 'Failure to generate significant revenues due to delayed commercialization or market acceptance.',
    institutionalConcern: 'First-of-kind technology may face market adoption challenges.',
    mitigations: [
      { strategy: 'Long-Term Offtake Agreements', detail: '10-year agreements secured for 100% of all product outputs.', status: 'executed', evidence: 'LOIs executed' },
      { strategy: 'Market Diversification', detail: 'Targeting steel, energy, agriculture, and petrochemical industries to reduce single-market dependency.', status: 'executed' },
      { strategy: 'Scalable Production Model', detail: 'Operations designed with scalability to adapt quickly to market demand changes.', status: 'planned' },
    ],
  },
  {
    id: 'delays',
    name: 'Delays & Material Shortages',
    severity: 'medium',
    description: 'Material or equipment shortages and construction delays during facility completion.',
    institutionalConcern: 'Supply chain disruptions could extend timeline and increase costs.',
    mitigations: [
      { strategy: 'Supply Chain Management', detail: 'Multiple supplier relationships established for critical equipment and raw materials.', status: 'executed' },
      { strategy: 'Long-Lead Procurement', detail: 'Early procurement of essential components and materials prioritized in capital planning.', status: 'in-progress' },
      { strategy: 'Project Buffering', detail: 'Time and budget buffers built into project plans to accommodate potential delays.', status: 'planned' },
    ],
  },
  {
    id: 'ip-commercialization',
    name: 'IP Commercialization Risk',
    severity: 'low',
    description: 'Failure to monetize intellectual property and generate significant technology licensing revenues.',
    institutionalConcern: 'Technology value may not translate to commercial returns beyond first plant.',
    mitigations: [
      { strategy: 'Ongoing R&D', detail: 'Continuous investment in improving FASForm\u2122 and SCF technologies.', status: 'executed' },
      { strategy: 'Strategic Licensing Exploration', detail: 'Opportunities to license technology to other producers, creating additional revenue streams.', status: 'planned' },
      { strategy: 'Market Education', detail: 'Robust marketing efforts to highlight benefits of FASCarbon\u2122 and other products.', status: 'in-progress' },
    ],
  },
  {
    id: 'key-personnel',
    name: 'Key Personnel Risk',
    severity: 'medium',
    description: 'Loss or unavailability of executive officers or critical employees.',
    institutionalConcern: 'Company heavily dependent on CEO and CTO\u2019s vision and expertise.',
    mitigations: [
      { strategy: 'Succession Planning', detail: 'Robust succession plan developed for executive roles, particularly CEO and CTO.', status: 'in-progress' },
      { strategy: 'Employee Retention Programs', detail: 'Competitive compensation packages, incentives, and professional development opportunities.', status: 'executed' },
      { strategy: 'Cross-Training Initiatives', detail: 'Key operational knowledge shared across team members to avoid single-person dependencies.', status: 'in-progress' },
    ],
  },
  {
    id: 'supplier',
    name: 'Supplier & Raw Material Risk',
    severity: 'low',
    description: 'Dependence on a limited number of suppliers for coal feedstock.',
    institutionalConcern: 'Single-source dependency could create supply disruptions.',
    mitigations: [
      { strategy: 'Supplier Diversification', detail: 'Agreements with multiple coal suppliers established to ensure supply chain stability.', status: 'executed' },
      { strategy: 'Long-Term Contracts', detail: '10-year contract for 27M tons with collared pricing secures supply certainty.', status: 'executed' },
      { strategy: 'Strategic Inventory Reserves', detail: 'Raw material reserves maintained to cushion against short-term supply shocks.', status: 'planned' },
    ],
  },
  {
    id: 'cybersecurity',
    name: 'Cybersecurity & IP Protection',
    severity: 'low',
    description: 'Cyber-attacks and potential intellectual property litigation.',
    institutionalConcern: 'Industrial control systems and proprietary technology require robust protection.',
    mitigations: [
      { strategy: 'Advanced Cybersecurity', detail: 'Partnered with Bluewire (CAMS subsidiary) for cutting-edge cybersecurity measures.', partner: 'CAMS / Bluewire', status: 'executed' },
      { strategy: 'Regular Security Audits', detail: 'Frequent IT security assessments and vulnerability testing.', status: 'planned' },
      { strategy: 'Patent Portfolio Protection', detail: 'Baker Botts LLP managing IP litigation risks across 9 international jurisdictions.', partner: 'Baker Botts LLP', status: 'executed' },
    ],
  },
  {
    id: 'commodity-price',
    name: 'Commodity Price Volatility',
    severity: 'medium',
    description: 'Pricing pressure, reduced margins, and fluctuating commodity prices.',
    institutionalConcern: 'Revenue projections assume stable commodity pricing that may not hold.',
    mitigations: [
      { strategy: 'Flexible Pricing Models', detail: 'Pricing strategies designed to maintain competitiveness across market conditions.', status: 'planned' },
      { strategy: 'Operational Efficiency', detail: 'Focus on cost management to sustain healthy margins even during price volatility.', status: 'executed' },
      { strategy: 'Hedging Strategies', detail: 'Financial instruments being explored to hedge against commodity price fluctuations.', status: 'planned' },
    ],
  },
  {
    id: 'global-expansion',
    name: 'Global Market Expansion Risk',
    severity: 'low',
    description: 'Political, economic, and operational risks associated with international markets.',
    institutionalConcern: 'International expansion introduces geopolitical and regulatory complexity.',
    mitigations: [
      { strategy: 'Market Research', detail: 'Thorough due diligence conducted before entering new international markets.', status: 'planned' },
      { strategy: 'Local Partnerships', detail: 'Collaboration with established local partners to navigate regulatory and operational challenges.', status: 'planned' },
      { strategy: 'Gradual Market Entry', detail: 'Focus on the most stable and high-potential regions first, expanding gradually.', status: 'planned' },
    ],
  },
];
