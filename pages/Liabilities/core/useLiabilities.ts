import { useMemo } from 'react';
import { useLiabilitiesContext } from '../../../context/LiabilityContext.tsx';
import { Liability } from '../types/index.ts';

export const useLiabilities = () => {
  const { liabilities, addLiability, deleteLiability, updateLiability } = useLiabilitiesContext();

  const stats = useMemo(() => {
    let totalDebt = 0;
    let totalMonthlyPayment = 0;
    let highestAprLiability = liabilities.length > 0 ? liabilities[0] : undefined;

    // Optimized: Calculate stats and find highest APR in a single O(N) pass
    // instead of multiple O(N) reduces and an O(N log N) sort.
    for (const liability of liabilities) {
      totalDebt += liability.remainingAmount;
      totalMonthlyPayment += (liability.minimumPayment || 0);

      if (liability.interestRate > highestAprLiability!.interestRate) {
        highestAprLiability = liability;
      }
    }

    return {
      totalDebt,
      totalMonthlyPayment,
      count: liabilities.length,
      highestAprLiability
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