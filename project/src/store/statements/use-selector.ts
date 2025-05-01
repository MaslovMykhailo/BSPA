import { useMemo } from 'react'

import { StatementType } from '@/types/statement'
import { deserializeStatement } from '@/utils/statements'

import { useStatementsStore } from './use-store'

export const useStatements = () => {
  const statements = useStatementsStore.use.statements()
  return useMemo(
    () =>
      Object.values(statements)
        .map(deserializeStatement)
        .filter(Boolean)
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

export const useIsActiveStatement = (statementId: string) => useStatementsStore.use.activeStatementId() === statementId

export const useHasActiveStatement = () => {
  const activeStatementId = useStatementsStore.use.activeStatementId()
  return useMemo(() => activeStatementId !== undefined, [activeStatementId])
}

export const useActiveStatement = () => {
  const activeStatementId = useStatementsStore.use.activeStatementId()
  const statements = useStatementsStore.use.statements()
  return useMemo(
    () =>
      activeStatementId && statements[activeStatementId]
        ? deserializeStatement(statements[activeStatementId])
        : undefined,
    [activeStatementId, statements],
  )
}
