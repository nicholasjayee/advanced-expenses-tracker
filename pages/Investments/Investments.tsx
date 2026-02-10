import React from 'react';
import { Card } from '../../components/ui/Card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';
import { Briefcase, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import { Asset, AssetClass } from '../../types';

const assets: Asset[] = [
  { id: '1', name: 'Apple Inc.', value: 24500, type: AssetClass.EQUITY, change24h: 1.2 },
  { id: '2', name: 'Bitcoin', value: 12300, type: AssetClass.CRYPTO, change24h: -2.4 },
  { id: '3', name: 'Vanguard S&P 500', value: 45000, type: AssetClass.EQUITY, change24h: 0.5 },
  { id: '4', name: 'Rental Property A', value: 150000, type: AssetClass.REAL_ESTATE, change24h: 0.0 },
  { id: '5', name: 'Emergency Fund', value: 15000, type: AssetClass.CASH, change24h: 0.0 },
];

const allocationData = [
  { name: 'Equity', value: 69500 },
  { name: 'Crypto', value: 12300 },
  { name: 'Real Estate', value: 150000 },
  { name: 'Cash', value: 15000 },
];

const COLORS = ['#3b82f6', '#f59e0b', '#10b981', '#6366f1'];

const Investments: React.FC = () => {
  const totalValue = assets.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <div className="space-y-6">
       <div className="flex justify-between items-center gsap-fade-in">
        <h2 className="text-3xl font-bold text-white">Investments</h2>
        <button className="bg-surface hover:bg-white/5 text-white border border-border px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
          <Briefcase size={16} /> Manage Portfolio
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 gsap-fade-in">
        <Card className="col-span-2" title="Asset Allocation">
          <div className="flex flex-col md:flex-row items-center justify-between h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={allocationData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {allocationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip 
                   contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px' }}
                   itemStyle={{ color: '#f4f4f5' }}
                   formatter={(value: number) => `$${value.toLocaleString()}`}
                />
                <Legend verticalAlign="middle" align="right" layout="vertical" />
              </PieChart>
            </ResponsiveContainer>
            <div className="md:w-1/3 space-y-4 p-4 border-l border-border">
              <div>
                <p className="text-sm text-muted">Total Portfolio Value</p>
                <h3 className="text-3xl font-bold text-white">${totalValue.toLocaleString()}</h3>
              </div>
              <div>
                 <p className="text-sm text-muted">24h Change</p>
                 <p className="text-secondary font-medium flex items-center gap-1">
                   <TrendingUp size={16} /> +$1,240 (0.5%)
                 </p>
              </div>
            </div>
          </div>
        </Card>

        <div className="space-y-6">
           <Card title="Top Performers">
              <div className="space-y-4">
                 {assets.slice(0, 3).map((asset) => (
                    <div key={asset.id} className="flex items-center justify-between">
                       <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold
                             ${asset.type === AssetClass.CRYPTO ? 'bg-orange-500/20 text-orange-500' : 
                               asset.type === AssetClass.EQUITY ? 'bg-blue-500/20 text-blue-500' : 'bg-green-500/20 text-green-500'
                             }`}>
                             {asset.name[0]}
                          </div>
                          <div>
                             <p className="text-sm font-medium text-white">{asset.name}</p>
                             <p className="text-xs text-muted">{asset.type}</p>
                          </div>
                       </div>
                       <div className="text-right">
                          <p className="text-sm font-medium text-white">${asset.value.toLocaleString()}</p>
                          <p className={`text-xs flex items-center justify-end gap-0.5 ${asset.change24h >= 0 ? 'text-secondary' : 'text-danger'}`}>
                             {asset.change24h >= 0 ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                             {Math.abs(asset.change24h)}%
                          </p>
                       </div>
                    </div>
                 ))}
              </div>
              <button className="w-full mt-6 text-sm text-primary hover:text-blue-400 transition-colors">
                View All Assets
              </button>
           </Card>
        </div>
      </div>
    </div>
  );
};

export default Investments;