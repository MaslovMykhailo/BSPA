import { SerializedStatement } from '@/types/statement'
import { Statement } from '@/types/statement'

import { fromISOString, toISOString } from './date'
import { deserializeTransaction, serializeTransaction } from './transactions'

export const serializeStatement = (statement: Statement): SerializedStatement => ({
  ...statement,
  fromDate: toISOString(statement.fromDate),
  toDate: toISOString(statement.toDate),
  addedDate: toISOString(statement.addedDate),
  transactions: statement.transactions.map(serializeTransaction),
})

export const deserializeStatement = (statement: SerializedStatement): Statement => ({
  ...statement,
  fromDate: fromISOString(statement.fromDate),
  toDate: fromISOString(statement.toDate),
  addedDate: fromISOString(statement.addedDate),
  transactions: statement.transactions.map(deserializeTransaction),
})
