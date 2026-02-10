import { TransactionType } from "../../../types.ts";

export enum IncomeCategory {
  SALARY = 'Salary',
  FREELANCE = 'Freelance',
  INVESTMENT_RETURN = 'Investment Return',
  RENTAL_INCOME = 'Rental Income',
  GIFT = 'Gift',
  REFUND = 'Refund',
  BONUS = 'Bonus',
  DIVIDEND = 'Dividend',
  OTHER = 'Other'
}

export interface Income {
  id: string;
  date: string;
  amount: number;
  currency: string; // Inherited from account
  description: string;
  category: IncomeCategory | string;
  type: TransactionType;
  accountId: string; // Account receiving the money
}