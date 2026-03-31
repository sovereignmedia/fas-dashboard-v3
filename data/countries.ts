/**
 * Patent country data — validated against Energy Institute Statistical Review 2025.
 * Production: 2024 calendar year (Mt). Market potential: yield-adjusted annual revenue
 * from TAM model (March 2026). Facility potential: production / 2.7 Mt per facility.
 *
 * Last updated: 2026-03-30
 * Source: Energy Institute Statistical Review 2025 (production),
 *         FASForm Global Yield-Adjusted TAM Model (market potential, facility count)
 */

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
  { name: 'United States', code: 'US', lat: 39.8283, lng: -98.5795, coalProduction: 465, marketPotential: '$111B', patentStatus: 'Granted', facilityPotential: 159, color: '#4088e8' },
  { name: 'Australia', code: 'AU', lat: -25.2744, lng: 133.7751, coalProduction: 463, marketPotential: '$141B', patentStatus: 'Granted', facilityPotential: 171, color: '#00cc88' },
  { name: 'India', code: 'IN', lat: 20.5937, lng: 78.9629, coalProduction: 1_085, marketPotential: '$171B', patentStatus: 'Granted', facilityPotential: 402, color: '#c084fc' },
  { name: 'China', code: 'CN', lat: 35.8617, lng: 104.1954, coalProduction: 4_780, marketPotential: '$1.3T', patentStatus: 'Filed', facilityPotential: 1_770, color: '#e88a30' },
  { name: 'South Africa', code: 'ZA', lat: -30.5595, lng: 22.9375, coalProduction: 235, marketPotential: '$63B', patentStatus: 'Granted', facilityPotential: 87, color: '#065f46' },
  { name: 'Indonesia', code: 'ID', lat: -0.7893, lng: 113.9213, coalProduction: 836, marketPotential: '$169B', patentStatus: 'Filed', facilityPotential: 310, color: '#e84040' },
  { name: 'Russia', code: 'RU', lat: 61.5240, lng: 105.3188, coalProduction: 427, marketPotential: '$137B', patentStatus: 'Filed', facilityPotential: 158, color: '#d4a852' },
  { name: 'Germany', code: 'DE', lat: 51.1657, lng: 10.4515, coalProduction: 92, marketPotential: '$6B', patentStatus: 'Granted', facilityPotential: 34, color: '#c084fc' },
  { name: 'Canada', code: 'CA', lat: 56.1304, lng: -106.3468, coalProduction: 43, marketPotential: '$15B', patentStatus: 'Granted', facilityPotential: 16, color: '#00cc88' },
];
