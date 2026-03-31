/**
 * TOTAL ADDRESSABLE MARKET — Yield-Adjusted FASForm™ Global Economic Model
 *
 * Source: FASForm Global Yield-Adjusted TAM Model (March 2026)
 * Validated against: Energy Institute Statistical Review 2025 (74th ed),
 *                    Operis Financial Model (January 2026)
 *
 * CRITICAL: This model is directional. Yield factors are based on coal chemistry
 * fundamentals, not empirical FASForm-specific data. CTO validation required
 * before external distribution.
 *
 * Last updated: 2026-03-30
 */

import { FACILITY, OPERATIONS } from './model';

// ─── Yield Adjustment Factors by Country ────────────────────────────────────

export interface CountryYieldProfile {
  code: string;
  name: string;
  coalType: string;
  yieldFactor: number;
  energyFactor: number;
  ashFactor: number;
  moistureFactor: number;
  adjRevenuePerTon: number;
  adjEbitdaPerTon: number;
  ebitdaMargin: number;
  valueUplift: number;
  coalPrice: number;
  annualProduction: number;
  reserves: number;
  facilitiesSupported: number;
  annualRevenue: number;
  annualEbitda: number;
  reservesValue: number;
  preProcessing: string;
}

export const COUNTRY_YIELD_PROFILES: CountryYieldProfile[] = [
  {
    code: 'US-E', name: 'US — Eastern Bituminous', coalType: 'HV Bituminous',
    yieldFactor: 0.972, energyFactor: 0.972, ashFactor: 1.0, moistureFactor: 1.0,
    adjRevenuePerTon: 328, adjEbitdaPerTon: 201, ebitdaMargin: 0.613,
    valueUplift: 3.3, coalPrice: 99,
    annualProduction: 211, reserves: 218_938,
    facilitiesSupported: 78, annualRevenue: 69.1, annualEbitda: 42.4, reservesValue: 71.7,
    preProcessing: 'Minimal',
  },
  {
    code: 'US-W', name: 'US — PRB Sub-bituminous', coalType: 'Sub-bituminous',
    yieldFactor: 0.566, energyFactor: 0.652, ashFactor: 1.0, moistureFactor: 0.869,
    adjRevenuePerTon: 191, adjEbitdaPerTon: 157, ebitdaMargin: 0.821,
    valueUplift: 10.6, coalPrice: 18,
    annualProduction: 218, reserves: 30_003,
    facilitiesSupported: 81, annualRevenue: 41.6, annualEbitda: 34.1, reservesValue: 5.7,
    preProcessing: 'Partial drying recommended',
  },
  {
    code: 'CN', name: 'China', coalType: 'Mixed Bituminous',
    yieldFactor: 0.798, energyFactor: 0.858, ashFactor: 0.93, moistureFactor: 1.0,
    adjRevenuePerTon: 269, adjEbitdaPerTon: 178, ebitdaMargin: 0.662,
    valueUplift: 4.0, coalPrice: 68,
    annualProduction: 4_780, reserves: 143_197,
    facilitiesSupported: 1_770, annualRevenue: 1_285.8, annualEbitda: 850.7, reservesValue: 38.5,
    preProcessing: 'Beneficiation recommended',
  },
  {
    code: 'IN', name: 'India', coalType: 'Non-Coking Bituminous',
    yieldFactor: 0.467, energyFactor: 0.583, ashFactor: 0.80, moistureFactor: 1.0,
    adjRevenuePerTon: 157, adjEbitdaPerTon: 115, ebitdaMargin: 0.731,
    valueUplift: 5.4, coalPrice: 29,
    annualProduction: 1_085, reserves: 111_052,
    facilitiesSupported: 402, annualRevenue: 170.6, annualEbitda: 124.7, reservesValue: 17.5,
    preProcessing: 'Beneficiation required (35% ash)',
  },
  {
    code: 'ID', name: 'Indonesia', coalType: 'Sub-bituminous',
    yieldFactor: 0.601, energyFactor: 0.663, ashFactor: 1.0, moistureFactor: 0.906,
    adjRevenuePerTon: 203, adjEbitdaPerTon: 83, ebitdaMargin: 0.411,
    valueUplift: 2.0, coalPrice: 102,
    annualProduction: 836, reserves: 34_869,
    facilitiesSupported: 310, annualRevenue: 169.4, annualEbitda: 69.7, reservesValue: 7.1,
    preProcessing: 'Partial drying recommended',
  },
  {
    code: 'AU', name: 'Australia', coalType: 'Export Bituminous',
    yieldFactor: 0.900, energyFactor: 0.907, ashFactor: 1.0, moistureFactor: 0.992,
    adjRevenuePerTon: 303, adjEbitdaPerTon: 142, ebitdaMargin: 0.467,
    valueUplift: 2.2, coalPrice: 136,
    annualProduction: 463, reserves: 150_227,
    facilitiesSupported: 171, annualRevenue: 140.5, annualEbitda: 65.6, reservesValue: 45.6,
    preProcessing: 'Minimal',
  },
  {
    code: 'ZA', name: 'South Africa', coalType: 'Bituminous',
    yieldFactor: 0.801, energyFactor: 0.801, ashFactor: 1.0, moistureFactor: 1.0,
    adjRevenuePerTon: 270, adjEbitdaPerTon: 137, ebitdaMargin: 0.507,
    valueUplift: 2.5, coalPrice: 110,
    annualProduction: 235, reserves: 9_893,
    facilitiesSupported: 87, annualRevenue: 63.4, annualEbitda: 32.2, reservesValue: 2.7,
    preProcessing: 'Minimal',
  },
  {
    code: 'RU', name: 'Russia — Kuzbass', coalType: 'Bituminous',
    yieldFactor: 0.953, energyFactor: 0.953, ashFactor: 1.0, moistureFactor: 1.0,
    adjRevenuePerTon: 321, adjEbitdaPerTon: 229, ebitdaMargin: 0.713,
    valueUplift: 4.9, coalPrice: 65,
    annualProduction: 427, reserves: 162_166,
    facilitiesSupported: 158, annualRevenue: 137.2, annualEbitda: 97.8, reservesValue: 52.1,
    preProcessing: 'Minimal',
  },
  {
    code: 'DE', name: 'Germany', coalType: 'Lignite',
    yieldFactor: 0.207, energyFactor: 0.313, ashFactor: 1.0, moistureFactor: 0.663,
    adjRevenuePerTon: 70, adjEbitdaPerTon: -69, ebitdaMargin: 0,
    valueUplift: 0.5, coalPrice: 133,
    annualProduction: 92, reserves: 35_900,
    facilitiesSupported: 34, annualRevenue: 6.4, annualEbitda: -6.4, reservesValue: 2.5,
    preProcessing: 'Pre-drying plant required (55% moisture) — EBITDA negative',
  },
  {
    code: 'CA', name: 'Canada', coalType: 'Western Met Coal',
    yieldFactor: 1.010, energyFactor: 1.010, ashFactor: 1.0, moistureFactor: 1.0,
    adjRevenuePerTon: 340, adjEbitdaPerTon: 137, ebitdaMargin: 0.401,
    valueUplift: 1.9, coalPrice: 175,
    annualProduction: 43, reserves: 6_582,
    facilitiesSupported: 16, annualRevenue: 14.5, annualEbitda: 5.8, reservesValue: 2.2,
    preProcessing: 'Minimal — exceeds Pittsburgh #8 benchmark',
  },
];

