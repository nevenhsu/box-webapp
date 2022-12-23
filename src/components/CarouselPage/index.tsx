import _ from 'lodash'
import { useState, useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Box, Center } from '@mantine/core'
import { Carousel } from '@mantine/carousel'
import Scene3d from 'components/Scene3d'
// models
import { Model as Planet0 } from 'models/Planet0'
import { Model as Planet1 } from 'models/Planet1'
import { Model as Planet2 } from 'models/Planet2'
import { Model as Planet3 } from 'models/Planet3'
import { Model as Planet4 } from 'models/Planet4'
import { Model as Planet5 } from 'models/Planet5'
import type { SceneProps } from 'components/Scene3d'
import './style.css'

type CarouselPageProps = {
  open: boolean
}

type Detail = {
  key: string
  sceneProps: SceneProps
}

type DetailProps = Detail & {
  open: boolean
  show: boolean
  active: boolean
}

const initialSlide = 1
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
      renderModel: (ref) => <Planet0 ref={ref} />,
    },
  },
  {
    key: 'planet1',
    sceneProps: {
      z: 23.5,
      intensity: 2,
      fallback: <Fallback src="/render/planet1.png" />,
      renderModel: (ref) => <Planet1 ref={ref} />,
    },
  },
  {
    key: 'planet2',
    sceneProps: {
      z: 32,
      intensity: 0.5,
      fallback: <Fallback src="/render/planet2.png" style={{ padding: 32 }} />,
      renderModel: (ref) => <Planet2 ref={ref} />,
    },
  },
  {
    key: 'planet3',
    sceneProps: {
      z: 34,
      intensity: 1,
      fallback: <Fallback src="/render/planet3.png" />,
      renderModel: (ref) => <Planet3 ref={ref} />,
    },
  },
  {
    key: 'planet4',
    sceneProps: {
      z: 36,
      intensity: 2,
      fallback: <Fallback src="/render/planet4.png" style={{ padding: 8 }} />,
      renderModel: (ref) => <Planet4 ref={ref} />,
    },
  },
  {
    key: 'planet5',
    sceneProps: {
      z: 32,
      intensity: 4,
      fallback: <Fallback src="/render/planet5.png" />,
      renderModel: (ref) => <Planet5 ref={ref} />,
    },
  },
]

function Detail(props: DetailProps) {
  const { sceneProps, open, show, active } = props

  const root = useRef<HTMLImageElement>(null)
  const tlRef = useRef<gsap.core.Timeline>()
  useLayoutEffect(() => {
    // loading
    const ctx = gsap.context(() => {
      // init timeline
      if (!tlRef.current) {
        tlRef.current = gsap.timeline()
      }
      const tween: gsap.TweenVars = {
        scale: show ? 1 : 0.95,
        duration: 0.75,
        delay: 1,
      }
      if (open) {
        tlRef.current.to('canvas', tween, 0)
        tlRef.current.to('.fallback', tween, 0)
      }
    }, root)
  }, [open, show])

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
      <div>
        {/* Ratio: 1 */}
        <Box
          sx={{
            position: 'relative',
            paddingTop: '100%',
            height: 0,
          }}
        >
          <Box
            className="absolute-center"
            sx={{
              height: '100%',
            }}
          >
            <Scene3d {...sceneProps} visible={active} />
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

  const root = useRef<HTMLImageElement>(null)
  const tlRef = useRef<gsap.core.Timeline>()
  const [slide, setSlide] = useState(initialSlide)

  useLayoutEffect(() => {
    // loading
    const ctx = gsap.context(() => {
      // init timeline
      if (!tlRef.current) {
        const tween: gsap.TweenVars = { scale: 1, duration: 1 }
        tlRef.current = gsap
          .timeline()
          .to('canvas', tween, 0)
          .to('.fallback', tween, 0)
      }
      if (open) {
        tlRef.current.play()
      } else {
        tlRef.current.reverse()
      }
    }, root)
  }, [open])

  return (
    <Box
      ref={root}
      sx={{
        '& canvas': {
          transform: 'scale(0, 0)',
        },
      }}
    >
      <Carousel
        initialSlide={initialSlide}
        slideGap="xs"
        slideSize="60%"
        height="100vh"
        draggable={false}
        onSlideChange={(index) => setSlide(index)}
        loop
        styles={{
          controls: {
            padding: 0,
            height: '40%',
            transform: 'translateY(-50%)',
          },
          control: {
            width: '10%',
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
