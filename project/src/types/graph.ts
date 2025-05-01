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
  }
}

export interface TransactionCategoryNode extends BaseGraphNode {
  type: 'transaction-category'
  category: {
    mcc: number
    value: number
  }
}

export interface TransactionNode extends BaseGraphNode {
  type: 'transaction'
  transaction: {
    value: number
    mcc: number
  }
}

export type GraphNode = StatementNode | TransactionCategoryNode | TransactionNode

export interface Graph {
  nodes: Record<EntityId, GraphNode>
  links: Record<EntityId, EntityId[]>
}
