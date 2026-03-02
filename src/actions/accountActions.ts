'use server'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function getAccounts() {
  return prisma.account.findMany({
    orderBy: { createdAt: 'desc' }
  })
}

export async function addAccount(data: { name: string, type: string, balance: number, currency: string, color: string }) {
  return prisma.account.create({
    data
  })
}

export async function updateAccount(id: string, updates: any) {
  return prisma.account.update({
    where: { id },
    data: updates
  })
}

export async function deleteAccount(id: string) {
  return prisma.account.delete({
    where: { id }
  })
}

export async function transferFunds(fromId: string, toId: string, amount: number, feeRate: number, exchangeRate: number = 1, description?: string) {
  console.log(`Transfer Reason: ${description}`)
  const fee = amount * (feeRate / 100);
  const amountAfterFee = amount - fee;
  const finalAmount = amountAfterFee * exchangeRate;

  return prisma.$transaction(async (tx) => {
    const fromAcc = await tx.account.update({
      where: { id: fromId },
      data: { balance: { decrement: amount } }
    })
    const toAcc = await tx.account.update({
      where: { id: toId },
      data: { balance: { increment: finalAmount } }
    })
    return { fromAcc, toAcc }
  })
}

export async function topUpAccount(id: string, amount: number, description?: string) {
  return prisma.account.update({
    where: { id },
    data: { balance: { increment: amount } }
  })
}

export async function withdrawFromAccount(id: string, amount: number, description?: string) {
  return prisma.account.update({
    where: { id },
    data: { balance: { decrement: amount } }
  })
}

export async function convertAccountCurrency(id: string, targetCurrency: string, exchangeRate: number) {
  const account = await prisma.account.findUnique({ where: { id }})
  if(!account) throw new Error("Account not found")

  const newBalance = account.balance * exchangeRate;

  return prisma.account.update({
      where: { id },
      data: {
          currency: targetCurrency,
          balance: newBalance
      }
  })
}