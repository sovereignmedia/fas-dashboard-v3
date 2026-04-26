// ─── Market Context Data ────────────────────────────────────────────────────
// Energy & AI Infrastructure sector data for the Market Context tab.
// All figures sourced from public research, company guidance, and market data.

// ─── Market Overview Stats ───────────────────────────────────────────────────

export interface MarketStat {
  label: string;
  value: string;
  delta: string;
  deltaColor: 'green' | 'blue' | 'gold' | 'orange' | 'red' | 'purple';
  deltaContext: string;
}

export const marketStats: MarketStat[] = [
  {
    label: 'Hyperscaler CapEx',
    value: '$660–690B',
    delta: '+55% YoY',
    deltaColor: 'green',
    deltaContext: '2026 combined Big Five spend vs. $443B in 2025',
  },
  {
    label: 'DC Power Demand',
    value: '945 TWh',
    deltaColor: 'blue',
    delta: '2030E',
    deltaContext: 'Global data center electricity consumption (IEA)',
  },
  {
    label: 'PJM Capacity Price',
    value: '$329/MW-day',
    delta: 'Record High',
    deltaColor: 'gold',
    deltaContext: 'Third consecutive auction at all-time high — $16.4B total',
  },
  {
    label: 'Grid Queue',
    value: '2,600 GW',
    delta: '5-yr Median Wait',
    deltaColor: 'orange',
    deltaContext: 'US interconnection backlog — 80% of projects withdraw',
  },
  {
    label: 'Coal Retirements',
    value: '4.6 / 12.3 GW',
    delta: '37% Executed',
    deltaColor: 'red',
    deltaContext: '2025 planned vs. actual — DOE emergency orders kept plants online',
  },
  {
    label: 'Transformer Lead Time',
    value: '128 Weeks',
    delta: '+146% vs 2019',
    deltaColor: 'purple',
    deltaContext: 'Large power transformer delivery times — critical grid bottleneck',
  },
];

// ─── Peer Company Quotes ──────────────────────────────────────────────────────

export interface PeerQuote {
  symbol: string;
  name: string;
  price: number;
  changePct: number;
  marketCap: number;
  pe: number;
  yearLow: number;
  yearHigh: number;
  sector: string;
  relevance: string;
}

export const peerQuotes: PeerQuote[] = [
  {
    symbol: 'GEV',
    name: 'GE Vernova',
    price: 842.00,
    changePct: -4.45,
    marketCap: 228451811322,
    pe: 47.54,
    yearLow: 252.25,
    yearHigh: 894.93,
    sector: 'Power Equipment',
    relevance: 'Gas/steam turbines, grid equipment, power generation tech',
  },
  {
    symbol: 'CEG',
    name: 'Constellation Energy',
    price: 324.87,
    changePct: -0.70,
    marketCap: 101453675041,
    pe: 43.96,
    yearLow: 161.35,
    yearHigh: 412.70,
    sector: 'Nuclear Power',
    relevance: 'Largest US nuclear fleet, Microsoft/Meta PPAs',
  },
  {
    symbol: 'NEE',
    name: 'NextEra Energy',
    price: 92.59,
    changePct: -0.13,
    marketCap: 192913116800,
    pe: 28.06,
    yearLow: 61.72,
    yearHigh: 95.91,
    sector: 'Renewable / Utility',
    relevance: 'Largest US utility, renewables + grid infrastructure',
  },
  {
    symbol: 'ETN',
    name: 'Eaton Corporation',
    price: 355.56,
    changePct: -5.79,
    marketCap: 138099504000,
    pe: 34.02,
    yearLow: 231.85,
    yearHigh: 408.45,
    sector: 'Electrical Equipment',
    relevance: 'Power management, data center electrical infrastructure',
  },
  {
    symbol: 'VRT',
    name: 'Vertiv Holdings',
    price: 244.44,
    changePct: -5.16,
    marketCap: 93522255120,
    pe: 71.47,
    yearLow: 53.60,
    yearHigh: 264.86,
    sector: 'DC Infrastructure',
    relevance: 'Power/cooling for data centers, AI infrastructure',
  },
  {
    symbol: 'VST',
    name: 'Vistra Corp.',
    price: 161.70,
    changePct: -2.58,
    marketCap: 54788081733,
    pe: 58.38,
    yearLow: 90.51,
    yearHigh: 219.82,
    sector: 'Power Generation',
    relevance: 'Nuclear fleet operator, data center power supplier',
  },
  {
    symbol: 'CCJ',
    name: 'Cameco Corp.',
    price: 117.79,
    changePct: -6.32,
    marketCap: 51286590530,
    pe: 120.19,
    yearLow: 35.00,
    yearHigh: 135.24,
    sector: 'Uranium Mining',
    relevance: 'Uranium supply chain, nuclear fuel',
  },
  {
    symbol: 'BE',
    name: 'Bloom Energy',
    price: 153.02,
    changePct: -7.82,
    marketCap: 36190913220,
    pe: -413.57,
    yearLow: 15.15,
    yearHigh: 180.90,
    sector: 'Fuel Cells',
    relevance: 'Behind-the-meter power, hydrogen fuel cells, distributed generation',
  },
  {
    symbol: 'NRG',
    name: 'NRG Energy',
    price: 162.06,
    changePct: -7.70,
    marketCap: 34790642619,
    pe: 40.52,
    yearLow: 79.57,
    yearHigh: 189.96,
    sector: 'Power Generation',
    relevance: 'Independent power producer, data center PPAs',
  },
  {
    symbol: 'OKLO',
    name: 'Oklo Inc.',
    price: 63.30,
    changePct: -2.13,
    marketCap: 9890439848,
    pe: -113.04,
    yearLow: 17.42,
    yearHigh: 193.84,
    sector: 'Advanced Nuclear',
    relevance: 'Next-gen nuclear, Meta 1.2GW deal, Sam Altman-backed',
  },
  {
    symbol: 'SMR',
    name: 'NuScale Power',
    price: 12.53,
    changePct: -3.98,
    marketCap: 3736169563,
    pe: -5.86,
    yearLow: 11.08,
    yearHigh: 57.42,
    sector: 'Small Modular Reactors',
    relevance: 'SMR technology developer',
  },
];

// ─── Curated Articles ──────────────────────────────────────────────────────────

export interface MarketArticle {
  id: number;
  headline: string;
  source: string;
  url: string;
  date: string; // ISO 8601: YYYY-MM-DD
  category: string;
  summary: string;
  whyItMatters: string;
}

