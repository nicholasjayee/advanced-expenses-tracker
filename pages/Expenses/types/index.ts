import { TransactionType } from "../../../types.ts";

export enum ExpenseCategory {
  FOOD = 'Food',
  TRANSPORT = 'Transport',
  ELECTRICITY = 'Electricity',
  RENT = 'Rent',
  LIABILITY_PAYMENT = 'Liability Payment',
  GIFT = 'Gift',
  ESSENTIAL = 'Essential',
  LOST_MONEY = 'Lost Money',
  ENTERTAINMENT = 'Entertainment',
  OTHER = 'Other'
}

export interface Expense {
  id: string;
  date: string;
  amount: number;
  description: string;
  category: string;
  type: TransactionType;
  electricityUnits?: number;
}
