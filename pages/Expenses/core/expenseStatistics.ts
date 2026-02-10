import { Expense } from '../types/index.ts';

export interface CategoryStat {
  name: string;
  value: number;
  percentage: number;
}

/**
 * Calculates the total spending per category and their percentage share.
 */
export const calculateCategoryStats = (expenses: Expense[]): CategoryStat[] => {
  const stats: Record<string, number> = {};
  let total = 0;

  expenses.forEach(expense => {
    const amount = expense.amount;
    stats[expense.category] = (stats[expense.category] || 0) + amount;
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
