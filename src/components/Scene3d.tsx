import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Effects, OrbitControls, BakeShadows } from '@react-three/drei'
import { Model as Model0 } from 'models/Planet0'
import type { Mesh } from 'three'

const Scene3d = () => {
  const boxRef = useRef<Mesh>(null)

  useFrame((state, delta) => {
    if (boxRef.current) {
      boxRef.current.rotation.y += 0.02
    }
  })

  return (
    <>
      <Canvas camera={{ fov: 70, position: [0, 0, 30] }}>
        <OrbitControls />
        <Model0 />
        <ambientLight intensity={0.12} />
        <BakeShadows />
        <Effects>
          <unrealBloomPass threshold={0.75} strength={1} radius={0.5} />
        </Effects>
      </Canvas>
    </>
  )
}

export default Scene3d
