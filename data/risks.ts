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
    id: 'scale',
    name: 'Technology Scale-Up Risk',
    severity: 'medium',
    description: 'Can FASForm™ operate at commercial scale (7,500 tons/day)?',
    institutionalConcern: 'Demo unit validated but commercial-scale production is unproven.',
    mitigations: [
      {
        strategy: 'Third-Party Engineering Validation',
        detail: '12-month successful test period validated by independent engineering firm with ASTM protocols.',
        status: 'executed',
        evidence: 'Third-party ASTM test results on file',
      },
      {
        strategy: 'Technology Performance Bond',
        detail: 'Output performance bond placed with Ariel Green — financial guarantee of technology performance.',
        partner: 'Ariel Green',
        status: 'executed',
        evidence: 'WRAP Output Guarantee — $3.9M',
      },
      {
        strategy: 'World-Class Engineering Partners',
        detail: 'KBC (process design), Yokogawa (controls/automation), JOB EPC Co. (construction) — extensive refinery experience.',
        partner: 'KBC / Yokogawa / JOB EPC',
        status: 'executed',
        evidence: 'MSAs executed',
      },
    ],
  },
  {
    id: 'finance',
    name: 'Capital & Financing Risk',
    severity: 'medium',
    description: 'Can the company secure the full $850M capital stack?',
    institutionalConcern: 'Complex capital structure requiring coordination of equity and debt financing.',
    mitigations: [
      {
        strategy: 'Conservative Capital Structure',
        detail: '15% equity ($125M) / 85% debt ($725M) — standard for large infrastructure projects.',
        status: 'in-progress',
      },
      {
        strategy: '10-Year Off-Take Agreements',
        detail: '100% of production covered by 10-year LOIs across all product lines. Provides debt holders revenue certainty.',
        status: 'executed',
        evidence: 'LOIs executed for all product lines',
      },
      {
        strategy: 'Collared Feedstock Contract',
        detail: '10-year contract for 27M tons of Pittsburgh #8 coal with collared pricing — eliminates input cost volatility.',
        status: 'executed',
      },
      {
        strategy: '$150M Contingency Reserve',
        detail: 'Built into $849M total project cost — 18% buffer on top of 15% line-item contingencies.',
        status: 'planned',
      },
    ],
  },
  {
    id: 'construction',
    name: 'Construction & Execution Risk',
    severity: 'medium',
    description: 'Can the facility be built on time and on budget (26 months)?',
    institutionalConcern: 'Large-scale industrial construction with first-of-kind technology integration.',
    mitigations: [
      {
        strategy: 'CAMS Operations Partnership',
        detail: 'CAMS manages $20B+ in assets with 82 Industry Best Practice Awards. MSA executed for full lifecycle from construction through operations.',
        partner: 'CAMS',
        status: 'executed',
        evidence: '15+ years managing energy infrastructure',
      },
      {
        strategy: 'Phased Front-End Loading (FEL)',
        detail: 'FEL-1 and FEL-2 completed. FEL-3 in progress. Staged engineering resolves design issues before breaking ground.',
        status: 'in-progress',
        evidence: 'FEL-1 and FEL-2 completed',
      },
      {
        strategy: 'Comprehensive Insurance',
        detail: 'Lockton — world\'s largest independent insurance brokerage — providing full construction and operations coverage.',
        partner: 'Lockton',
        status: 'executed',
      },
      {
        strategy: 'Strategic Site Advantages',
        detail: 'Mason County, WV: On-site CSX rail spur, Ohio River barge access, proximity to coal supply.',
        status: 'executed',
      },
    ],
  },
];