export const marketArticles: MarketArticle[] = [
  {
    id: 1,
    headline: 'Big Tech to Spend $650 Billion This Year as AI Race Intensifies',
    source: 'Bloomberg',
    url: 'https://www.bloomberg.com/news/articles/2026-02-06/how-much-is-big-tech-spending-on-ai-computing-a-staggering-650-billion-in-2026',
    date: '2026-02-06',
    category: 'AI POWER DEMAND',
    summary:
      'The Big Five hyperscalers will deploy $660–690B in combined capex in 2026 — nearly 100% of operating cash flows. Microsoft alone spent $11.1B leasing data center space in a single quarter, with GPUs sitting idle because the company lacks the electricity to install them.',
    whyItMatters:
      'Validates unprecedented demand for AI infrastructure power, with spending nearly doubling YoY. Power constraints — not demand — are the limiting factor.',
  },
  {
    id: 2,
    headline: 'US AI Boom Faces Electric Shock',
    source: 'Reuters',
    url: 'https://www.reuters.com/markets/commodities/us-ai-boom-faces-electric-shock-2026-02-25/',
    date: '2026-02-25',
    category: 'GRID & INFRASTRUCTURE',
    summary:
      'US electricity demand is expected to rise ~2% annually through 2030, more than double the pace of the past decade. Data centers are the primary driver, with IEA projecting global DC power consumption doubling to 945 TWh by 2030.',
    whyItMatters:
      'Grid infrastructure was not built for this demand surge. Power availability now determines data center deployment timelines, not construction speed.',
  },
  {
    id: 3,
    headline: 'Meta Inks Nuclear Deals for Up to 6.6 GW from Oklo, Vistra, TerraPower',
    source: 'Utility Dive',
    url: 'https://www.utilitydive.com/news/meta-nuclear-deal-oklo-vistra-terrapower-ai-data-centers/809215/',
    date: '2026-01-09',
    category: 'NUCLEAR & BASELOAD',
    summary:
      'Meta signed 20-year agreements for 6.6 GW of nuclear power by 2035 — enough to power ~5M homes. Includes existing Vistra plants in OH/PA plus advanced reactors from Oklo and TerraPower. Follows June 2025 Constellation deal for Illinois nuclear.',
    whyItMatters:
      'Hyperscalers are locking in decades-long baseload power contracts at unprecedented scale, validating that firm, dispatchable generation is essential for AI infrastructure.',
  },
  {
    id: 4,
    headline: 'EPA Finalizes Repeal of Coal Plant Mercury Rule Amendments',
    source: 'AP News',
    url: 'https://apnews.com/article/trump-coal-zeldin-mercury-epa-emissions-b770d6efd05f19ed24b179511c726196',
    date: '2026-02-20',
    category: 'POLICY & REGULATION',
    summary:
      'EPA rolled back Biden-era mercury emission standards at a coal plant along the Ohio River, reverting to 2012 standards. The move saves an estimated $670M for coal operators and is framed as supporting "baseload power for the American economy."',
    whyItMatters:
      'Regulatory tailwinds for coal-adjacent infrastructure are strengthening. Existing coal assets are being reframed as essential grid reliability resources rather than phase-out candidates.',
  },
  {
    id: 5,
    headline: 'PJM Capacity Auction Hits Record $329/MW-Day for Third Straight Auction',
    source: 'Utility Dive',
    url: 'https://www.utilitydive.com/news/pjm-interconnection-capacity-auction-data-center/808264/',
    date: '2025-12-18',
    category: 'ENERGY MARKETS',
    summary:
      "PJM's capacity auction cleared at a record $329/MW-day, with total cost hitting $16.4B. Coal cleared 20% of capacity. Almost no new generation entered the auction because 'projects in PJM are still struggling to get built.' Constellation alone cleared 17,950 MW ($2.2B revenue).",
    whyItMatters:
      'Record capacity prices signal acute supply shortages. Existing dispatchable generation — including coal — commands premium valuations as new build struggles with interconnection delays.',
  },
  {
    id: 6,
    headline: 'Coal Plant Retirements Stall as DOE Issues Emergency Orders',
    source: 'EIA',
    url: 'https://www.eia.gov/todayinenergy/detail.php?id=67206',
    date: '2026-02-23',
    category: 'GRID & INFRASTRUCTURE',
    summary:
      'Only 4.6 GW of planned 12.3 GW retirements actually occurred in 2025 — the lowest since 2008. DOE emergency orders kept major coal plants online. 6.4 GW of coal retirements scheduled for 2026 face similar delays. Analysts expect only 3–5 GW will actually close.',
    whyItMatters:
      'The 176,000 MW US coal fleet is being preserved as a reliability backstop. Plants once slated for demolition are now receiving capital extensions, creating a runway for conversion technologies.',
  },
  {
    id: 7,
    headline: 'Grid Interconnection Queue Swells to 2,600 GW with 5–12 Year Wait Times',
    source: 'EnkiAI',
    url: 'https://enkiai.com/ai-market-intelligence/grid-interconnection-delays-2026-a-threat-to-us-energy',
    date: '2026-01-28',
    category: 'GRID & INFRASTRUCTURE',
    summary:
      'The US interconnection queue has ballooned to 2,600 GW with median wait times of 5 years. Google reported potential 12-year delays for new data center grid connections. Nearly 80% of new projects withdraw before completion. Power transformer lead times are 128 weeks.',
    whyItMatters:
      'New generation cannot get built fast enough. Existing grid-connected assets — especially those with available capacity headroom — carry enormous strategic value.',
  },
  {
    id: 8,
    headline: 'North America Fertilizers Market to Reach $85.7B by 2031',
    source: 'ResearchAndMarkets',
    url: 'https://finance.yahoo.com/news/fertilizers-market-north-america-2026-162100194.html',
    date: '2026-01-22',
    category: 'INDUSTRIAL DEMAND',
    summary:
      'The North American fertilizer market is projected to grow from $63.8B (2025) to $85.7B by 2031 at 5.06% CAGR. US corn and soybean acreage will reach 96.2M acres by 2026. Growing demand for ammonium sulfate and reshoring of critical mineral supply chains adds tailwinds.',
    whyItMatters:
      'Validates growing domestic demand for fertilizer products — a key output of coal-to-chemicals conversion. Reshoring trends strengthen the case for US-based production capacity.',
  },
  {
    id: 9,
    headline: "NextEra expects to add up to 30 gigawatts of power for data centers by 2035",
    source: "Reuters",
    url: "https://www.reuters.com/business/energy/nextera-expects-add-up-30-gigawatts-power-data-centers-by-2035-2026-03-03/",
    date: "2026-03-03",
    category: "AI POWER DEMAND",
    summary:
      "NextEra Energy told investors it expects to build 15\u201330 gigawatts of new generation to serve U.S. data centers through 2035. The company framed electricity availability as the binding constraint for AI data center deployment, pointing to a large natural-gas generation pipeline as a near-term supply source.",
    whyItMatters:
      "Investor takeaway: AI load is translating into utility-scale build plans measured in tens of gigawatts. The marginal MWh is increasingly tied to dispatchable capacity and fuel availability, not just incremental renewables.",
  },
  {
    id: 10,
    headline: "US grid watchdog objects to Maryland power plant sale, cites data center demand concerns",
    source: "Reuters",
    url: "https://www.reuters.com/business/energy/us-grid-watchdog-objects-maryland-power-plant-sale-cites-data-center-demand-2026-03-05/",
    date: "2026-03-05",
    category: "GRID & INFRASTRUCTURE",
    summary:
      "PJM's independent market monitor urged FERC to reject a Maryland power plant sale, warning that generation could be redirected to data centers at a time of tightening supply. The filing highlighted uncertainty over whether future plans would rely on reactivating retired units, building new supply, or altering existing interconnection rights.",
    whyItMatters:
      "This underscores how scarce, grid-connected dispatchable assets are becoming in constrained regions like PJM. Regulatory scrutiny is rising around large-load growth, interconnection rights, and who gets priority for limited supply.",
  },
  {
    id: 11,
    headline: "What to Know About Trump's AI Deal",
    source: "POLITICO",
    url: "https://www.politico.com/news/2026/03/04/trump-ai-data-centers-electricity-00811909",
    date: "2026-03-04",
    category: "POLICY & REGULATION",
    summary:
      "The White House is promoting a framework where large-load customers like data centers fund their own power and grid upgrades to reduce pressure on reliability and limit cost-shifting to households. The article details how utilities and states are exploring special tariffs and contractual commitments so large loads pay for capacity they reserve, even if usage is lower than forecast.",
    whyItMatters:
      "Large-load cost allocation is turning into a policy battleground that can accelerate or delay data center buildouts. Winning projects will likely be those paired with firm power and clear \u201cpay-your-own-way\u201d structures.",
  },
  {
    id: 12,
    headline: "AEP expands spending plan, beats profit estimates as electricity demand surges",
    source: "Reuters",
    url: "https://www.reuters.com/business/energy/aep-expands-spending-plan-beats-profit-estimates-electricity-demand-surges-2026-02-12/",
    date: "2026-02-12",
    category: "ENERGY MARKETS",
    summary:
      "Major U.S. utilities are increasing capital plans to meet data-center-driven load growth, with AEP expanding a five-year program beyond $72 billion and Exelon lifting its plan to $41 billion. AEP disclosed agreements totaling 56 gigawatts of data center load and noted intensifying debate over affordability as PJM-region power bills rise.",
    whyItMatters:
      "Utility capex, rate design, and market-structure changes are now directly linked to AI-era load growth. Infrastructure spending (generation + transmission) is becoming a multi-decade theme with political constraints centered on customer bills.",
  },
  {
    id: 13,
    headline: "Trump EPA to weaken rule limiting harmful mercury, air toxins from coal plants",
    source: "Reuters",
    url: "https://www.reuters.com/legal/litigation/trump-epa-weaken-rule-limiting-harmful-mercury-air-toxics-coal-plants-2026-02-20/",
    date: "2026-02-20",
    category: "POLICY & REGULATION",
    summary:
      "The EPA said it will weaken the 2024 Mercury and Air Toxics Standards for coal plants, effectively reverting toward the older 2012 framework. The agency argued the change could lower costs for operators of aging plants and support baseload availability as electricity demand rises with AI data centers.",
    whyItMatters:
      "Regulatory risk around legacy thermal generation is shifting, extending the economic life of existing assets. That increases the value of solutions that can upgrade, repower, or monetize entrenched brownfield infrastructure.",
  },
  {
    id: 14,
    headline: "Rising US industrial load intensifies power generation need",
    source: "Reuters",
    url: "https://www.reuters.com/business/energy/rising-us-industrial-load-intensifies-power-generation-need--reeii-2026-02-09/",
    date: "2026-02-09",
    category: "INDUSTRIAL DEMAND",
    summary:
      "Analysts cited by Reuters forecast a 120-gigawatt rise in U.S. peak demand over the next five years, with industrial consumption contributing about 24 gigawatts. Beyond data centers, drivers include oil and gas electrification and domestic manufacturing buildouts (semiconductors, batteries/EVs, and chemicals), all competing for interconnection capacity and equipment.",
    whyItMatters:
      "The investment case for new dispatchable supply is not \u201cjust AI.\u201d Industrial electrification and re-shoring add durable load that supports multi-output energy/industrial hubs and long-dated contracted cash flows.",
  },
  {
    id: 15,
    headline: "Iran war threatens Asia fertiliser supplies ahead of planting season",
    source: "Reuters",
    url: "https://www.reuters.com/business/energy/iran-war-threatens-asia-fertiliser-supplies-ahead-planting-season-2026-03-05/",
    date: "2026-03-05",
    category: "INDUSTRIAL DEMAND",
    summary:
      "The escalation in the Middle East is disrupting fertilizer production and shipping routes, including transit through the Strait of Hormuz, which Reuters described as a conduit for about one-third of global nutrient trade. Market participants warned that supplies of urea and phosphate fertilizers could tighten sharply ahead of planting season, with urea prices reported up roughly 80% from pre-conflict levels.",
    whyItMatters:
      "Fertilizer and industrial chemical markets remain exposed to geopolitical chokepoints and feedstock volatility. That strengthens the strategic premium on domestic, secure production pathways for nitrogen and related chemical value chains.",
  },

  {
    id: 16,
    headline: 'US power demand surge from data centers could lift fossil fuel generation, EIA says',
    source: 'Reuters',
    url: 'https://www.reuters.com/business/energy/us-power-demand-surge-data-centers-could-lift-fossil-fuel-generation-eia-says-2026-03-12/',
    date: '2026-03-12',
    category: 'AI POWER DEMAND',
    summary: 'Reuters reports that EIA analysis finds U.S. electricity demand is accelerating again after a long period of flat growth, with data centers a key driver. In EIA’s high-demand scenario, natural-gas generation rises materially through 2027 and coal declines more slowly than in the baseline case.',
    whyItMatters: 'Higher large-load growth rates can tighten capacity and favor fast-to-deploy, dispatchable generation that can clear interconnection constraints and support grid reliability.',
  },

  {
    id: 17,
    headline: 'US power use to beat record highs in 2026 and 2027 as AI use surges, EIA says',
    source: 'Reuters',
    url: 'https://www.reuters.com/business/energy/us-power-use-beat-record-highs-2026-2027-ai-use-surges-eia-says-2026-03-10/',
    date: '2026-03-10',
    category: 'AI POWER DEMAND',
    summary: 'Reuters summarizes EIA’s Short-Term Energy Outlook projecting U.S. electricity consumption reaching new records in 2026 and 2027. The outlook keeps natural gas as the largest generation source while nuclear’s share rises in 2026 and renewables continue gaining share into 2027.',
    whyItMatters: 'Record-load forecasts reinforce the investment case for scalable baseload and firm power solutions, as well as infrastructure upgrades needed to serve incremental demand.',
  },

  {
    id: 18,
    headline: 'US utilities scale up grid-boosting tech to meet surging demand',
    source: 'Reuters',
    url: 'https://www.reuters.com/business/energy/us-utilities-scale-up-grid-boosting-tech-meet-surging-demand--reeii-2026-03-09/',
    date: '2026-03-09',
    category: 'GRID & INFRASTRUCTURE',
    summary: 'Reuters reports utilities are deploying grid-enhancing technologies (such as dynamic line ratings and advanced power flow controls) and virtual power plants to increase usable transmission capacity faster than building new lines. The piece cites DOE and RMI estimates highlighting the gap between transmission build needs and recent build rates, and the potential for these technologies to unlock additional peak capacity.',
    whyItMatters: 'Near-term grid constraints are becoming a binding limiter on load growth, increasing the premium on projects that can deliver reliability with minimal new transmission build.',
  },

  {
    id: 19,
    headline: 'Fact Sheet: President Donald J. Trump Advances Energy Affordability with the Ratepayer Protection Pledge',
    source: 'The White House',
    url: 'https://www.whitehouse.gov/fact-sheets/2026/03/fact-sheet-president-donald-j-trump-advances-energy-affordability-with-the-ratepayer-protection-pledge/',
    date: '2026-03-04',
    category: 'POLICY & REGULATION',
    summary: 'The White House says major hyperscalers agreed to “build, bring, or buy” new generation resources for data centers and to fully fund necessary power delivery upgrades, with separate rate structures and payment commitments even if electricity is not ultimately used. The fact sheet also references federal engagement in PJM market design intended to accelerate new power plant development while shielding ratepayers from data-center-driven costs.',
    whyItMatters: 'Policy is shifting toward forcing large loads to finance incremental supply and wires, potentially accelerating investment into new firm generation and grid expansion.',
  },

  {
    id: 20,
    headline: 'Fertilizer prices soar as Strait of Hormuz tensions rise—forcing U.S. farmers to rethink spring planting',
    source: 'Fortune',
    url: 'https://fortune.com/2026/03/12/fertilizer-prices-strait-of-hormuz-farming-spring-planting-iran-war/',
    date: '2026-03-12',
    category: 'INDUSTRIAL DEMAND',
    summary: 'Fortune reports fertilizer prices jumped roughly 30% in late February to early March amid heightened risks to Persian Gulf shipping routes, highlighting exposure of urea and ammonia supply to geopolitical disruption. The story notes potential impacts on U.S. farmer planting decisions and renewed attention to input costs and supply security.',
    whyItMatters: 'Volatile global supply chains for critical industrial inputs can increase strategic value of domestic, flexible production capacity for fuels and chemicals.',
  },


  {
    id: 21,
    headline: 'US power demand surge from data centers could lift fossil fuel generation, EIA says',
    source: 'Reuters',
    url: 'https://www.reuters.com/business/energy/us-power-demand-surge-data-centers-could-lift-fossil-fuel-generation-eia-says-2026-03-12/',
    date: '2026-03-12',
    category: 'AI POWER DEMAND',
    summary: 'Reuters reports EIA analysis expects U.S. electricity demand to rise 1.9% in 2026 and 2% in 2027 as data centers tighten supply. In a higher-demand scenario, EIA modeled natural-gas generation rising 7.3% from 2025 to 2027 (vs. 1.7% baseline), with coal generation declining more slowly than otherwise expected.',
    whyItMatters: 'Accelerating load growth and higher modeled gas/coal utilization increase the scarcity value of dispatchable, grid-connected assets and can lift regional power prices—especially in constrained markets like ERCOT and PJM.',
  },

  {
    id: 22,
    headline: 'US utilities scale up grid-boosting tech to meet surging demand',
    source: 'Reuters',
    url: 'https://www.reuters.com/business/energy/us-utilities-scale-up-grid-boosting-tech-meet-surging-demand--reeii-2026-03-09/',
    date: '2026-03-09',
    category: 'GRID & INFRASTRUCTURE',
    summary: 'Reuters reports utilities are deploying grid-enhancing technologies (dynamic line ratings, advanced power flow controls, topology optimization) and virtual power plants to relieve congestion faster than building new transmission. The story cites RMI research estimating these tools could unlock more than 80 GW of incremental peak capacity, against a backdrop where DOE estimates ~5,000 miles of transmission per year are needed but only 888 miles were built in 2024.',
    whyItMatters: 'With permitting and equipment constraints slowing new wires, strategies that increase usable capacity on existing corridors (and projects that minimize new transmission needs) can be advantaged in the race to serve large-load growth.',
  },

  {
    id: 23,
    headline: 'Utilities want a power line monopoly. Is that affordable?',
    source: 'POLITICO',
    url: 'https://www.politico.com/newsletters/power-switch/2026/03/04/utilities-want-a-power-line-monopoly-is-that-affordable-00812739',
    date: '2026-03-04',
    category: 'POLICY & REGULATION',
    summary: 'POLITICO reports major utilities are asking the Trump administration to suspend competitive bidding for high-voltage transmission projects, arguing it would speed buildouts needed for AI-driven electricity demand. The article notes the Midcontinent region has authorized more than $30 billion of long-range transmission projects, while consumer and large-user groups warn reduced competition could raise costs embedded in bills for decades.',
    whyItMatters: 'Transmission cost allocation and ‘right-of-first-refusal’ policy debates can materially affect buildout timing and customer bills, shaping where and how quickly new generation and large loads can connect.',
  },

  {
    id: 24,
    headline: '2026/2027 RPM Third Incremental Auction Results',
    source: 'PJM',
    url: 'https://www.pjm.com/-/media/DotCom/markets-ops/rpm/rpm-auction-info/2026-2027/2026-2027-3ia-report.pdf',
    date: '2026-03-09',
    category: 'ENERGY MARKETS',
    summary: 'PJM’s report says its 2026/2027 Third Incremental Auction opened Feb. 24, 2026 and posted results March 9, 2026. PJM procured 285.4 MW of net capacity (285.4 MW of buy bids and zero MW of sell offers), with the Capacity Performance resource clearing price for the RTO reported at $164.70/MW-day.',
    whyItMatters: 'Capacity procurement and clearing prices offer an objective read on reliability needs in the nation’s largest wholesale power market, helping investors gauge the economics of keeping or adding dispatchable capacity.',
  },

  {
    id: 25,
    headline: 'A Global Nuclear Power Renaissance Isn\'t Living Up to the Hype',
    source: 'Bloomberg',
    url: 'https://www.bloomberg.com/news/articles/2026-03-05/a-global-nuclear-power-renaissance-isn-t-living-up-to-the-hype',
    date: '2026-03-05',
    category: 'NUCLEAR & BASELOAD',
    summary: 'Bloomberg argues that while nuclear is gaining support as 24/7 carbon-free power for an AI-driven demand surge, most of the world’s buildout is lagging China’s reactor pipeline. The piece notes U.S. nuclear output is expected to plateau over the next decade and highlights a gap between political ambition and practical delivery.',
    whyItMatters: 'If nuclear additions remain slower than demand growth, the market may rely more heavily on other forms of firm power—supporting long-duration contracts and premium pricing for dependable baseload supply.',
  },

  {
    id: 26,
    headline: 'War in Iran threatens fresh food-price shock across developing world',
    source: 'Reuters',
    url: 'https://www.reuters.com/world/middle-east/war-iran-threatens-fresh-food-price-shock-across-developing-world-2026-03-20/',
    date: '2026-03-20',
    category: 'INDUSTRIAL DEMAND',
    summary: 'Reuters reports that disrupted fertilizer shipments and higher energy prices from the Iran conflict are raising food-inflation risks, citing the Strait of Hormuz as a route for about 30% of globally traded fertilizers. The story cites Bank of America estimates that the conflict could impact 65%–70% of global urea supplies and drive 30%–40% price increases.',
    whyItMatters: 'Geopolitical chokepoints can rapidly reprice essential industrial inputs (fertilizer, fuels) and strengthen the strategic premium on secure, domestic production pathways and feedstocks.',
  },


  {
    id: 27,
    headline: 'Stressed US grid forcing data centers to get more flexible',
    source: 'Reuters',
    url: 'https://www.reuters.com/sustainability/boards-policy-regulation/ceraweek-stressed-us-grid-forcing-data-centers-get-more-flexible-2026-03-26/',
    date: '2026-03-26',
    category: 'AI POWER DEMAND',
    summary: 'U.S. grid operators and regulators are pushing large data centers to participate in demand response—reducing load or switching to backup generation during peak periods—to avoid outages and dampen consumer bill impacts. EPRI estimates data centers could exceed four times current electricity use by decade-end, potentially reaching ~17% of U.S. power supply.',
    whyItMatters: 'Load flexibility is becoming a precondition for interconnection and a way to reduce the capex burden of grid expansion, raising the value of dispatchable capacity and on-site generation for AI-era infrastructure.',
  },

  {
    id: 28,
    headline: 'AI power dash transforms clean energy offtake market',
    source: 'Reuters',
    url: 'https://www.reuters.com/business/energy/ai-power-dash-transforms-clean-energy-offtake-market--reeii-2026-03-17/',
    date: '2026-03-17',
    category: 'AI POWER DEMAND',
    summary: 'Rising data center demand and a pullback in tax-supported clean energy development are increasing prices and complexity in long-term corporate power purchase agreements (PPAs). The piece cites higher North America solar and wind PPA pricing and notes hyperscalers are shifting toward multi-gigawatt portfolios, co-located generation, and more dispatchable/firmed structures.',
    whyItMatters: 'As hyperscalers prioritize speed-to-power and reliability, markets are rewarding large, financeable, dispatchable supply solutions—including co-located and firm capacity—rather than intermittent-only procurement.',
  },

  {
    id: 29,
    headline: 'Exclusive: CERAWEEK Constellation exec says grid operator told company Three Mile Island can\'t connect until 2031',
    source: 'Reuters',
    url: 'https://www.reuters.com/business/energy/ceraweek-constellation-exec-says-grid-operator-told-company-three-mile-island-2026-03-26/',
    date: '2026-03-26',
    category: 'NUCLEAR & BASELOAD',
    summary: 'PJM told Constellation Energy the revived Three Mile Island (rebranded as the Crane Clean Energy Center) likely cannot interconnect until 2031 due to needed transmission upgrades, four years later than the company’s plan. The plant is intended to supply electricity for Microsoft data centers, and Constellation said it is working with PJM and transmission stakeholders to accelerate the timeline.',
    whyItMatters: 'Even high-profile baseload projects can be constrained by transmission and interconnection timelines, elevating the premium for near-term, grid-compatible baseload capacity solutions.',
  },

  {
    id: 30,
    headline: '2026/2027 RPM Third Incremental Auction Results',
    source: 'PJM',
    url: 'https://www.pjm.com/-/media/DotCom/markets-ops/rpm/rpm-auction-info/2026-2027/2026-2027-3ia-report.pdf',
    date: '2026-03-09',
    category: 'ENERGY MARKETS',
    summary: 'PJM’s 2026/2027 Third Incremental Auction opened Feb. 24, 2026 and posted results March 9, 2026. PJM procured a net 285.4 MW of capacity across the RTO, and the 3IA RTO/System Marginal Price for Capacity Performance resources is shown as $164.70/MW-day.',
    whyItMatters: 'Capacity procurement and pricing signals in PJM continue to emphasize scarcity value and the monetization pathway for reliable capacity in constrained regions.',
  },

  {
    id: 31,
    headline: 'The Clean Air Act was always Plan B',
    source: 'POLITICO',
    url: 'https://www.politico.com/newsletters/power-switch/2026/03/10/the-clean-air-act-was-always-plan-b-00821167',
    date: '2026-03-10',
    category: 'POLICY & REGULATION',
    summary: 'POLITICO reports the Trump EPA is working to repeal the greenhouse-gas endangerment finding that has underpinned federal climate regulation since 2009. The newsletter frames this as an attempt to eliminate EPA’s authority to regulate climate pollution and notes legal uncertainty over whether courts will uphold the change.',
    whyItMatters: 'Regulatory rollback increases the probability that near-term generation buildouts and plant life extensions are driven more by reliability and economics than emissions mandates, reshaping the opportunity set for dispatchable, multi-output energy infrastructure.',
  },

  {
    id: 32,
    headline: 'Spiking US diesel prices keep trucking industry stuck in years-long slump',
    source: 'Reuters',
    url: 'https://www.reuters.com/business/energy/spiking-us-diesel-prices-keep-trucking-industry-stuck-years-long-slump-2026-03-27/',
    date: '2026-03-27',
    category: 'INDUSTRIAL DEMAND',
    summary: 'Diesel prices rose sharply during the U.S.-Israeli conflict with Iran, squeezing independent truckers and delaying a sector recovery even as spot freight rates have improved versus a year ago. Reuters cites AAA data showing national diesel averages near recent-cycle highs, highlighting diesel’s central role in logistics costs and industrial supply chains.',
    whyItMatters: 'Volatile distillate pricing reinforces the strategic value of resilient domestic fuels supply and the industrial sensitivity to reliable, scalable hydrocarbon outputs alongside electricity.',
  },

  // ── Weekly Curation 2026-04-05 ──────────────────────────────────────────────
  {
    id: 33,
    headline: 'AEP expands spending plan, beats profit estimates as electricity demand surges',
    source: 'Reuters',
    url: 'https://www.reuters.com/business/energy/aep-expands-spending-plan-beats-profit-estimates-electricity-demand-surges-2026-02-12/',
    date: '2026-02-12',
    category: 'AI POWER DEMAND',
    summary: 'American Electric Power expanded its multi-year capital spending plan after reporting better-than-expected quarterly profits, citing accelerating electricity demand from data centers. The utility highlighted a break in the two-decade trend of flat U.S. power consumption as AI-driven loads reshape grid planning.',
    whyItMatters: 'Utilities raising capex signals the market is pricing in structural load growth — validation for companies positioned to supply baseload power and industrial feedstocks.',
  },
  {
    id: 34,
    headline: 'Interconnection queues cut across new renewable and fossil source timelines',
    source: 'pv magazine USA',
    url: 'https://pv-magazine-usa.com/2026/03/12/interconnection-queues-cut-across-new-renewable-and-fossil-source-timelines/',
    date: '2026-03-12',
    category: 'GRID & INFRASTRUCTURE',
    summary: 'An Enverus analysis finds that interconnection delays and study bottlenecks are becoming the primary constraint for new generation capacity, affecting both renewable and fossil projects alike. Queue timelines now stretch 4-5 years in major ISOs as data center load growth outpaces infrastructure buildout.',
    whyItMatters: 'Grid bottlenecks create a premium for generation assets that can be co-located with demand or built on existing infrastructure footprints, bypassing the queue entirely.',
  },
  {
    id: 35,
    headline: 'US grid rules for faster data centers favor on-site gas plants',
    source: 'Reuters',
    url: 'https://www.reuters.com/business/energy/us-grid-rules-faster-data-centers-favor-on-site-gas-plants--reeii-2026-01-27/',
    date: '2026-01-27',
    category: 'POLICY & REGULATION',
    summary: 'PJM Interconnection and FERC are reshaping tariff and interconnection rules to fast-track large-load customers, with emerging frameworks that effectively reward dispatchable, co-located generation. The regulatory shift reflects urgency to keep pace with data center deployment timelines.',
    whyItMatters: 'Regulatory tailwinds for co-located dispatchable generation validate the thesis for repurposing existing plant sites with multi-output capability near load centers.',
  },
  {
    id: 36,
    headline: 'AI data centers are forcing obsolete peaker power plants back into service',
    source: 'Reuters',
    url: 'https://www.reuters.com/business/energy/ai-data-centers-are-forcing-obsolete-peaker-power-plants-back-into-service-2025-12-23/',
    date: '2025-12-23',
    category: 'GRID & INFRASTRUCTURE',
    summary: 'Record capacity prices and grid reliability concerns are delaying planned retirements and bringing legacy oil, gas, and coal units back into operation. Grid operators are struggling to maintain reserve margins as AI-driven demand growth outstrips new supply additions.',
    whyItMatters: 'Reversing plant retirements underscores the grid\'s desperation for dispatchable capacity — technologies that upgrade rather than retire existing fossil infrastructure address this gap directly.',
  },
  {
    id: 37,
    headline: 'US mandates record-high biofuel use',
    source: 'Argus Media',
    url: 'https://www.argusmedia.com/en/news-and-insights/latest-market-news/2807474-us-mandates-record-high-biofuel-use-update-2',
    date: '2026-03-27',
    category: 'INDUSTRIAL DEMAND',
    summary: 'The U.S. EPA finalized higher renewable fuel blending requirements, pulling more biodiesel and renewable diesel volumes into the market. The mandate reprices feedstocks and refining economics, tightening supply for conventional diesel while expanding demand for alternative liquid fuel pathways.',
    whyItMatters: 'Rising biofuel mandates squeeze conventional refining margins and increase the strategic value of alternative fuel production pathways that leverage domestic carbon-based feedstocks.',
  },

  {
    id: 38,
    headline: 'PJM Targets 15 Gigawatts of New Power to Feed Data Center Boom',
    source: 'Bloomberg',
    url: 'https://www.bloomberg.com/news/articles/2026-04-10/pjm-targets-15-gigawatts-of-new-power-to-feed-data-center-boom',
    date: '2026-04-10',
    category: 'GRID & INFRASTRUCTURE',
    summary: 'PJM is seeking 15 gigawatts of new power supplies via an emergency proposal aimed at mitigating potential shortages driven by rapid data-center load growth. The plan would match proposed data centers with new power plants, running a process from September through March 2027.',
    whyItMatters: 'This is a concrete signal that the largest U.S. wholesale power market is moving toward load-and-supply co-development, which favors dispatchable, financeable new capacity and speed-to-interconnection solutions.',
  },
  {
    id: 39,
    headline: 'AEP expands spending plan, beats profit estimates as electricity demand surges',
    source: 'Reuters',
    url: 'https://www.reuters.com/business/energy/aep-expands-spending-plan-beats-profit-estimates-electricity-demand-surges-2026-02-12/',
    date: '2026-02-12',
    category: 'ENERGY MARKETS',
    summary: 'Major U.S. utilities are expanding capital plans to build transmission and generation needed to serve data-center load growth. AEP extended its five-year capital strategy beyond $72B and identified an additional $5B–$8B for transmission and generation, while Exelon raised its four-year plan to $41B from $38B.',
    whyItMatters: 'Rising utility capex plans and regulated buildout pathways are a leading indicator of structurally higher load growth—and of the investment cycle needed to add firm capacity and grid infrastructure.',
  },
  {
    id: 40,
    headline: 'US utilities scale up grid-boosting tech to meet surging demand',
    source: 'Reuters',
    url: 'https://www.reuters.com/business/energy/us-utilities-scale-up-grid-boosting-tech-meet-surging-demand--reeii-2026-03-09/',
    date: '2026-03-09',
    category: 'GRID & INFRASTRUCTURE',
    summary: 'U.S. grid owners are deploying grid-enhancing technologies (like dynamic line ratings and topology optimization) and virtual power plants to extract more capacity from existing wires. DOE data cited in the report says the U.S. needs about 5,000 miles of high-capacity transmission built each year from 2025–2035, but only 888 miles were built in 2024.',
    whyItMatters: 'Near-term reliability and interconnection bottlenecks are driving adoption of faster, lower-cost grid upgrades—highlighting how hard it is to build new transmission fast enough for large-load growth.',
  },
  {
    id: 41,
    headline: 'US AI boom faces electric shock',
    source: 'Reuters',
    url: 'https://www.reuters.com/markets/commodities/us-ai-boom-faces-electric-shock-2026-02-25/',
    date: '2026-02-25',
    category: 'AI POWER DEMAND',
    summary: 'Reuters reports that the U.S. AI and data-center buildout is increasingly constrained by grid capacity, turbine supply chains, and interconnection delays. The story cites consultation data that dozens of data centers are planning their own power plants and notes PJM and ERCOT warnings about reserve shortfalls and large-load interconnection requests.',
    whyItMatters: 'As large loads turn to on-site or dedicated generation to guarantee uptime, the market opportunity shifts toward solutions that can deliver firm, scalable power with predictable operating profiles.',
  },
  {
    id: 42,
    headline: 'The US Transition Ahead: Booming Energy Demand, Shifting Mobility',
    source: 'BloombergNEF',
    url: 'https://about.bnef.com/insights/clean-energy/the-us-transition-ahead-booming-energy-demand-shifting-mobility/',
    date: '2026-01-09',
    category: 'AI POWER DEMAND',
    summary: 'BloombergNEF argues the U.S. is entering a sustained phase of rising electricity consumption, driven by AI data centers, electrification, and hotter summers. It highlights a wide set of technologies competing to serve incremental load, emphasizing that firm capacity and grid constraints are becoming binding factors.',
    whyItMatters: 'An institutional research framing that supports a long-duration demand upcycle—and points to firm, dispatchable solutions as the gating factor for capturing AI-driven load growth.',
  },
  {
    id: 43,
    headline: 'PJM Targets 15 Gigawatts of New Power to Feed Data Center Boom',
    source: 'Bloomberg',
    url: 'https://www.bloomberg.com/news/articles/2026-04-10/pjm-targets-15-gigawatts-of-new-power-to-feed-data-center-boom',
    date: '2026-04-10',
    category: 'GRID & INFRASTRUCTURE',
    summary: 'PJM is seeking 15 gigawatts of new power supplies via an emergency proposal aimed at mitigating potential shortages driven by rapid data-center load growth. The plan would match proposed data centers with new power plants, running a process from September through March 2027.',
    whyItMatters: 'This is a concrete signal that the largest U.S. wholesale power market is moving toward load-and-supply co-development, which favors dispatchable, financeable new capacity and speed-to-interconnection solutions.',
  },
  {
    id: 44,
    headline: 'AEP expands spending plan, beats profit estimates as electricity demand surges',
    source: 'Reuters',
    url: 'https://www.reuters.com/business/energy/aep-expands-spending-plan-beats-profit-estimates-electricity-demand-surges-2026-02-12/',
    date: '2026-02-12',
    category: 'ENERGY MARKETS',
    summary: 'Major U.S. utilities are expanding capital plans to build transmission and generation needed to serve data-center load growth. AEP extended its five-year capital strategy beyond $72B and identified an additional $5B–$8B for transmission and generation, while Exelon raised its four-year plan to $41B from $38B.',
    whyItMatters: 'Rising utility capex plans and regulated buildout pathways are a leading indicator of structurally higher load growth—and of the investment cycle needed to add firm capacity and grid infrastructure.',
  },
  {
    id: 45,
    headline: 'US utilities scale up grid-boosting tech to meet surging demand',
    source: 'Reuters',
    url: 'https://www.reuters.com/business/energy/us-utilities-scale-up-grid-boosting-tech-meet-surging-demand--reeii-2026-03-09/',
    date: '2026-03-09',
    category: 'GRID & INFRASTRUCTURE',
    summary: 'U.S. grid owners are deploying grid-enhancing technologies (like dynamic line ratings and topology optimization) and virtual power plants to extract more capacity from existing wires. DOE data cited in the report says the U.S. needs about 5,000 miles of high-capacity transmission built each year from 2025–2035, but only 888 miles were built in 2024.',
    whyItMatters: 'Near-term reliability and interconnection bottlenecks are driving adoption of faster, lower-cost grid upgrades—highlighting how hard it is to build new transmission fast enough for large-load growth.',
  },
  {
    id: 46,
    headline: 'US AI boom faces electric shock',
    source: 'Reuters',
    url: 'https://www.reuters.com/markets/commodities/us-ai-boom-faces-electric-shock-2026-02-25/',
    date: '2026-02-25',
    category: 'AI POWER DEMAND',
    summary: 'Reuters reports that the U.S. AI and data-center buildout is increasingly constrained by grid capacity, turbine supply chains, and interconnection delays. The story cites consultation data that dozens of data centers are planning their own power plants and notes PJM and ERCOT warnings about reserve shortfalls and large-load interconnection requests.',
    whyItMatters: 'As large loads turn to on-site or dedicated generation to guarantee uptime, the market opportunity shifts toward solutions that can deliver firm, scalable power with predictable operating profiles.',
  },
  {
    id: 47,
    headline: 'The US Transition Ahead: Booming Energy Demand, Shifting Mobility',
    source: 'BloombergNEF',
    url: 'https://about.bnef.com/insights/clean-energy/the-us-transition-ahead-booming-energy-demand-shifting-mobility/',
    date: '2026-01-09',
    category: 'AI POWER DEMAND',
    summary: 'BloombergNEF argues the U.S. is entering a sustained phase of rising electricity consumption, driven by AI data centers, electrification, and hotter summers. It highlights a wide set of technologies competing to serve incremental load, emphasizing that firm capacity and grid constraints are becoming binding factors.',
    whyItMatters: 'An institutional research framing that supports a long-duration demand upcycle—and points to firm, dispatchable solutions as the gating factor for capturing AI-driven load growth.',
  },

  // ── Weekly Curation 2026-04-26 ──────────────────────────────────────────────
  {
    id: 48,
    headline: 'US energy regulator to make data center interconnection decision by June',
    source: 'Reuters',
    url: 'https://www.reuters.com/business/energy/us-energy-regulator-make-data-center-interconnection-decision-by-june-2026-04-16/',
    date: '2026-04-16',
    category: 'POLICY & REGULATION',
    summary: 'The U.S. Federal Energy Regulatory Commission (FERC) said it expects to advance rules aimed at managing the rapid increase in data center electricity demand and grid interconnections by June 2026. The process follows extensive public comment from technology firms, utilities, consumer groups and others, and stems from Department of Energy direction to accelerate action on large-load growth.',
    whyItMatters: 'As data-center load becomes material to system planning, investor returns in power generation and grid infrastructure increasingly hinge on how interconnection timelines, requirements, and cost responsibilities are set.',
  },
  {
    id: 49,
    headline: 'Surging energy demand puts US utility capex forecast near $1.3T in 2026–30',
    source: 'S&P Global Market Intelligence',
    url: 'https://www.spglobal.com/market-intelligence/en/news-insights/research/2026/04/surging-energy-demand-puts-us-utility-capex-forecast-near-1-3t-in-2026-30',
    date: '2026-04-22',
    category: 'ENERGY MARKETS',
    summary: 'S&P Global Market Intelligence reports forecasts of roughly $1.3 trillion in U.S. energy utility capital expenditures over 2026–2030, driven by infrastructure modernization, reliability upgrades, and new generation. Analysts cited large-load growth from data centers as a primary driver, alongside other industrial expansion, and highlighted a need for new transmission, distribution, substations, and firm capacity additions.',
    whyItMatters: 'A sustained capex super-cycle is a tailwind for generation and grid investment themes, and indicates utilities increasingly treat large-load demand as durable enough to justify multi-year buildouts.',
  },
  {
    id: 50,
    headline: 'EPA proposes weakening power plant coal ash protections',
    source: 'Utility Dive',
    url: 'https://www.utilitydive.com/news/epa-coal-ash-ccr-protections-proposed-rule/817171/',
    date: '2026-04-10',
    category: 'POLICY & REGULATION',
    summary: 'EPA proposed changes to coal combustion residuals (coal ash) rules that would add permitting and compliance flexibility for utilities, including site-specific considerations and new pathways for groundwater monitoring, corrective action, and closure. The proposal would also ease rules around certain secondary uses of coal ash and revisit requirements for submerged ash.',
    whyItMatters: 'Regulatory easing can affect coal fleet operating economics and remediation liabilities, influencing near-term reliability decisions and the willingness of plant owners to keep units online longer.',
  },
  {
    id: 51,
    headline: 'Stressed US grid forcing data centers to get more flexible',
    source: 'Reuters',
    url: 'https://www.reuters.com/sustainability/boards-policy-regulation/ceraweek-stressed-us-grid-forcing-data-centers-get-more-flexible-2026-03-26/',
    date: '2026-03-26',
    category: 'AI POWER DEMAND',
    summary: 'Reuters reports that grid operators and policymakers are pushing large data centers toward demand-response and flexibility measures as electricity systems strain under fast-rising load. An EPRI forecast cited in the article suggests data centers could more than quadruple their electricity use by the end of the decade and reach as much as 17% of U.S. power supply, spurring strategies like workload shifting, backup generation, and utility agreements to curtail during peaks.',
    whyItMatters: 'If data centers must be interruptible or self-supplied to connect, firm and controllable power becomes more valuable and new capacity solutions can monetize reliability rather than just energy volume.',
  },
  {
    id: 52,
    headline: 'Vistra agrees to 20-year PPAs with Meta for 2,609 MW of nuclear power and capacity (8-K)',
    source: 'SEC EDGAR (Vistra filing)',
    url: 'https://www.stocktitan.net/sec-filings/VST/8-k-vistra-corp-reports-material-event-7aa46980c692.html',
    date: '2026-01-09',
    category: 'NUCLEAR & BASELOAD',
    summary: 'Vistra disclosed 20-year power purchase agreements with Meta covering 2,609 MW of carbon-free power and capacity from its PJM nuclear plants, with deliveries beginning on a partial basis in late 2026 and reaching full delivery by year-end 2027. The filing also outlines additional energy and capacity tied to planned uprates that would phase in starting in 2031 and reach full delivery by 2034.',
    whyItMatters: 'Long-dated corporate baseload contracts are re-pricing firm generation and extending asset lives, supporting investment cases for upgrades, relicensing, and capacity additions around constrained regions.',
  },
  {
    id: 53,
    headline: 'US Power Plants May Avert Retirement in 2026, EIA Says',
    source: 'EnergyNow',
    url: 'https://energynow.com/2026/02/us-power-plants-may-avert-retirement-in-2026-eia-says/',
    date: '2026-02-24',
    category: 'GRID & INFRASTRUCTURE',
    summary: 'EnergyNow reports that the U.S. EIA indicated power plants scheduled to retire in 2026 could remain online longer, continuing a trend of delayed retirements amid record electricity use and higher prices in some regions. The context is an elevated reliability focus as demand grows faster than new supply and transmission can be added.',
    whyItMatters: 'Delayed retirements signal rising scarcity value for dispatchable capacity and highlight the market premium for keeping (or upgrading) legacy thermal assets available during the buildout of new infrastructure.',
  },
];

