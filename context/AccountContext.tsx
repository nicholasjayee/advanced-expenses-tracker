import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Account, initialAccounts, AccountType } from '../data/accounts.ts';

interface AccountContextType {
  accounts: Account[];
  addAccount: (account: Omit<Account, 'id'>) => void;
  updateAccount: (id: string, updates: Partial<Account>) => void;
  deleteAccount: (id: string) => void;
  transferFunds: (fromId: string, toId: string, amount: number, feeRate: number, exchangeRate?: number, description?: string) => void;
  topUpAccount: (id: string, amount: number, description?: string) => void;
  withdrawFromAccount: (id: string, amount: number, description?: string) => void;
  convertAccountCurrency: (id: string, targetCurrency: string, exchangeRate: number) => void;
  getAccountById: (id: string) => Account | undefined;
}

const AccountContext = createContext<AccountContextType | undefined>(undefined);

export const useAccounts = () => {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error('useAccounts must be used within an AccountProvider');
  }
  return context;
};

export const AccountProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [accounts, setAccounts] = useState<Account[]>(initialAccounts);

  const addAccount = useCallback((newAccountData: Omit<Account, 'id'>) => {
    const newAccount: Account = {
      ...newAccountData,
      id: `acc_${Date.now()}`,
    };
    setAccounts(prev => [...prev, newAccount]);
  }, []);

  const updateAccount = useCallback((id: string, updates: Partial<Account>) => {
    setAccounts(prev => prev.map(acc => acc.id === id ? { ...acc, ...updates } : acc));
  }, []);

  const deleteAccount = useCallback((id: string) => {
    setAccounts(prev => prev.filter(acc => acc.id !== id));
  }, []);

  const transferFunds = useCallback((fromId: string, toId: string, amount: number, feeRate: number, exchangeRate: number = 1, description?: string) => {
    // In a real app, we would log 'description' to a transaction history here.
    console.log(`Transfer Reason: ${description}`);
    
    setAccounts(prev => {
      const fromAcc = prev.find(a => a.id === fromId);
      const toAcc = prev.find(a => a.id === toId);

      if (!fromAcc || !toAcc) return prev;
      
      const fee = amount * (feeRate / 100);
      const amountAfterFee = amount - fee;
      
      // Calculate amount to add to destination, applying exchange rate
      const finalAmount = amountAfterFee * exchangeRate;

      return prev.map(acc => {
        if (acc.id === fromId) {
          return { ...acc, balance: acc.balance - amount };
        }
        if (acc.id === toId) {
          return { ...acc, balance: acc.balance + finalAmount };
        }
        return acc;
      });
    });
  }, []);

  const topUpAccount = useCallback((id: string, amount: number, description?: string) => {
    // In a real app, we would log 'description' to a transaction history here.
    console.log(`TopUp Reason: ${description}`);

    setAccounts(prev => prev.map(acc => 
      acc.id === id ? { ...acc, balance: acc.balance + amount } : acc
    ));
  }, []);

  const withdrawFromAccount = useCallback((id: string, amount: number, description?: string) => {
    // In a real app, we would log 'description' to a transaction history here.
    console.log(`Withdraw Reason: ${description}`);

    setAccounts(prev => prev.map(acc => 
      acc.id === id ? { ...acc, balance: acc.balance - amount } : acc
    ));
  }, []);

  const convertAccountCurrency = useCallback((id: string, targetCurrency: string, exchangeRate: number) => {
    setAccounts(prev => prev.map(acc => {
      if (acc.id !== id) return acc;
      const newBalance = acc.balance * exchangeRate;
      return { ...acc, currency: targetCurrency, balance: newBalance };
    }));
  }, []);

  const getAccountById = useCallback((id: string) => {
    return accounts.find(acc => acc.id === id);
  }, [accounts]);

  return (
    <AccountContext.Provider value={{ 
      accounts, 
      addAccount, 
      updateAccount, 
      deleteAccount, 
      transferFunds, 
      topUpAccount,
      withdrawFromAccount,
      convertAccountCurrency,
      getAccountById 
    }}>
      {children}
    </AccountContext.Provider>
  );
};