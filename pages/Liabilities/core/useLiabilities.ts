import { useMemo } from 'react';
import { useLiabilitiesContext } from '../../../context/LiabilityContext.tsx';
import { Liability } from '../types/index.ts';

export const useLiabilities = () => {
  const { liabilities, addLiability, deleteLiability, updateLiability } = useLiabilitiesContext();

  const stats = useMemo(() => {
    const totalDebt = liabilities.reduce((acc, curr) => acc + curr.remainingAmount, 0);
    const totalMonthlyPayment = liabilities.reduce((acc, curr) => acc + (curr.minimumPayment || 0), 0);
    const count = liabilities.length;
    
    // Sort by APR descending for Avalanche method
    const highestApr = [...liabilities].sort((a, b) => b.interestRate - a.interestRate)[0];

    return {
      totalDebt,
      totalMonthlyPayment,
      count,
      highestAprLiability: highestApr
    };
  }, [liabilities]);

  return {
    liabilities,
    addLiability,
    deleteLiability,
    updateLiability,
    stats
  };
};