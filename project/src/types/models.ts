export type EntityId = string

export enum StatementType {
  imported = 'imported',
  generated = 'generated',
}

export type Statement = {
  id: EntityId
  fromDate: Date
  toDate: Date
  addedDate: Date
  type: StatementType
  transactions: Transaction[]
}

export enum TransactionOperation {
  income = 'income',
  expense = 'expense',
}

export type Transaction = {
  date: Date
  details: string
  mcc: number
  amount: number
  operation: TransactionOperation
}
