import { useRef, useEffect, useLayoutEffect, useState } from 'react'
import _ from 'lodash'
import clsx from 'clsx'
import { gsap } from 'gsap'
import { Box, Center, CloseButton, Text, Group, Divider } from '@mantine/core'
import { useScrollLock, useHover } from '@mantine/hooks'
import { useMediaQuery, useInterval } from '@mantine/hooks'
import CarouselPage from 'components/CarouselPage'
import TopBar from './TopBar'
import Cube from './Cube'
import Sections from 'components/Sections'
import StyledButton from 'components/styled/StyledButton'
import MaskBox from 'components/styled/MaskBox'
import { fillArray, scrollIntoView } from 'utils/helper'
import { IoAddSharp } from 'react-icons/io5'
import { VscChevronDown } from 'react-icons/vsc'
import { animations, cubes } from './data'
import type { TCube } from './data'
import './style.css'

const dusts = fillArray(4)

export default function Home() {
  const tlRef = useRef<gsap.core.Timeline>()
  const initRef = useRef(false) // avoid initializing twice
  const matches = useMediaQuery('(min-width: 576px)')

  const [open, setOpen] = useState(false) // carouselPage
  const [load, setLoad] = useState(false) // line-image
  const [done, setDone] = useState(false) // loading is done
  const [slide, setSlide] = useState(1)
  const [seconds, setSeconds] = useState(0) // for Cube Txt
  const [scrollLocked, setScrollLocked] = useScrollLock()
  const interval = useInterval(() => setSeconds((s) => s + 1), 1000)
  const showIndex = getShowIndex(seconds, cubes.length)

  useEffect(() => {
    if (!load) return

    interval.start()
    return interval.stop
  }, [load])

  useEffect(() => {
    if (!open) {
      setSeconds(-5)
    }
  }, [open])

  useLayoutEffect(() => {
    // init
    if (!initRef.current) {
      initRef.current = true
      // hide images
      gsap.set('.line-img', { width: '0%' })
      // hide header
      gsap.set('.topBar', { width: '0%' })
      //  hide cube & dust
      animations.forEach((el) => {
        gsap.set(el.target, { opacity: 0 })
      })
    }
  }, [])

  useLayoutEffect(() => {
    // loading
    if (!load) return

    const ctx = gsap.context(() => {
      // init timeline
      const tl = gsap.timeline()
      // line-img & header
      tl.set('.line-img', { width: '0%' })
        .to('.line-img', {
          width: '100%',
          duration: 2.5,
        })
        .to('.topBar', { width: '100%', duration: 2 })
        .call(() => setDone(true))

      // cube & dust
      animations.forEach((el) => {
        tl.set(el.target, { opacity: 0 }, 0)
        tl.to(el.target, { opacity: 1, duration: 0.75 }, el.sec)
      })

      // // cube motion
      // gsap.to('.cube', {
      //   x: gsap.utils.random(-2, 2, 1, true),
      //   y: gsap.utils.random(-2, 2, 1, true),
      //   repeat: -1,
      //   repeatRefresh: true,
      // })
    })
  }, [load])

  useLayoutEffect(() => {
    // background
    const ctx = gsap.context(() => {
      if (!tlRef.current) {
        const delay = 0.5
        tlRef.current = gsap
          .timeline()
          .to(
            '.line-div',
            { width: '240vw', duration: 1.5, ease: 'power2.out' },
            delay
          )
          .to('.line-img', { top: '50vw', duration: 1.5 }, delay)
          .to('.gradient', { opacity: 1, duration: 0.75 }, delay)
          .to('.cube', { opacity: 0, duration: 0.75 }, delay)
      }
      if (open) {
        tlRef.current.play()
        gsap.to('.details', { opacity: 1, duration: 0.75 })
      } else {
        tlRef.current.reverse()
        gsap.to('.details', { opacity: 0, duration: 1 })
      }
    })

    // lock
    setScrollLocked(open)
    document.documentElement.style.overflow = open ? 'hidden' : ''
  }, [open])

  const handleClickCube = (
    event: React.MouseEvent<HTMLImageElement, MouseEvent>,
    index: number
  ) => {
    if (!done) return

    setOpen(true)
    setSlide(index)
    scrollIntoView('sect0')

    gsap.set('.circle', {
      x: event.clientX,
      y: event.clientY,
    })
    gsap.to('.circle', { opacity: 1, duration: 0.75 })
    gsap.to('.circle', { opacity: 0, duration: 0.5, delay: 0.5 })
  }

  return (
    <>
      <TopBar
        backdropProps={{
          className: clsx('backdrop', 'animate__animated', {
            animate__fadeOut: open,
            animate__fadeIn: !open,
          }),
        }}
        groupProps={{
          sx: {
            animationDelay: done ? '0' : '4s',
          },
        }}
        boxProps={{
          className: clsx('topBar', 'animate__animated', {
            animate__fadeOut: open,
            animate__fadeIn: !open,
          }),
          sx: {
            opacity: 0,
          },
        }}
        headerProps={{
          pl: matches ? 72 : 16,
          pr: matches ? 56 : 16,
        }}
        burgerProps={{
          className: clsx('animate__animated', {
            animate__fadeOut: open || matches,
            animate__fadeIn: !matches && !open && done,
          }),
          sx: {
            opacity: 0,
            pointerEvents: open ? 'none' : 'auto',
          },
        }}
      />

      {/* Home */}
      <Center
        id="sect0"
        sx={{ position: 'relative', width: '100vw', height: '100vh' }}
      >
        {/* Background */}
        <div className="absolute-center line">
          <div className="absolute-center line-div">
            <img
              className="line-img"
              src="/images/line.png"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
              }}
              alt=""
              onLoad={(event) => setLoad(true)}
            />
          </div>
        </div>

        {/* Subtitle */}
        {done ? <SubTitle matches={matches} open={open} /> : null}

        {/* Gradient */}
        <div className="absolute-center gradient pointer-events-none" />

        {/* Dust */}
        {dusts.map((o, i) => {
          const name = `dust${i}`
          return (
            <span
              key={name}
              className={`p-absolute cube ${name}`}
              style={{
                width: 36,
                height: 36,
              }}
            >
              <span
                className={`p-absolute animate__animated animate__infinite 
                animate__breathing${i % 2 > 0 ? 1 : 2}
                animate__${i % 2 > 0 ? 'slow' : 'slower'} 
                animate__delay-${i % 5}s`}
              >
                <Cube className="cube-img" name={name} size={36} />
              </span>
            </span>
          )
        })}

        {/* Cubes */}
        {cubes.map((o, i) => (
          <CubeItem
            {...o}
            key={o.name}
            index={i}
            showText={showIndex === i}
            matches={matches}
            done={done}
            onClick={(event) => handleClickCube(event, i)}
          />
        ))}

        {/* Circle */}
        <div className="circle pointer-events-none">
          <div className="circle-div absolute-center" />
        </div>
      </Center>

      <Sections />

      {/* Details */}
      {done ? (
        <Box
          className={clsx('details', { 'pointer-events-none': !open })}
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 100,
            width: '100vw',
            height: '100vh',
            opacity: 0,
            '& *': open
              ? {}
              : {
                  pointerEvents: 'none !important' as any,
                },
          }}
        >
          <>
            <CarouselPage open={open} slide={slide} />
            <Box
              className={clsx('animate__animated', {
                animate__fadeOut: !open,
                animate__fadeIn: open,
              })}
              sx={{
                position: 'fixed',
                zIndex: 1,
                top: 16,
                left: 16,
                border: '1px solid white',
                borderRadius: 99,
                animationDelay: '750ms',
              }}
            >
              <CloseButton onClick={() => setOpen(false)} />
            </Box>
          </>
        </Box>
      ) : null}

      {/* noise */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 2000,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none',
        }}
      >
        <img
          className="object-fit-cover"
          src="/images/noise.png"
          alt=""
          width="100%"
          height="100%"
        />
      </Box>
    </>
  )
}