// ─── DC Power Chart Data ───────────────────────────────────────────────────────

export interface DCPowerDataPoint {
  year: string;
  twh: number;
  isEstimate: boolean;
}

export const dcPowerData: DCPowerDataPoint[] = [
  { year: '2026', twh: 600, isEstimate: false },
  { year: '2027', twh: 670, isEstimate: true },
  { year: '2028', twh: 750, isEstimate: true },
  { year: '2029', twh: 845, isEstimate: true },
  { year: '2030', twh: 945, isEstimate: true },
  { year: '2032', twh: 1180, isEstimate: true },
  { year: '2035', twh: 1580, isEstimate: true },
];

// ─── U.S. Power Supply vs. Demand Data ────────────────────────────────────────
// Sources: EIA, Lawrence Berkeley National Lab, Deloitte, Goldman Sachs,
// McKinsey, Belfer Center (Harvard), IEA Electricity 2025 Report

export interface SupplyDemandDataPoint {
  year: number;
  totalGeneration: number;       // Total U.S. electricity generation (TWh)
  totalDemand: number;           // Total projected demand incl. DC growth (TWh)
  dcDemandMid: number;           // Data center demand — mid scenario (TWh)
  dcDemandHigh: number;          // Data center demand — high scenario (TWh)
  isProjected: boolean;
}

