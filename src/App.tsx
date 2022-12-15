import { useRef, useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { Canvas, useFrame, extend } from '@react-three/fiber'
import { Effects, OrbitControls, BakeShadows } from '@react-three/drei'
import { UnrealBloomPass } from 'three-stdlib'
import { Model as Model0 } from 'models/Planet0'
import type { Mesh } from 'three'

extend({ UnrealBloomPass })

const Scene = () => {
  const boxRef = useRef<Mesh>(null)
  useFrame((state, delta) => {
    if (boxRef.current) {
      boxRef.current.rotation.y += 0.02
    }
  })

  return (
    <>
      <Model0 />
      <ambientLight intensity={0.12} />
    </>
  )
}

const App = () => {
  const ref = useRef<HTMLImageElement>(null)

  useLayoutEffect(() => {
    gsap.to(ref.current, {
      rotation: 360,
      repeat: -1,
      duration: 1,
      ease: 'none',
    })
  }, [])

  return (
    <>
      <img ref={ref} src="/vite.svg" className="App-logo" alt="logo" />
      <Canvas camera={{ fov: 70, position: [0, 0, 30] }}>
        <OrbitControls />
        <Scene />
        <BakeShadows />
        <Effects>
          <unrealBloomPass threshold={0.75} strength={1} radius={0.5} />
        </Effects>
      </Canvas>
    </>
  )
}

export default App