type CubeItemProps = TCube & {
  index: number
  matches: boolean
  done: boolean
  showText: boolean
  onClick: (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => void
}

function CubeItem(props: CubeItemProps) {
  const { name, title, index, matches, done, showText, onClick } = props
  const { hovered, ref } = useHover()
  const showTxt = matches && done && (showText || hovered)

  return (
    <span
      ref={ref}
      className={clsx(`p-absolute cube ${name}`, { 'c-pointer': done })}
      style={{
        width: 72,
        height: 72,
      }}
    >
      <span
        className={`
      p-absolute 
      animate__animated 
      animate__infinite 
      animate__breathing${index % 2 > 0 ? 3 : 2}
      animate__${index % 2 > 0 ? 'slow' : 'slower'} 
      animate__delay-${index % 5}s`}
      >
        <span
          className={`
          animate__animated 
          animate__infinite 
          animate__breathing 
          animate__${index % 2 > 0 ? 'slow' : 'slower'} 
          animate__delay-${index % 5}s
          `}
          style={{
            display: 'block',
            width: 72,
            height: 72,
          }}
        >
          <Cube className="cube-img" onClick={onClick} name={name} size={72} />
        </span>

        {!matches && done ? (
          <Text
            className="absolute-horizontal animate__animated animate__fadeIn"
            fz={10}
            fw={500}
            bottom={2}
            sx={{ whiteSpace: 'nowrap' }}
          >
            {title}
          </Text>
        ) : null}
        <StyledButton
          className={clsx('animate__animated animate__faster', {
            animate__fadeIn: showTxt,
            animate__fadeOut: !showTxt,
          })}
          variant="outline"
          radius="xl"
          rightIcon={<IoAddSharp />}
          sx={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%) !important',
            top: -32,
          }}
        >
          {title}
        </StyledButton>
      </span>
    </span>
  )
}

