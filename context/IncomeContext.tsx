
import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { TransactionType } from '../types.ts';
import { Income, IncomeCategory } from '../pages/Income/types/index.ts';
import { useAccounts } from './AccountContext.tsx';

// Mock Data
const initialIncome: Income[] = [
  { id: '1', date: '2024-05-01', amount: 4200.00, currency: 'USD', description: 'Monthly Salary', category: IncomeCategory.SALARY, type: TransactionType.INCOME, accountId: 'acc_1' },
  { id: '2', date: '2024-05-15', amount: 850.00, currency: 'USD', description: 'Web Design Project', category: IncomeCategory.FREELANCE, type: TransactionType.INCOME, accountId: 'acc_4' },
  { id: '3', date: '2024-05-20', amount: 120.00, currency: 'USD', description: 'Stock Dividend', category: IncomeCategory.DIVIDEND, type: TransactionType.INCOME, accountId: 'acc_5' },
  { id: '4', date: '2024-04-01', amount: 4200.00, currency: 'USD', description: 'Monthly Salary', category: IncomeCategory.SALARY, type: TransactionType.INCOME, accountId: 'acc_1' },
];

interface IncomeContextType {
  incomes: Income[];
  addIncome: (description: string, amount: number, date: Date, accountId: string, category: string) => Promise<void>;
}

const IncomeContext = createContext<IncomeContextType | undefined>(undefined);

export const useIncomeContext = () => {
  const context = useContext(IncomeContext);
  if (!context) {
    throw new Error('useIncomeContext must be used within an IncomeProvider');
  }
  return context;
};

export const IncomeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [incomes, setIncomes] = useState<Income[]>(initialIncome);
  const { updateAccount, getAccountById } = useAccounts();

  const addIncome = useCallback(async (
    description: string, 
    amount: number, 
    date: Date, 
    accountId: string,
    category: string
  ) => {
    const account = getAccountById(accountId);
    const currency = account ? account.currency : 'USD';
    const finalCategory = category || IncomeCategory.OTHER;
    
    const newIncome: Income = {
      id: Date.now().toString(),
      date: date.toISOString().split('T')[0],
      amount: amount,
      currency: currency,
      description: description,
      category: finalCategory,
      type: TransactionType.INCOME,
      accountId: accountId,
    };

    setIncomes((prev) => [newIncome, ...prev]);

    if (account) {
       updateAccount(accountId, { balance: account.balance + amount });
    }
  }, [getAccountById, updateAccount]);

  return (
    <IncomeContext.Provider value={{ incomes, addIncome }}>
      {children}
    </IncomeContext.Provider>
  );
};
