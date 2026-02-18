/**
 * Globe data — V2 verbatim.
 * 9 FASForm patent territories with V2's exact values.
 * Source: V2 lines 2592–2604, 317–331.
 */

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
    name: 'United States', code: 'US', production: 464, rank: 4, share: 5.0,
    trend: '-11.6%', consumption: 7.9, reserves: '471B', plants: 9,
    context: 'Flagship market \u2014 FASForm\u2122 Facility #1 in Mason County, WV. Trump admin reversing coal restrictions. AI/data center electricity demand potentially stabilizing coal. 250+ years of reserves.',
  },
  {
    name: 'China', code: 'CN', production: 4780, rank: 1, share: 51.7,
    trend: '+1.5%', consumption: 92.2, reserves: '1,000B+', plants: 18,
    context: 'Consumes 30% more coal than rest of world combined. AI and data center demand driving electricity growth faster than GDP. 1,350 Mtpa of new mine capacity in development.',
  },
  {
    name: 'India', code: 'IN', production: 1050, rank: 2, share: 11.7,
    trend: '+5\u20137%', consumption: 23, reserves: '111B', plants: 4,
    context: 'Fastest growth among major producers. Targeting 1.5B tonnes by 2030. Opening 100 new mines. About to double US + Europe coal consumption combined.',
  },
  {
    name: 'Indonesia', code: 'ID', production: 836, rank: 3, share: 9.0,
    trend: '+7.6%', consumption: 4.72, reserves: '39B', plants: 3,
    context: "World's largest thermal coal exporter (550+ Mt). Dominant supplier to Asia-Pacific markets. Robust demand from expanding power sector.",
  },
  {
    name: 'Australia', code: 'AU', production: 463, rank: 5, share: 5.0,
    trend: '+0.3%', consumption: 1.8, reserves: '150B', plants: 9,
    context: "World's largest met coal exporter, 2nd largest thermal exporter. IEA projects it will surpass US and Russia to become #4 producer by 2027. 165 Mtpa of new capacity in development.",
  },
  {
    name: 'Russia', code: 'RU', production: 427, rank: 6, share: 4.6,
    trend: '-1.1%', consumption: 3.75, reserves: '1,570B', plants: 8,
    context: "World's largest untapped reserves (1,570B+ tonnes). Struggling with sanctions and infrastructure bottlenecks. Still major Asian exporter via Siberia and Far East.",
  },
  {
    name: 'South Africa', code: 'ZA', production: 235, rank: 7, share: 2.5,
    trend: '+0.3%', consumption: 3.51, reserves: '35B', plants: 4,
    context: "80%+ of electricity from coal (Eskom). #1 producer in all of Africa. Coal sector 'at a crossroads' \u2014 infrastructure constraints but rising demand.",
  },
  {
    name: 'Germany', code: 'DE', production: 92, rank: 9, share: 1.0,
    trend: '-10%+', consumption: 1.6, reserves: '34B', plants: 2,
    context: "Europe's largest coal producer, mostly lignite. Phasing out coal power but 34B tonnes of additional reserves. Strategic as a technology demonstration market for EU.",
  },
  {
    name: 'Canada', code: 'CA', production: 43, rank: 15, share: 0.5,
    trend: '-13%', consumption: 0.5, reserves: '7B', plants: 1,
    context: '67% metallurgical coal. Phasing out thermal coal power by 2030 but met coal exports to Asia growing. First international expansion target per business plan.',
  },
];

export const TOTAL_PLANTS = GLOBE_COUNTRIES.reduce((a, c) => a + c.plants, 0);
export const PER_PLANT_REVENUE = 1043742806;
export const TOTAL_REVENUE = TOTAL_PLANTS * PER_PLANT_REVENUE;

export const GEOJSON_URL =
  'https://raw.githubusercontent.com/martynafford/natural-earth-geojson/refs/heads/master/110m/cultural/ne_110m_admin_0_countries.json';
