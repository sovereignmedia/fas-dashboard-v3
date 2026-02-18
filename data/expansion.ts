import { countries } from './countries';
import { FACILITY, EXPANSION } from './model';

export const TOTAL_FACILITY_POTENTIAL = EXPANSION.totalFacilityPotential;
export const SINGLE_FACILITY_EBITDA = FACILITY.ebitda;
export const SINGLE_FACILITY_REVENUE = FACILITY.totalRevenue;
export const TOTAL_GLOBAL_COAL = countries.reduce((sum, c) => sum + c.coalProduction, 0);

