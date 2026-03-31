// data/comparables.ts
import { FACILITY, FACILITY_RAMP_YEAR } from './model';

export const VALUATION_FRAMEWORK = {
  floorPreMoney: 2_150_000_000,
  floorEbitdaMultiple: 8,
  targetEbitdaMultiple: 10,
  aspirationalMultiple: 18,
  year3Ebitda: FACILITY_RAMP_YEAR.ebitda,
  year4Ebitda: FACILITY.ebitda,
  note: 'Valuation based on comparable company analysis. Subject to forward-looking statement disclaimers.',
};
