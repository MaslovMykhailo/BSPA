import { EntityId } from '@/types/entity'
import { SerializedStatement } from '@/types/statement'
import { Transaction } from '@/types/transaction'

export interface StatementsStore {
  activeStatementId: EntityId | undefined
  statements: Record<EntityId, SerializedStatement>
  setActiveStatement: (id: EntityId) => void
  resetActiveStatement: () => void
  importStatement: (transactions: Transaction[]) => EntityId
  generateStatement: () => EntityId
  removeStatement: (id: EntityId) => void
}
