import { EntityId } from './entity'
import { SerializedTransaction, Transaction } from './transaction'

export type Statement = {
  id: EntityId
  fromDate: Date
  toDate: Date
  addedDate: Date
  type: StatementType
  transactions: Transaction[]
}

export type SerializedStatement = {
  id: EntityId
  fromDate: string
  toDate: string
  addedDate: string
  type: StatementType
  transactions: SerializedTransaction[]
}
export enum StatementType {
  imported = 'imported',
  generated = 'generated',
}