// ─── Four-Tier TAM Summary ──────────────────────────────────────────────────

export interface TamTier {
  tier: number;
  label: string;
  scope: string;
  baseRevenue: number;
  baseEbitda: number;
  unit: 'B' | 'T';
  elevatedRevenue: number;
  highRevenue: number;
}

export const TAM_TIERS: TamTier[] = [
  { tier: 1, label: 'US Annual Production', scope: '464.6 Mt (2024)', baseRevenue: 115.9, baseEbitda: 80.2, unit: 'B', elevatedRevenue: 153.8, highRevenue: 210.5 },
  { tier: 2, label: 'US Total Reserves', scope: '248.9 Bt', baseRevenue: 77.4, baseEbitda: 48.7, unit: 'T', elevatedRevenue: 104.1, highRevenue: 144.0 },
  { tier: 3, label: 'Global Annual Production (9 Countries)', scope: '8,425 Mt (91.2% of world)', baseRevenue: 2.1, baseEbitda: 1.3, unit: 'T', elevatedRevenue: 2.8, highRevenue: 3.9 },
  { tier: 4, label: 'Global Total Reserves (9 Countries)', scope: '902.8 Bt (84.1% of world)', baseRevenue: 245.6, baseEbitda: 148.0, unit: 'T', elevatedRevenue: 328.6, highRevenue: 453.0 },
];

