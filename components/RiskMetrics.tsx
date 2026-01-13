
import React from 'react';
import { PortfolioPosition } from '../types';
import { COLORS } from '../constants';

interface Props {
  positions: PortfolioPosition[];
}

const RiskMetrics: React.FC<Props> = ({ positions }) => {
  const totalDelta = positions.reduce((acc, p) => acc + p.delta, 0);
  const totalGamma = positions.reduce((acc, p) => acc + p.gamma, 0);
  const totalTheta = positions.reduce((acc, p) => acc + p.theta, 0);
  const totalVega = positions.reduce((acc, p) => acc + p.vega, 0);
  const totalPnl = positions.reduce((acc, p) => acc + p.pnl, 0);

  return (
    <div className="flex flex-col h-full bg-slate-900 border border-slate-800 rounded-lg p-4">
      <h3 className="font-bold text-sm uppercase tracking-wider text-slate-400 mb-4">Portfolio Risk</h3>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Net Delta', value: totalDelta, color: totalDelta >= 0 ? 'text-emerald-500' : 'text-red-500' },
          { label: 'Net Gamma', value: totalGamma, color: 'text-blue-400' },
          { label: 'Daily Theta', value: totalTheta, color: totalTheta >= 0 ? 'text-emerald-500' : 'text-red-500' },
          { label: 'Total Vega', value: totalVega, color: 'text-purple-400' },
        ].map(m => (
          <div key={m.label} className="bg-slate-950 p-3 rounded border border-slate-800">
            <div className="text-[10px] text-slate-500 uppercase">{m.label}</div>
            <div className={`text-lg font-mono font-bold ${m.color}`}>{m.value.toLocaleString()}</div>
          </div>
        ))}
      </div>

      <div className="flex-1 overflow-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="text-slate-500 text-left border-b border-slate-800">
              <th className="pb-2">Symbol</th>
              <th className="pb-2">Pos</th>
              <th className="pb-2 text-right">P&L</th>
              <th className="pb-2 text-right">Delta</th>
              <th className="pb-2 text-right">Theta</th>
            </tr>
          </thead>
          <tbody>
            {positions.map((p, i) => (
              <tr key={i} className="border-b border-slate-800/50 hover:bg-slate-800/20">
                <td className="py-2 font-bold">{p.symbol} {p.strike}{p.type[0].toUpperCase()}</td>
                <td className="py-2">{p.qty}</td>
                <td className={`py-2 text-right font-mono ${p.pnl >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                  ${p.pnl.toLocaleString()}
                </td>
                <td className="py-2 text-right text-slate-400 font-mono">{p.delta.toFixed(0)}</td>
                <td className="py-2 text-right text-slate-400 font-mono">{p.theta.toFixed(0)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RiskMetrics;
