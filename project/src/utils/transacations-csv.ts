import Papa, { ParseResult } from 'papaparse'

import { Transaction, TransactionOperation } from '@/types/models'

import { parseDate } from './date'

export const parseTransactionsCSV = (csv: string): Transaction[] | undefined => {
  const parseResult = Papa.parse(csv, {
    header: true,
    skipEmptyLines: true,
  })

  if (parseResult.errors.length) {
    return
  }

  return convertParseResultToTransactions(parseResult)
}

function convertParseResultToTransactions(parseResult: ParseResult<unknown>) {
  const transactions: Transaction[] = []

  for (const row of parseResult.data) {
    const transaction = convertRowToTransaction(row)

    if (!isTransactionValid(transaction)) {
      return
    }

    transactions.push(transaction)
  }

  return transactions
}

const COLUMNS_MAPPER: Array<(row: Record<string, string>) => Partial<Transaction>> = [
  (row) => {
    const rowDate = row['Дата i час операції']
    if (!rowDate) return {}

    const date = parseDate(rowDate)
    return { date }
  },
  (row) => {
    const rowDetails = row['Деталі операції']
    if (!rowDetails) return {}

    return { details: rowDetails }
  },
  (row) => {
    const rowMcc = row['MCC']
    if (!rowMcc) return {}

    const mcc = parseInt(rowMcc)
    return { mcc }
  },
  (row) => {
    const column = Object.keys(row).find((c) => c.startsWith('Сума в валюті картки'))

    if (!column) return {}

    const amount = parseFloat(row[column])

    return {
      amount: Math.abs(amount),
      operation: amount > 0 ? TransactionOperation.income : TransactionOperation.expense,
    }
  },
]

const convertRowToTransaction = (row: unknown): Partial<Transaction> =>
  Object.values(COLUMNS_MAPPER).reduce<Partial<Transaction>>(
    (transaction, mapper) => ({ ...transaction, ...mapper(row as Record<string, string>) }),
    {},
  )

const REQUIRED_FIELDS: Array<keyof Transaction> = ['date', 'details', 'mcc', 'amount', 'operation']

const isTransactionValid = (transaction: Partial<Transaction>): transaction is Transaction =>
  REQUIRED_FIELDS.every((field) => field in transaction && transaction[field] !== undefined)
