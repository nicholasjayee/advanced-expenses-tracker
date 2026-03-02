'use server'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function getIncomes() {
  return prisma.income.findMany({
    orderBy: { date: 'desc' }
  })
}

export async function addIncome(data: { date: string, amount: number, description: string, category: string, type?: string, accountId?: string, taxRate?: number }) {
  return prisma.income.create({
    data
  })
}

export async function updateIncome(id: string, updates: any) {
  return prisma.income.update({
    where: { id },
    data: updates
  })
}

export async function deleteIncome(id: string) {
  return prisma.income.delete({
    where: { id }
  })
}

export async function clearAllIncomes() {
  return prisma.income.deleteMany()
}
