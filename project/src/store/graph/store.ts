import { Graph } from '@/types/graph'
import { TransactionOperation } from '@/types/transaction'

export interface GraphStore {
  graphs: Record<TransactionOperation, Graph>
  setGraphs: (graphs: Record<TransactionOperation, Graph>) => void
  resetGraphs: () => void
  activeGraph: TransactionOperation
  setActiveGraph: (graph: TransactionOperation) => void
  previewNodeId: string | undefined
  setPreviewNodeId: (id: string) => void
  resetPreviewNodeId: () => void
}
