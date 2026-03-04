'use client';

import { useState, useEffect, useCallback } from 'react';
import { peerQuotes, type PeerQuote } from '@/data/market-context';

interface LiveQuoteData {
  symbol: string;
  price: number;
  changePct: number;
  marketCap: number;
  pe: number;
  yearLow: number;
  yearHigh: number;
}

interface QuoteAPIResponse {
  quotes: LiveQuoteData[];
  timestamp: string;
  source: 'live' | 'error';
  error?: string;
}

export interface EnrichedPeerQuote extends PeerQuote {
  isLive: boolean;
}

interface UseMarketQuotesReturn {
  quotes: EnrichedPeerQuote[];
  lastUpdated: string | null;
  isLive: boolean;
  isLoading: boolean;
  refresh: () => void;
}

export function useMarketQuotes(): UseMarketQuotesReturn {
  const [liveData, setLiveData] = useState<LiveQuoteData[] | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [isLive, setIsLive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchQuotes = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/quotes', { cache: 'no-store' });
      const data: QuoteAPIResponse = await res.json();
      if (data.source === 'live' && data.quotes.length > 0) {
        setLiveData(data.quotes);
        setLastUpdated(data.timestamp);
        setIsLive(true);
      } else {
        setIsLive(false);
        setLastUpdated(null);
      }
    } catch {
      setIsLive(false);
      setLastUpdated(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchQuotes();
    const interval = setInterval(fetchQuotes, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [fetchQuotes]);

  const quotes: EnrichedPeerQuote[] = peerQuotes.map((peer) => {
    if (!liveData) return { ...peer, isLive: false };
    const live = liveData.find((q) => q.symbol === peer.symbol);
    if (!live || live.price === 0) return { ...peer, isLive: false };
    return {
      ...peer,
      price: live.price,
      changePct: live.changePct,
      marketCap: live.marketCap > 0 ? live.marketCap : peer.marketCap,
      pe: live.pe !== -1 ? live.pe : peer.pe,
      yearLow: live.yearLow > 0 ? live.yearLow : peer.yearLow,
      yearHigh: live.yearHigh > 0 ? live.yearHigh : peer.yearHigh,
      isLive: true,
    };
  });

  return { quotes, lastUpdated, isLive, isLoading, refresh: fetchQuotes };
}
