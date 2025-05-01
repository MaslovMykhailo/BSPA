import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Content } from '@/content'
import { usePreviewNode } from '@/store/graph'
import { StatementNode, TransactionCategoryNode, TransactionNode } from '@/types/graph'
import { TransactionOperation } from '@/types/transaction'

export function GraphNodePreview() {
  const previewNode = usePreviewNode()

  const getPreviewContent = () => {
    switch (previewNode?.type) {
      case 'statement': {
        return <StatementPreview node={previewNode} />
      }
      case 'transaction-category': {
        return <CategoryPreview node={previewNode} />
      }
      case 'transaction': {
        return <TransactionPreview node={previewNode} />
      }
    }
  }

  const isPreviewVisible = previewNode !== undefined

  return (
    <div
      className={`absolute right-2 top-12 z-20 w-[254px] transition-opacity duration-200 ease-in-out ${isPreviewVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      {getPreviewContent()}
    </div>
  )
}

function StatementPreview({ node }: { node: StatementNode }) {
  switch (node.statement.operation) {
    case TransactionOperation.income: {
      return <IncomePreview node={node} />
    }
    case TransactionOperation.expense: {
      return <ExpensePreview node={node} />
    }
  }
}

function IncomePreview({ node }: { node: StatementNode }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{Content.preview.statement.income.title()}</CardTitle>
        <CardDescription>
          {Content.preview.statement.income.description(node.statement.fromDate, node.statement.toDate)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>{Content.preview.statement.income.transactionsCount(node.statement.transactionsCount)}</p>
        <p>{Content.preview.statement.income.totalAmount(node.statement.value)}</p>
      </CardContent>
    </Card>
  )
}

function ExpensePreview({ node }: { node: StatementNode }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{Content.preview.statement.expense.title()}</CardTitle>
        <CardDescription>
          {Content.preview.statement.expense.description(node.statement.fromDate, node.statement.toDate)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>{Content.preview.statement.expense.transactionsCount(node.statement.transactionsCount)}</p>
        <p>{Content.preview.statement.expense.totalAmount(node.statement.value)}</p>
      </CardContent>
    </Card>
  )
}

function CategoryPreview({ node }: { node: TransactionCategoryNode }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{Content.preview.category.title(node.category.mcc)}</CardTitle>
        <CardDescription>{Content.preview.category.description(node.category.mcc)}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{Content.preview.category.transactionsCount(node.category.transactionsCount)}</p>
        <p>{Content.preview.category.totalAmount(node.category.value)}</p>
      </CardContent>
    </Card>
  )
}

function TransactionPreview({ node }: { node: TransactionNode }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{Content.preview.transaction.title(node.transaction.date)}</CardTitle>
        <CardDescription>{Content.preview.transaction.description(node.transaction.mcc)}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{Content.preview.transaction.amount(node.transaction.value)}</p>
        <p>{Content.preview.transaction.details(node.transaction.details)}</p>
      </CardContent>
    </Card>
  )
}
