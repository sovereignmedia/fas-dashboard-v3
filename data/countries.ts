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
  { name: 'United States', code: 'US', lat: 39.8283, lng: -98.5795, coalProduction: 535, marketPotential: '$580B', patentStatus: 'Granted', facilityPotential: 15, color: '#4088e8' },
  { name: 'Australia', code: 'AU', lat: -25.2744, lng: 133.7751, coalProduction: 475, marketPotential: '$410B', patentStatus: 'Granted', facilityPotential: 12, color: '#00cc88' },
  { name: 'India', code: 'IN', lat: 20.5937, lng: 78.9629, coalProduction: 893, marketPotential: '$720B', patentStatus: 'Granted', facilityPotential: 20, color: '#c084fc' },
  { name: 'China', code: 'CN', lat: 35.8617, lng: 104.1954, coalProduction: 4_500, marketPotential: '$3.2T', patentStatus: 'Filed', facilityPotential: 64, color: '#e88a30' },
  { name: 'South Africa', code: 'ZA', lat: -30.5595, lng: 22.9375, coalProduction: 248, marketPotential: '$190B', patentStatus: 'Granted', facilityPotential: 8, color: '#065f46' },
  { name: 'Indonesia', code: 'ID', lat: -0.7893, lng: 113.9213, coalProduction: 616, marketPotential: '$480B', patentStatus: 'Filed', facilityPotential: 14, color: '#e84040' },
  { name: 'Russia', code: 'RU', lat: 61.5240, lng: 105.3188, coalProduction: 427, marketPotential: '$380B', patentStatus: 'Filed', facilityPotential: 5, color: '#d4a852' },
  { name: 'Germany', code: 'DE', lat: 51.1657, lng: 10.4515, coalProduction: 92, marketPotential: '$78B', patentStatus: 'Granted', facilityPotential: 2, color: '#c084fc' },
  { name: 'Canada', code: 'CA', lat: 56.1304, lng: -106.3468, coalProduction: 48, marketPotential: '$38B', patentStatus: 'Granted', facilityPotential: 3, color: '#00cc88' },
];
