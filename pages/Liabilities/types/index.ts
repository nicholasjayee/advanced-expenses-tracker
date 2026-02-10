export enum LiabilityCategory {
  MORTGAGE = 'Mortgage',
  CAR_LOAN = 'Car Loan',
  CREDIT_CARD = 'Credit Card',
  PERSONAL_LOAN = 'Personal Loan',
  STUDENT_LOAN = 'Student Loan',
  OTHER = 'Other'
}

export interface Liability {
  id: string;
  name: string;
  totalAmount: number; // Original Loan Amount or Credit Limit
  remainingAmount: number; // Current Balance Owed
  interestRate: number; // APR
  dueDate: string; // Next due date or payoff date
  minimumPayment?: number;
  currency: string;
  category: LiabilityCategory | string;
}

export interface DebtStrategy {
  method: 'Avalanche' | 'Snowball';
  description: string;
  savings: number;
  payoffDate: string;
}