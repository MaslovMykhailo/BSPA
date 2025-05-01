import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

import { TransactionOperation } from '@/types/transaction'
import { emptyGraph } from '@/utils/graph'

import { createSelectors } from '../utils'
import { GraphStore } from './store'

export const useGraphStoreBase = create<GraphStore>()(
  devtools((set) => ({
    graphs: {
      [TransactionOperation.income]: emptyGraph(),
      [TransactionOperation.expense]: emptyGraph(),
    },
    setGraphs: (graphs) => set(() => ({ graphs })),

    activeGraph: TransactionOperation.expense,
    setActiveGraph: (operation) => set(() => ({ activeGraph: operation })),

    previewNodeId: undefined,
    setPreviewNodeId: (id) => set(() => ({ previewNodeId: id })),
    resetPreviewNodeId: () => set(() => ({ previewNodeId: undefined })),
  })),
)

export const useGraphStore = createSelectors(useGraphStoreBase)
