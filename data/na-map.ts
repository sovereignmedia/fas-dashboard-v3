/**
 * North America Commercialization Map — facility data + constants.
 */

export const NA_MAP_SIZE = { width: 960, height: 640 };
export const TAU = 2 * Math.PI;

export interface NAFacility {
  name: string;
  state: string;
  type: 'FASForm' | 'FASGen' | 'Planned';
  status: 'Active' | 'Planned';
  coords: { lat: number; lon: number };
  label: string;
}

export const NA_FACILITIES: NAFacility[] = [
  {
    name: 'FASForm Facility #1',
    state: 'WV',
    type: 'FASForm',
    status: 'Active',
    coords: { lat: 38.77, lon: -82.03 },
    label: 'Mason County, WV',
  },
  {
    name: 'Texas Facility',
    state: 'TX',
    type: 'Planned',
    status: 'Planned',
    coords: { lat: 31.97, lon: -99.90 },
    label: 'Texas',
  },
  {
    name: 'Wyoming Facility',
    state: 'WY',
    type: 'Planned',
    status: 'Planned',
    coords: { lat: 43.07, lon: -107.29 },
    label: 'Wyoming',
  },
  {
    name: 'Alberta Facility',
    state: 'AB',
    type: 'Planned',
    status: 'Planned',
    coords: { lat: 53.93, lon: -116.58 },
    label: 'Alberta, Canada',
  },
];

// States/provinces (US + Canada with state borders)
export const NA_GEOJSON_STATES_URL =
  'https://raw.githubusercontent.com/martynafford/natural-earth-geojson/refs/heads/master/50m/cultural/ne_50m_admin_1_states_provinces.json';

// Country-level (for Mexico — not in the states dataset)
export const NA_GEOJSON_COUNTRIES_URL =
  'https://raw.githubusercontent.com/martynafford/natural-earth-geojson/refs/heads/master/50m/cultural/ne_50m_admin_0_countries.json';
