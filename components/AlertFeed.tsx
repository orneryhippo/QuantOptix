
import React from 'react';
import { MOCK_ALERTS } from '../constants';

const AlertFeed: React.FC = () => {
  return (
    <div className="flex flex-col h-full bg-slate-900 border border-slate-800 rounded-lg overflow-hidden">
      <div className="bg-slate-800/50 p-3 border-b border-slate-700 flex justify-between items-center">
        <h3 className="font-bold text-sm uppercase tracking-wider text-slate-400">Order Flow Alerts</h3>
        <span className="animate-pulse w-2 h-2 rounded-full bg-emerald-500"></span>
      </div>
      <div className="overflow-y-auto flex-1 p-3 space-y-3">
        {MOCK_ALERTS.map(alert => (
          <div key={alert.id} className="bg-slate-950 p-3 rounded border-l-2 border-slate-800 hover:border-blue-500 transition-all cursor-pointer">
            <div className="flex justify-between items-start mb-1">
              <span className="text-xs font-bold text-blue-400">{alert.symbol}</span>
              <span className="text-[10px] text-slate-600 font-mono">{alert.time}</span>
            </div>
            <div className={`text-[10px] font-bold uppercase mb-1 ${
              alert.severity === 'high' ? 'text-red-500' : 
              alert.severity === 'medium' ? 'text-orange-400' : 'text-slate-400'
            }`}>
              {alert.type.replace('_', ' ')}
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">{alert.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlertFeed;
