export interface Product {
  id: string;
  name: string;
  displayName: string;
  annualVolume: number;
  volumeUnit: string;
  spotPrice: number;
  modeledPrice: number;
  priceUnit: string;
  annualRevenue: number;
  directCost: number;
  grossMargin: number;
  globalMarketSize: string;
  description: string;
  color: string;
}

export const products: Product[] = [
  {
    id: 'fascarbon',
    name: 'FASCarbon',
    displayName: 'FASCarbon\u2122',
    annualVolume: 135_445,
    volumeUnit: 'US Tons',
    spotPrice: 310,
    modeledPrice: 250,
    priceUnit: '$/ton',
    annualRevenue: 33_861_250,
    directCost: 0,
    grossMargin: 1.0,
    globalMarketSize: '$28B',
    description: 'High-purity carbon product for steel production, thermal applications, and specialty markets. Primary pricing based on steel-grade carbon at $250/ton.',
    color: '#4A9EFF',
  },
  {
    id: 'diesel',
    name: 'Diesel',
    displayName: 'Ultra-Low Sulfur Diesel',
    annualVolume: 398_458,
    volumeUnit: 'Barrels',
    spotPrice: 112,
    modeledPrice: 91.80,
    priceUnit: '$/barrel',
    annualRevenue: 36_578_444,
    directCost: 0,
    grossMargin: 1.0,
    globalMarketSize: '$450B',
    description: 'ULSD meeting ASTM D975 specifications. Hydrotreated to ultra-low sulfur standards. Priced ~18% below NYMEX ULSD futures.',
    color: '#00D4AA',
  },
  {
    id: 'naphtha',
    name: 'Naphtha',
    displayName: 'Naphtha',
    annualVolume: 15_930,
    volumeUnit: 'US Tons',
    spotPrice: 850,
    modeledPrice: 695.64,
    priceUnit: '$/ton',
    annualRevenue: 11_081_545,
    directCost: 0,
    grossMargin: 1.0,
    globalMarketSize: '$180B',
    description: 'Light hydrocarbon fraction used as petrochemical feedstock and gasoline blendstock. Priced ~18% below spot.',
    color: '#8B5CF6',
  },
  {
    id: 'sulfuric-acid',
    name: 'Sulfuric Acid',
    displayName: 'Sulfuric Acid',
    annualVolume: 18_644,
    volumeUnit: 'US Tons',
    spotPrice: 280,
    modeledPrice: 231.54,
    priceUnit: '$/ton',
    annualRevenue: 4_316_921,
    directCost: 0,
    grossMargin: 1.0,
    globalMarketSize: '$15B',
    description: 'Industrial-grade sulfuric acid. ~70% sold to market; remainder converted to ammonium sulfate fertilizer. Priced ~17% below spot.',
    color: '#FF8C42',
  },
  {
    id: 'fertilizer',
    name: 'Ammonium Sulfate',
    displayName: 'Ammonium Sulfate Fertilizer',
    annualVolume: 3_580,
    volumeUnit: 'US Tons',
    spotPrice: 640,
    modeledPrice: 527.34,
    priceUnit: '$/ton',
    annualRevenue: 4_090_373,
    directCost: 0,
    grossMargin: 1.0,
    globalMarketSize: '$4B',
    description: 'Produced from sulfuric acid not sold to market. Converted at 0.4615 tons per ton of sulfuric acid input. Priced ~18% below spot.',
    color: '#10B981',
  },
  {
    id: 'bio-oil',
    name: 'Bio-Oil',
    displayName: 'Bio-Oil',
    annualVolume: 45_000,
    volumeUnit: 'Barrels',
    spotPrice: 85,
    modeledPrice: 70,
    priceUnit: '$/barrel',
    annualRevenue: 3_150_000,
    directCost: 0,
    grossMargin: 1.0,
    globalMarketSize: '$8B',
    description: 'Liquid bio-oil byproduct with applications in industrial heating and chemical feedstock. Conservative pricing.',
    color: '#FF4C4C',
  },
];

export const facilityEconomics = {
  coalThroughput: 7_500,
  coalCostPerTon: 50,
  annualCoalCost: 11_250_000,
  totalRevenue: 1_079_142_402,
  totalDirectCost: 135_000_000,
  grossProfit: 944_142_402,
  grossMargin: 0.875,
  ebitda: 837_513_709,
  ebitdaMargin: 0.776,
  netIncome: 722_884_351,
  netMargin: 0.670,
  totalCapex: 745_541_205,
  contingency: 150_000_000,
  epcCosts: 595_541_205,
};
