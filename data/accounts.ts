export enum AccountType {
  CHECKING = 'CHECKING',
  SAVINGS = 'SAVINGS',
  CREDIT_CARD = 'CREDIT_CARD',
  CASH = 'CASH',
  BUSINESS = 'BUSINESS',
  LOAN = 'LOAN', // Borrowed money specifically for spending
  CUSTODIAL = 'CUSTODIAL' // Money held for others (e.g. "Gift for Mom")
}

export interface Account {
  id: string;
  name: string;
  type: AccountType;
  balance: number;
  currency: string;
  color: string;
}

export const initialAccounts: Account[] = [
  { id: 'acc_1', name: 'Chase Personal Checking', type: AccountType.CHECKING, balance: 5420.50, currency: 'USD', color: 'bg-blue-500' },
  { id: 'acc_2', name: 'Amex Gold', type: AccountType.CREDIT_CARD, balance: -1250.00, currency: 'USD', color: 'bg-yellow-500' },
  { id: 'acc_3', name: 'Physical Wallet (Cash)', type: AccountType.CASH, balance: 180.00, currency: 'USD', color: 'bg-green-500' },
  { id: 'acc_4', name: 'Business Operations', type: AccountType.BUSINESS, balance: 15000.00, currency: 'USD', color: 'bg-indigo-500' },
  { id: 'acc_5', name: 'Rental Income (Prop A)', type: AccountType.SAVINGS, balance: 8500.00, currency: 'USD', color: 'bg-emerald-500' },
  { id: 'acc_6', name: 'Funds from Mom', type: AccountType.CUSTODIAL, balance: 500.00, currency: 'USD', color: 'bg-pink-500' },
  { id: 'acc_7', name: 'Personal Loan', type: AccountType.LOAN, balance: 5000.00, currency: 'USD', color: 'bg-red-500' },
];