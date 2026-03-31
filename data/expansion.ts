import { countries } from './countries';
import { FACILITY } from './model';

export const TOTAL_FACILITY_POTENTIAL = countries.reduce((sum, c) => sum + c.facilityPotential, 0);
export const SINGLE_FACILITY_EBITDA = FACILITY.ebitda;
export const SINGLE_FACILITY_REVENUE = FACILITY.totalRevenue;
export const TOTAL_GLOBAL_COAL = countries.reduce((sum, c) => sum + c.coalProduction, 0);

