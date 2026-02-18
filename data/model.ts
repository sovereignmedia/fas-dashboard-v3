/**
 * SINGLE SOURCE OF TRUTH — Financial Model 4.1.25.xlsx
 *
 * Every financial constant in this dashboard derives from this file.
 * When the company releases updated financials, update ONLY this file.
 * All other data files and components import from here.
 *
 * Last synced: Financial Model 4.1.25.xlsx (April 2025)
 */

export const MODEL_VERSION = '4.1.25';

// ─── IS (Income Statement): Year 4 Steady-State Single Facility ────
export const FACILITY = {
  totalRevenue:    1_079_142_402,
  totalDirectCost:   135_000_000,
  grossProfit:       944_142_402,
  grossMargin:       0.875,
  ebitda:            837_513_709,
  ebitdaMargin:      0.776,
  netIncome:         722_884_351,
  netMargin:         0.670,
} as const;

// ─── IS: Year 3 Ramp-Up (75% → 100%) ──────────────────────────────
// Used by globe for conservative 1% market penetration estimates.
export const FACILITY_RAMP_YEAR = {
  revenue:         1_043_742_806,
  directCost:        132_187_500,
  grossProfit:       911_555_306,
  ebitda:            808_808_440,
  netIncome:         688_795_915,
} as const;

// ─── CapEx Sheet ────────────────────────────────────────────────────
export const CAPEX = {
  total:             745_541_205,
  epcCosts:          595_541_205,
  contingency:       150_000_000,
} as const;

// ─── Rev&COGs Sheet: Operating Inputs ───────────────────────────────
export const OPERATIONS = {
  coalThroughputTonsPerDay: 7_500,
  coalCostPerTon:              50,
  annualCoalCost:      11_250_000,
} as const;

// ─── Rev&COGs Sheet: Product Economics (MONTHLY figures) ────────────
// Excel model uses monthly volumes. Multiply by 12 for annual.
export const MONTHLY_VOLUMES = {
  fascarbon:        135_445,   // US Tons
  diesel:           398_458,   // Barrels
  naphtha:           15_930,   // US Tons
  sulfuricAcid:      18_644,   // US Tons
  ammoniumSulfate:    3_580,   // US Tons (converted from sulfuric acid at 0.4615 rate)
  // Bio-Oil is NOT in the Excel model. See products.ts.
} as const;

export const MODELED_PRICES = {
  fascarbon:       250,        // $/ton (steel-grade)
  diesel:           91.80,     // $/barrel (~18% below NYMEX)
  naphtha:         695.64,     // $/ton (~18% below spot)
  sulfuricAcid:    231.54,     // $/ton (~17% below spot)
  ammoniumSulfate: 527.34,     // $/ton (~18% below spot)
} as const;

export const SPOT_PRICES = {
  fascarbon:       310,        // $/ton
  diesel:          112,        // $/barrel
  naphtha:         850,        // $/ton
  sulfuricAcid:    280,        // $/ton
  ammoniumSulfate: 640,        // $/ton
} as const;

// ─── Expansion & IP ─────────────────────────────────────────────────
export const EXPANSION = {
  patentCountries:             9,
  totalFacilityPotential:    143,
} as const;

// ─── Capital / Reg A+ ───────────────────────────────────────────────
export const CAPITAL = {
  bridgeRoundTotal:     25_000_000,
  totalSharesOutstanding: 100_000_000,
  sharePrice:                 7.77,
  totalRaised:          9_000_000,
  shareholders:             3_700,
} as const;

// ─── Valuation Defaults ─────────────────────────────────────────────
export const VALUATION = {
  traditionalMultiple:          6,
  defaultEbitdaMultiple:       12,  // Clean Energy Tech scenario
  paradigmMultiple:            18,
} as const;
