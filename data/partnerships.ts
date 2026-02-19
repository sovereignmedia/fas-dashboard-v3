// data/partnerships.ts

export interface Partner {
  id: string;
  name: string;
  role: string;
  category: 'operations' | 'engineering' | 'insurance' | 'procurement' | 'capital-markets';
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
];
