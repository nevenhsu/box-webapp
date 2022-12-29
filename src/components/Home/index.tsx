import { useRef, useLayoutEffect, useState } from 'react'
import clsx from 'clsx'
import { gsap } from 'gsap'
import { Box, Center, CloseButton, Text } from '@mantine/core'
import { useScrollLock, useHover, useMediaQuery } from '@mantine/hooks'
import CarouselPage from 'components/CarouselPage'
import TopBar from './TopBar'
import Cube from './Cube'
import Sections from 'components/Sections'
import StyledButton from 'components/styled/StyledButton'
import { fillArray, scrollIntoView } from 'utils/helper'
import { IoAddSharp } from 'react-icons/io5'
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
  const [done, setDone] = useState(false) // animation is done
  const [slide, setSlide] = useState(1)
  const [scrollLocked, setScrollLocked] = useScrollLock()

  useLayoutEffect(() => {
    // init
    if (!initRef.current) {
      initRef.current = true
      // hide images
      gsap.set('.line-img', { width: '0%' })
      // hide header
      gsap.set('.topBar', { width: '0%', opacity: 0 })
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
        .call(() => setDone(true))
        .to('.topBar', { width: '100%', duration: 2 })
        .to('.topBar-group', { opacity: 1, duration: 1 }, 4)

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
        boxProps={{
          className: clsx('topBar', 'animate__animated', {
            animate__fadeOut: open,
            animate__fadeIn: !open && done,
          }),
        }}
        burgerProps={{
          className: clsx('animate__animated', {
            animate__fadeOut: open || matches,
            animate__fadeIn: !matches && !open && done,
          }),
          sx: {
            opacity: 0,
            animationDelay: done ? '0' : '5s',
            pointerEvents: open ? 'none' : 'auto',
          },
        }}
      />

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
            matches={matches}
            onClick={(event) => handleClickCube(event, i)}
          />
        ))}

        {/* Circle */}
        <div className="circle pointer-events-none">
          <div className="circle-div absolute-center" />
        </div>

        {/* Details */}
        <Box
          className={clsx('details', { 'pointer-events-none': !open })}
          sx={{
            position: 'fixed',
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
      </Center>

      <Sections />
    </>
  )
}

type CubeItemProps = TCube & {
  index: number
  matches: boolean
  onClick: (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => void
}
function CubeItem(props: CubeItemProps) {
  const { name, title, index, matches, onClick } = props
  const { hovered, ref } = useHover()
  const showTxt = matches && hovered

  return (
    <span
      ref={ref}
      className={`p-absolute cube ${name} c-pointer`}
      style={{
        width: 72,
        height: 72,
      }}
    >
      <span
        className={`p-absolute animate__animated animate__infinite 
      animate__breathing${index % 2 > 0 ? 3 : 2}
      animate__${index % 2 > 0 ? 'slow' : 'slower'} 
      animate__delay-${index % 5}s`}
      >
        <Cube className="cube-img" onClick={onClick} name={name} size={72} />
        {matches ? null : (
          <Text
            className="absolute-horizontal"
            fz={10}
            fw={500}
            bottom={2}
            sx={{ whiteSpace: 'nowrap' }}
          >
            {title}
          </Text>
        )}
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
