export type Transaction = {
  date: Date
  details: string
  mcc: number
  amount: number
  operation: TransactionOperation
}

export type SerializedTransaction = {
  date: string
  details: string
  mcc: number
  amount: number
  operation: TransactionOperation
}

export enum TransactionOperation {
  income = 'income',
  expense = 'expense',
}
