// ─── Global Coal Production Data (1950–2024) ─────────────────────────────────
// Source: Our World in Data / Energy Institute Statistical Review of World Energy (2025)
// Tonnage calibrated against IEA Coal 2025 report
// TWh = energy content; Mt = million metric tons (physical mass)

export interface CoalProductionDataPoint {
  year: number;
  twh: number;
  mt: number;
}

export const coalProductionData: CoalProductionDataPoint[] = [
  { year: 1950, twh: 11332.6, mt: 1963 },
  { year: 1951, twh: 11939.0, mt: 2068 },
  { year: 1952, twh: 11870.5, mt: 2056 },
  { year: 1953, twh: 11923.2, mt: 2066 },
  { year: 1954, twh: 11769.4, mt: 2039 },
  { year: 1955, twh: 12787.9, mt: 2215 },
  { year: 1956, twh: 13514.1, mt: 2341 },
  { year: 1957, twh: 13893.8, mt: 2407 },
  { year: 1958, twh: 14332.8, mt: 2483 },
  { year: 1959, twh: 14854.9, mt: 2574 },
  { year: 1960, twh: 15475.8, mt: 2681 },
  { year: 1961, twh: 14579.5, mt: 2526 },
  { year: 1962, twh: 14930.8, mt: 2587 },
  { year: 1963, twh: 15383.6, mt: 2665 },
  { year: 1964, twh: 16064.5, mt: 2783 },
  { year: 1965, twh: 16381.6, mt: 2838 },
  { year: 1966, twh: 16608.7, mt: 2878 },
  { year: 1967, twh: 16018.8, mt: 2775 },
  { year: 1968, twh: 16464.8, mt: 2853 },
  { year: 1969, twh: 16797.8, mt: 2910 },
  { year: 1970, twh: 17469.7, mt: 3027 },
  { year: 1971, twh: 17311.0, mt: 2999 },
  { year: 1972, twh: 17251.3, mt: 2989 },
  { year: 1973, twh: 17558.4, mt: 3042 },
  { year: 1974, twh: 17712.8, mt: 3069 },
  { year: 1975, twh: 18767.7, mt: 3252 },
  { year: 1976, twh: 19299.5, mt: 3344 },
  { year: 1977, twh: 19886.0, mt: 3446 },
  { year: 1978, twh: 20194.8, mt: 3499 },
  { year: 1979, twh: 21380.1, mt: 3705 },
  { year: 1980, twh: 20968.1, mt: 3633 },
  { year: 1981, twh: 21445.2, mt: 3716 },
  { year: 1982, twh: 22204.4, mt: 3847 },
  { year: 1983, twh: 22137.2, mt: 3836 },
  { year: 1984, twh: 23105.6, mt: 4004 },
  { year: 1985, twh: 24276.5, mt: 4207 },
  { year: 1986, twh: 24852.2, mt: 4306 },
  { year: 1987, twh: 25321.2, mt: 4388 },
  { year: 1988, twh: 25936.2, mt: 4494 },
  { year: 1989, twh: 26394.4, mt: 4574 },
  { year: 1990, twh: 26344.9, mt: 4565 },
  { year: 1991, twh: 25628.8, mt: 4441 },
  { year: 1992, twh: 25572.4, mt: 4431 },
  { year: 1993, twh: 24802.2, mt: 4298 },
  { year: 1994, twh: 25371.6, mt: 4396 },
  { year: 1995, twh: 26146.5, mt: 4531 },
  { year: 1996, twh: 26502.8, mt: 4592 },
  { year: 1997, twh: 26894.8, mt: 4660 },
  { year: 1998, twh: 26412.4, mt: 4577 },
  { year: 1999, twh: 26421.3, mt: 4578 },
  { year: 2000, twh: 26812.1, mt: 4646 },
  { year: 2001, twh: 27948.3, mt: 4843 },
  { year: 2002, twh: 28287.1, mt: 4902 },
  { year: 2003, twh: 30361.1, mt: 5261 },
  { year: 2004, twh: 32984.9, mt: 5716 },
  { year: 2005, twh: 35064.5, mt: 6076 },
  { year: 2006, twh: 36829.4, mt: 6382 },
  { year: 2007, twh: 38453.0, mt: 6663 },
  { year: 2008, twh: 39718.6, mt: 6883 },
  { year: 2009, twh: 39704.3, mt: 6880 },
  { year: 2010, twh: 41832.5, mt: 7249 },
  { year: 2011, twh: 44787.5, mt: 7761 },
  { year: 2012, twh: 45246.1, mt: 7841 },
  { year: 2013, twh: 45969.6, mt: 7966 },
  { year: 2014, twh: 45840.1, mt: 7944 },
  { year: 2015, twh: 44567.7, mt: 7723 },
  { year: 2016, twh: 42191.6, mt: 7311 },
  { year: 2017, twh: 43193.3, mt: 7485 },
  { year: 2018, twh: 45151.0, mt: 7824 },
  { year: 2019, twh: 45802.6, mt: 7937 },
  { year: 2020, twh: 43486.1, mt: 7536 },
  { year: 2021, twh: 45359.5, mt: 7860 },
  { year: 2022, twh: 48548.5, mt: 8413 },
  { year: 2023, twh: 50074.3, mt: 8678 },
  { year: 2024, twh: 50618.3, mt: 8773 },
];

// Pre-computed stats
export const coalStats = {
  current: coalProductionData[coalProductionData.length - 1],
  since1950: (() => {
    const first = coalProductionData[0].twh;
    const last = coalProductionData[coalProductionData.length - 1].twh;
    return ((last - first) / first * 100).toFixed(0);
  })(),
  since2000: (() => {
    const y2000 = coalProductionData.find(d => d.year === 2000)!.twh;
    const last = coalProductionData[coalProductionData.length - 1].twh;
    return ((last - y2000) / y2000 * 100).toFixed(1);
  })(),
};
