
import React from 'react';
import { OptionData, PortfolioPosition, MarketAlert } from './types';

export const COLORS = {
  up: '#10b981', // emerald-500
  down: '#ef4444', // red-500
  neutral: '#94a3b8', // slate-400
  accent: '#3b82f6', // blue-500
  bg: '#020617', // slate-950
  card: '#0f172a', // slate-900
};

export const generateMockChain = (spot: number): OptionData[] => {
  const strikes = Array.from({ length: 11 }, (_, i) => Math.floor(spot * 0.9 + i * (spot * 0.02)));
  const data: OptionData[] = [];
  
  strikes.forEach(strike => {
    ['call', 'put'].forEach(type => {
      const isCall = type === 'call';
      const itm = isCall ? spot > strike : spot < strike;
      data.push({
        strike,
        type: type as 'call' | 'put',
        bid: itm ? 12.5 : 2.1,
        ask: itm ? 13.0 : 2.4,
        last: itm ? 12.8 : 2.2,
        iv: 25 + Math.random() * 5,
        delta: isCall ? (itm ? 0.75 : 0.35) : (itm ? -0.75 : -0.35),
        gamma: 0.05,
        theta: -0.12,
        vega: 0.45,
        volume: Math.floor(Math.random() * 5000),
        openInterest: Math.floor(Math.random() * 20000),
      });
    });
  });
  return data;
};

export const MOCK_POSITIONS: PortfolioPosition[] = [
  { symbol: 'SPY', strike: 510, type: 'call', qty: 10, avgPrice: 4.5, marketPrice: 5.2, pnl: 700, pnlPct: 15.5, delta: 540, gamma: 12, theta: -85, vega: 120 },
  { symbol: 'NVDA', strike: 850, type: 'put', qty: -5, avgPrice: 12.0, marketPrice: 10.5, pnl: 750, pnlPct: 12.5, delta: 210, gamma: -5, theta: 45, vega: -80 },
];

export const MOCK_ALERTS: MarketAlert[] = [
  { id: '1', time: '14:22:10', symbol: 'TSLA', type: 'UNUSUAL_VOLUME', message: '10k contracts 220C 05/24 traded above ask', severity: 'high' },
  { id: '2', time: '14:20:05', symbol: 'AAPL', type: 'SWEEP', message: 'Aggressive sweep on 190P 06/21', severity: 'medium' },
  { id: '3', time: '14:18:44', symbol: 'AMD', type: 'VOL_SPIKE', message: 'IV spike detected in near-dated tenors', severity: 'low' },
];
