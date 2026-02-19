// data/process.ts

export interface ProcessInput {
  name: string;
  annualVolume: string;
  unitCost: string;
  totalAnnualCost: number;
  source: string;
  contractDetails: string;
}

export interface ProcessOutput {
  id: string;
  name: string;
  category: 'solid' | 'liquid' | 'gas' | 'chemical';
  annualProduction: string;
  unitPrice: string;
  wholesalePrice?: string;
  annualRevenue: number;
  marketUse: string;
  yieldPerTon: string;
  offtakeStatus: string;
}

export const PROCESS_INPUT: ProcessInput = {
  name: 'Pittsburgh #8 Coal',
  annualVolume: '2.7 million tons',
  unitCost: '~$50/ton',
  totalAnnualCost: 135_000_000,
  source: 'Regional supplier, barge-delivered via Ohio River',
  contractDetails: '10-year collared price contract for 27M tons total',
};

export const PROCESS_OUTPUTS: ProcessOutput[] = [
  {
    id: 'fascarbon',
    name: 'FASCarbon™',
    category: 'solid',
    annualProduction: '1.6 million tons',
    unitPrice: '$225/ton',
    wholesalePrice: '$300/ton',
    annualRevenue: 360_000_000,
    marketUse: 'Low-sulfur metallurgical coke for steel manufacturing. Nearly sulfur-free, high-energy solid fuel.',
    yieldPerTon: '0.6 tons per ton of coal',
    offtakeStatus: '10-year LOI — 100% of production',
  },
  {
    id: 'diesel',
    name: 'Diesel (ULSD)',
    category: 'liquid',
    annualProduction: '4.8 million barrels',
    unitPrice: '$90/bbl',
    annualRevenue: 432_000_000,
    marketUse: 'Ultra-Low Sulfur Diesel for transportation and industrial machinery.',
    yieldPerTon: '~1.8 barrels per ton of coal',
    offtakeStatus: '10-year LOI — 100% of production',
  },
  {
    id: 'naphtha',
    name: 'Naphtha',
    category: 'liquid',
    annualProduction: '500,000 barrels',
    unitPrice: '$500/ton',
    wholesalePrice: '$666/ton',
    annualRevenue: 83_000_000,
    marketUse: 'Chemical-grade petrochemical feedstock for plastics and chemical production.',
    yieldPerTon: '~0.19 barrels per ton of coal',
    offtakeStatus: '10-year LOI — 100% of production',
  },
  {
    id: 'sulfuric-acid',
    name: 'Sulfuric Acid',
    category: 'chemical',
    annualProduction: '225,000 tons',
    unitPrice: 'Market price',
    annualRevenue: 45_000_000,
    marketUse: 'Most widely used industrial chemical. Fertilizer production, battery manufacturing, chemical synthesis.',
    yieldPerTon: 'Captured from process waste (sulfur)',
    offtakeStatus: '10-year LOI — 100% of production',
  },
  {
    id: 'fertilizer',
    name: 'Ammonium Sulfate Fertilizer',
    category: 'chemical',
    annualProduction: '135,000 tons',
    unitPrice: 'Market price',
    annualRevenue: 40_000_000,
    marketUse: 'Agricultural nutrient — captured from process waste (ammonia).',
    yieldPerTon: 'Captured from process waste (ammonia)',
    offtakeStatus: '10-year LOI — 100% of production',
  },
  {
    id: 'jet-fuel',
    name: 'Jet Fuel / Kerosene',
    category: 'liquid',
    annualProduction: 'TBD',
    unitPrice: 'Market price',
    annualRevenue: 0,
    marketUse: 'Aviation-grade kerosene for commercial and military jet fuel markets. $204B+ global market.',
    yieldPerTon: 'TBD — pending financial model integration',
    offtakeStatus: 'Under evaluation',
  },
  {
    id: 'hydrogen',
    name: 'Hydrogen (FASGas™)',
    category: 'gas',
    annualProduction: '8.0 billion scf',
    unitPrice: 'Internal use',
    annualRevenue: 0,
    marketUse: 'Used internally for hydrotreating ULSD — first large-scale plant to use coal-derived hydrogen for refining. Zero-waste process integration.',
    yieldPerTon: '>2,200 scf per ton (50%+ of total gas)',
    offtakeStatus: 'Internal consumption',
  },
  {
    id: 'methane',
    name: 'Methane (FASGas™)',
    category: 'gas',
    annualProduction: '4.4 billion scf',
    unitPrice: 'Internal use',
    annualRevenue: 0,
    marketUse: 'Used internally to fuel process heaters — self-sustaining thermal loop.',
    yieldPerTon: '>2,200 scf per ton',
    offtakeStatus: 'Internal consumption',
  },
];

export const PROCESS_ECONOMICS = {
  totalAnnualInput: 135_000_000,
  totalAnnualRevenue: 1_079_142_402,
  grossMargin: 0.87,
  ebitda: 837_513_709,
  ebitdaMargin: 0.776,
  valueMultiplier: '8x',
  keyInsight: 'Every $1 of coal input generates approximately $8 in product revenue across six high-value product streams from a single low-cost feedstock.',
};

export const CTL_DIFFERENTIATION = {
  fasform: {
    label: 'FASForm™ (Solid Carbon Fractionation)',
    rows: [
      { aspect: 'Process', value: 'Thermal cracking in reducing atmosphere — no combustion, no direct CO₂' },
      { aspect: 'Products', value: '6 product streams + 2 internal-use gas streams (solids, liquids, gases, chemicals)' },
      { aspect: 'Catalysts', value: 'None required' },
      { aspect: 'Byproducts', value: 'Zero waste — all components become marketable products' },
      { aspect: 'Emissions', value: 'No direct CO₂ during processing. 25-35% net reduction.' },
      { aspect: 'Feedstock', value: 'Any grade coal, oil shale, tar sands, waste plastics' },
      { aspect: 'Patents', value: 'Global patents including South Africa and Germany' },
      { aspect: 'Economics', value: '87% gross margin, ~$1B revenue per facility' },
    ],
  },
  ctl: {
    label: 'Coal-to-Liquids (Fischer-Tropsch)',
    rows: [
      { aspect: 'Process', value: 'Gasification → synthesis gas → catalytic conversion' },
      { aspect: 'Products', value: 'Primarily synthetic crude — limited range' },
      { aspect: 'Catalysts', value: 'Expensive: cobalt, iron, ruthenium' },
      { aspect: 'Byproducts', value: 'Toxic byproducts, high waste generation' },
      { aspect: 'Emissions', value: 'Significant CO₂. Environmentally taxing.' },
      { aspect: 'Feedstock', value: 'Specific coal grades required' },
      { aspect: 'Patents', value: 'Public domain (1920s technology)' },
      { aspect: 'Economics', value: 'High CapEx, low margins, oil-price dependent' },
    ],
  },
};
