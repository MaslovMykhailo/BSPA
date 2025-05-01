import { useEffect } from 'react'

import { statementToGraphs } from '@/utils/graph'

import { useActiveStatement } from '../statements'
import { useActiveGraph, useGraphData } from './use-selector'
import { useGraphStore } from './use-store'

export const useGraph = () => {
  const { setGraphs } = useGraphStore()
  const statement = useActiveStatement()

  useEffect(() => {
    if (statement) {
      setGraphs(statementToGraphs(statement))
    }
  }, [statement])

  const graph = useActiveGraph()
  const graphData = useGraphData()

  return { graph, graphData }
}
