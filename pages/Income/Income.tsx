import React from 'react';
import { IncomeHeader } from './components/IncomeHeader.tsx';
import { AddIncomeForm } from './components/AddIncomeForm.tsx';
import { IncomeList } from './components/IncomeList.tsx';
import { IncomeCategories } from './components/IncomeCategories.tsx';
import { useIncome } from './core/useIncome.ts';

const Income: React.FC = () => {
  const { incomes, addIncome, accounts } = useIncome();

  return (
    <div className="space-y-6">
      <IncomeHeader />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <AddIncomeForm 
            onAdd={addIncome} 
            accounts={accounts} 
          />
          <IncomeCategories incomes={incomes} />
        </div>

        <div className="lg:col-span-2">
          <IncomeList incomes={incomes} accounts={accounts} />
        </div>
      </div>
    </div>
  );
};

export default Income;