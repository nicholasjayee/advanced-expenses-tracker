import React from 'react';
import { ExpenseHeader } from './components/ExpenseHeader';
import { AddExpenseForm } from './components/AddExpenseForm';
import { ExpenseList } from './components/ExpenseList';
import { ExpenseCategories } from './components/ExpenseCategories';
import { useExpenses } from './core/useExpenses';

const Expenses: React.FC = () => {
  // Logic separated into core/useExpenses.ts
  const { expenses, isCategorizing, addExpense, accounts } = useExpenses();

  return (
    <div className="space-y-6">
      <ExpenseHeader />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <AddExpenseForm 
            onAdd={addExpense} 
            isCategorizing={isCategorizing} 
            accounts={accounts} 
          />
          <ExpenseCategories expenses={expenses} />
        </div>

        <div className="lg:col-span-2">
          <ExpenseList expenses={expenses} accounts={accounts} />
        </div>
      </div>
    </div>
  );
};

export default Expenses;