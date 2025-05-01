import { Environment, TrackballControls } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import R3fForceGraph, { GraphData, GraphMethods, LinkObject } from 'r3f-forcegraph'
import { useCallback, useEffect, useMemo, useRef } from 'react'

import { useGraph } from '@/store/graph'
import { useHasActiveStatement } from '@/store/statements'
import { Graph, GraphNode } from '@/types/graph'
import { TransactionOperation } from '@/types/transaction'
import { createColorGenerator, formatColor, toSimilarColor } from '@/utils/color'
import { getNodesMinMaxVal, getNodeVal } from '@/utils/graph'
import { normalizeProportional } from '@/utils/normalize'
import { randomNumber } from '@/utils/random'

import { GraphNodePreview } from './graph-node-preview'

export function GraphVisualizer() {
  const hasActiveStatement = useHasActiveStatement()

  return (
    <div className="w-full h-[100dvh]">
      <Canvas flat camera={{ position: [0, 0, 500], far: 10000 }}>
        <Environment preset="night" />
        <TrackballControls zoomSpeed={15} rotateSpeed={5} minDistance={200} maxDistance={1200} />

        <ambientLight color={0xcccccc} intensity={Math.PI} />
        <directionalLight intensity={0.6 * Math.PI} />

        {hasActiveStatement ? <ForceGraphVisualizer /> : <ForceGraphVisualizerPlaceholder />}
      </Canvas>
      {hasActiveStatement && <GraphNodePreview />}
    </div>
  )
}

function ForceGraphVisualizer() {
  const fgRef = useRef<GraphMethods<GraphNode>>(undefined)
  useFrame(() => fgRef.current?.tickFrame())

  const { graph, graphData, onNodeHover } = useGraph()

  useEffect(() => {
    fgRef.current?.d3Force('link')?.distance(createLinkDistanceAccessor(graph))
    fgRef.current?.tickFrame()
  }, [graph])

  const nodeValAccessor = useNodeValAccessor(graph)

  return (
    <R3fForceGraph
      ref={fgRef}
      graphData={graphData}
      nodeVal={nodeValAccessor}
      nodeColor={nodeColorAccessor}
      nodeOpacity={0.9}
      nodeResolution={28}
      onNodeHover={onNodeHover}
    />
  )
}

function ForceGraphVisualizerPlaceholder() {
  const fgRef = useRef<GraphMethods>(undefined)
  useFrame(() => fgRef.current?.tickFrame())

  const N = useMemo(() => randomNumber(50, 150), [])
  const gData = useMemo<GraphData>(
    () => ({
      nodes: [...Array(N).keys()].map((i) => ({ id: i, label: i })),
      links: [...Array(N).keys()]
        .filter((id) => id)
        .map((id) => ({
          source: id,
          target: Math.round(Math.random() * (id - 1)),
        })),
    }),
    [N],
  )
  const nodeVal = useCallback(() => randomNumber(1, 25), [])
  const nodeColor = useCallback(() => 'white', [])

  return (
    <R3fForceGraph
      ref={fgRef}
      graphData={gData}
      nodeVal={nodeVal}
      nodeColor={nodeColor}
      nodeOpacity={0.9}
      nodeResolution={28}
    />
  )
}

const useNodeValAccessor = (graph: Graph) => useMemo(() => createNodeValAccessor(graph), [graph])

const createNodeValAccessor = (graph: Graph) => {
  const [min, max] = getNodesMinMaxVal(Object.values(graph.nodes))
  return (node: GraphNode) => normalizeProportional(getNodeVal(node), min, max)
}

const operationColors = {
  [TransactionOperation.income]: {
    hue: 160,
    saturation: 80,
    lightness: 45,
  },
  [TransactionOperation.expense]: {
    hue: 10,
    saturation: 85,
    lightness: 50,
  },
}

const operationToColor = (operation: TransactionOperation) => operationColors[operation]

const mccToColor = createColorGenerator({ saturation: 120, lightness: 50 })

const nodeColorAccessor = (node: GraphNode) => {
  switch (node.type) {
    case 'statement':
      return formatColor(operationToColor(node.statement.operation))
    case 'transaction-category':
      return formatColor(mccToColor(node.category.mcc))
    case 'transaction':
      return formatColor(toSimilarColor(node.id, mccToColor(node.transaction.mcc)))

    default:
      return 'white'
  }
}

const createLinkDistanceAccessor = (graph: Graph) => {
  const [minCategory, maxCategory] = getNodesMinMaxVal(
    Object.values(graph.nodes).filter((node) => node.type === 'transaction-category'),
  )

  return (link: LinkObject<GraphNode>) => {
    if (!link.source || typeof link.source !== 'object' || !link.target || typeof link.target !== 'object') {
      return 1
    }

    const sourceVal = getNodeVal(link.source)
    const targetVal = getNodeVal(link.target)

    return normalizeProportional(
      sourceVal + targetVal,
      minCategory * 2,
      maxCategory * 2,
      5 * (link.target.type === 'transaction' ? 5 : 1),
      100,
    )
  }
}
