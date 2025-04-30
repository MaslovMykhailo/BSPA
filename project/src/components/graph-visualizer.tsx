import { Environment, TrackballControls } from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import R3fForceGraph, { GraphMethods, LinkObject, NodeObject } from 'r3f-forcegraph'
import { useCallback, useEffect, useMemo, useRef } from 'react'

import { useGraph, useGraphData } from '@/store/graph'
import { GraphNode } from '@/types/graph'
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

function Visualizer() {
  const fgRef = useRef<GraphMethods<GraphNode>>(undefined)
  useFrame(() => fgRef.current?.tickFrame())

  const { graphData } = useGraph()
  console.log('graphData', graphData)

  useEffect(() => {
    fgRef.current?.tickFrame()
  }, [graphData])

  return (
    <R3fForceGraph
      ref={fgRef}
      graphData={graphData}
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

export function GraphVisualizer() {
  return (
    <div className="w-full h-[100dvh]">
      <Canvas flat camera={{ position: [0, 0, 1000], far: 8000 }}>
        <Environment preset="night" />
        <TrackballControls zoomSpeed={15} rotateSpeed={5} />
        {/* <color attach="background" args={[0, 0, 0.01]} /> */}
        <ambientLight color={0xcccccc} intensity={Math.PI} />
        <directionalLight intensity={0.6 * Math.PI} />

        {/* <OrbitControls
          minDistance={3}
          maxDistance={10}
          enableZoom={true}
          enablePan={false}
          autoRotate={true}
          autoRotateSpeed={1}
        /> */}

        {/* <R3fForceGraphVisualizer /> */}

        <Visualizer />
      </Canvas>
    </div>
  )
}
