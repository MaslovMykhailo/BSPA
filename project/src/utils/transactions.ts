import { Content } from '@/content'
import { Transaction } from '@/types/models'

import MCC_METADATA from './mcc.json'

export const getTransactionsFromDate = (transactions: Transaction[]): Date =>
  new Date(Math.min(...transactions.map((t) => t.date.getTime())))

export const getTransactionsToDate = (transactions: Transaction[]): Date =>
  new Date(Math.max(...transactions.map((t) => t.date.getTime())))

export const getTransactionCategory = (transaction: Transaction): string =>
  MCC_METADATA.find(({ mcc }) => String(transaction.mcc) === mcc)?.shortDescription ?? Content.unknownMcc()
