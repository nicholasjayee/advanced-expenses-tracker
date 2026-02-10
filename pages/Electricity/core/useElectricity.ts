import { useMemo } from 'react';
import { useExpensesContext } from '../../../context/ExpenseContext.tsx';
import { useAccounts } from '../../../context/AccountContext.tsx';
import { ExpenseCategory } from '../../Expenses/types/index.ts';

export const useElectricity = () => {
  const { expenses, addExpense } = useExpensesContext();
  const { accounts } = useAccounts();

  const electricityExpenses = useMemo(() => {
    return expenses
      .filter(e => e.category === ExpenseCategory.ELECTRICITY)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [expenses]);

  const stats = useMemo(() => {
    let totalKwh = 0;
    let totalCost = 0;
    let maxKwh = 0;
    let totalRemaining = 0;
    let countWithRemaining = 0;

    electricityExpenses.forEach(exp => {
      totalCost += exp.amount;
      if (exp.electricityUnits) {
        totalKwh += exp.electricityUnits;
        if (exp.electricityUnits > maxKwh) maxKwh = exp.electricityUnits;
      }
      if (exp.electricityUnitsRemaining !== undefined) {
          totalRemaining += exp.electricityUnitsRemaining;
          countWithRemaining++;
      }
    });

    const avgCostPerKwh = totalKwh > 0 ? totalCost / totalKwh : 0;
    const avgUnitsRemaining = countWithRemaining > 0 ? totalRemaining / countWithRemaining : 0;
    
    // Calculate simple trend (comparing last 2 entries if available)
    let trend = 'Stable';
    if (electricityExpenses.length >= 2) {
      const latest = electricityExpenses[0].electricityUnits || 0;
      const previous = electricityExpenses[1].electricityUnits || 0;
      if (latest > previous) trend = 'Rising';
      else if (latest < previous) trend = 'Falling';
    }

    return {
      totalKwh,
      totalCost,
      avgCostPerKwh,
      maxKwh,
      trend,
      avgUnitsRemaining,
      count: electricityExpenses.length
    };
  }, [electricityExpenses]);

  const chartData = useMemo(() => {
    return electricityExpenses
      .slice(0, 12) // Last 12 entries
      .reverse() // Chronological order for chart
      .map(e => ({
        date: e.date,
        kwh: e.electricityUnits || 0,
        cost: e.amount,
        remaining: e.electricityUnitsRemaining || 0
      }));
  }, [electricityExpenses]);

  return {
    electricityExpenses,
    stats,
    chartData,
    addElectricityLog: addExpense, 
    accounts
  };
};