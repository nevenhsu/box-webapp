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
    name: '展会星球',
    content:
      '元宇宙展会正在成为线下展会的替代或延伸，通过构建线上的数字空间，可以低成本高效率的展示企业或品牌的产品与优势。BOX3引擎为多个合作伙伴提供解决方案，构建线上展览空间，共同探索新的数字化营销模式。',
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
    name: 'UGC星球',
    content:
      '神奇代码岛，是BOX3团队研发运营的创作平台，免费使用BOX3的工具引擎，可以低门槛、高效率地创作各种场景，你也可以实现自己的创作梦，在元宇宙中还原现实或者你想象的场景。目前已有超过50万创作者在神奇代码岛创作和交流，产出了数量众多的优质作品。',
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
    name: '文娱星球',
    content:
      '人们正在通过元宇宙开启数字化文娱的新时代，一种更加便捷有趣的文娱形式，结合沉浸式的场景和有趣的体验，将文化IP和内容，更好的展现在用户面前。',
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
    name: '城市品牌',
    content:
      '在元宇宙中体验自己的家乡城市或者感受千里之外的另一个城市是什么体验？在BOX3，我们可以打破线下空间的限制，各个城市可以将自己的城市文化和特色，在数字世界中进行呈现。用户也可以足不出户，感受各地的风俗文化，甚至深入参与当地的文化活动。',
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
    name: '文旅星球',
    content:
      '元宇宙可作为真实场景的模拟概览，可完成实体旅游景点的一对映射以及虚拟世界的游玩体验。应用Box3引擎，既能充分展现文旅项目的特点，也能充分发挥想象，打造超越现实世界的游玩体验。',
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
    name: '企业品牌',
    content:
      'BOX3引擎帮助企业搭建元宇宙空间，借助数字空间，赋能企业原有业务，提升项目价值，结合元宇宙，企业可以构建自己的线上生态，加强与用户的关联，拓展自身的业务方向等。',
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
