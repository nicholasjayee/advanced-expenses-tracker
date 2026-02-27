import React, { useMemo } from 'react';
import { Expense, ExpenseCategory } from '../types/index.ts';
import { Tag, Calendar, Zap, CreditCard } from 'lucide-react';
import { Account } from '../../../data/accounts.ts';
import { getCurrencySymbol } from '../../../data/currencies.ts';

interface ExpenseListProps {
  expenses: Expense[];
  accounts: Account[];
}

export const ExpenseList: React.FC<ExpenseListProps> = ({ expenses, accounts }) => {
  // Memoize account map to optimize lookups from O(N) to O(1)
  const accountMap = useMemo(() => {
    return new Map(accounts.map(account => [account.id, account]));
  }, [accounts]);

  const getAccountName = (id: string) => {
    const acc = accountMap.get(id);
    return acc ? acc.name : 'Unknown Account';
  };

  const getAccountColor = (id: string) => {
    const acc = accountMap.get(id);
    return acc ? acc.color : 'bg-gray-500';
  }

  return (
    <div className="space-y-4 gsap-fade-in">
      {expenses.map((expense) => {
        const isElectricity = expense.category === ExpenseCategory.ELECTRICITY;
        const accountColor = getAccountColor(expense.accountId);
        
        return (
          <div 
            key={expense.id} 
            className="bg-surface border border-border rounded-xl p-4 flex items-center justify-between hover:border-primary/50 transition-colors group"
          >
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-full border border-border flex items-center justify-center transition-colors
                ${isElectricity ? 'bg-accent/10 text-accent border-accent/20' : 'bg-background text-muted group-hover:text-text'}
              `}>
                {isElectricity ? <Zap size={18} /> : <Tag size={18} />}
              </div>
              <div>
                <h4 className="font-semibold text-text">{expense.description}</h4>
                <div className="flex flex-wrap items-center gap-3 text-xs text-muted mt-1">
                  <span className={`px-2 py-0.5 rounded ${isElectricity ? 'bg-accent/10 text-accent' : 'bg-primary/10 text-primary'}`}>
                    {expense.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar size={12}/> {expense.date}
                  </span>
                  
                  {/* Account Label */}
                  <span className="flex items-center gap-1.5 border-l border-border pl-3">
                    <div className={`w-2 h-2 rounded-full ${accountColor}`}></div>
                    <span className="text-gray-400">{getAccountName(expense.accountId)}</span>
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
              <p className="text-lg font-bold text-text">
                -{getCurrencySymbol(expense.currency || 'USD')}{expense.amount.toFixed(2)}
              </p>
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