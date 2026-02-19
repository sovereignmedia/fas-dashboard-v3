export interface MacroTailwind {
  category: string;
  headline: string;
  body: string;
  dataAnchor: string;
  source: string;
}

export const macroTailwinds: MacroTailwind[] = [
  {
    category: 'ENERGY DEMAND',
    headline: 'Global Electricity Demand Projected to Nearly Double by 2050',
    body: 'The International Energy Agency projects global electricity demand will grow from 26,000 TWh in 2023 to 50,000 TWh by 2050 — adding the equivalent of Japan\'s total electricity consumption every year from 2023 to 2035. Fossil fuels continue to account for approximately 80% of global energy consumption, with coal remaining critical in power generation and industrial manufacturing.',
    dataAnchor: '8.77 billion tons — global coal consumption in 2024, an all-time record',
    source: 'EIA',
  },
  {
    category: 'TECHNOLOGY DEMAND',
    headline: 'AI Infrastructure Is Creating Unprecedented Energy Demand',
    body: 'Hyperscale data center operators — including Google, Amazon, and Microsoft — are driving a structural surge in electricity demand that existing grid capacity cannot meet. AI workloads require significant and sustained computational power, creating new demand for reliable, cost-effective baseload energy sources beyond what intermittent renewables can currently provide.',
    dataAnchor: 'Electricity demand growing 2.7% annually since 2010, outpacing overall energy demand growth',
    source: 'IEA',
  },
  {
    category: 'REGULATORY CLIMATE',
    headline: 'Domestic Energy Production Policy Favors New Infrastructure',
    body: 'Recent executive actions have prioritized domestic energy production and fossil fuel infrastructure development, including the reversal of restrictions on coal leasing and the rollback of emissions regulations affecting coal-fired operations. The EPA has rescinded over 30 environmental regulations, reducing the compliance burden on energy producers and creating a more favorable operating environment for new coal-derived product facilities.',
    dataAnchor: '31 environmental regulations rolled back by EPA',
    source: 'AP News',
  },
  {
    category: 'INDUSTRY REPOSITIONING',
    headline: 'Coal\'s Highest-Value Use Is Not Combustion',
    body: 'The global coal industry has historically been limited to two primary applications: burning for power generation and conversion to metallurgical coke for steel production. Frontieras represents a fundamental repositioning — treating coal as a molecular feedstock for fractionation into multiple high-value chemical and fuel products, rather than a single-use combustion fuel. This reframing aligns coal utilization with higher-margin industrial chemistry rather than commodity energy.',
    dataAnchor: 'Proven reserves of 1 trillion+ tons across 70 countries — the world\'s most abundant fossil fuel',
    source: 'IEA',
  },
  {
    category: 'DOMESTIC MANUFACTURING',
    headline: 'Reindustrialization Policy Creates Demand for Domestic Product Supply',
    body: 'Federal policy emphasis on domestic manufacturing, infrastructure investment, and supply chain resilience is driving demand for domestically sourced industrial chemicals, fuels, and materials. Frontieras\' product portfolio — diesel, naphtha, sulfuric acid, ammonium sulfate, and high-grade carbon — directly serves industries central to the reindustrialization thesis: transportation, agriculture, steel production, and chemical manufacturing.',
    dataAnchor: '$1.53 trillion — total current addressable market across Frontieras\' six product categories',
    source: 'Industry research',
  },
  {
    category: 'COMPETITIVE DYNAMICS',
    headline: 'Conventional Refiners Face Escalating Carbon Compliance Costs',
    body: 'Traditional oil refiners face rising operational costs from carbon taxes, emission offset requirements, and methane reduction mandates. Carbon emissions costs are projected to exceed $100 per metric ton in certain regions within the decade. Frontieras\' FASForm\u2122 process operates without direct CO\u2082 combustion emissions and achieves a 25\u201335% net carbon reduction relative to conventional refining, positioning it favorably as compliance costs reshape the competitive landscape.',
    dataAnchor: '1.2 million metric tons CO\u2082-equivalent — average annual emissions per conventional refinery',
    source: 'EPA',
  },
];
