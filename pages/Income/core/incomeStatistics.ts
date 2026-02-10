import { Income } from '../types/index.ts';

export interface CategoryStat {
  name: string;
  value: number;
  percentage: number;
}

/**
 * Calculates the total income per category and their percentage share.
 */
export const calculateIncomeStats = (incomes: Income[]): CategoryStat[] => {
  const stats: Record<string, number> = {};
  let total = 0;

  incomes.forEach(income => {
    const amount = income.amount;
    stats[income.category] = (stats[income.category] || 0) + amount;
    total += amount;
  });

  return Object.entries(stats)
    .map(([name, value]) => ({
      name,
      value,
      percentage: total > 0 ? (value / total) * 100 : 0
    }))
    .sort((a, b) => b.value - a.value);
};