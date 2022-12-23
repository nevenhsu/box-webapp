import { Suspense, useRef } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import type { Group } from 'three'

type ModelProps = {
  renderModel: (ref: React.RefObject<Group>) => JSX.Element
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

  useFrame((state, delta) => {
    // spin
    if (ref.current) {
      // ref.current.rotation.y += 0.02
    }
  })

  return <>{renderModel(ref)}</>
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
