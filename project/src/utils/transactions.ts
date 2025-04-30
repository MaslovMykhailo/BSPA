import { Content } from '@/content'
import { SerializedTransaction } from '@/types/transaction'
import { Transaction } from '@/types/transaction'

import { fromISOString, toISOString } from './date'
import MCC_METADATA from './mcc.json'

export const getTransactionsFromDate = (transactions: Transaction[]): Date =>
  new Date(Math.min(...transactions.map((t) => t.date.getTime())))

export const getTransactionsToDate = (transactions: Transaction[]): Date =>
  new Date(Math.max(...transactions.map((t) => t.date.getTime())))

export const getTransactionCategory = (transaction: Transaction): string =>
  MCC_METADATA.find(({ mcc }) => String(transaction.mcc) === mcc)?.shortDescription ?? Content.unknownMcc()

export const serializeTransaction = (transaction: Transaction): SerializedTransaction => ({
  ...transaction,
  date: toISOString(transaction.date),
})

export const deserializeTransaction = (transaction: SerializedTransaction): Transaction => ({
  ...transaction,
  date: fromISOString(transaction.date),
})
