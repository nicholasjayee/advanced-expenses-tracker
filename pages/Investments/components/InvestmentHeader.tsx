import React from 'react';
import { Card } from '../../../components/ui/Card.tsx';
import { TrendingUp, TrendingDown, DollarSign, PieChart, Layers } from 'lucide-react';

interface InvestmentHeaderProps {
  performance: {
    totalInvested: number;
    currentValue: number;
    unrealizedPL: number;
    unrealizedPLPercentage: number;
  };
}

export const InvestmentHeader: React.FC<InvestmentHeaderProps> = ({ performance }) => {
  const { totalInvested, currentValue, unrealizedPL, unrealizedPLPercentage } = performance;
  const isPositive = unrealizedPL >= 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 gsap-fade-in">
      <Card className="relative overflow-hidden">
        <div className="relative z-10">
          <p className="text-sm text-muted mb-1 flex items-center gap-2">
            <Layers size={14} /> Total Invested Cost
          </p>
          <h2 className="text-3xl font-bold text-white">${totalInvested.toLocaleString()}</h2>
          <p className="text-xs text-muted mt-2">
            Capital Deployed
          </p>
        </div>
        <div className="absolute right-[-20px] top-[-20px] opacity-5">
           <Layers size={120} />
        </div>
      </Card>

      <Card className="relative overflow-hidden">
        <div className="relative z-10">
          <p className="text-sm text-muted mb-1 flex items-center gap-2">
            <DollarSign size={14} /> Current Market Value
          </p>
          <h2 className="text-3xl font-bold text-white">${currentValue.toLocaleString()}</h2>
          <p className="text-xs text-muted mt-2">
             All Assets Converted to USD
          </p>
        </div>
        <div className="absolute right-[-20px] top-[-20px] opacity-5">
           <DollarSign size={120} />
        </div>
      </Card>

      <Card className="relative overflow-hidden">
        <div className="relative z-10">
          <p className="text-sm text-muted mb-1 flex items-center gap-2">
             <TrendingUp size={14} /> Unrealized P&L
          </p>
          <h2 className={`text-3xl font-bold ${isPositive ? 'text-secondary' : 'text-danger'}`}>
            {isPositive ? '+' : ''}${unrealizedPL.toLocaleString()}
          </h2>
          <p className={`text-xs mt-2 flex items-center gap-1 ${isPositive ? 'text-secondary' : 'text-danger'}`}>
            {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            {unrealizedPLPercentage.toFixed(2)}% All time
          </p>
        </div>
        <div className="absolute right-[-20px] top-[-20px] opacity-5">
           <PieChart size={120} />
        </div>
      </Card>
    </div>
  );
};
