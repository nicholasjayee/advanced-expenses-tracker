import { useState, useCallback } from 'react';
import { TransactionType } from '../../../types.ts';
import { Expense, ExpenseCategory } from '../types/index.ts';
import { categorizeTransaction } from '../../../services/geminiService.ts';

const initialExpenses: Expense[] = [
  { id: '1', date: '2024-05-12', amount: 156.00, description: 'Whole Foods Market', category: ExpenseCategory.FOOD, type: TransactionType.EXPENSE },
  { id: '2', date: '2024-05-11', amount: 45.90, description: 'Uber Ride', category: ExpenseCategory.TRANSPORT, type: TransactionType.EXPENSE },
  { id: '3', date: '2024-05-10', amount: 24.00, description: 'Netflix Subscription', category: ExpenseCategory.ENTERTAINMENT, type: TransactionType.EXPENSE },
  { id: '4', date: '2024-05-09', amount: 1200.00, description: 'Monthly Rent', category: ExpenseCategory.RENT, type: TransactionType.EXPENSE },
];

export const useExpenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>(initialExpenses);
  const [isCategorizing, setIsCategorizing] = useState(false);

  const addExpense = useCallback(async (
    description: string, 
    amount: number, 
    date: Date, 
    manualCategory?: string,
    units?: number
  ) => {
    let category = manualCategory;

    if (!category) {
      setIsCategorizing(true);
      // AI Categorization Logic
      category = await categorizeTransaction(description);
      setIsCategorizing(false);
    }

    const finalCategory = category || ExpenseCategory.OTHER;
    
    const newExpense: Expense = {
      id: Date.now().toString(),
      date: date.toISOString().split('T')[0],
      amount: amount,
      description: description,
      category: finalCategory,
      type: TransactionType.EXPENSE,
      electricityUnits: (finalCategory === ExpenseCategory.ELECTRICITY && units) ? units : undefined
    };

    setExpenses((prev) => [newExpense, ...prev]);
  }, []);

  return {
    expenses,
    isCategorizing,
    addExpense
  };
};
