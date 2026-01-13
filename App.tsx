
import React, { useState, useEffect } from 'react';
import OptionChain from './components/OptionChain';
import RiskMetrics from './components/RiskMetrics';
import IVSurface from './components/IVSurface';
import MarketSentiment from './components/MarketSentiment';
import AlertFeed from './components/AlertFeed';
import { generateMockChain, MOCK_POSITIONS } from './constants';
import { OptionData } from './types';

const App: React.FC = () => {
  const [ticker, setTicker] = useState('SPY');
  const [spot, setSpot] = useState(512.45);
  const [chainData, setChainData] = useState<OptionData[]>(generateMockChain(512.45));

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSpot(prev => prev + (Math.random() - 0.5) * 0.2);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setChainData(generateMockChain(spot));
  }, [spot]);

  return (
    <div className="h-screen w-screen flex flex-col p-4 bg-slate-950 gap-4 overflow-hidden">
      {/* Top Header Bar */}
      <header className="flex justify-between items-center bg-slate-900 border border-slate-800 p-3 rounded-lg shadow-xl">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center font-black text-xl italic">Q</div>
            <h1 className="text-lg font-black tracking-tighter uppercase text-white">QuantOptix <span className="text-blue-500">Pro</span></h1>
          </div>
          <div className="h-6 w-px bg-slate-700"></div>
          <div className="flex flex-col">
            <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Selected Underlying</div>
            <div className="flex items-center gap-3">
              <span className="text-xl font-mono font-bold text-white">{ticker}</span>
              <span className="text-xl font-mono text-emerald-500 font-bold">${spot.toFixed(2)}</span>
              <span className="text-xs text-emerald-400 bg-emerald-400/10 px-1 rounded">+0.42%</span>
            </div>
          </div>
        </div>
        
        <div className="flex gap-4 items-center">
          <div className="flex bg-slate-950 border border-slate-800 rounded p-1">
            <button className="px-3 py-1 bg-slate-800 rounded text-xs font-bold text-white">Dashboard</button>
            <button className="px-3 py-1 hover:bg-slate-800 rounded text-xs font-bold text-slate-500 transition-colors">Analyzer</button>
            <button className="px-3 py-1 hover:bg-slate-800 rounded text-xs font-bold text-slate-500 transition-colors">Backtest</button>
          </div>
          <div className="h-6 w-px bg-slate-700"></div>
          <div className="flex flex-col text-right">
            <div className="text-[10px] text-slate-500 uppercase font-bold">Market Status</div>
            <div className="text-xs text-emerald-500 font-bold flex items-center gap-1 justify-end">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span> OPEN
            </div>
          </div>
        </div>
      </header>

      {/* Main Grid Layout */}
      <main className="flex-1 grid grid-cols-12 grid-rows-6 gap-4 min-h-0">
        
        {/* Row 1-4, Left 8: Options Chain */}
        <div className="col-span-12 lg:col-span-8 row-span-4 min-h-0">
          <OptionChain data={chainData} />
        </div>

        {/* Row 1-2, Right 4: Market Sentiment */}
        <div className="col-span-12 lg:col-span-4 row-span-2 min-h-0">
          <MarketSentiment />
        </div>

        {/* Row 3-4, Right 4: Alert Feed */}
        <div className="col-span-12 lg:col-span-4 row-span-2 min-h-0">
          <AlertFeed />
        </div>

        {/* Row 5-6, Left 4: IV Surface */}
        <div className="col-span-12 lg:col-span-4 row-span-2 min-h-0">
          <IVSurface />
        </div>

        {/* Row 5-6, Right 8: Portfolio Risk */}
        <div className="col-span-12 lg:col-span-8 row-span-2 min-h-0">
          <RiskMetrics positions={MOCK_POSITIONS} />
        </div>

      </main>

      {/* Persistent Bottom StatusBar */}
      <footer className="h-8 flex items-center justify-between px-4 bg-slate-900 border border-slate-800 rounded-md text-[10px] text-slate-500 font-mono">
        <div className="flex gap-4">
          <span>LATENCY: 12ms</span>
          <span>API: CONNECTED</span>
          <span>DATA SRC: REALTIME_BBO</span>
        </div>
        <div className="flex gap-4">
          <span className="text-slate-400">TODAY P&L: <span className="text-emerald-500 font-bold">+$1,450.22</span></span>
          <span className="text-slate-400">BUYING POWER: <span className="text-white">$142,500.00</span></span>
        </div>
      </footer>
    </div>
  );
};

export default App;
