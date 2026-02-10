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
  currency: string; // The currency of the transaction (inherited from account)
  description: string;
  category: string;
  type: TransactionType;
  electricityUnits?: number; // Units bought/topped up
  electricityUnitsRemaining?: number; // Units remaining on meter BEFORE top up
  liabilityId?: string; // Link to a liability if this is a payment
  accountId: string; // Link to the account the money came from
}