type SubTitleProps = {
  matches: boolean
  open: boolean
}
function SubTitle(props: SubTitleProps) {
  const { matches, open } = props
  const root = useRef<HTMLDivElement>(null)
  const margin = matches ? 72 : 16

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap
        .timeline()
        .set('.txt', { y: '100%' })
        .to('.title0', { y: 0, opacity: 1, duration: 1.5 }, 0.5)
        .to('.title1', { y: 0, opacity: 1, duration: 1.5 }, 1)
        .to('.title2', { y: 0, opacity: 1, duration: 1.5 }, 1.75)
        .to('.arrow', { opacity: 0.8, duration: 1.5 }, 2.5)
        .to('.title0', { y: '100%', opacity: 0, duration: 1.2 }, 10)
        .to('.title1', { y: '100%', opacity: 0, duration: 1.2 }, 9.75)
        .to('.title2', { y: '100%', opacity: 0, duration: 1 }, 9.5)
    }, root)
  }, [])

  return (
    <Box
      ref={root}
      className={clsx('animate__animated', {
        animate__fadeOut: open,
        animate__fadeIn: !open,
      })}
      sx={{
        position: 'absolute',
        left: 0,
        bottom: 64,
        width: '100%',
        pointerEvents: open ? 'none' : 'auto',
      }}
    >
      <Box
        sx={{
          position: 'relative',
          left: margin,
        }}
      >
        <MaskBox>
          <Text
            className="txt title0"
            fz={matches ? 48 : 30}
            fw={300}
            lh={1.15}
            opacity={0}
          >
            {matches ? '' : '全球领先的'}
          </Text>
        </MaskBox>
        <MaskBox>
          <Text
            className="txt title1"
            fz={matches ? 48 : 30}
            fw={300}
            lh={1.15}
            opacity={0}
          >
            {matches ? '全球领先的元宇宙创作平台' : '元宇宙创作平台'}
          </Text>
        </MaskBox>
        <MaskBox>
          <Group
            className="txt title2"
            fz={matches ? 16 : 12}
            fw={300}
            mt={8}
            spacing={12}
            opacity={0}
          >
            <Text>独家引擎</Text>
            <Divider
              orientation="vertical"
              sx={{
                position: 'relative',
                top: matches ? 4 : 3,
                height: matches ? 16 : 12,
              }}
            />
            <Text>快速传播</Text>
            <Divider
              orientation="vertical"
              sx={{
                position: 'relative',
                top: matches ? 4 : 3,
                height: matches ? 16 : 12,
              }}
            />
            <Text>全平台适配</Text>
          </Group>
        </MaskBox>
      </Box>
      <Box
        className="arrow c-pointer"
        w={32}
        h={32}
        opacity={0}
        sx={{
          position: 'absolute',
          bottom: 0,
          right: margin,
          border: '1px solid white',
          borderRadius: 30,
          transition: 'opacity 500ms',
          '&:hover': {
            opacity: '1 !important',
          },
        }}
        onClick={() => scrollIntoView('sect1')}
      >
        <VscChevronDown className="absolute-center" size={16} />
      </Box>
    </Box>
  )
}

function getShowIndex(sec: number, length: number) {
  const delay = 5 // sec
  const num = _.floor(sec / delay)
  const index = num % length
  return index
}
