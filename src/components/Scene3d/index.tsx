import { Suspense, useRef, useLayoutEffect } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { useSpring, animated, to } from '@react-spring/three'
import type { Group } from 'three'

type ModelProps = {
  renderModel: (
    ref: React.RefObject<Group>,
    props?: JSX.IntrinsicElements['group']
  ) => JSX.Element
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
  const { renderModel } = props

  const ref = useRef<Group>(null)
  const { rotation } = useSpring({
    from: { rotation: -Math.PI / 1.75 },
    to: { rotation: 0 },
    config: {
      // mass: 5,
      // friction: 1000,
      // tension: 200,
    },
  })

  useLayoutEffect(() => {
    // init
    if (ref.current) {
      ref.current.rotation.y = 0
    }
  }, [])

  useFrame((state, delta) => {
    // spin
    if (ref.current) {
      // ref.current.rotation.y += delta / 4
    }
  })

  return (
    <>
      {/* @ts-ignore */}
      <animated.group rotation={to(rotation, (value) => [0, value, 0])}>
        {renderModel(ref)}
      </animated.group>
    </>
  )
}

export default function Scene3d(props: Scene3dProps) {
  const { intensity, z, fallback, visible, renderModel } = props
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
            <Model renderModel={renderModel} />
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
