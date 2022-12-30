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
      z: 26,
      intensity: 2,
      fallback: <Fallback src="/render/planet0.png" />,
      model: <Planet0 />,
    },
  },
  {
    key: 'planet1',
    name: 'BOX元宇宙',
    content: tempCont,
    link: '',
    sceneProps: {
      z: 22.5,
      intensity: 2,
      fallback: <Fallback src="/render/planet1.png" />,
      model: <Planet1 />,
    },
  },
  {
    key: 'planet2',
    name: '智明佛学元宇宙',
    content: tempCont,
    link: '',
    sceneProps: {
      z: 28,
      intensity: 0.5,
      fallback: <Fallback src="/render/planet2.png" style={{ padding: 32 }} />,
      model: <Planet2 />,
    },
  },
  {
    key: 'planet3',
    name: '文旅星球',
    content: tempCont,
    link: '',
    sceneProps: {
      z: 28,
      intensity: 1,
      fallback: <Fallback src="/render/planet3.png" />,
      model: <Planet3 />,
    },
  },
  {
    key: 'planet4',
    name: 'UGC星球',
    content: tempCont,
    link: '',
    sceneProps: {
      z: 28,
      intensity: 2,
      fallback: <Fallback src="/render/planet4.png" style={{ padding: 8 }} />,
      model: <Planet4 />,
    },
  },
  {
    key: 'planet5',
    name: '氛途星球',
    content: tempCont,
    link: '',
    sceneProps: {
      z: 26,
      intensity: 4,
      fallback: <Fallback src="/render/planet5.png" />,
      model: <Planet5 />,
    },
  },
]

export { slides }
