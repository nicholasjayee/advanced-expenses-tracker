
import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { TransactionType } from '../types.ts';
import { Expense, ExpenseCategory } from '../pages/Expenses/types/index.ts';
import { categorizeTransaction } from '../services/geminiService.ts';
import { useAccounts } from './AccountContext.tsx';
import { useLiabilitiesContext } from './LiabilityContext.tsx';

// Initial Mock Data including Electricity
const initialExpenses: Expense[] = [
  { id: '1', date: '2024-05-12', amount: 156.00, currency: 'USD', description: 'Whole Foods Market', category: ExpenseCategory.FOOD, type: TransactionType.EXPENSE, accountId: 'acc_1' },
  { id: '2', date: '2024-05-11', amount: 45.90, currency: 'USD', description: 'Uber Ride', category: ExpenseCategory.TRANSPORT, type: TransactionType.EXPENSE, accountId: 'acc_2' },
  { id: '3', date: '2024-05-10', amount: 24.00, currency: 'USD', description: 'Netflix Subscription', category: ExpenseCategory.ENTERTAINMENT, type: TransactionType.EXPENSE, accountId: 'acc_2' },
  { id: '4', date: '2024-05-09', amount: 1200.00, currency: 'USD', description: 'Monthly Rent', category: ExpenseCategory.RENT, type: TransactionType.EXPENSE, accountId: 'acc_1' },
  // Electricity Data
  { id: '5', date: '2024-05-08', amount: 145.20, currency: 'USD', description: 'City Power - May Bill', category: ExpenseCategory.ELECTRICITY, type: TransactionType.EXPENSE, accountId: 'acc_1', electricityUnits: 450, electricityUnitsRemaining: 15 },
  { id: '6', date: '2024-04-08', amount: 132.50, currency: 'USD', description: 'City Power - April Bill', category: ExpenseCategory.ELECTRICITY, type: TransactionType.EXPENSE, accountId: 'acc_1', electricityUnits: 410, electricityUnitsRemaining: 10 },
];

interface ExpenseContextType {
  expenses: Expense[];
  isCategorizing: boolean;
  addExpense: (
    description: string, 
    amount: number, 
    date: Date, 
    accountId: string, 
    manualCategory?: string, 
    units?: number, 
    unitsRemaining?: number,
    liabilityId?: string
  ) => Promise<void>;
  importData: (data: Expense[]) => void;
  clearData: () => void;
}

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

export const useExpensesContext = () => {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error('useExpensesContext must be used within an ExpenseProvider');
  }
  return context;
};

export const ExpenseProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [expenses, setExpenses] = useState<Expense[]>(initialExpenses);
  const [isCategorizing, setIsCategorizing] = useState(false);
  
  const { updateAccount, getAccountById } = useAccounts();
  const { makePayment } = useLiabilitiesContext();

  const addExpense = useCallback(async (
    description: string, 
    amount: number, 
    date: Date, 
    accountId: string,
    manualCategory?: string,
    units?: number,
    unitsRemaining?: number,
    liabilityId?: string
  ) => {
    let category = manualCategory;

    // Get Account details to determine currency
    const account = getAccountById(accountId);
    const currency = account ? account.currency : 'USD';

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
      currency: currency,
      description: description,
      category: finalCategory,
      type: TransactionType.EXPENSE,
      accountId: accountId,
      electricityUnits: (finalCategory === ExpenseCategory.ELECTRICITY && units) ? units : undefined,
      electricityUnitsRemaining: (finalCategory === ExpenseCategory.ELECTRICITY && unitsRemaining !== undefined) ? unitsRemaining : undefined,
      liabilityId: (finalCategory === ExpenseCategory.LIABILITY_PAYMENT && liabilityId) ? liabilityId : undefined
    };

    setExpenses((prev) => [newExpense, ...prev]);

    // Update the account balance
    if (account) {
       updateAccount(accountId, { balance: account.balance - amount });
    }

    // Update Liability Balance if applicable
    if (finalCategory === ExpenseCategory.LIABILITY_PAYMENT && liabilityId) {
      makePayment(liabilityId, amount);
    }

  }, [getAccountById, updateAccount, makePayment]);

  const importData = useCallback((data: Expense[]) => {
    setExpenses(data);
  }, []);

  const clearData = useCallback(() => {
    setExpenses([]);
  }, []);

  return (
    <ExpenseContext.Provider value={{ expenses, isCategorizing, addExpense, importData, clearData }}>
      {children}
    </ExpenseContext.Provider>
  );
};
