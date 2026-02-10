import React from 'react';
import { TrendingUp } from 'lucide-react';

export const IncomeHeader: React.FC = () => {
  return (
    <div className="flex justify-between items-center gsap-fade-in">
      <div className="flex items-center gap-3">
        <h2 className="text-3xl font-bold text-text">Income</h2>
        <span className="px-3 py-1 bg-secondary/10 text-secondary border border-secondary/20 rounded-full text-xs font-medium flex items-center gap-1">
             <TrendingUp size={12} /> Cash Flow Positive
        </span>
      </div>
      <div className="bg-surface border border-border rounded-lg p-1 text-xs font-medium text-muted">
        <span className="px-2 py-1 bg-primary/10 text-primary rounded cursor-default">List View</span>
        <span className="px-2 py-1 hover:text-text cursor-pointer transition-colors">Chart View</span>
      </div>
    </div>
  );
};