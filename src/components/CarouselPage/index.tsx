import _ from 'lodash'
import clsx from 'clsx'
import { useState, useEffect, useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Box, Center, Text, ScrollArea } from '@mantine/core'
import { Carousel, Embla } from '@mantine/carousel'
import { useMediaQuery } from '@mantine/hooks'
import { Globals } from '@react-spring/three'
import { useSpring, animated } from '@react-spring/web'
import Scene3d from 'components/Scene3d'
import StyledButton from 'components/styled/StyledButton'
import { slides } from './data'
import type { TDetail } from './data'
import './style.css'

Globals.assign({
  frameLoop: 'always',
})

type CarouselPageProps = {
  open: boolean
  slide: number
}

type DetailProps = TDetail & {
  open: boolean
  show: boolean
  active: boolean
  matches: boolean
  i: number // index
}

function Detail(props: DetailProps) {
  const { name, content, sceneProps, open, show, active, matches, i } = props
  const root = useRef<HTMLImageElement>(null)
  const showTip = active && open && !show
  const showTxt = show && open
  const animClsx = getAnimationClsx(showTxt)

  const springs = useSpring({
    height: showTxt ? 220 : 0,
    config: {
      friction: 50,
    },
  })

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
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        gap: 16,
        '& div': {
          width: '100%',
        },
      }}
    >
      <Box
        ta="center"
        className={`p-relative animate__animated animate__infinite 
                animate__breathing${i % 2 > 0 ? 3 : 2}
                animate__${i % 2 > 0 ? 'slow' : 'slower'} 
                animate__delay-${i % 5}s`}
      >
        {/* Tip */}
        {matches && showTip ? (
          <StyledButton
            className={getAnimationClsx(showTip)}
            variant="outline"
            radius="xl"
            sx={{
              position: 'relative',
              top: 64,
              animationDelay: showTip ? '500ms' : '',
            }}
          >
            {name}
          </StyledButton>
        ) : null}

        {/* Ratio: 1 */}
        <Box maw="50vh" mx="auto">
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
              <Scene3d {...sceneProps} open={show} visible={active} />
            </Box>
          </Box>
        </Box>
      </Box>
      {/* Text */}
      <animated.div style={{ ...springs, overflow: 'hidden' }}>
        <Box maw={400} ta="center" mx="auto">
          <Text
            className={animClsx}
            fz={24}
            mb={16}
            sx={{ animationDelay: showTxt ? '250ms' : '' }}
          >
            {name}
          </Text>
          <ScrollArea
            className={animClsx}
            h={88}
            mb={32}
            sx={{ animationDelay: showTxt ? '500ms' : '' }}
          >
            <Text fz="sm">{content}</Text>
          </ScrollArea>
          <StyledButton
            className={animClsx}
            variant="outline"
            radius="xl"
            sx={{ animationDelay: showTxt ? '750ms' : '' }}
          >
            进入星球
          </StyledButton>
        </Box>
      </animated.div>
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

function getAnimationClsx(show: boolean) {
  return clsx('animate__animated', `animate__${show ? 'slow' : 'fast'}`, {
    animate__fadeIn: show,
    animate__fadeOut: !show,
  })
}
