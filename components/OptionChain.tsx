
import React from 'react';
import { OptionData } from '../types';
import { COLORS } from '../constants';

interface Props {
  data: OptionData[];
}

const OptionChain: React.FC<Props> = ({ data }) => {
  // Fix: Explicitly cast to number to avoid "left-hand side of an arithmetic operation" error
  const strikes = Array.from(new Set(data.map(d => d.strike))).sort((a, b) => Number(a) - Number(b));

  return (
    <div className="flex flex-col h-full bg-slate-900 border border-slate-800 rounded-lg overflow-hidden">
      <div className="bg-slate-800/50 p-3 flex justify-between items-center border-b border-slate-700">
        <h3 className="font-bold text-sm uppercase tracking-wider text-slate-400">Options Chain</h3>
        <div className="flex gap-4 text-xs">
          <span className="text-emerald-400">Calls</span>
          <span className="text-slate-500">Strikes</span>
          <span className="text-red-400">Puts</span>
        </div>
      </div>
      <div className="overflow-y-auto flex-1 text-[11px]">
        <table className="w-full border-collapse">
          <thead className="sticky top-0 bg-slate-900 shadow-md">
            <tr className="text-slate-500 uppercase">
              <th className="p-2 text-left">Delta</th>
              <th className="p-2 text-right">IV</th>
              <th className="p-2 text-right">Bid/Ask</th>
              <th className="p-2 text-center bg-slate-800/30">Strike</th>
              <th className="p-2 text-left">Bid/Ask</th>
              <th className="p-2 text-left">IV</th>
              <th className="p-2 text-right">Delta</th>
            </tr>
          </thead>
          <tbody>
            {strikes.map(strike => {
              const call = data.find(d => d.strike === strike && d.type === 'call')!;
              const put = data.find(d => d.strike === strike && d.type === 'put')!;
              return (
                <tr key={strike} className="border-b border-slate-800 hover:bg-slate-800/40 transition-colors">
                  <td className="p-2 text-emerald-500">{call.delta.toFixed(2)}</td>
                  <td className="p-2 text-right text-slate-300">{(call.iv).toFixed(1)}%</td>
                  <td className="p-2 text-right">{call.bid}/{call.ask}</td>
                  <td className="p-2 text-center bg-slate-800/30 font-bold text-white">{strike}</td>
                  <td className="p-2 text-left">{put.bid}/{put.ask}</td>
                  <td className="p-2 text-left text-slate-300">{(put.iv).toFixed(1)}%</td>
                  <td className="p-2 text-right text-red-500">{put.delta.toFixed(2)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OptionChain;
