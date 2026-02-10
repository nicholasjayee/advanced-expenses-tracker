
import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Liability, LiabilityCategory } from '../pages/Liabilities/types/index.ts';

const initialLiabilities: Liability[] = [
  { id: 'l_1', name: 'Home Mortgage', totalAmount: 450000, remainingAmount: 342000, interestRate: 3.25, dueDate: '2045-05-15', category: LiabilityCategory.MORTGAGE, currency: 'USD', minimumPayment: 1800 },
  { id: 'l_2', name: 'Tesla Model 3 Loan', totalAmount: 35000, remainingAmount: 12500, interestRate: 4.5, dueDate: '2026-08-20', category: LiabilityCategory.CAR_LOAN, currency: 'USD', minimumPayment: 450 },
  { id: 'l_3', name: 'Chase Sapphire Reserve', totalAmount: 15000, remainingAmount: 2450, interestRate: 19.99, dueDate: '2024-06-01', category: LiabilityCategory.CREDIT_CARD, currency: 'USD', minimumPayment: 100 },
];

interface LiabilityContextType {
  liabilities: Liability[];
  addLiability: (liability: Omit<Liability, 'id'>) => void;
  updateLiability: (id: string, updates: Partial<Liability>) => void;
  deleteLiability: (id: string) => void;
  makePayment: (id: string, amount: number) => void;
  getLiabilityById: (id: string) => Liability | undefined;
  importData: (data: Liability[]) => void;
  clearData: () => void;
}

const LiabilityContext = createContext<LiabilityContextType | undefined>(undefined);

export const useLiabilitiesContext = () => {
  const context = useContext(LiabilityContext);
  if (!context) {
    throw new Error('useLiabilitiesContext must be used within a LiabilityProvider');
  }
  return context;
};

export const LiabilityProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [liabilities, setLiabilities] = useState<Liability[]>(initialLiabilities);

  const addLiability = useCallback((liabilityData: Omit<Liability, 'id'>) => {
    const newLiability: Liability = {
      ...liabilityData,
      id: `l_${Date.now()}`,
    };
    setLiabilities(prev => [...prev, newLiability]);
  }, []);

  const updateLiability = useCallback((id: string, updates: Partial<Liability>) => {
    setLiabilities(prev => prev.map(l => l.id === id ? { ...l, ...updates } : l));
  }, []);

  const deleteLiability = useCallback((id: string) => {
    setLiabilities(prev => prev.filter(l => l.id !== id));
  }, []);

  const makePayment = useCallback((id: string, amount: number) => {
    setLiabilities(prev => prev.map(l => {
      if (l.id !== id) return l;
      // Ensure remaining amount doesn't go below zero
      const newAmount = Math.max(0, l.remainingAmount - amount);
      return { ...l, remainingAmount: newAmount };
    }));
  }, []);

  const getLiabilityById = useCallback((id: string) => {
    return liabilities.find(l => l.id === id);
  }, [liabilities]);

  const importData = useCallback((data: Liability[]) => {
    setLiabilities(data);
  }, []);

  const clearData = useCallback(() => {
    setLiabilities([]);
  }, []);

  return (
    <LiabilityContext.Provider value={{ 
      liabilities, 
      addLiability, 
      updateLiability, 
      deleteLiability, 
      makePayment,
      getLiabilityById,
      importData,
      clearData
    }}>
      {children}
    </LiabilityContext.Provider>
  );
};
