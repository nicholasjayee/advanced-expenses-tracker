import React from 'react';

interface ExpenseHeaderProps {
    viewMode: 'list' | 'chart';
    setViewMode: (mode: 'list' | 'chart') => void;
}

export const ExpenseHeader: React.FC<ExpenseHeaderProps> = ({ viewMode, setViewMode }) => {
  return (
    <div className="flex justify-between items-center gsap-fade-in">
      <h2 className="text-3xl font-bold text-text">Expenses</h2>
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