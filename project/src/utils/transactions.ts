import { Content } from '@/content'
import { SerializedTransaction } from '@/types/transaction'
import { Transaction } from '@/types/transaction'

import { fromISOString, toISOString } from './date'
import { getCategoryByMcc } from './mcc'

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
