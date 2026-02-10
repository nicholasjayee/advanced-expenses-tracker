import { AccountType } from "../../../data/accounts.ts";

export interface TransferDetails {
  fromAccountId: string;
  toAccountId: string;
  amount: number;
  rate: number; // Percentage 0-100
}

export const AccountColors = [
  'bg-blue-500',
  'bg-emerald-500',
  'bg-indigo-500',
  'bg-purple-500',
  'bg-pink-500',
  'bg-rose-500',
  'bg-orange-500',
  'bg-amber-500',
  'bg-yellow-500',
  'bg-lime-500',
  'bg-teal-500',
  'bg-cyan-500',
  'bg-sky-500',
  'bg-gray-500',
  'bg-slate-500',
  'bg-red-500',
];

export const ACCOUNT_TYPE_LABELS: Record<AccountType, string> = {
  [AccountType.CHECKING]: 'Checking Account',
  [AccountType.SAVINGS]: 'Savings Account',
  [AccountType.CREDIT_CARD]: 'Credit Card',
  [AccountType.CASH]: 'Cash Wallet',
  [AccountType.BUSINESS]: 'Business Account',
  [AccountType.LOAN]: 'Personal Loan',
  [AccountType.CUSTODIAL]: 'Custodial / Held Funds',
};