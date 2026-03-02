import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.account.createMany({
    data: [
      { id: 'acc_1', name: 'Chase Personal Checking', type: 'CHECKING', balance: 5420.50, currency: 'USD', color: 'bg-blue-500' },
      { id: 'acc_2', name: 'Amex Gold', type: 'CREDIT_CARD', balance: -1250.00, currency: 'USD', color: 'bg-yellow-500' },
      { id: 'acc_3', name: 'Physical Wallet (Cash)', type: 'CASH', balance: 180.00, currency: 'USD', color: 'bg-green-500' },
      { id: 'acc_4', name: 'Business Operations', type: 'BUSINESS', balance: 15000.00, currency: 'USD', color: 'bg-indigo-500' },
      { id: 'acc_5', name: 'Rental Income (Prop A)', type: 'SAVINGS', balance: 8500.00, currency: 'USD', color: 'bg-emerald-500' },
      { id: 'acc_6', name: 'Funds from Mom', type: 'CUSTODIAL', balance: 500.00, currency: 'USD', color: 'bg-pink-500' },
      { id: 'acc_7', name: 'Personal Loan', type: 'LOAN', balance: 5000.00, currency: 'USD', color: 'bg-red-500' },
    ]
  })

  await prisma.expense.createMany({
    data: [
      { id: 'exp_1', date: '2023-10-01', amount: 1500.00, description: 'Rent', category: 'HOUSING', type: 'EXPENSE' },
      { id: 'exp_2', date: '2023-10-05', amount: 200.00, description: 'Groceries', category: 'FOOD', type: 'EXPENSE' },
      { id: 'exp_3', date: '2023-10-10', amount: 50.00, description: 'Internet', category: 'UTILITIES', type: 'EXPENSE' },
    ]
  })

  await prisma.income.createMany({
    data: [
      { id: 'inc_1', date: '2023-10-01', amount: 5000.00, description: 'Salary', category: 'SALARY', type: 'INCOME' },
      { id: 'inc_2', date: '2023-10-15', amount: 500.00, description: 'Freelance', category: 'FREELANCE', type: 'INCOME' },
    ]
  })

  await prisma.liability.createMany({
    data: [
        { id: 'liab_1', name: 'Student Loan', totalAmount: 20000, remainingAmount: 15000, interestRate: 5.5, dueDate: '2025-12-01' },
    ]
  })

  await prisma.investment.createMany({
    data: [
        { id: 'inv_1', name: 'S&P 500', value: 10000, type: 'EQUITY', change24h: 1.5 },
    ]
  })

  await prisma.setting.create({
      data: {
          id: 'global',
          theme: 'dark',
          currency: 'USD'
      }
  })

  console.log("Database seeded successfully")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })