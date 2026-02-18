import { FACILITY, FACILITY_RAMP_YEAR, CAPEX } from './model';

export const yearlyProjections = [
  {
    year: 'Year 1',
    label: 'Construction',
    facilities: 0,
    revenue: 0,
    directCost: 0,
    grossProfit: 0,
    ebitda: -1_400_000,
    netIncome: -65_211_403,
  },
  {
    year: 'Year 2',
    label: 'Construction / Commissioning',
    facilities: 0,
    revenue: 0,
    directCost: 0,
    grossProfit: 0,
    ebitda: -3_080_000,
    netIncome: -118_057_243,
  },
  {
    year: 'Year 3',
    label: 'Ramp-Up (75% \u2192 100%)',
    facilities: 1,
    revenue: FACILITY_RAMP_YEAR.revenue,
    directCost: FACILITY_RAMP_YEAR.directCost,
    grossProfit: FACILITY_RAMP_YEAR.grossProfit,
    ebitda: FACILITY_RAMP_YEAR.ebitda,
    netIncome: FACILITY_RAMP_YEAR.netIncome,
  },
  {
    year: 'Year 4',
    label: 'Steady State',
    facilities: 1,
    revenue: FACILITY.totalRevenue,
    directCost: FACILITY.totalDirectCost,
    grossProfit: FACILITY.grossProfit,
    ebitda: FACILITY.ebitda,
    netIncome: FACILITY.netIncome,
  },
  {
    year: 'Year 5',
    label: 'Steady State + Escalation',
    facilities: 1,
    revenue: 1_092_598_550,
    directCost: 135_000_000,
    grossProfit: 957_598_550,
    ebitda: 849_078_855,
    netIncome: 740_378_683,
  },
];

export const valuationScenarios = [
  {
    id: 'traditional',
    name: 'Traditional Energy',
    multiple: 6,
    color: '#4088e8',
    description: 'Comparable to established energy/industrial companies. ConocoPhillips, Marathon, Valero.',
  },
  {
    id: 'cleantech',
    name: 'Clean Energy Tech',
    multiple: 12,
    color: '#00cc88',
    description: 'Clean technology premium reflecting ESG positioning and carbon-negative outputs.',
  },
  {
    id: 'paradigm',
    name: 'Paradigm Shift',
    multiple: 18,
    color: '#d4a852',
    description: 'Novel technology disrupting multiple commodity markets simultaneously. New asset class.',
  },
];

export function calculateMultiFacility(facilityCount: number, ebitdaMultiple: number) {
  return {
    facilities: facilityCount,
    revenue: FACILITY.totalRevenue * facilityCount,
    ebitda: FACILITY.ebitda * facilityCount,
    capex: CAPEX.total * facilityCount,
    enterpriseValue: FACILITY.ebitda * facilityCount * ebitdaMultiple,
  };
}
