import { GraphData } from 'r3f-forcegraph'
import { useMemo } from 'react'

import { GraphNode } from '@/types/graph'

import { useGraphStore } from './use-store'

export const useActiveGraph = () => {
  const graphs = useGraphStore.use.graphs()
  const activeGraph = useGraphStore.use.activeGraph()
  return useMemo(() => graphs[activeGraph], [graphs, activeGraph])
}

export const useGraphData = () => {
  const graph = useActiveGraph()
  return useMemo<GraphData<GraphNode>>(
    () => ({
      nodes: Object.values(graph.nodes),
      links: Object.entries(graph.links).flatMap(([source, targets]) =>
        targets.map((target) => ({
          source: graph.nodes[source],
          target: graph.nodes[target],
        })),
      ),
    }),
    [graph],
  )
}

export const usePreviewNode = () => {
  const graph = useActiveGraph()
  const previewNodeId = useGraphStore.use.previewNodeId()
  return useMemo(() => (previewNodeId ? graph.nodes[previewNodeId] : undefined), [previewNodeId, graph])
}
