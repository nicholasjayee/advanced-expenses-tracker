'use server'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function getExpenses() {
  return prisma.expense.findMany({
    orderBy: { date: 'desc' }
  })
}

export async function addExpense(data: { date: string, amount: number, description: string, category: string, type?: string, accountId?: string, receiptUrl?: string, electricityUnits?: number, electricityPeak?: boolean }) {
  return prisma.expense.create({
    data
  })
}

export async function updateExpense(id: string, updates: any) {
  return prisma.expense.update({
    where: { id },
    data: updates
  })
}

export async function deleteExpense(id: string) {
  return prisma.expense.delete({
    where: { id }
  })
}

export async function clearAllExpenses() {
  return prisma.expense.deleteMany()
}
