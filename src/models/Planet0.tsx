/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from 'three'
import { forwardRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    赛博星球: THREE.Mesh
    ['赛博星球-发光']: THREE.Mesh
  }
  materials: {
    赛博星球: THREE.MeshPhysicalMaterial
    ['赛博星球-发光']: THREE.MeshStandardMaterial
  }
}

export const Model = forwardRef<any>(
  (props: JSX.IntrinsicElements['group'], ref) => {
    const { nodes, materials } = useGLTF(
      '/planet0.glb'
    ) as unknown as GLTFResult
    return (
      <group {...props} dispose={null} ref={ref} rotation={[Math.PI / 6, 0, 0]}>
        <directionalLight
          intensity={1}
          color="#9fe9ff"
          position={[37.79, 10.09, 63.52]}
          rotation={[-0.16, 0.53, -3.06]}
        />
        <mesh
          geometry={nodes.赛博星球.geometry}
          material={materials.赛博星球}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          geometry={nodes['赛博星球-发光'].geometry}
          material={materials['赛博星球-发光']}
          position={[1.8, 1.34, -4.36]}
          rotation={[Math.PI / 2, 0, 0]}
        />
      </group>
    )
  }
)

useGLTF.preload('/planet0.glb')
