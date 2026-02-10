import React from 'react';
import { Card } from '../../../components/ui/Card.tsx';
import { Zap, TrendingUp, TrendingDown, DollarSign, Activity, Battery } from 'lucide-react';

interface StatsProps {
  stats: {
    totalKwh: number;
    totalCost: number;
    avgCostPerKwh: number;
    trend: string;
    avgUnitsRemaining: number;
  };
}

export const ElectricityStats: React.FC<StatsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 gsap-fade-in">
      <Card className="bg-surface/50">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-accent/10 rounded-lg text-accent">
            <Zap size={20} />
          </div>
          <span className="text-sm text-muted">Total Usage</span>
        </div>
        <h3 className="text-2xl font-bold text-text">{stats.totalKwh.toLocaleString()} <span className="text-sm font-normal text-muted">kWh</span></h3>
      </Card>

      <Card className="bg-surface/50">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-green-500/10 rounded-lg text-green-500">
            <DollarSign size={20} />
          </div>
          <span className="text-sm text-muted">Total Cost</span>
        </div>
        <h3 className="text-2xl font-bold text-text">${stats.totalCost.toLocaleString()}</h3>
      </Card>

      <Card className="bg-surface/50">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500">
            <Battery size={20} />
          </div>
          <span className="text-sm text-muted">Avg Buffer</span>
        </div>
        <h3 className="text-2xl font-bold text-text">{stats.avgUnitsRemaining.toFixed(1)} <span className="text-sm font-normal text-muted">Units left</span></h3>
      </Card>

      <Card className="bg-surface/50">
        <div className="flex items-center gap-3 mb-2">
           {stats.trend === 'Rising' ? (
             <div className="p-2 bg-red-500/10 rounded-lg text-red-500"><TrendingUp size={20} /></div>
           ) : stats.trend === 'Falling' ? (
             <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500"><TrendingDown size={20} /></div>
           ) : (
             <div className="p-2 bg-gray-500/10 rounded-lg text-gray-500"><Activity size={20} /></div>
           )}
          <span className="text-sm text-muted">Usage Trend</span>
        </div>
        <h3 className="text-2xl font-bold text-text">{stats.trend}</h3>
      </Card>
    </div>
  );
};