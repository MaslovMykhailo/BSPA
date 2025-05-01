import { EntityId } from './entity'
import { TransactionOperation } from './transaction'

export interface BaseGraphNode {
  id: EntityId
}

export interface StatementNode extends BaseGraphNode {
  type: 'statement'
  statement: {
    value: number
    operation: TransactionOperation
    fromDate: Date
    toDate: Date
    transactionsCount: number
  }
}

export interface TransactionCategoryNode extends BaseGraphNode {
  type: 'transaction-category'
  category: {
    mcc: number
    value: number
    transactionsCount: number
  }
}

export interface TransactionNode extends BaseGraphNode {
  type: 'transaction'
  transaction: {
    value: number
    mcc: number
    date: Date
    details: string
  }
}

export type GraphNode = StatementNode | TransactionCategoryNode | TransactionNode

export interface Graph {
  nodes: Record<EntityId, GraphNode>
  links: Record<EntityId, EntityId[]>
}
