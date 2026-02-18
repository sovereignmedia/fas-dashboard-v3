export interface Country {
  name: string;
  code: string;
  lat: number;
  lng: number;
  coalProduction: number;
  marketPotential: string;
  patentStatus: string;
  facilityPotential: number;
  color: string;
}

export const countries: Country[] = [
  { name: 'United States', code: 'US', lat: 39.8283, lng: -98.5795, coalProduction: 535, marketPotential: '$580B', patentStatus: 'Granted', facilityPotential: 15, color: '#4A9EFF' },
  { name: 'Australia', code: 'AU', lat: -25.2744, lng: 133.7751, coalProduction: 475, marketPotential: '$410B', patentStatus: 'Granted', facilityPotential: 12, color: '#00D4AA' },
  { name: 'India', code: 'IN', lat: 20.5937, lng: 78.9629, coalProduction: 893, marketPotential: '$720B', patentStatus: 'Granted', facilityPotential: 20, color: '#8B5CF6' },
  { name: 'China', code: 'CN', lat: 35.8617, lng: 104.1954, coalProduction: 4_500, marketPotential: '$3.2T', patentStatus: 'Filed', facilityPotential: 64, color: '#FF8C42' },
  { name: 'South Africa', code: 'ZA', lat: -30.5595, lng: 22.9375, coalProduction: 248, marketPotential: '$190B', patentStatus: 'Granted', facilityPotential: 8, color: '#10B981' },
  { name: 'Indonesia', code: 'ID', lat: -0.7893, lng: 113.9213, coalProduction: 616, marketPotential: '$480B', patentStatus: 'Filed', facilityPotential: 14, color: '#FF4C4C' },
  { name: 'Poland', code: 'PL', lat: 51.9194, lng: 19.1451, coalProduction: 112, marketPotential: '$95B', patentStatus: 'Granted', facilityPotential: 4, color: '#D4A853' },
  { name: 'Colombia', code: 'CO', lat: 4.5709, lng: -74.2973, coalProduction: 54, marketPotential: '$42B', patentStatus: 'Filed', facilityPotential: 3, color: '#A78BFA' },
  { name: 'Canada', code: 'CA', lat: 56.1304, lng: -106.3468, coalProduction: 48, marketPotential: '$38B', patentStatus: 'Granted', facilityPotential: 3, color: '#34D399' },
];
