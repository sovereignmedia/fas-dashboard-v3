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
    revenue: 1_043_742_806,
    directCost: 132_187_500,
    grossProfit: 911_555_306,
    ebitda: 808_808_440,
    netIncome: 688_795_915,
  },
  {
    year: 'Year 4',
    label: 'Steady State',
    facilities: 1,
    revenue: 1_079_142_402,
    directCost: 135_000_000,
    grossProfit: 944_142_402,
    ebitda: 837_513_709,
    netIncome: 722_884_351,
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
    color: '#4A9EFF',
    description: 'Comparable to established energy/industrial companies. ConocoPhillips, Marathon, Valero.',
  },
  {
    id: 'cleantech',
    name: 'Clean Energy Tech',
    multiple: 12,
    color: '#00D4AA',
    description: 'Clean technology premium reflecting ESG positioning and carbon-negative outputs.',
  },
  {
    id: 'paradigm',
    name: 'Paradigm Shift',
    multiple: 18,
    color: '#D4A853',
    description: 'Novel technology disrupting multiple commodity markets simultaneously. New asset class.',
  },
];

export function calculateMultiFacility(facilityCount: number, ebitdaMultiple: number) {
  const singleFacilityEBITDA = 837_513_709;
  const singleFacilityRevenue = 1_079_142_402;
  const singleFacilityCapex = 745_541_205;

  return {
    facilities: facilityCount,
    revenue: singleFacilityRevenue * facilityCount,
    ebitda: singleFacilityEBITDA * facilityCount,
    capex: singleFacilityCapex * facilityCount,
    enterpriseValue: singleFacilityEBITDA * facilityCount * ebitdaMultiple,
  };
}