export const supplyDemandData: SupplyDemandDataPoint[] = [
  {
    year: 2026,
    totalGeneration: 4550,
    totalDemand: 4650,
    dcDemandMid: 380,
    dcDemandHigh: 450,
    isProjected: false,
  },
  {
    year: 2027,
    totalGeneration: 4620,
    totalDemand: 4850,
    dcDemandMid: 440,
    dcDemandHigh: 540,
    isProjected: true,
  },
  {
    year: 2028,
    totalGeneration: 4700,
    totalDemand: 5050,
    dcDemandMid: 500,
    dcDemandHigh: 650,
    isProjected: true,
  },
  {
    year: 2029,
    totalGeneration: 4770,
    totalDemand: 5220,
    dcDemandMid: 550,
    dcDemandHigh: 720,
    isProjected: true,
  },
  {
    year: 2030,
    totalGeneration: 4850,
    totalDemand: 5400,
    dcDemandMid: 600,
    dcDemandHigh: 790,
    isProjected: true,
  },
  {
    year: 2031,
    totalGeneration: 4920,
    totalDemand: 5640,
    dcDemandMid: 690,
    dcDemandHigh: 920,
    isProjected: true,
  },
  {
    year: 2032,
    totalGeneration: 5000,
    totalDemand: 5900,
    dcDemandMid: 780,
    dcDemandHigh: 1050,
    isProjected: true,
  },
  {
    year: 2033,
    totalGeneration: 5070,
    totalDemand: 6140,
    dcDemandMid: 850,
    dcDemandHigh: 1150,
    isProjected: true,
  },
  {
    year: 2034,
    totalGeneration: 5140,
    totalDemand: 6380,
    dcDemandMid: 910,
    dcDemandHigh: 1230,
    isProjected: true,
  },
  {
    year: 2035,
    totalGeneration: 5200,
    totalDemand: 6600,
    dcDemandMid: 960,
    dcDemandHigh: 1300,
    isProjected: true,
  },
];

