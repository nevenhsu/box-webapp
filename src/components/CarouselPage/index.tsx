import _ from 'lodash'
import { useState, useEffect, useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Box, Center } from '@mantine/core'
import { Carousel, Embla } from '@mantine/carousel'
import { useMediaQuery } from '@mantine/hooks'
import { Globals } from '@react-spring/three'
import Scene3d from 'components/Scene3d'
// models
import { Model as Cube3d } from 'models/Cube3d'
import { Model as Planet0 } from 'models/Planet0'
import { Model as Planet1 } from 'models/Planet1'
import { Model as Planet2 } from 'models/Planet2'
import { Model as Planet3 } from 'models/Planet3'
import { Model as Planet4 } from 'models/Planet4'
import { Model as Planet5 } from 'models/Planet5'
import type { SceneProps } from 'components/Scene3d'
import './style.css'

Globals.assign({
  frameLoop: 'always',
})

type CarouselPageProps = {
  open: boolean
  slide: number
}

type Detail = {
  key: string
  sceneProps: SceneProps
}

type DetailProps = Detail & {
  open: boolean
  show: boolean
  active: boolean
  matches: boolean
  i: number // index
}

const Fallback = (props: { src: string; style?: React.CSSProperties }) => (
  <img className="fallback" src={props.src} style={props.style} alt="" />
)
const slides: Detail[] = [
  {
    key: 'planet0',
    sceneProps: {
      z: 35,
      intensity: 2,
      fallback: <Fallback src="/render/planet0.png" />,
      model: <Cube3d />,
    },
  },
  {
    key: 'planet1',
    sceneProps: {
      z: 23.5,
      intensity: 2,
      fallback: <Fallback src="/render/planet1.png" />,
      model: <Cube3d />,
    },
  },
  {
    key: 'planet2',
    sceneProps: {
      z: 32,
      intensity: 0.5,
      fallback: <Fallback src="/render/planet2.png" style={{ padding: 32 }} />,
      model: <Cube3d />,
    },
  },
  {
    key: 'planet3',
    sceneProps: {
      z: 34,
      intensity: 1,
      fallback: <Fallback src="/render/planet3.png" />,
      model: <Cube3d />,
    },
  },
  {
    key: 'planet4',
    sceneProps: {
      z: 36,
      intensity: 2,
      fallback: <Fallback src="/render/planet4.png" style={{ padding: 8 }} />,
      model: <Cube3d />,
    },
  },
  {
    key: 'planet5',
    sceneProps: {
      z: 32,
      intensity: 4,
      fallback: <Fallback src="/render/planet5.png" />,
      model: <Cube3d />,
    },
  },
]

function Detail(props: DetailProps) {
  const { sceneProps, open, show, active, matches, i } = props
  const root = useRef<HTMLImageElement>(null)

  useLayoutEffect(() => {
    // loading
    const ctx = gsap.context(() => {
      const tween: gsap.TweenVars = {
        scale: open ? (show ? 1 : matches ? 0.6 : 0.95) : 0,
        duration: 0.75,
      }
      gsap.to('canvas', tween)
      gsap.to('.fallback', tween)
    }, root)
  }, [open, show, matches])

  return (
    <Center
      ref={root}
      sx={{
        height: '100%',
        width: '100%',
        '& div': {
          width: '100%',
        },
      }}
    >
      <div
        className={`p-absolute animate__animated animate__infinite 
                animate__breathing${i % 2 > 0 ? 3 : 2}
                animate__${i % 2 > 0 ? 'slow' : 'slower'} 
                animate__delay-${i % 5}s`}
      >
        {/* Ratio: 1 */}
        <Box
          sx={{
            position: 'relative',
            paddingTop: '100%',
            height: 0,
          }}
        >
          <Box
            className="absolute-center c-grab"
            sx={{
              height: '100%',
            }}
          >
            <Scene3d {...sceneProps} open={open} visible={active} />
          </Box>
        </Box>
        <Box
          sx={{
            height: '25vh',
          }}
        />
      </div>
    </Center>
  )
}

export default function CarouselPage(props: CarouselPageProps) {
  const { open } = props

  const [slide, setSlide] = useState(props.slide)
  const [embla, setEmbla] = useState<Embla | null>(null)
  const matches = useMediaQuery('(min-width: 576px)')
  const size = matches ? '40%' : '60%'

  useEffect(() => {
    if (embla) {
      embla.reInit()
    }
  }, [embla, size])

  useLayoutEffect(() => {
    if (embla) {
      embla.scrollTo(props.slide, true)
    }
  }, [embla, props.slide])

  return (
    <Box
      sx={{
        '& canvas': {
          transform: 'scale(0, 0)',
        },
      }}
    >
      <Carousel
        initialSlide={slide}
        slideGap="xs"
        slideSize={size}
        height="100vh"
        draggable={false}
        getEmblaApi={setEmbla}
        onSlideChange={(index) => setSlide(index)}
        loop
        styles={{
          controls: {
            padding: 0,
            height: '80%',
            transform: 'translateY(-50%)',
          },
          control: {
            width: matches ? '25%' : '10%',
            height: '100%',
            background: 'red',
            opacity: 0,
            '&:hover': {
              opacity: 0,
            },
          },
        }}
      >
        {slides.map((el, i) => (
          <Carousel.Slide key={el.key}>
            <Detail
              {...el}
              open={open}
              show={i === slide}
              active={isActive(i, slide)}
              matches={matches}
              i={i}
            />
          </Carousel.Slide>
        ))}
      </Carousel>
    </Box>
  )
}

function isActive(index: number, curr: number) {
  // -1, 0, 1: active
  const total = slides.length
  const prev = curr - 1
  const next = curr + 1
  return _.includes([prev, curr, next], index) || prev < 0 || next >= total
}
