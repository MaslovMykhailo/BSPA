import { EntityId, SerializedStatement, Transaction } from '@/types/models'

export interface AppStore {
  activeStatementId: EntityId | undefined
  statements: Record<EntityId, SerializedStatement>
  setActiveStatement: (id: EntityId) => void
  importStatement: (transactions: Transaction[]) => EntityId
  generateStatement: () => EntityId
  removeStatement: (id: EntityId) => void
}
