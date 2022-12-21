import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, BakeShadows } from '@react-three/drei'
import {
  EffectComposer,
  DepthOfField,
  Bloom,
  Noise,
  Vignette,
} from '@react-three/postprocessing'
import type { Group } from 'three'

export type ModelProps = {
  renderModel: (ref: React.RefObject<Group>) => JSX.Element
}

export type Scene3dProps = ModelProps & {
  intensity: number
  z: number
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
  const { intensity, z, renderModel } = props
  return (
    <>
      <Canvas camera={{ fov: 70, position: [0, 0, z] }}>
        <OrbitControls enableZoom={false} enablePan={false} />
        <Model renderModel={renderModel} />
        <ambientLight intensity={intensity} />
        <BakeShadows />
        <EffectComposer>
          <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} />
        </EffectComposer>
      </Canvas>
    </>
  )
}
