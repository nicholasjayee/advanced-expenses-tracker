import React from 'react';
import { Investment, ASSET_CLASS_LABELS } from '../types/index.ts';
import { AssetClass } from '../../../types.ts';
import { TrendingUp, TrendingDown, MoreHorizontal, Shield, Wallet } from 'lucide-react';
import { getCurrencySymbol } from '../../../data/currencies.ts';

interface AssetListProps {
  assets: Investment[];
}

export const AssetList: React.FC<AssetListProps> = ({ assets }) => {
  return (
    <div className="bg-surface border border-border rounded-xl overflow-hidden gsap-fade-in">
      <div className="p-6 border-b border-border flex justify-between items-center">
        <h3 className="text-lg font-semibold text-text">Portfolio Holdings</h3>
        <span className="text-xs text-muted">Real-time data simulated</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-background/50 text-xs uppercase text-muted font-medium">
            <tr>
              <th className="px-6 py-4">Asset</th>
              <th className="px-6 py-4">Type</th>
              <th className="px-6 py-4 text-right">Qty</th>
              <th className="px-6 py-4 text-right">Cost Basis</th>
              <th className="px-6 py-4 text-right">Current Val</th>
              <th className="px-6 py-4 text-right">P&L</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {assets.map((asset) => {
              const symbol = getCurrencySymbol(asset.currency);
              const pl = asset.value - asset.costBasis;
              const isProfit = pl >= 0;
              const plPercent = asset.costBasis > 0 ? (pl / asset.costBasis) * 100 : 0;
              
              const AssetIcon = asset.type === AssetClass.INSURANCE ? Shield : Wallet;

              return (
                <tr key={asset.id} className="hover:bg-muted/5 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold
                         ${asset.type === AssetClass.CRYPTO ? 'bg-orange-500/20 text-orange-500' : 
                           asset.type === AssetClass.EQUITY ? 'bg-blue-500/20 text-blue-500' : 
                           asset.type === AssetClass.INSURANCE ? 'bg-pink-500/20 text-pink-500' :
                           asset.type === AssetClass.REAL_ESTATE ? 'bg-emerald-500/20 text-emerald-500' :
                           'bg-indigo-500/20 text-indigo-500'
                         }`}>
                         {asset.type === AssetClass.EQUITY || asset.type === AssetClass.CRYPTO ? asset.name[0] : <AssetIcon size={14}/>}
                      </div>
                      <div>
                         <span className="font-medium text-text block">{asset.name}</span>
                         <span className="text-[10px] text-muted">{asset.purchaseDate}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs text-muted">
                    {ASSET_CLASS_LABELS[asset.type] || asset.type}
                  </td>
                  <td className="px-6 py-4 text-right text-sm text-muted">
                    {asset.quantity.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-right text-sm text-muted">
                    {symbol}{asset.costBasis.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-right text-text font-medium">
                    {symbol}{asset.value.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className={`flex flex-col items-end ${isProfit ? 'text-secondary' : 'text-danger'}`}>
                       <div className="flex items-center gap-1 text-sm font-medium">
                          {isProfit ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                          <span>{symbol}{Math.abs(pl).toLocaleString()}</span>
                       </div>
                       <span className="text-[10px] opacity-80">{plPercent.toFixed(2)}%</span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};