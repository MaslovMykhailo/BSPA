import { EntityId } from '@/types/entity'
import { Graph, GraphNode } from '@/types/graph'
import { Statement } from '@/types/statement'
import { Transaction, TransactionOperation } from '@/types/transaction'

export const emptyGraph = (): Graph => ({
  nodes: {},
  links: {},
})

const createStatementNode = (
  id: EntityId,
  statement: Statement,
  transactions: Transaction[],
  operation: TransactionOperation,
): GraphNode => ({
  id,
  type: 'statement',
  statement: {
    value: transactions.reduce((total, transaction) => total + transaction.amount, 0),
    operation,
    fromDate: statement.fromDate,
    toDate: statement.toDate,
    transactionsCount: transactions.length,
  },
})

const createTransactionCategoryNode = (id: EntityId, mcc: number, transactions: Transaction[]): GraphNode => ({
  id,
  type: 'transaction-category',
  category: {
    mcc,
    value: transactions.reduce((total, transaction) => total + transaction.amount, 0),
    transactionsCount: transactions.length,
  },
})

const createTransactionNode = (id: EntityId, transaction: Transaction): GraphNode => ({
  id,
  type: 'transaction',
  transaction: {
    value: transaction.amount,
    mcc: transaction.mcc,
    date: transaction.date,
    details: transaction.details,
  },
})

export const statementToGraphs = (statement: Statement) => {
  const transactionsByOperation = statement.transactions.reduce<Record<TransactionOperation, Transaction[]>>(
    (groups, transaction) => {
      groups[transaction.operation].push(transaction)
      return groups
    },
    {
      [TransactionOperation.income]: [],
      [TransactionOperation.expense]: [],
    },
  )

  return Object.entries(transactionsByOperation).reduce<Record<TransactionOperation, Graph>>(
    (graphs, [operation, transactions]) => {
      const graph = graphs[operation as TransactionOperation]
      const addNode = (id: EntityId, node: GraphNode) => {
        graph.nodes[id] = node
      }
      const addLink = (sourceId: string, targetId: string) => {
        if (!graph.links[sourceId]) {
          graph.links[sourceId] = []
        }
        graph.links[sourceId].push(targetId)
      }

      const statementId = crypto.randomUUID()
      addNode(statementId, createStatementNode(statementId, statement, transactions, operation as TransactionOperation))

      const categorizedTransactions = transactions.reduce<Record<string, Transaction[]>>((categories, transaction) => {
        if (!categories[transaction.mcc]) {
          categories[transaction.mcc] = []
        }

        categories[transaction.mcc].push(transaction)
        return categories
      }, {})

      Object.entries(categorizedTransactions).forEach(([mcc, categoryTransactions]) => {
        const categoryId = crypto.randomUUID()
        addNode(categoryId, createTransactionCategoryNode(categoryId, Number(mcc), categoryTransactions))
        addLink(statementId, categoryId)

        categoryTransactions.forEach((transaction) => {
          const transactionId = crypto.randomUUID()
          addNode(transactionId, createTransactionNode(transactionId, transaction))
          addLink(categoryId, transactionId)
        })
      })

      return graphs
    },
    {
      [TransactionOperation.income]: emptyGraph(),
      [TransactionOperation.expense]: emptyGraph(),
    },
  )
}

export const getNodeVal = (node: GraphNode) => {
  switch (node.type) {
    case 'statement':
      return node.statement.value
    case 'transaction-category':
      return node.category.value
    case 'transaction':
      return node.transaction.value
    default:
      return 1
  }
}

export const getNodesMinMaxVal = (nodes: GraphNode[]) => {
  const values = nodes.map(getNodeVal)
  return [Math.min(...values), Math.max(...values)]
}