// Key data points for annotation callouts
export const supplyDemandAnnotations = {
  currentCapacity: '1,326 GW',
  currentGeneration: '~4,400 TWh',
  dcShare2024: '~5%',
  dcShare2030Mid: '~12%',
  dcShare2035High: '~25%',
  gapBy2030: '~550 TWh',
  gapBy2035: '~1,400 TWh',
  gridInvestmentNeeded: '$720B',
  interconnectionQueue: '2,600 GW',
  queueCompletionRate: '<20%',
  sources: [
    'EIA (2025)',
    'Lawrence Berkeley National Lab',
    'Deloitte',
    'Goldman Sachs',
    'McKinsey',
    'Belfer Center (Harvard)',
    'IEA Electricity 2025',
  ],
};
// ─── Grid Bottleneck Data ─────────────────────────────────────────────────────
// Sources: LBNL Queued Up 2024, EIA, FERC, industry reports

export interface BottleneckMetric {
  label: string;
  value: string;
  subtext: string;
  color: 'red' | 'orange' | 'gold' | 'blue' | 'green';
}

export const bottleneckMetrics: BottleneckMetric[] = [
  {
    label: 'Interconnection Queue',
    value: '2,600 GW',
    subtext: 'Proposed projects awaiting grid connection',
    color: 'red',
  },
  {
    label: 'Median Wait Time',
    value: '5 Years',
    subtext: 'From request to commercial operation',
    color: 'orange',
  },
  {
    label: 'Completion Rate',
    value: '<20%',
    subtext: 'Of queued projects actually get built',
    color: 'red',
  },
  {
    label: 'Transformer Lead Time',
    value: '128 Weeks',
    subtext: 'Large power transformer delivery — up 146% vs 2019',
    color: 'orange',
  },
  {
    label: 'New Capacity (2026)',
    value: '86 GW',
    subtext: 'Planned additions — record, but a fraction of queue',
    color: 'blue',
  },
  {
    label: 'Google DC Wait',
    value: '12 Years',
    subtext: 'Reported potential delay for new grid connections',
    color: 'red',
  },
];

