/**
 * Globe data — validated against Energy Institute Statistical Review 2025.
 * Production: 2024 Mt. Reserves: end-2020 (BGR/Energy Institute, most recent harmonized).
 * Share: % of global production. Plants: based on production / 2.7 Mt per facility.
 *
 * Last updated: 2026-03-30
 * Source: Energy Institute Statistical Review 2025 (74th edition)
 */

import { FACILITY_RAMP_YEAR } from './model';

export const GLOBE_SIZE = 648;
export const TAU = 2 * Math.PI;

export const PATENT_COORDS: Record<string, { lat: number; lon: number }> = {
  US: { lat: 39.8, lon: -98.6 },
  CN: { lat: 35.0, lon: 105.0 },
  IN: { lat: 20.6, lon: 78.9 },
  ID: { lat: -2.5, lon: 118.0 },
  AU: { lat: -25.3, lon: 133.8 },
  RU: { lat: 61.5, lon: 105.3 },
  ZA: { lat: -30.6, lon: 22.9 },
  DE: { lat: 51.2, lon: 10.4 },
  CA: { lat: 56.1, lon: -106.3 },
};

export const PATENT_ISO_CODES = new Set(Object.keys(PATENT_COORDS));

export interface GlobeCountry {
  name: string;
  code: string;
  production: number;
  rank: number;
  share: number;
  trend: string;
  consumption: number;
  reserves: string;
  plants: number;
  context: string;
}

export const GLOBE_COUNTRIES: GlobeCountry[] = [
  {
    name: 'United States', code: 'US', production: 465, rank: 4, share: 5.0,
    trend: '-11.6%', consumption: 7.9, reserves: '249B', plants: 159,
    context: 'Flagship market \u2014 FASForm\u2122 Facility #1 in Mason County, WV. World\'s largest proved reserves (249B tonnes). Trump admin reversing coal restrictions. AI/data center electricity demand potentially stabilizing coal. 500+ year R/P ratio.',
  },
  {
    name: 'China', code: 'CN', production: 4780, rank: 1, share: 51.7,
    trend: '+1.5%', consumption: 92.2, reserves: '143B', plants: 1770,
    context: 'Consumes 30% more coal than rest of world combined. 143B tonnes of proved reserves with only a 37-year R/P ratio \u2014 structural urgency for carbon-efficient processing. AI and data center demand driving electricity growth faster than GDP.',
  },
  {
    name: 'India', code: 'IN', production: 1085, rank: 2, share: 11.7,
    trend: '+5\u20137%', consumption: 23, reserves: '111B', plants: 402,
    context: 'Fastest growth among major producers \u2014 crossed 1B tonnes in 2024 for first time. Targeting 1.5B tonnes by 2030. High-ash coal (avg 35%) presents unique FASForm opportunity. 147-year R/P ratio.',
  },
  {
    name: 'Indonesia', code: 'ID', production: 836, rank: 3, share: 9.1,
    trend: '+7.6%', consumption: 4.72, reserves: '35B', plants: 310,
    context: "World's largest thermal coal exporter (550+ Mt). Ultra-low ash, high volatile matter coal \u2014 favorable for liquid fuel recovery. 62-year R/P ratio. Plans to cut production to ~600 Mt by 2026.",
  },
  {
    name: 'Australia', code: 'AU', production: 463, rank: 5, share: 5.0,
    trend: '+0.3%', consumption: 1.8, reserves: '150B', plants: 171,
    context: "World's largest met coal exporter, 2nd largest thermal exporter. Near-benchmark quality coal (90% of Pittsburgh #8 yield). 315-year R/P ratio. 165 Mtpa of new capacity in development.",
  },
  {
    name: 'Russia', code: 'RU', production: 427, rank: 6, share: 4.6,
    trend: '-1.1%', consumption: 3.75, reserves: '162B', plants: 158,
    context: 'Second-largest global reserves (162B tonnes). Kuzbass coal is closest global equivalent to Pittsburgh #8 benchmark (95% yield). Sanctions creating buyer constraints \u2014 over half of producers operating at a loss. 407-year R/P ratio.',
  },
  {
    name: 'South Africa', code: 'ZA', production: 235, rank: 7, share: 2.5,
    trend: '+0.3%', consumption: 3.51, reserves: '10B', plants: 87,
    context: "80%+ of electricity from coal (Eskom). 100% bituminous reserves. #1 producer in all of Africa. Coal sector 'at a crossroads' \u2014 infrastructure constraints but rising demand. 40-year R/P ratio.",
  },
  {
    name: 'Germany', code: 'DE', production: 92, rank: 9, share: 1.0,
    trend: '-10%+', consumption: 1.6, reserves: '36B', plants: 34,
    context: "Europe's largest coal producer \u2014 100% lignite (high moisture, low energy). Phasing out coal power but 36B tonnes of reserves. FASForm economics are challenging for lignite without pre-drying infrastructure. Strategic as EU technology demonstration market.",
  },
  {
    name: 'Canada', code: 'CA', production: 43, rank: 15, share: 0.5,
    trend: '-13%', consumption: 0.5, reserves: '7B', plants: 16,
    context: '67% metallurgical coal. Premium quality \u2014 exceeds Pittsburgh #8 benchmark (101% yield). Phasing out thermal coal power by 2030 but met coal exports to Asia growing. 166-year R/P ratio.',
  },
];

export const TOTAL_PLANTS = GLOBE_COUNTRIES.reduce((a, c) => a + c.plants, 0);
// Intentionally uses Year 3 ramp-up revenue (conservative estimate).
// Steady-state Year 4 revenue is FACILITY.totalRevenue in model.ts.
export const PER_PLANT_REVENUE = FACILITY_RAMP_YEAR.revenue;
export const TOTAL_REVENUE = TOTAL_PLANTS * PER_PLANT_REVENUE;

export const GEOJSON_URL =
  'https://raw.githubusercontent.com/martynafford/natural-earth-geojson/refs/heads/master/110m/cultural/ne_110m_admin_0_countries.json';
