import React, { useMemo } from 'react';
import { Card } from '../../../components/ui/Card.tsx';
import { Expense } from '../types/index.ts';
import { calculateCategoryStats } from '../core/expenseStatistics.ts';

interface ExpenseCategoriesProps {
  expenses: Expense[];
}

export const ExpenseCategories: React.FC<ExpenseCategoriesProps> = ({ expenses }) => {
  // Use core logic to calculate stats
  const categoryStats = useMemo(() => calculateCategoryStats(expenses), [expenses]);

  const COLORS = ['bg-primary', 'bg-secondary', 'bg-accent', 'bg-indigo-500', 'bg-pink-500', 'bg-cyan-500'];

  return (
    <div className="gsap-fade-in">
      <Card title="Spending by Category">
        <div className="space-y-5">
          {categoryStats.map((cat, index) => (
            <div key={cat.name} className="group">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted group-hover:text-white transition-colors">{cat.name}</span>
                <span className="text-white font-medium">${cat.value.toFixed(2)}</span>
              </div>
              <div className="h-2 w-full bg-background border border-border rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${COLORS[index % COLORS.length]}`}
                  style={{ width: `${cat.percentage}%` }}
                />
              </div>
              <div className="text-right mt-1">
                <span className="text-[10px] text-muted">{cat.percentage.toFixed(1)}%</span>
              </div>
            </div>
          ))}
          {categoryStats.length === 0 && (
            <div className="text-center py-4">
              <p className="text-sm text-muted">No categories data available.</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};
