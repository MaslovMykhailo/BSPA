import { Content } from '@/content'
import { SerializedTransaction, TransactionOperation } from '@/types/transaction'
import { Transaction } from '@/types/transaction'

import { fromISOString, toISOString } from './date'
import { getCategoryByMcc, getRandomMcc } from './mcc'
import { randomNumber } from './random'

export const getTransactionsFromDate = (transactions: Transaction[]): Date =>
  new Date(Math.min(...transactions.map((t) => t.date.getTime())))

export const getTransactionsToDate = (transactions: Transaction[]): Date =>
  new Date(Math.max(...transactions.map((t) => t.date.getTime())))

export const getTransactionCategory = (transaction: Transaction): string =>
  getCategoryByMcc(transaction.mcc) ?? Content.unknownMcc()

export const serializeTransaction = (transaction: Transaction): SerializedTransaction => ({
  ...transaction,
  date: toISOString(transaction.date),
})

export const deserializeTransaction = (transaction: SerializedTransaction): Transaction => ({
  ...transaction,
  date: fromISOString(transaction.date),
})

interface GenerateTransactionsOptions {
  categoriesCount: { from: number; to: number }
  transactionsCount: { from: number; to: number }
  transactionsPerCategory: { from: number; to: number }
}

export const generateTransactions = ({
  categoriesCount,
  transactionsCount,
  transactionsPerCategory,
}: GenerateTransactionsOptions): Transaction[] => {
  const categories = Array.from({ length: randomNumber(categoriesCount.from, categoriesCount.to) }, getRandomMcc)

  const transactions: Transaction[] = []

  categories.forEach((mcc) => {
    const count = randomNumber(transactionsPerCategory.from, transactionsPerCategory.to)
    for (let i = 0; i < count; i++) {
      const date = new Date(Date.now() - randomNumber(0, 365 * 24 * 60 * 60 * 1000))
      transactions.push({
        date,
        mcc,
        details: 'Згенерована транзакція',
        operation: randomNumber(0, 1) === 0 ? TransactionOperation.income : TransactionOperation.expense,
        amount: randomNumber(1, 10000),
      })
    }
  })

  return transactions
    .sort(() => Math.random() - 0.5)
    .slice(0, randomNumber(transactionsCount.from, transactionsCount.to))
}
