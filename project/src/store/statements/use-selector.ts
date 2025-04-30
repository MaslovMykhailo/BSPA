import { useMemo } from 'react'

import { StatementType } from '@/types/statement'
import { deserializeStatement } from '@/utils/statements'

import { useTransactionsStore } from './use-store'

export const useStatements = () => {
  const statements = useTransactionsStore.use.statements()
  return useMemo(
    () =>
      Object.values(statements)
        .map(deserializeStatement)
        .sort((s1, s2) => s1.addedDate.getTime() - s2.addedDate.getTime()),
    [statements],
  )
}

export const useImportedStatements = () => {
  const statements = useStatements()
  return useMemo(() => statements.filter((s) => s.type === StatementType.imported), [statements])
}

export const useGeneratedStatements = () => {
  const statements = useStatements()
  return useMemo(() => statements.filter((s) => s.type === StatementType.generated), [statements])
}

export const useIsActiveStatement = (statementId: string) =>
  useTransactionsStore.use.activeStatementId() === statementId

export const useActiveStatement = () => {
  const activeStatementId = useTransactionsStore.use.activeStatementId()
  const statements = useTransactionsStore.use.statements()
  return useMemo(
    () => (activeStatementId ? deserializeStatement(statements[activeStatementId]) : undefined),
    [activeStatementId, statements],
  )
}
