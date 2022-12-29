import { Model as Cube3d } from 'models/Cube3d'
import { Model as Planet0 } from 'models/Planet0'
import { Model as Planet1 } from 'models/Planet1'
import { Model as Planet2 } from 'models/Planet2'
import { Model as Planet3 } from 'models/Planet3'
import { Model as Planet4 } from 'models/Planet4'
import { Model as Planet5 } from 'models/Planet5'
import type { SceneProps } from 'components/Scene3d'

export type TDetail = {
  key: string
  name: string
  content: string
  link: string
  sceneProps: SceneProps
}

const Fallback = (props: { src: string; style?: React.CSSProperties }) => (
  <img className="fallback" src={props.src} style={props.style} alt="" />
)

const tempCont =
  'Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum  Lorem Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum  Lorem'

const slides: TDetail[] = [
  {
    key: 'planet0',
    name: '区块乐园星球',
    content: tempCont,
    link: '',
    sceneProps: {
      z: 35,
      intensity: 2,
      fallback: <Fallback src="/render/planet0.png" />,
      model: <Cube3d />,
    },
  },
  {
    key: 'planet1',
    name: 'BOX元宇宙',
    content: tempCont,
    link: '',
    sceneProps: {
      z: 23.5,
      intensity: 2,
      fallback: <Fallback src="/render/planet1.png" />,
      model: <Cube3d />,
    },
  },
  {
    key: 'planet2',
    name: '智明佛学元宇宙',
    content: tempCont,
    link: '',
    sceneProps: {
      z: 32,
      intensity: 0.5,
      fallback: <Fallback src="/render/planet2.png" style={{ padding: 32 }} />,
      model: <Cube3d />,
    },
  },
  {
    key: 'planet3',
    name: '文旅星球',
    content: tempCont,
    link: '',
    sceneProps: {
      z: 34,
      intensity: 1,
      fallback: <Fallback src="/render/planet3.png" />,
      model: <Cube3d />,
    },
  },
  {
    key: 'planet4',
    name: 'UGC星球',
    content: tempCont,
    link: '',
    sceneProps: {
      z: 36,
      intensity: 2,
      fallback: <Fallback src="/render/planet4.png" style={{ padding: 8 }} />,
      model: <Cube3d />,
    },
  },
  {
    key: 'planet5',
    name: '氛途星球',
    content: tempCont,
    link: '',
    sceneProps: {
      z: 32,
      intensity: 4,
      fallback: <Fallback src="/render/planet5.png" />,
      model: <Cube3d />,
    },
  },
]

export { slides }
