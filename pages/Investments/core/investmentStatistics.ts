import { AssetClass } from '../../../types.ts';
import { Investment } from '../types/index.ts';

export interface AllocationStat {
  name: string;
  value: number;
  color: string;
}

export interface PerformanceMetric {
  totalInvested: number;
  currentValue: number;
  unrealizedPL: number;
  unrealizedPLPercentage: number;
}

const COLORS = {
  [AssetClass.EQUITY]: '#3b82f6', // Blue
  [AssetClass.CRYPTO]: '#f59e0b', // Amber
  [AssetClass.REAL_ESTATE]: '#10b981', // Emerald
  [AssetClass.CASH]: '#6366f1', // Indigo
  [AssetClass.INSURANCE]: '#ec4899', // Pink
  [AssetClass.BOND]: '#14b8a6', // Teal
  [AssetClass.COMMODITY]: '#eab308', // Yellow
  [AssetClass.OTHER]: '#71717a', // Gray
};

/**
 * Calculates total portfolio value and cost basis
 */
export const calculatePerformance = (investments: Investment[]): PerformanceMetric => {
  // Performance Optimization: Combine multiple .reduce() passes into a single O(N) loop
  // Expected Impact: Reduces array traversals from O(2N) to O(N), improving render times
  // for large investment portfolios during Dashboard and Investment page loads.
  let totalInvested = 0;
  let currentValue = 0;

  for (const investment of investments) {
    totalInvested += investment.costBasis;
    currentValue += investment.value;
  }

  const unrealizedPL = currentValue - totalInvested;
  
  return {
    totalInvested,
    currentValue,
    unrealizedPL,
    unrealizedPLPercentage: totalInvested > 0 ? (unrealizedPL / totalInvested) * 100 : 0
  };
};

/**
 * Groups assets by class for Pie Chart
 */
export const calculateAllocation = (investments: Investment[]): AllocationStat[] => {
  const map: Record<string, number> = {};
  
  investments.forEach(asset => {
    map[asset.type] = (map[asset.type] || 0) + asset.value;
  });

  return Object.entries(map).map(([type, value]) => ({
    name: type.replace('_', ' '),
    value,
    color: COLORS[type as AssetClass] || '#71717a'
  }));
};

/**
 * Groups Unrealized P&L by Asset Class for Bar Chart
 */
export const calculatePLByClass = (investments: Investment[]) => {
  const map: Record<string, { invested: number, current: number }> = {};

  investments.forEach(asset => {
    if (!map[asset.type]) map[asset.type] = { invested: 0, current: 0 };
    map[asset.type].invested += asset.costBasis;
    map[asset.type].current += asset.value;
  });

  return Object.entries(map).map(([type, data]) => ({
    name: type.replace('_', ' '),
    profit: data.current - data.invested
  }));
};
