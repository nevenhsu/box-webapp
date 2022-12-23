/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from 'three'
import { forwardRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    ['佛光星球-0']: THREE.Mesh
    ball: THREE.Mesh
  }
  materials: {
    palette: THREE.MeshStandardMaterial
    ['palette.001']: THREE.MeshPhysicalMaterial
  }
}

export const Model = forwardRef<any>(
  (props: JSX.IntrinsicElements['group'], ref) => {
    useGLTF.preload('/planet2.glb')
    const { nodes, materials } = useGLTF(
      '/planet2.glb'
    ) as unknown as GLTFResult
    return (
      <group
        {...props}
        dispose={null}
        ref={ref}
        rotation={[Math.PI / 10, Math.PI / 8, 0]}
      >
        <directionalLight
          intensity={0.5}
          color="#fae60a"
          position={[37.79, 10.09, 63.52]}
          rotation={[-0.16, 0.53, -3.06]}
        />
        <mesh
          geometry={nodes['佛光星球-0'].geometry}
          material={materials.palette}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          geometry={nodes.ball.geometry}
          material={materials['palette.001']}
          rotation={[Math.PI / 2, 0, 0]}
        />
      </group>
    )
  }
)
