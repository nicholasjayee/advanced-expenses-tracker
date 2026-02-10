import React from 'react';
import { Expense, ExpenseCategory } from '../types/index.ts';
import { Tag, Calendar, Zap } from 'lucide-react';

interface ExpenseListProps {
  expenses: Expense[];
}

export const ExpenseList: React.FC<ExpenseListProps> = ({ expenses }) => {
  return (
    <div className="space-y-4 gsap-fade-in">
      {expenses.map((expense) => {
        const isElectricity = expense.category === ExpenseCategory.ELECTRICITY;
        
        return (
          <div 
            key={expense.id} 
            className="bg-surface border border-border rounded-xl p-4 flex items-center justify-between hover:border-primary/50 transition-colors group"
          >
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-full border border-border flex items-center justify-center transition-colors
                ${isElectricity ? 'bg-accent/10 text-accent border-accent/20' : 'bg-background text-muted group-hover:text-white'}
              `}>
                {isElectricity ? <Zap size={18} /> : <Tag size={18} />}
              </div>
              <div>
                <h4 className="font-semibold text-white">{expense.description}</h4>
                <div className="flex items-center gap-3 text-xs text-muted mt-1">
                  <span className={`px-2 py-0.5 rounded ${isElectricity ? 'bg-accent/10 text-accent' : 'bg-primary/10 text-primary'}`}>
                    {expense.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar size={12}/> {expense.date}
                  </span>
                  {isElectricity && expense.electricityUnits && (
                    <span className="flex items-center gap-1 text-accent border-l border-border pl-3">
                      <Zap size={10} /> {expense.electricityUnits} kWh
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-white">-${expense.amount.toFixed(2)}</p>
            </div>
          </div>
        );
      })}
      {expenses.length === 0 && (
        <div className="text-center py-10 text-muted">
          No expenses recorded yet.
        </div>
      )}
    </div>
  );
};
