
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
  { time: '09:30', vix: 14.5 },
  { time: '10:30', vix: 14.2 },
  { time: '11:30', vix: 14.8 },
  { time: '12:30', vix: 15.1 },
  { time: '13:30', vix: 14.9 },
  { time: '14:30', vix: 14.7 },
];

const MarketSentiment: React.FC = () => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 h-full flex flex-col">
      <h3 className="font-bold text-sm uppercase tracking-wider text-slate-400 mb-4">Market Sentiment</h3>
      
      <div className="flex justify-between items-center mb-6">
        <div>
          <div className="text-[10px] text-slate-500 uppercase">VIX Index</div>
          <div className="text-2xl font-bold text-white">14.72 <span className="text-sm text-red-500 font-normal">-1.2%</span></div>
        </div>
        <div className="text-right">
          <div className="text-[10px] text-slate-500 uppercase">P/C Ratio</div>
          <div className="text-2xl font-bold text-emerald-500">0.84</div>
        </div>
      </div>

      <div className="flex-1 min-h-[100px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="vixColor" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="time" hide />
            <YAxis domain={['dataMin - 1', 'dataMax + 1']} hide />
            <Tooltip 
              contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b' }}
              itemStyle={{ color: '#f8fafc' }}
            />
            <Area type="monotone" dataKey="vix" stroke="#ef4444" fillOpacity={1} fill="url(#vixColor)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 flex gap-2">
         <span className="px-2 py-1 rounded bg-emerald-500/10 text-emerald-500 text-[10px] font-bold">BULLISH BIAS</span>
         <span className="px-2 py-1 rounded bg-slate-800 text-slate-400 text-[10px] font-bold">LOW VOLATILITY</span>
      </div>
    </div>
  );
};

export default MarketSentiment;
