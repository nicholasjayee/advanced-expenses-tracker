import React from 'react';
import { TrendingUp } from 'lucide-react';

interface IncomeHeaderProps {
  viewMode: 'list' | 'chart';
  setViewMode: (mode: 'list' | 'chart') => void;
}

export const IncomeHeader: React.FC<IncomeHeaderProps> = ({ viewMode, setViewMode }) => {
  return (
    <div className="flex justify-between items-center gsap-fade-in">
      <div className="flex items-center gap-3">
        <h2 className="text-3xl font-bold text-text">Income</h2>
        <span className="px-3 py-1 bg-secondary/10 text-secondary border border-secondary/20 rounded-full text-xs font-medium flex items-center gap-1">
             <TrendingUp size={12} /> Cash Flow Positive
        </span>
      </div>
      <div className="bg-surface border border-border rounded-lg p-1 text-xs font-medium text-muted flex">
        <button 
            onClick={() => setViewMode('list')}
            className={`px-3 py-1.5 rounded transition-all ${viewMode === 'list' ? 'bg-primary/10 text-primary shadow-sm' : 'hover:text-text'}`}
        >
            List View
        </button>
        <button 
            onClick={() => setViewMode('chart')}
            className={`px-3 py-1.5 rounded transition-all ${viewMode === 'chart' ? 'bg-primary/10 text-primary shadow-sm' : 'hover:text-text'}`}
        >
            Chart View
        </button>
      </div>
    </div>
  );
};