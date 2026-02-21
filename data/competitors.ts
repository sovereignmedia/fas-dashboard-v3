// data/competitors.ts

export interface Competitor {
  name: string;
  marketCap?: string;
}

export interface MarketSegment {
  id: string;
  market: string;
  directCompetitors: Competitor[];
  indirectCompetitors: string;
  competitiveConcentration: string;
}

export const MARKET_SEGMENTS: MarketSegment[] = [
  {
    id: 'hydrogen',
    market: 'Hydrogen',
    directCompetitors: [
      { name: 'Air Products', marketCap: '$67B' },
      { name: 'Linde', marketCap: '$173B' },
      { name: 'Sinopec', marketCap: '$82B' },
    ],
    indirectCompetitors: 'Green Hydrogen Companies (Plug Power, Bloom Energy)',
    competitiveConcentration: 'High competition from established industrial gas companies and green hydrogen startups',
  },
  {
    id: 'diesel',
    market: 'Diesel Production',
    directCompetitors: [
      { name: 'ExxonMobil', marketCap: '$455B' },
      { name: 'Chevron', marketCap: '$290B' },
      { name: 'BP', marketCap: '$115B' },
    ],
    indirectCompetitors: 'Renewable Diesel Producers (Neste, Valero)',
    competitiveConcentration: 'Competes with traditional fossil fuel giants and renewable diesel producers',
  },
  {
    id: 'naphtha',
    market: 'Naphtha Production',
    directCompetitors: [
      { name: 'Reliance Industries', marketCap: '$210B' },
      { name: 'Shell Chemicals', marketCap: '$220B' },
      { name: 'ExxonMobil', marketCap: '$455B' },
    ],
    indirectCompetitors: 'Alternative Feedstock Producers (BASF, Dow)',
    competitiveConcentration: 'Strong competition from integrated chemical and refinery businesses',
  },
  {
    id: 'jet-fuel',
    market: 'Jet Fuel',
    directCompetitors: [
      { name: 'ExxonMobil', marketCap: '$455B' },
      { name: 'Shell', marketCap: '$220B' },
      { name: 'TotalEnergies', marketCap: '$160B' },
    ],
    indirectCompetitors: 'Sustainable Aviation Fuel Companies (Neste, Gevo)',
    competitiveConcentration: 'Dominated by oil majors and emerging sustainable fuel providers',
  },
  {
    id: 'met-coal',
    market: 'Metallurgical Coal',
    directCompetitors: [
      { name: 'Anglo American', marketCap: '$48B' },
      { name: 'BHP', marketCap: '$130B' },
      { name: 'Teck Resources', marketCap: '$18B' },
    ],
    indirectCompetitors: 'Steel Recycling Companies (Nucor, Steel Dynamics)',
    competitiveConcentration: 'Coking coal market influenced by steel production demand and recycling trends',
  },
  {
    id: 'thermal-coke',
    market: 'Thermal Coke for Power',
    directCompetitors: [
      { name: 'Peabody', marketCap: '$4.5B' },
      { name: 'Arch Resources', marketCap: '$2.8B' },
      { name: 'Glencore', marketCap: '$90B' },
    ],
    indirectCompetitors: 'Renewable Energy Providers (NextEra Energy, Orsted)',
    competitiveConcentration: 'Traditional coal giants compete with rising renewable energy companies',
  },
  {
    id: 'sulfuric-acid',
    market: 'Sulfuric Acid',
    directCompetitors: [
      { name: 'Amal Ltd', marketCap: '$7.48B' },
    ],
    indirectCompetitors: 'Hydrochloric Acid Producers (Detrex Chemicals, Hawkins)',
    competitiveConcentration: 'Moderately concentrated, with several key players dominating production',
  },
  {
    id: 'fertilizer',
    market: 'Fertilizer',
    directCompetitors: [
      { name: 'Wesfarmers', marketCap: '$42.49B' },
      { name: 'Nutrien', marketCap: '$24.22B' },
    ],
    indirectCompetitors: 'Organic and Advanced Fertilizer Companies (Haifa Group, IFFCO)',
    competitiveConcentration: 'Highly competitive, with large multinationals and numerous regional players',
  },
];
