// data/capex.ts

export type CapExCategory = 'engineering' | 'long-lead' | 'construction' | 'other';

export interface CapExLineItem {
  id: string;
  name: string;
  category: CapExCategory;
  baseCost: number;
  contingencyPct: number;
  totalCost: number;
}

export const CAPEX_ITEMS: CapExLineItem[] = [
  // Engineering
  { id: 'fel3', name: 'FEL 3 Engineering', category: 'engineering', baseCost: 9_780_000, contingencyPct: 0.15, totalCost: 11_247_000 },
  { id: 'detailed-eng', name: 'Detailed Engineering', category: 'engineering', baseCost: 22_820_000, contingencyPct: 0.15, totalCost: 26_243_000 },

  // Long-Lead Procurement
  { id: 'compressors', name: 'K-101/102 Compressors', category: 'long-lead', baseCost: 9_720_000, contingencyPct: 0.15, totalCost: 11_178_000 },
  { id: 'heaters', name: 'H-101\u2013105 Heaters', category: 'long-lead', baseCost: 8_499_600, contingencyPct: 0.15, totalCost: 9_774_540 },
  { id: 'vertical-pv', name: 'Vertical Pressure Vessels', category: 'long-lead', baseCost: 8_932_470, contingencyPct: 0.15, totalCost: 10_272_341 },
  { id: 'horizontal-pv', name: 'Horizontal Pressure Vessels & Drums', category: 'long-lead', baseCost: 5_910_512, contingencyPct: 0.15, totalCost: 6_797_089 },
  { id: 'heat-exchangers', name: 'Heat Exchangers', category: 'long-lead', baseCost: 2_616_048, contingencyPct: 0.15, totalCost: 3_008_455 },
  { id: 'conveyors', name: 'Conveyors', category: 'long-lead', baseCost: 7_940_400, contingencyPct: 0.15, totalCost: 9_131_460 },
  { id: 'bins-chutes', name: 'Bins & Chutes', category: 'long-lead', baseCost: 358_127, contingencyPct: 0.15, totalCost: 411_846 },
  { id: 'api-pumps', name: 'API Pumps', category: 'long-lead', baseCost: 2_412_000, contingencyPct: 0.15, totalCost: 2_773_800 },
  { id: 'ansi-pumps', name: 'ANSI Pumps', category: 'long-lead', baseCost: 619_200, contingencyPct: 0.15, totalCost: 712_080 },
  { id: 'trays-packing', name: 'Trays/Packing', category: 'long-lead', baseCost: 779_280, contingencyPct: 0.15, totalCost: 896_172 },
  { id: 'cyclones', name: 'Cyclones', category: 'long-lead', baseCost: 2_568_000, contingencyPct: 0.15, totalCost: 2_953_200 },
  { id: 'ro-bioreactor', name: 'RO Unit/Bioreactor', category: 'long-lead', baseCost: 3_195_000, contingencyPct: 0.15, totalCost: 3_674_250 },
  { id: 'tanks', name: 'Tanks', category: 'long-lead', baseCost: 2_358_000, contingencyPct: 0.15, totalCost: 2_711_700 },
  { id: 'rail-loading', name: 'Rail Loading', category: 'long-lead', baseCost: 540_000, contingencyPct: 0.15, totalCost: 621_000 },
  { id: 'railroad', name: 'Railroad', category: 'long-lead', baseCost: 5_610_465, contingencyPct: 0.15, totalCost: 6_452_035 },
  { id: 'lock-hopper', name: 'Lock Hopper', category: 'long-lead', baseCost: 518_400, contingencyPct: 0.15, totalCost: 596_160 },
  { id: 'flare-incinerator', name: 'Flare/Incinerator', category: 'long-lead', baseCost: 3_055_380, contingencyPct: 0.15, totalCost: 3_513_687 },
  { id: 'amine-sulphur', name: 'Amine/Sulphur Unit', category: 'long-lead', baseCost: 19_625_000, contingencyPct: 0.15, totalCost: 22_568_750 },
  { id: 'misc-procurement', name: 'Miscellaneous Procurement', category: 'long-lead', baseCost: 1_694_275, contingencyPct: 0.15, totalCost: 1_948_416 },
  { id: 'bms-skid', name: 'BMS Skid', category: 'long-lead', baseCost: 3_723_775, contingencyPct: 0.15, totalCost: 4_282_341 },
  { id: 'instrumentation-proc', name: 'Instrumentation (Procurement)', category: 'long-lead', baseCost: 7_326_602, contingencyPct: 0.15, totalCost: 8_425_592 },
  { id: 'electrical-proc', name: 'Electrical (Procurement)', category: 'long-lead', baseCost: 3_173_384, contingencyPct: 0.15, totalCost: 3_649_392 },
  { id: 'control-system', name: 'Control System Hardware', category: 'long-lead', baseCost: 545_600, contingencyPct: 0.15, totalCost: 627_440 },

  // Construction
  { id: 'concrete', name: 'Concrete/Earthwork', category: 'construction', baseCost: 51_881_120, contingencyPct: 0.15, totalCost: 59_663_288 },
  { id: 'structural-steel', name: 'Structural Steel', category: 'construction', baseCost: 36_263_000, contingencyPct: 0.15, totalCost: 41_702_450 },
  { id: 'mechanical', name: 'Mechanical Equipment Setting', category: 'construction', baseCost: 31_213_078, contingencyPct: 0.15, totalCost: 35_895_040 },
  { id: 'pipe-fab', name: 'Pipe Fabrication', category: 'construction', baseCost: 20_414_976, contingencyPct: 0.15, totalCost: 23_477_222 },
  { id: 'pipe-erect', name: 'Pipe Erection', category: 'construction', baseCost: 29_980_244, contingencyPct: 0.15, totalCost: 34_477_281 },
  { id: 'pipe-insulation', name: 'Pipe Insulation/Tracing', category: 'construction', baseCost: 4_836_156, contingencyPct: 0.15, totalCost: 5_561_579 },
  { id: 'electrical-const', name: 'Electrical (Construction)', category: 'construction', baseCost: 20_498_534, contingencyPct: 0.15, totalCost: 23_573_314 },
  { id: 'instrumentation-const', name: 'Instrumentation (Construction)', category: 'construction', baseCost: 15_145_100, contingencyPct: 0.15, totalCost: 17_416_865 },
  { id: 'general-conditions', name: 'General Conditions', category: 'construction', baseCost: 6_238_703, contingencyPct: 0.15, totalCost: 7_174_508 },
  { id: 'construction-mgmt', name: 'Construction Management', category: 'construction', baseCost: 13_442_635, contingencyPct: 0.15, totalCost: 15_459_030 },
  { id: 'startup', name: 'Startup', category: 'construction', baseCost: 6_883_201, contingencyPct: 0.15, totalCost: 7_915_681 },
  { id: 'epc-fee', name: 'EPC Fee', category: 'construction', baseCost: 10_000_000, contingencyPct: 0.15, totalCost: 11_500_000 },
  { id: 'change-allowance', name: 'Change Allowance', category: 'construction', baseCost: 7_000_000, contingencyPct: 0.15, totalCost: 8_050_000 },
  { id: 'shipping', name: 'Shipping and Handling', category: 'construction', baseCost: 3_000_000, contingencyPct: 0.15, totalCost: 3_450_000 },

  // Other
  { id: 'land', name: 'Land and Equipment', category: 'other', baseCost: 10_000_000, contingencyPct: 0, totalCost: 10_000_000 },
  { id: 'wrap-guarantee', name: 'WRAP Output Guarantee', category: 'other', baseCost: 3_900_000, contingencyPct: 0, totalCost: 3_900_000 },
  { id: 'owners-cost', name: "Owner\u2019s Cost", category: 'other', baseCost: 11_178_435, contingencyPct: 0.15, totalCost: 12_855_200 },
  { id: 'contingency', name: 'Contingency Reserve', category: 'other', baseCost: 150_000_000, contingencyPct: 0, totalCost: 150_000_000 },
  { id: 'ammonium-sulfate-plant', name: 'Ammonium Sulfate Plant', category: 'other', baseCost: 60_000_000, contingencyPct: 0.15, totalCost: 69_000_000 },
  { id: 'hydrotreater', name: 'ULSD Hydrotreater', category: 'other', baseCost: 50_000_000, contingencyPct: 0, totalCost: 50_000_000 },
  { id: 'funding-costs', name: 'Funding Costs', category: 'other', baseCost: 77_221_553, contingencyPct: 0, totalCost: 77_221_553 },
  { id: 'operating-capital', name: 'Operating Capital', category: 'other', baseCost: 11_245_000, contingencyPct: 0, totalCost: 11_245_000 },
  { id: 'additional-reserve', name: 'Additional Reserve', category: 'other', baseCost: 15_000_000, contingencyPct: 0, totalCost: 15_000_000 },
];

export const CAPEX_CATEGORY_LABELS: Record<CapExCategory, string> = {
  engineering: 'Engineering',
  'long-lead': 'Long-Lead Procurement',
  construction: 'Construction',
  other: 'Other / Reserves',
};

export const CAPEX_CATEGORY_COLORS: Record<CapExCategory, string> = {
  engineering: '#4088e8',
  'long-lead': '#00cc88',
  construction: '#d4a852',
  other: '#c084fc',
};

export function getCapExByCategory() {
  const categories: Record<CapExCategory, { baseCost: number; totalCost: number; items: number }> = {
    engineering: { baseCost: 0, totalCost: 0, items: 0 },
    'long-lead': { baseCost: 0, totalCost: 0, items: 0 },
    construction: { baseCost: 0, totalCost: 0, items: 0 },
    other: { baseCost: 0, totalCost: 0, items: 0 },
  };
  for (const item of CAPEX_ITEMS) {
    categories[item.category].baseCost += item.baseCost;
    categories[item.category].totalCost += item.totalCost;
    categories[item.category].items += 1;
  }
  return categories;
}

export const CAPEX_TOTAL = CAPEX_ITEMS.reduce((sum, item) => sum + item.totalCost, 0);
