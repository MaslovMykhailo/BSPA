import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

import { StatementType } from '@/types/statement'
import { serializeStatement } from '@/utils/statements'
import { getTransactionsFromDate, getTransactionsToDate } from '@/utils/transactions'

import { createSelectors } from '../utils'
import { StatementsStore } from './store'

const useStatementsStoreBase = create<StatementsStore>()(
  devtools(
    persist(
      (set) => ({
        activeStatementId: undefined,
        statements: {},
        setActiveStatement: (id) => set(() => ({ activeStatementId: id })),
        resetActiveStatement: () => set(() => ({ activeStatementId: undefined })),
        importStatement: (transactions) => {
          const id = crypto.randomUUID()
          set((state) => ({
            statements: {
              ...state.statements,
              [id]: serializeStatement({
                id,
                type: StatementType.imported,
                transactions,
                addedDate: new Date(),
                fromDate: new Date(getTransactionsFromDate(transactions)),
                toDate: new Date(getTransactionsToDate(transactions)),
              }),
            },
          }))
          return id
        },
        generateStatement: () => {
          const id = crypto.randomUUID()
          set((state) => ({
            statements: {
              ...state.statements,
            },
          }))
          return id
        },
        removeStatement: (id) =>
          set((state) => {
            const { [id]: statement, ...rest } = state.statements
            const activeStatementId = state.activeStatementId === statement.id ? undefined : state.activeStatementId
            return { statements: rest, activeStatementId }
          }),
      }),
      {
        name: 'statements-store',
      },
    ),
  ),
)

export const useStatementsStore = createSelectors(useStatementsStoreBase)
