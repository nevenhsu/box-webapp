import { Suspense, useRef } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { useSpring, animated } from '@react-spring/three'
import type { Group } from 'three'

type ModelProps = {
  model: JSX.Element
}

export type SceneProps = ModelProps & {
  z: number
  intensity: number
  fallback?: JSX.Element
}

type Scene3dProps = SceneProps & {
  visible: boolean
}

function Model(props: ModelProps) {
  const { model } = props

  const ref = useRef<Group>(null)
  const animProps = useSpring<any>({
    from: { rotation: [0, -Math.PI / 1.75, 0] },
    to: { rotation: [0, 0, 0] },
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
  const { intensity, z, fallback, visible, model } = props
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
            <Model model={model} />
          </group>
          <ambientLight intensity={intensity} visible={visible} />
          <EffectComposer>
            <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} />
          </EffectComposer>
        </Canvas>
      </Suspense>
    </ErrorBoundary>
  )
}