export const TAM_SENSITIVITY = { conservative: 0.85, central: 1.0, optimistic: 1.15 };

// ─── Valuation Bridge ───────────────────────────────────────────────────────

export interface ValuationScenario {
  penetration: number;
  facilities: number;
  annualRevenue: number;
  annualEbitda: number;
  ev12x: number;
  ev18x: number;
  ev25x: number;
}

export const VALUATION_BRIDGE: ValuationScenario[] = [
  { penetration: 0.03, facilities: 1, annualRevenue: 0.629, annualEbitda: 0.395, ev12x: 4.7, ev18x: 7.1, ev25x: 9.9 },
  { penetration: 0.50, facilities: 16, annualRevenue: 10.5, annualEbitda: 6.6, ev12x: 79.0, ev18x: 118.5, ev25x: 164.6 },
  { penetration: 1.00, facilities: 31, annualRevenue: 21.0, annualEbitda: 13.2, ev12x: 158.0, ev18x: 237.0, ev25x: 329.1 },
  { penetration: 2.00, facilities: 62, annualRevenue: 42.0, annualEbitda: 26.3, ev12x: 316.0, ev18x: 474.0, ev25x: 658.3 },
  { penetration: 5.00, facilities: 155, annualRevenue: 104.9, annualEbitda: 65.8, ev12x: 789.9, ev18x: 1_185.0, ev25x: 1_645.0 },
];

// ─── Value Uplift ───────────────────────────────────────────────────────────

export const VALUE_UPLIFT = {
  totalAnnualCoalValue: 602.9,
  totalAnnualFasformValue: 2_100,
  annualFoundValue: 1_497.1,
  weightedAverageUplift: 3.5,
};

// ─── Facility Context ───────────────────────────────────────────────────────

export const FACILITY_CONTEXT = {
  singleFacilityThroughput: 2_700_000,
  totalFacilitiesSupported: 3_107,
  plannedFacilities: 16,
  plannedAsPercentOfMarket: 0.51,
  ratioSupportedToPlanned: 194,
};

// ─── Crude Oil Comparison ───────────────────────────────────────────────────

export const CRUDE_COMPARISON = {
  globalRefiningRevenue: 2_700,
  fasformTamRevenue: 2_100,
  fasformAsPercentOfCrude: 0.78,
  crudeRefiningMargin: 0.125,
  fasformMargin: 0.76,
  crudeRefiningEbitda: 337,
  fasformEbitda: 1_300,
};

// ─── Headlines (compliance-ready) ───────────────────────────────────────────

export const HEADLINES = [
  { id: 'patent-coverage', metric: '91%', label: 'Global Production Covered', text: 'Frontieras holds patents across nine countries representing 91% of global coal production and 84% of global proved reserves.' },
  { id: 'global-tam', metric: '$2.1T', label: 'Annual Addressable Value', text: 'The yield-adjusted annual addressable value across nine patent countries is estimated at $2.1 trillion at base-case pricing.' },
  { id: 'us-reserves', metric: '$77T', label: 'US Reserves Value', text: 'US coal reserves alone contain an estimated $77 trillion in yield-adjusted recoverable value through Solid Carbon Fractionation.' },
  { id: 'value-uplift', metric: '3.5x', label: 'Average Value Uplift', text: 'FASForm processing creates an average 3.5x value uplift — transforming coal worth $603B annually into $2.1T in product value.' },
  { id: 'market-scratch', metric: '0.5%', label: '10-Year Plan Coverage', text: 'The 10-year plan of 16 facilities represents 0.5% of the total addressable market across nine patent countries.' },
  { id: 'found-value', metric: '$1.5T', label: 'Annual Found Value', text: 'FASForm technology unlocks approximately $1.5 trillion per year in net new economic value across the nine patent countries.' },
];
