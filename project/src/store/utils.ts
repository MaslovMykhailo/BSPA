import { StoreApi, UseBoundStore } from 'zustand'

type WithSelectors<S> = S extends { getState: () => infer T } ? S & { use: { [K in keyof T]: () => T[K] } } : never

export const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(_store: S) => {
  const store = _store as WithSelectors<typeof _store>
  store.use = {} as WithSelectors<S>
  for (const k of Object.keys(store.getState())) {
    // @ts-expect-error ts is not smart enough to know that k is a key of store.getState()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    store.use[k as any] = () => store((s) => s[k as keyof typeof s])
  }

  return store
}
