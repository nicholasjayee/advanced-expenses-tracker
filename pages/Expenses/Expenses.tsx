import React, { useState } from 'react';
import { ExpenseHeader } from './components/ExpenseHeader';
import { AddExpenseForm } from './components/AddExpenseForm';
import { ExpenseList } from './components/ExpenseList';
import { ExpenseCategories } from './components/ExpenseCategories';
import { ExpenseCharts } from './components/ExpenseCharts';
import { useExpenses } from './core/useExpenses';

const Expenses: React.FC = () => {
  const { expenses, isCategorizing, addExpense, accounts } = useExpenses();
  const [viewMode, setViewMode] = useState<'list' | 'chart'>('list');

  return (
    <div className="space-y-6">
      <ExpenseHeader viewMode={viewMode} setViewMode={setViewMode} />

      {viewMode === 'list' ? (
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
      ) : (
          <ExpenseCharts expenses={expenses} />
      )}
    </div>
  );
};

export default Expenses;