// Funnel data: what happens to the 2,600 GW in the queue
export interface BottleneckFunnelStep {
  stage: string;
  gw: number;
  pct: string;
  note: string;
}

export const bottleneckFunnel: BottleneckFunnelStep[] = [
  { stage: 'Requested', gw: 2600, pct: '100%', note: 'Total interconnection queue' },
  { stage: 'Under Study', gw: 1300, pct: '50%', note: 'Half advance past initial screening' },
  { stage: 'Approved', gw: 650, pct: '25%', note: 'Receive interconnection agreements' },
  { stage: 'Built', gw: 520, pct: '20%', note: 'Actually reach commercial operation' },
  { stage: 'Annual Additions', gw: 86, pct: '3.3%', note: 'What the grid adds per year (2026)' },
];

// ─── U.S. Generation Mix Data ─────────────────────────────────────────────────
// Source: American Public Power Association, 2025 Update; EIA

export interface GenerationSource {
  source: string;
  capacityGW: number;
  pctOfTotal: number;
  color: string;
  note: string;
}

export const generationMix: GenerationSource[] = [
  { source: 'Natural Gas', capacityGW: 567, pctOfTotal: 42.8, color: '#4088e8', note: 'Dominant source, fast to build (3-5 yr)' },
  { source: 'Coal', capacityGW: 201, pctOfTotal: 15.2, color: '#d4a852', note: '201 GW of grid-connected, permitted infrastructure' },
  { source: 'Wind', capacityGW: 154, pctOfTotal: 11.6, color: '#00cc88', note: 'Intermittent — not baseload suitable for DCs' },
  { source: 'Solar', capacityGW: 134, pctOfTotal: 10.1, color: '#e88a30', note: 'Fastest-growing but intermittent' },
  { source: 'Nuclear', capacityGW: 103, pctOfTotal: 7.8, color: '#c084fc', note: 'Firm baseload — 10+ yr to build new' },
  { source: 'Hydroelectric', capacityGW: 101, pctOfTotal: 7.6, color: '#20808D', note: 'Geography-limited, no new sites' },
  { source: 'Other', capacityGW: 66, pctOfTotal: 5.0, color: '#8a7033', note: 'Biomass, geothermal, oil, etc.' },
];

