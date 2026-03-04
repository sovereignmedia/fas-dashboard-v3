import { NextResponse } from 'next/server';

const PEER_SYMBOLS = ['GEV', 'CEG', 'NEE', 'ETN', 'VRT', 'VST', 'CCJ', 'BE', 'NRG', 'OKLO', 'SMR'];

interface QuoteResult {
  symbol: string;
  price: number;
  changePct: number;
  marketCap: number;
  pe: number;
  yearLow: number;
  yearHigh: number;
}

async function fetchYahooQuotes(symbols: string[]): Promise<QuoteResult[]> {
  const joined = symbols.join(',');
  const url = `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${joined}`;
  const res = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0' },
    next: { revalidate: 300 },
  });
  if (!res.ok) throw new Error(`Yahoo Finance returned ${res.status}`);
  const data = await res.json();
  const results = data?.quoteResponse?.result;
  if (!Array.isArray(results)) throw new Error('Unexpected Yahoo Finance response format');
  return results.map((q: Record<string, unknown>) => ({
    symbol: String(q.symbol ?? ''),
    price: Number(q.regularMarketPrice ?? 0),
    changePct: Number(q.regularMarketChangePercent ?? 0),
    marketCap: Number(q.marketCap ?? 0),
    pe: Number(q.trailingPE ?? -1),
    yearLow: Number(q.fiftyTwoWeekLow ?? 0),
    yearHigh: Number(q.fiftyTwoWeekHigh ?? 0),
  }));
}

async function fetchFMPQuotes(symbols: string[]): Promise<QuoteResult[]> {
  const joined = symbols.join(',');
  const url = `https://financialmodelingprep.com/api/v3/quote/${joined}?apikey=demo`;
  const res = await fetch(url, { next: { revalidate: 300 } });
  if (!res.ok) throw new Error(`FMP returned ${res.status}`);
  const data = await res.json();
  if (!Array.isArray(data)) throw new Error('Unexpected FMP response format');
  return data.map((q: Record<string, unknown>) => ({
    symbol: String(q.symbol ?? ''),
    price: Number(q.price ?? 0),
    changePct: Number(q.changesPercentage ?? 0),
    marketCap: Number(q.marketCap ?? 0),
    pe: Number(q.pe ?? -1),
    yearLow: Number(q.yearLow ?? 0),
    yearHigh: Number(q.yearHigh ?? 0),
  }));
}

export async function GET() {
  try {
    let quotes: QuoteResult[];
    try {
      quotes = await fetchYahooQuotes(PEER_SYMBOLS);
    } catch {
      quotes = await fetchFMPQuotes(PEER_SYMBOLS);
    }
    return NextResponse.json({ quotes, timestamp: new Date().toISOString(), source: 'live' });
  } catch (error) {
    return NextResponse.json(
      { quotes: [], timestamp: new Date().toISOString(), source: 'error', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 200 }
    );
  }
}
