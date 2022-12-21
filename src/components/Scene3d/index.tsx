import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import type { Group } from 'three'

export type ModelProps = {
  renderModel: (ref: React.RefObject<Group>) => JSX.Element
}

export type SceneProps = ModelProps & {
  intensity: number
  z: number
}

export type Scene3dProps = SceneProps & {
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
  const { intensity, z, visible, renderModel } = props
  return (
    <Suspense fallback={null}>
      <Canvas camera={{ fov: 70, position: [0, 0, z] }}>
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
  )
}
