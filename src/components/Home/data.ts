import { slides } from '../CarouselPage/data'

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

const cubes: TCube[] = slides.map((el, i) => ({
  name: `cube${i}`,
  title: el.name,
}))

export { animations, cubes }
