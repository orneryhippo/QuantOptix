
export interface OptionData {
  strike: number;
  type: 'call' | 'put';
  bid: number;
  ask: number;
  last: number;
  iv: number;
  delta: number;
  gamma: number;
  theta: number;
  vega: number;
  volume: number;
  openInterest: number;
}

export interface PortfolioPosition {
  symbol: string;
  strike: number;
  type: 'call' | 'put';
  qty: number;
  avgPrice: number;
  marketPrice: number;
  pnl: number;
  pnlPct: number;
  delta: number;
  gamma: number;
  theta: number;
  vega: number;
}

export interface MarketAlert {
  id: string;
  time: string;
  symbol: string;
  type: 'UNUSUAL_VOLUME' | 'SWEEP' | 'VOL_SPIKE';
  message: string;
  severity: 'low' | 'medium' | 'high';
}

export interface SentimentData {
  vix: number;
  vixChange: number;
  putCallRatio: number;
  marketTrend: 'bullish' | 'bearish' | 'neutral';
}
