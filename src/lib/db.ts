import Dexie, { type EntityTable } from 'dexie';

interface Account {
  id: string;
  name: string;
  type: string;
  balance: number;
  currency: string;
  color: string;
  updatedAt: string;
}

interface Expense {
  id: string;
  date: string;
  amount: number;
  description: string;
  category: string;
  type: string;
  accountId?: string;
  electricityUnits?: number;
  electricityPeak?: boolean;
  updatedAt: string;
}

interface Income {
  id: string;
  date: string;
  amount: number;
  description: string;
  category: string;
  type: string;
  accountId?: string;
  updatedAt: string;
}

interface Liability {
  id: string;
  name: string;
  totalAmount: number;
  remainingAmount: number;
  interestRate: number;
  dueDate: string;
  updatedAt: string;
}

interface Investment {
  id: string;
  name: string;
  value: number;
  type: string;
  change24h: number;
  updatedAt: string;
}

const db = new Dexie('FinNexusCache') as Dexie & {
  accounts: EntityTable<Account, 'id'>;
  expenses: EntityTable<Expense, 'id'>;
  incomes: EntityTable<Income, 'id'>;
  liabilities: EntityTable<Liability, 'id'>;
  investments: EntityTable<Investment, 'id'>;
};

// Schema declaration
db.version(1).stores({
  accounts: 'id, updatedAt',
  expenses: 'id, date, category, updatedAt',
  incomes: 'id, date, category, updatedAt',
  liabilities: 'id, dueDate, updatedAt',
  investments: 'id, type, updatedAt'
});

export type { Account, Expense, Income, Liability, Investment };
export { db };
