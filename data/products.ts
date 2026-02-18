import { MONTHLY_VOLUMES, MODELED_PRICES, SPOT_PRICES, FACILITY, CAPEX, OPERATIONS } from './model';

export interface Product {
  id: string;
  name: string;
  displayName: string;
  monthlyVolume: number;
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
  inExcelModel: boolean;
}

export const products: Product[] = [
  {
    id: 'fascarbon',
    name: 'FASCarbon',
    displayName: 'FASCarbon\u2122',
    monthlyVolume: MONTHLY_VOLUMES.fascarbon,
    annualVolume: MONTHLY_VOLUMES.fascarbon * 12,
    volumeUnit: 'US Tons',
    spotPrice: SPOT_PRICES.fascarbon,
    modeledPrice: MODELED_PRICES.fascarbon,
    priceUnit: '$/ton',
    annualRevenue: MONTHLY_VOLUMES.fascarbon * MODELED_PRICES.fascarbon * 12,
    directCost: 0,
    grossMargin: 1.0,
    globalMarketSize: '$28B',
    description: 'High-purity carbon product for steel production, thermal applications, and specialty markets. Primary pricing based on steel-grade carbon at $250/ton.',
    color: '#00cc88',
    inExcelModel: true,
  },
  {
    id: 'diesel',
    name: 'Diesel',
    displayName: 'Ultra-Low Sulfur Diesel',
    monthlyVolume: MONTHLY_VOLUMES.diesel,
    annualVolume: MONTHLY_VOLUMES.diesel * 12,
    volumeUnit: 'Barrels',
    spotPrice: SPOT_PRICES.diesel,
    modeledPrice: MODELED_PRICES.diesel,
    priceUnit: '$/barrel',
    annualRevenue: MONTHLY_VOLUMES.diesel * MODELED_PRICES.diesel * 12,
    directCost: 0,
    grossMargin: 1.0,
    globalMarketSize: '$450B',
    description: 'ULSD meeting ASTM D975 specifications. Hydrotreated to ultra-low sulfur standards. Priced ~18% below NYMEX ULSD futures.',
    color: '#d4a852',
    inExcelModel: true,
  },
  {
    id: 'naphtha',
    name: 'Naphtha',
    displayName: 'Naphtha',
    monthlyVolume: MONTHLY_VOLUMES.naphtha,
    annualVolume: MONTHLY_VOLUMES.naphtha * 12,
    volumeUnit: 'US Tons',
    spotPrice: SPOT_PRICES.naphtha,
    modeledPrice: MODELED_PRICES.naphtha,
    priceUnit: '$/ton',
    annualRevenue: MONTHLY_VOLUMES.naphtha * MODELED_PRICES.naphtha * 12,
    directCost: 0,
    grossMargin: 1.0,
    globalMarketSize: '$180B',
    description: 'Light hydrocarbon fraction used as petrochemical feedstock and gasoline blendstock. Priced ~18% below spot.',
    color: '#4088e8',
    inExcelModel: true,
  },
  {
    id: 'sulfuric-acid',
    name: 'Sulfuric Acid',
    displayName: 'Sulfuric Acid',
    monthlyVolume: MONTHLY_VOLUMES.sulfuricAcid,
    annualVolume: MONTHLY_VOLUMES.sulfuricAcid * 12,
    volumeUnit: 'US Tons',
    spotPrice: SPOT_PRICES.sulfuricAcid,
    modeledPrice: MODELED_PRICES.sulfuricAcid,
    priceUnit: '$/ton',
    annualRevenue: MONTHLY_VOLUMES.sulfuricAcid * MODELED_PRICES.sulfuricAcid * 12,
    directCost: 0,
    grossMargin: 1.0,
    globalMarketSize: '$15B',
    description: 'Industrial-grade sulfuric acid. ~70% sold to market; remainder converted to ammonium sulfate fertilizer. Priced ~17% below spot.',
    color: '#e88a30',
    inExcelModel: true,
  },
  {
    id: 'fertilizer',
    name: 'Ammonium Sulfate',
    displayName: 'Ammonium Sulfate Fertilizer',
    monthlyVolume: MONTHLY_VOLUMES.ammoniumSulfate,
    annualVolume: MONTHLY_VOLUMES.ammoniumSulfate * 12,
    volumeUnit: 'US Tons',
    spotPrice: SPOT_PRICES.ammoniumSulfate,
    modeledPrice: MODELED_PRICES.ammoniumSulfate,
    priceUnit: '$/ton',
    annualRevenue: MONTHLY_VOLUMES.ammoniumSulfate * MODELED_PRICES.ammoniumSulfate * 12,
    directCost: 0,
    grossMargin: 1.0,
    globalMarketSize: '$4B',
    description: 'Produced from sulfuric acid not sold to market. Converted at 0.4615 tons per ton of sulfuric acid input. Priced ~18% below spot.',
    color: '#c084fc',
    inExcelModel: true,
  },
];

export const facilityEconomics = {
  coalThroughput: OPERATIONS.coalThroughputTonsPerDay,
  coalCostPerTon: OPERATIONS.coalCostPerTon,
  annualCoalCost: OPERATIONS.annualCoalCost,
  totalRevenue: FACILITY.totalRevenue,
  totalDirectCost: FACILITY.totalDirectCost,
  grossProfit: FACILITY.grossProfit,
  grossMargin: FACILITY.grossMargin,
  ebitda: FACILITY.ebitda,
  ebitdaMargin: FACILITY.ebitdaMargin,
  netIncome: FACILITY.netIncome,
  netMargin: FACILITY.netMargin,
  totalCapex: CAPEX.total,
  contingency: CAPEX.contingency,
  epcCosts: CAPEX.epcCosts,
};
