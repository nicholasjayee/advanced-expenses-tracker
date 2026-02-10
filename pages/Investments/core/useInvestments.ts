
import { useMemo } from 'react';
import { useInvestmentContext } from '../../../context/InvestmentContext.tsx';
import { useAccounts } from '../../../context/AccountContext.tsx';
import { calculatePerformance, calculateAllocation, calculatePLByClass } from './investmentStatistics.ts';

export const useInvestments = () => {
  const { investments, addInvestment } = useInvestmentContext();
  const { accounts, updateAccount, getAccountById } = useAccounts();

  const performance = useMemo(() => calculatePerformance(investments), [investments]);
  const allocationData = useMemo(() => calculateAllocation(investments), [investments]);
  const plData = useMemo(() => calculatePLByClass(investments), [investments]);

  return {
    investments,
    performance,
    allocationData,
    plData,
    addInvestment,
    accounts 
  };
};
