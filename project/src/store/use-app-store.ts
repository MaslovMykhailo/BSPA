import { create, StoreApi, UseBoundStore } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

import { EntityId, Statement, StatementType, Transaction } from '@/types/models'
import { getTransactionsFromDate, getTransactionsToDate } from '@/utils/transactions'

export interface AppStore {
  activeStatementId?: EntityId
  statements: Record<EntityId, Statement>
  setActiveStatement: (id: EntityId) => void
  importStatement: (transactions: Transaction[]) => EntityId
  generateStatement: () => EntityId
  removeStatement: (id: EntityId) => void
}

export const useAppStoreBase = create<AppStore>()(
  devtools(
    persist(
      (set) => ({
        activeStatementId: undefined,
        statements: {},
        setActiveStatement: (id) => set(() => ({ activeStatementId: id })),
        importStatement: (transactions) => {
          const id = crypto.randomUUID()
          set((state) => ({
            statements: {
              ...state.statements,
              [id]: {
                id,
                type: StatementType.imported,
                transactions,
                addedDate: new Date(),
                fromDate: new Date(getTransactionsFromDate(transactions)),
                toDate: new Date(getTransactionsToDate(transactions)),
              },
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
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { [id]: _, ...rest } = state.statements
            return { statements: rest }
          }),
      }),
      {
        name: 'transactionsVisualizeStore',
      },
    ),
  ),
)

type WithSelectors<S> = S extends { getState: () => infer T } ? S & { use: { [K in keyof T]: () => T[K] } } : never

const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(_store: S) => {
  const store = _store as WithSelectors<typeof _store>
  store.use = {} as WithSelectors<S>
  for (const k of Object.keys(store.getState())) {
    // @ts-expect-error hack
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    store.use[k as any] = () => store((s) => s[k as keyof typeof s])
  }

  return store
}

export const useAppStore = createSelectors(useAppStoreBase)
