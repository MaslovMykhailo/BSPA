import { useCallback, useEffect } from 'react'

import { GraphNode } from '@/types/graph'
import { statementToGraphs } from '@/utils/graph'

import { useActiveStatement } from '../statements'
import { useActiveGraph, useGraphData } from './use-selector'
import { useGraphStore } from './use-store'

export const useGraph = () => {
  const statement = useActiveStatement()
  const { setGraphs, setPreviewNodeId, resetPreviewNodeId } = useGraphStore()

  useEffect(() => {
    if (statement) {
      setGraphs(statementToGraphs(statement))
    }
  }, [statement])

  const graph = useActiveGraph()
  const graphData = useGraphData()

  useEffect(() => {
    const rootNode = Object.values(graph.nodes).find((node) => node.type === 'statement')

    if (rootNode) {
      setPreviewNodeId(rootNode.id)
    } else {
      resetPreviewNodeId()
    }
  }, [graph])

  const onNodeHover = useCallback((node: GraphNode | null) => {
    if (node) {
      setPreviewNodeId(node.id)
    } else {
      resetPreviewNodeId()
    }
  }, [])

  return { graph, graphData, onNodeHover }
}
