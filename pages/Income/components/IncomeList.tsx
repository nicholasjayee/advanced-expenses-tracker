import React, { useMemo } from 'react';
import { Income } from '../types/index.ts';
import { Tag, Calendar, ArrowUpRight } from 'lucide-react';
import { Account } from '../../../data/accounts.ts';
import { getCurrencySymbol } from '../../../data/currencies.ts';

interface IncomeListProps {
  incomes: Income[];
  accounts: Account[];
}

export const IncomeList: React.FC<IncomeListProps> = ({ incomes, accounts }) => {
  // Optimize O(N) array lookup inside loop to O(1) map lookup
  const accountMap = useMemo(() => {
    return accounts.reduce((map, account) => {
      map.set(account.id, account);
      return map;
    }, new Map<string, Account>());
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
      {incomes.map((income) => {
        const accountColor = getAccountColor(income.accountId);
        
        return (
          <div 
            key={income.id} 
            className="bg-surface border border-border rounded-xl p-4 flex items-center justify-between hover:border-secondary/50 transition-colors group"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full border border-secondary/20 bg-secondary/10 text-secondary flex items-center justify-center transition-colors">
                <ArrowUpRight size={18} />
              </div>
              <div>
                <h4 className="font-semibold text-text">{income.description}</h4>
                <div className="flex flex-wrap items-center gap-3 text-xs text-muted mt-1">
                  <span className="px-2 py-0.5 rounded bg-secondary/10 text-secondary">
                    {income.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar size={12}/> {income.date}
                  </span>
                  
                  {/* Account Label */}
                  <span className="flex items-center gap-1.5 border-l border-border pl-3">
                    <div className={`w-2 h-2 rounded-full ${accountColor}`}></div>
                    <span className="text-gray-400">{getAccountName(income.accountId)}</span>
                  </span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-secondary">
                +{getCurrencySymbol(income.currency || 'USD')}{income.amount.toFixed(2)}
              </p>
            </div>
          </div>
        );
      })}
      {incomes.length === 0 && (
        <div className="text-center py-10 text-muted">
          No income records found.
        </div>
      )}
    </div>
  );
};