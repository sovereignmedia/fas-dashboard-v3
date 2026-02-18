import { countries } from './countries';
import { FACILITY, EXPANSION } from './model';

export const TOTAL_FACILITY_POTENTIAL = EXPANSION.totalFacilityPotential;
export const SINGLE_FACILITY_EBITDA = FACILITY.ebitda;
export const SINGLE_FACILITY_REVENUE = FACILITY.totalRevenue;
export const TOTAL_GLOBAL_COAL = countries.reduce((sum, c) => sum + c.coalProduction, 0);

export const gridPositions: Record<string, { row: number; col: number }> = {
  CA: { row: 0, col: 1 },
  US: { row: 1, col: 1 },
  CO: { row: 2, col: 2 },
  PL: { row: 0, col: 5 },
  ZA: { row: 3, col: 5 },
  IN: { row: 1, col: 7 },
  CN: { row: 0, col: 8 },
  ID: { row: 2, col: 8 },
  AU: { row: 3, col: 9 },
};
