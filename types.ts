
export enum TransactionType {
  EXPENSE = 'EXPENSE',
  INCOME = 'INCOME',
  INVESTMENT = 'INVESTMENT',
  LIABILITY = 'LIABILITY',
}

export enum AssetClass {
  EQUITY = 'EQUITY',
  REAL_ESTATE = 'REAL_ESTATE',
  CRYPTO = 'CRYPTO',
  CASH = 'CASH',
  INSURANCE = 'INSURANCE',
  BOND = 'BOND',
  COMMODITY = 'COMMODITY',
  OTHER = 'OTHER'
}

// ExpenseCategory moved to pages/Expenses/types/index.ts

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  description: string;
  category: string; // Keeping as string to allow flexibility, but UI will drive towards Enum values
  type: TransactionType;
}

export interface Asset {
  id: string;
  name: string;
  value: number; // Current Market Value
  type: AssetClass;
  change24h: number;
}

export interface ElectricityUsage {
  id: string;
  date: string;
  kwh: number;
  cost: number;
  peak: boolean;
}

export interface Liability {
  id: string;
  name: string;
  totalAmount: number;
  remainingAmount: number;
  interestRate: number;
  dueDate: string;
}

export interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}

export type NotificationType = 'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR';

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  timestamp: Date;
  isRead: boolean;
  link?: string; // Optional link to a page (e.g. /liabilities)
}