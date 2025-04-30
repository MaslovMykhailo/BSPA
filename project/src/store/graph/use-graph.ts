import { useEffect } from 'react'

import { statementToGraphs } from '@/utils/graph'

import { useActiveStatement } from '../statements'
import { useGraphData } from './use-selector'
import { useGraphStore } from './use-store'

export const useGraph = () => {
  const { setGraphs } = useGraphStore()
  const statement = useActiveStatement()

  useEffect(() => {
    if (statement) {
      setGraphs(statementToGraphs(statement))
    }
  }, [statement])

  const graphData = useGraphData()

  return { graphData }
}