export const totalInstalledCapacity = 1326; // GW

// ─── Hyperscaler CapEx Data ──────────────────────────────────────────────────
// Sources: Goldman Sachs, company earnings reports

export interface CapexDataPoint {
  year: string;
  capex: number; // $ billions
  isProjected: boolean;
}

export const hyperscalerCapex: CapexDataPoint[] = [
  { year: '2020', capex: 105, isProjected: false },
  { year: '2021', capex: 150, isProjected: false },
  { year: '2022', capex: 170, isProjected: false },
  { year: '2023', capex: 200, isProjected: false },
  { year: '2024', capex: 258, isProjected: false },
  { year: '2025', capex: 371, isProjected: false },
  { year: '2026E', capex: 675, isProjected: true },
];

// ─── Policy Tailwinds Data ───────────────────────────────────────────────────

export interface PolicyItem {
  title: string;
  date: string;
  category: 'executive-order' | 'regulatory' | 'legislative' | 'market-signal';
  impact: string;
  source: string;
  url: string;
}

export const policyTailwinds: PolicyItem[] = [
  {
    title: 'DOE Emergency Orders Keep Coal Plants Online',
    date: '2025-2026',
    category: 'executive-order',
    impact: 'Only 4.6 GW of planned 12.3 GW retirements executed in 2025 — lowest since 2008. Coal fleet preserved as grid reliability backstop.',
    source: 'EIA',
    url: 'https://www.eia.gov/todayinenergy/detail.php?id=67206',
  },
  {
    title: 'EPA Rolls Back Coal Plant Mercury Standards',
    date: 'Feb 2026',
    category: 'regulatory',
    impact: 'Reverted to 2012 standards, saving coal operators ~$670M. Framed as supporting "baseload power for the American economy."',
    source: 'AP News',
    url: 'https://apnews.com/article/trump-coal-zeldin-mercury-epa-emissions-b770d6efd05f19ed24b179511c726196',
  },
  {
    title: 'Executive Order: Unleashing American Energy',
    date: 'Jan 2025',
    category: 'executive-order',
    impact: 'Declared national energy emergency. Prioritized fossil fuel development, expedited permitting for energy infrastructure, paused new renewable mandates.',
    source: 'White House',
    url: 'https://www.whitehouse.gov/presidential-actions/',
  },
  {
    title: 'Coal Reclassification as Strategic Resource',
    date: '2025-2026',
    category: 'legislative',
    impact: 'Congressional proposals to reclassify coal assets as critical energy infrastructure, enabling federal support for plant upgrades and conversions.',
    source: 'Congressional Record',
    url: 'https://www.congress.gov/',
  },
  {
    title: 'PJM Capacity Auction: Record $329/MW-day',
    date: 'Dec 2025',
    category: 'market-signal',
    impact: 'Third consecutive record. Coal cleared 20% of capacity. $16.4B total cost. Market is pricing in structural shortage.',
    source: 'Utility Dive',
    url: 'https://www.utilitydive.com/news/pjm-interconnection-capacity-auction-data-center/808264/',
  },
  {
    title: 'Bipartisan Data Center Energy Compacts',
    date: '2025-2026',
    category: 'legislative',
    impact: 'State-level fast-track permitting for data center energy projects in WV, OH, TX, and VA. Grid-ready sites with existing transmission get priority.',
    source: 'State Legislature Records',
    url: 'https://www.ncsl.org/',
  },
];

export const policyCategories = {
  'executive-order': { label: 'Executive Action', color: '#00cc88' },
  'regulatory': { label: 'Regulatory', color: '#00cc88' },
  'legislative': { label: 'Legislative', color: '#00cc88' },
  'market-signal': { label: 'Market Signal', color: '#00cc88' },
} as const;
