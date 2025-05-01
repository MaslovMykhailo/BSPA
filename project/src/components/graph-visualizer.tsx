import { Environment, TrackballControls } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import R3fForceGraph, { GraphMethods, LinkObject } from 'r3f-forcegraph'
import { useCallback, useEffect, useMemo, useRef } from 'react'

import { useGraph } from '@/store/graph'
import { Graph, GraphNode } from '@/types/graph'
import { TransactionOperation } from '@/types/transaction'
import { createColorGenerator, formatColor, toSimilarColor } from '@/utils/color'
import { getNodesMinMaxVal, getNodeVal } from '@/utils/graph'
import { normalizeProportional } from '@/utils/normalize'
// import * as THREE from 'three'

// interface R3fForceGraphVisualizerProps {
//   graphData: any
//   onNodeClick: (node: any) => void
// }

/* eslint-disable @typescript-eslint/no-explicit-any */
function R3fForceGraphVisualizer() {
  const fgRef = useRef<GraphMethods<GraphNode>>(null)
  useFrame(() => {
    fgRef.current?.tickFrame()
    // fgRef.current?.tickFrame()
  })

  const N = 200
  const gData = useMemo(
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

  return (
    <R3fForceGraph
      ref={fgRef}
      graphData={gData}
      nodeColor={() => 'white'}
      // nodeId={(node) => node.id}
      // nodeRelSize={10}
      // nodeVal={() => 1000}
      // linkWidth={() => 10}
      // lin
      // linkDirectionalParticles={() => 4}
      // linkDirectionalParticleWidth={4}
      onNodeHover={useCallback((...args: any[]) => console.log('node hover', ...args), [])}
      onLinkHover={useCallback((...args: any[]) => console.log('link hover', ...args), [])}
      onNodeClick={useCallback((...args: any[]) => console.log('node click', ...args), [])}
      onLinkClick={useCallback((...args: any[]) => console.log('link click', ...args), [])}
      // nodeThreeObject={(node) =>
      //   new THREE.Mesh(
      //     new THREE.SphereGeometry(Math.random() * 10),
      //     new THREE.MeshLambertMaterial({
      //       color: Math.round(Math.random() * Math.pow(2, 24)),
      //       transparent: true,
      //       opacity: 0.8,
      //     }),
      //   )
      // }
    />
  )
}

function ForceGraphVisualizer() {
  const fgRef = useRef<GraphMethods<GraphNode>>(undefined)
  useFrame(() => fgRef.current?.tickFrame())

  const { graph, graphData } = useGraph()

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
      nodeOpacity={0.8}
      nodeResolution={28}
      onNodeHover={useCallback((...args: any[]) => console.log('node hover', ...args), [])}
      onLinkHover={useCallback((...args: any[]) => console.log('link hover', ...args), [])}
      onNodeClick={useCallback((...args: any[]) => console.log('node click', ...args), [])}
      onLinkClick={useCallback((...args: any[]) => console.log('link click', ...args), [])}
    />
  )
}

export function GraphVisualizer() {
  return (
    <div className="w-full h-[100dvh]">
      <Canvas flat camera={{ position: [0, 0, 500], far: 10000 }}>
        <Environment preset="night" />
        <TrackballControls zoomSpeed={15} rotateSpeed={5} minDistance={200} maxDistance={2000} />

        <ambientLight color={0xcccccc} intensity={Math.PI} />
        <directionalLight intensity={0.6 * Math.PI} />

        <ForceGraphVisualizer />
        {/* <R3fForceGraphVisualizer /> */}
      </Canvas>
    </div>
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
