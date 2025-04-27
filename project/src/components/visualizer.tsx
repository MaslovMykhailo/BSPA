import { Environment, OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'

export function Visualizer() {
  return (
    <div className="w-full h-[100dvh]">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.3} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} castShadow intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />

        <VisualizerPlaceholder />

        <OrbitControls
          minDistance={3}
          maxDistance={10}
          enableZoom={true}
          enablePan={false}
          autoRotate={true}
          autoRotateSpeed={1}
        />
        <Environment preset="night" />
      </Canvas>
    </div>
  )
}

function VisualizerPlaceholder() {
  return (
    <mesh>
      <sphereGeometry args={[0.75, 32, 32]} />
      <meshStandardMaterial color="#aaaaaa" wireframe={true} transparent opacity={0.5} />
    </mesh>
  )
}
