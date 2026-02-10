
import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { AssetClass } from '../types.ts';
import { Investment } from '../pages/Investments/types/index.ts';
import { useAccounts } from './AccountContext.tsx';
import { initialInvestments } from '../pages/Investments/data/investments.ts';

interface InvestmentContextType {
  investments: Investment[];
  addInvestment: (
    name: string,
    type: AssetClass,
    amountInvested: number,
    sourceAccountId: string,
    assetCurrency: string,
    exchangeRate: number,
    quantity: number,
    purchaseDate: Date
  ) => void;
  importData: (data: Investment[]) => void;
  clearData: () => void;
}

const InvestmentContext = createContext<InvestmentContextType | undefined>(undefined);

export const useInvestmentContext = () => {
  const context = useContext(InvestmentContext);
  if (!context) {
    throw new Error('useInvestmentContext must be used within an InvestmentProvider');
  }
  return context;
};

export const InvestmentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [investments, setInvestments] = useState<Investment[]>(initialInvestments);
  const { updateAccount, getAccountById } = useAccounts();

  const addInvestment = useCallback((
    name: string,
    type: AssetClass,
    amountInvested: number,
    sourceAccountId: string,
    assetCurrency: string,
    exchangeRate: number,
    quantity: number,
    purchaseDate: Date
  ) => {
    
    const sourceAccount = getAccountById(sourceAccountId);
    if (!sourceAccount) throw new Error("Source account not found");

    const costBasisInAssetCurrency = amountInvested * exchangeRate;
    const initialValue = costBasisInAssetCurrency;

    const newInvestment: Investment = {
      id: Date.now().toString(),
      name,
      type,
      value: initialValue,
      costBasis: costBasisInAssetCurrency,
      quantity,
      currency: assetCurrency,
      purchaseDate: purchaseDate.toISOString().split('T')[0],
      sourceAccountId,
      exchangeRateAtPurchase: exchangeRate,
      change24h: 0 
    };

    setInvestments(prev => [newInvestment, ...prev]);
    updateAccount(sourceAccountId, { balance: sourceAccount.balance - amountInvested });

  }, [getAccountById, updateAccount]);

  const importData = useCallback((data: Investment[]) => {
    setInvestments(data);
  }, []);

  const clearData = useCallback(() => {
    setInvestments([]);
  }, []);

  return (
    <InvestmentContext.Provider value={{ investments, addInvestment, importData, clearData }}>
      {children}
    </InvestmentContext.Provider>
  );
};
