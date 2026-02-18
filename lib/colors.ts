export const CHART_COLORS = {
  gold: '#d4a852',
  green: '#00cc88',
  blue: '#4088e8',
  red: '#e84040',
  orange: '#e88a30',
  purple: '#c084fc',
  goldDim: '#8a7033',
  greenDim: '#065f46',
  blueDim: '#1a3d7a',
} as const;

export const PRODUCT_COLORS = {
  fascarbon: CHART_COLORS.green,
  diesel: CHART_COLORS.gold,
  naphtha: CHART_COLORS.blue,
  sulfuricAcid: CHART_COLORS.orange,
  ammoniumSulfate: CHART_COLORS.purple,
  bioOil: CHART_COLORS.red,
} as const;
