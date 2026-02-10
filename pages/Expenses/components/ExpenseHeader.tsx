import React from 'react';

export const ExpenseHeader: React.FC = () => {
  return (
    <div className="flex justify-between items-center gsap-fade-in">
      <h2 className="text-3xl font-bold text-white">Expenses</h2>
      <div className="bg-surface border border-border rounded-lg p-1 text-xs font-medium text-muted">
        <span className="px-2 py-1 bg-primary/10 text-primary rounded cursor-default">List View</span>
        <span className="px-2 py-1 hover:text-white cursor-pointer transition-colors">Chart View</span>
      </div>
    </div>
  );
};