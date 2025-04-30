import { EntityId } from './entity'
import { Statement } from './statement'
import { Transaction } from './transaction'

export interface BaseGraphNode {
  id: EntityId
}

export interface StatementNode extends BaseGraphNode {
  type: 'statement'
  statement: Statement
}

export interface TransactionCategoryNode extends BaseGraphNode {
  type: 'transaction-category'
  category: TransactionCategory
}

export interface TransactionNode extends BaseGraphNode {
  type: 'transaction'
  transaction: Transaction
}

export type GraphNode = StatementNode | TransactionCategoryNode | TransactionNode

export interface Graph {
  nodes: Record<EntityId, GraphNode>
  links: Record<EntityId, EntityId[]>
}

export interface TransactionCategory {
  mcc: number
  transactions: Transaction[]
}
