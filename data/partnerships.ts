// data/partnerships.ts

export interface Partner {
  id: string;
  name: string;
  role: string;
  category: 'operations' | 'engineering' | 'insurance' | 'procurement' | 'capital-markets' | 'infrastructure' | 'licensing';
  description: string;
  credentials: string;
  agreementStatus: 'executed' | 'in-progress' | 'planned';
  aum?: string;
  highlights?: string[];
}

export const PARTNERS: Partner[] = [
  {
    id: 'cams',
    name: 'CAMS',
    role: 'Operations & Maintenance',
    category: 'operations',
    description: 'Full-scope operations from construction oversight through steady-state O&M, safety, environmental, IT/OT, and compliance.',
    credentials: 'Industry leader since 2007.',
    agreementStatus: 'executed',
    aum: '$20B+',
    highlights: ['82 Industry Best Practice Awards since 2013', '15+ years energy infrastructure', '11.3M tons CO₂ reduced', 'Cybersecurity via Bluewire subsidiary'],
  },
  {
    id: 'job-epc',
    name: 'JOB EPC Co.',
    role: 'EPC Contractor',
    category: 'engineering',
    description: 'Complex engineering and construction management.',
    credentials: 'Extensive refinery construction experience.',
    agreementStatus: 'executed',
  },
  {
    id: 'kbc',
    name: 'KBC',
    role: 'Process Design',
    category: 'engineering',
    description: 'Process technology and design engineering for commercial-scale FASForm™.',
    credentials: 'Global process technology consultancy — refining and petrochemical sectors.',
    agreementStatus: 'executed',
  },
  {
    id: 'yokogawa',
    name: 'Yokogawa',
    role: 'Controls & Automation',
    category: 'engineering',
    description: 'Industrial automation and control systems for 24/7 operations.',
    credentials: 'Fortune Global 500. World leader in industrial automation.',
    agreementStatus: 'executed',
  },
  {
    id: 'performance-contractors',
    name: 'Performance Contractors',
    role: 'Procurement & Contracting',
    category: 'procurement',
    description: 'Streamlined procurement and contracting for construction.',
    credentials: 'Major industrial construction and maintenance firm.',
    agreementStatus: 'executed',
  },
  {
    id: 'lockton',
    name: 'Lockton',
    role: 'Insurance',
    category: 'insurance',
    description: 'Full construction and operations insurance coverage.',
    credentials: 'World\'s largest independent insurance brokerage.',
    agreementStatus: 'executed',
  },
  {
    id: 'ariel-green',
    name: 'Ariel Green',
    role: 'Performance Bond',
    category: 'insurance',
    description: 'Output performance bond — financial guarantee of FASForm™ technology performance.',
    credentials: 'WRAP Output Guarantee provider.',
    agreementStatus: 'executed',
  },
  {
    id: 'market-street',
    name: 'Market Street IR',
    role: 'Retail IR',
    category: 'capital-markets',
    description: 'Retail investor relations with proven Reg A track record.',
    credentials: '2.5M subscriber reach. $46M Reg A capital raised.',
    agreementStatus: 'executed',
  },
  {
    id: 'hybrid',
    name: 'HyBrid Financial',
    role: 'Institutional IR',
    category: 'capital-markets',
    description: 'Institutional investor relations — funds, family offices, asset managers.',
    credentials: '1,900 institutional investor contacts.',
    agreementStatus: 'executed',
  },
  {
    id: 'inserv',
    name: 'InServ',
    role: 'Asset Services',
    category: 'operations',
    description: 'Comprehensive asset services — inspection, maintenance, and turnaround support for industrial facilities.',
    credentials: 'Experienced industrial service provider across energy and chemicals sectors.',
    agreementStatus: 'executed',
  },
  {
    id: 'topsoe',
    name: 'TOPSOE',
    role: 'Catalyst & Licensing',
    category: 'licensing',
    description: 'Catalyst technology and process licensing for hydrotreating and refining operations.',
    credentials: 'Global leader in catalysis — supporting refineries and chemical plants worldwide.',
    agreementStatus: 'executed',
  },
  {
    id: 'aep',
    name: 'AEP (American Electric Power)',
    role: 'Power Supply',
    category: 'infrastructure',
    description: 'Electrical power supply and grid connection for facility operations.',
    credentials: 'One of the largest electric utilities in the United States. Serves 5.6M customers.',
    agreementStatus: 'executed',
  },
  {
    id: 'transcanada',
    name: 'TransCanada (TC Energy)',
    role: 'Natural Gas Supply',
    category: 'infrastructure',
    description: 'Natural gas supply and pipeline access for facility start-up and supplemental process heat.',
    credentials: 'Major North American energy infrastructure company. 93,300 km of natural gas pipelines.',
    agreementStatus: 'executed',
  },
  {
    id: 'greylock',
    name: 'Greylock Energy',
    role: 'Feedstock Supply',
    category: 'procurement',
    description: 'Coal feedstock procurement and logistics — 10-year contract for 27M tons of Pittsburgh #8 coal with collared pricing.',
    credentials: 'Regional coal supplier with barge-delivery capabilities via Ohio River.',
    agreementStatus: 'executed',
  },
  {
    id: 'csx',
    name: 'CSX Transportation',
    role: 'Rail Logistics',
    category: 'infrastructure',
    description: 'On-site rail spur access for product distribution and feedstock delivery at Mason County facility.',
    credentials: 'Class I railroad — 19,500 miles of track across 23 eastern US states.',
    agreementStatus: 'executed',
  },
];
