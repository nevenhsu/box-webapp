import { Suspense, useRef } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { useSpring, animated } from '@react-spring/three'
import type { Group } from 'three'

type Model = {
  model: JSX.Element
}

type ModelProps = {
  model: JSX.Element
  open: boolean
}

export type SceneProps = Model & {
  z: number
  intensity: number
  fallback?: JSX.Element
}

type Scene3dProps = SceneProps & {
  visible: boolean
  open: boolean
}

function Model(props: ModelProps) {
  const { model, open } = props

  const ref = useRef<Group>(null)
  const animProps = useSpring<any>({
    rotation: open ? [0, 0, 0] : [0, -Math.PI / 1.75, 0],
    config: {
      mass: 2,
      friction: 25,
      tension: 100,
    },
  })

  useFrame((state, delta) => {
    // spin
    if (ref.current) {
      ref.current.rotation.y += delta / 8
    }
  })

  return (
    <>
      <animated.group ref={ref} {...animProps}>
        {model}
      </animated.group>
    </>
  )
}

export default function Scene3d(props: Scene3dProps) {
  const { intensity, z, fallback, visible, model, open } = props
  return (
    <ErrorBoundary
      FallbackComponent={(error) => {
        console.error(error)
        return <>{fallback ?? null}</>
      }}
    >
      <Suspense fallback={fallback ?? null}>
        <Canvas className="canvas" camera={{ fov: 70, position: [0, 0, z] }}>
          <OrbitControls enableZoom={false} enablePan={false} />
          <group visible={visible}>
            <Model model={model} open={open} />
          </group>
          <ambientLight intensity={intensity} />
          <EffectComposer>
            <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} />
          </EffectComposer>
        </Canvas>
      </Suspense>
    </ErrorBoundary>
  )
}
