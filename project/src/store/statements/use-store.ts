import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

import { StatementType } from '@/types/statement'
import { serializeStatement } from '@/utils/statements'
import { generateTransactions, getTransactionsFromDate, getTransactionsToDate } from '@/utils/transactions'

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
                fromDate: getTransactionsFromDate(transactions),
                toDate: getTransactionsToDate(transactions),
              }),
            },
          }))
          return id
        },
        generateStatement: () => {
          const id = crypto.randomUUID()
          const transactions = generateTransactions({
            categoriesCount: { from: 5, to: 15 },
            transactionsCount: { from: 50, to: 250 },
            transactionsPerCategory: { from: 2, to: 20 },
          })

          set((state) => ({
            statements: {
              ...state.statements,
              [id]: serializeStatement({
                id,
                type: StatementType.generated,
                transactions,
                addedDate: new Date(),
                fromDate: getTransactionsFromDate(transactions),
                toDate: getTransactionsToDate(transactions),
              }),
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
