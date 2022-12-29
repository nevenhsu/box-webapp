type AnimationData = {
  target: string
  sec: number
}

export type TCube = {
  name: string
  title: string
}

const animations: AnimationData[] = [
  {
    target: '.dust0',
    sec: 2.3,
  },
  {
    target: '.dust1',
    sec: 2.4,
  },
  {
    target: '.dust2',
    sec: 2.6,
  },
  {
    target: '.dust3',
    sec: 2.7,
  },
  {
    target: '.cube0',
    sec: 2.2,
  },
  {
    target: '.cube1',
    sec: 1.5,
  },
  {
    target: '.cube2',
    sec: 2,
  },
  {
    target: '.cube3',
    sec: 2.1,
  },
  {
    target: '.cube4',
    sec: 2.4,
  },
  {
    target: '.cube5',
    sec: 2.5,
  },
]

const cubes: TCube[] = [
  { name: 'cube0', title: '区块乐园星球' },
  { name: 'cube1', title: 'BOX元宇宙' },
  { name: 'cube2', title: '智明佛学元宇宙' },
  { name: 'cube3', title: '文旅星球' },
  { name: 'cube4', title: 'UGC星球' },
  { name: 'cube5', title: '氛途星球' },
]

export { animations, cubes }
