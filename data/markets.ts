// data/markets.ts

export interface MarketData {
  id: string;
  name: string;
  currentValue: number;       // billions USD
  currentYear: number;
  projectedValue: number;     // billions USD
  projectedYear: number;
  cagr: number;               // decimal (0.093 = 9.3%)
  source: string;
  frontierasProduct: string;
  color: string;
}

export const MARKETS: MarketData[] = [
  {
    id: 'hydrogen',
    name: 'Hydrogen Generation',
    currentValue: 170.14,
    currentYear: 2023,
    projectedValue: 317.39,
    projectedYear: 2030,
    cagr: 0.093,
    source: 'Grand View Research',
    frontierasProduct: 'FASGas\u2122 (Hydrogen)',
    color: '#00cc88',
  },
  {
    id: 'diesel',
    name: 'Diesel (ULSD)',
    currentValue: 935.16,
    currentYear: 2020,
    projectedValue: 1269.87,
    projectedYear: 2027,
    cagr: 0.044,
    source: 'Globe Newswire',
    frontierasProduct: 'Ultra-Low Sulfur Diesel',
    color: '#d4a852',
  },
  {
    id: 'naphtha',
    name: 'Naphtha',
    currentValue: 189.50,
    currentYear: 2023,
    projectedValue: 254.30,
    projectedYear: 2030,
    cagr: 0.043,
    source: 'Globe Newswire',
    frontierasProduct: 'Chemical-Grade Naphtha',
    color: '#4088e8',
  },
  {
    id: 'met-coal',
    name: 'Metallurgical Coal',
    currentValue: 14.70,
    currentYear: 2023,
    projectedValue: 18.40,
    projectedYear: 2032,
    cagr: 0.026,
    source: 'Straits Research',
    frontierasProduct: 'FASCarbon\u2122',
    color: '#00cc88',
  },
  {
    id: 'jet-fuel',
    name: 'Jet Fuel',
    currentValue: 204.34,
    currentYear: 2024,
    projectedValue: 214.57,
    projectedYear: 2025,
    cagr: 0.050,
    source: 'The Business Research Company',
    frontierasProduct: 'Jet Fuel / Kerosene',
    color: '#e88a30',
  },
  {
    id: 'sulfuric-acid',
    name: 'Sulfuric Acid',
    currentValue: 15.0,
    currentYear: 2023,
    projectedValue: 20.0,
    projectedYear: 2030,
    cagr: 0.042,
    source: 'Industry Estimates',
    frontierasProduct: 'Sulfuric Acid',
    color: '#e88a30',
  },
];

export const TOTAL_ADDRESSABLE_MARKET = MARKETS.reduce((sum, m) => sum + m.currentValue, 0);
export const TOTAL_PROJECTED_MARKET = MARKETS.reduce((sum, m) => sum + m.projectedValue, 0);
