import { useRef, useLayoutEffect, useState } from 'react'
import clsx from 'clsx'
import { gsap } from 'gsap'
import { Box, Center, CloseButton, Modal } from '@mantine/core'
import CarouselPage from 'components/CarouselPage'
import TopBar from './TopBar'
import Cube from './Cube'
import Sections from 'components/Sections'
import { fillArray } from 'utils/helper'
import { animations } from './data'
import './style.css'

const dusts = fillArray(4)
const cubes = fillArray(6)

export default function Home() {
  const tlRef = useRef<gsap.core.Timeline>()
  const initRef = useRef(false) // avoid initializing twice
  const [open, setOpen] = useState(false) // carouselPage
  const [load, setLoad] = useState(false) // line-image
  const [done, setDone] = useState(false) // animation is done

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
    // transition
    const ctx = gsap.context(() => {
      if (!tlRef.current) {
        const delay = 0.5
        tlRef.current = gsap
          .timeline()
          .to('.line-div', { width: '240vw', duration: 1.5 }, delay)
          .to('.line-img', { top: '50vw', duration: 1.5 }, delay)
          .to('.gradient', { opacity: 1, duration: 0.75 }, delay)
          .to('.cube', { opacity: 0, duration: 0.75 }, delay)
      }
      if (open) {
        tlRef.current.play()
      } else {
        tlRef.current.reverse()
      }
    })
  }, [open])

  const handleClickCube: React.MouseEventHandler<HTMLImageElement> = (
    event
  ) => {
    setOpen(true)
    gsap.set('.circle', {
      x: event.clientX,
      y: event.clientY,
    })
    gsap.to('.circle', { opacity: 1, duration: 0.75 })
    gsap.to('.circle', { opacity: 0, duration: 0.75, delay: 0.75 })
  }

  return (
    <>
      <TopBar
        boxProps={{
          className: clsx('topBar', 'animate__animated', {
            animate__fadeOut: open,
            animate__fadeIn: !open && done,
          }),
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
        {cubes.map((o, i) => {
          const name = `cube${i}`
          return (
            <span
              key={name}
              className={`p-absolute cube ${name} c-pointer`}
              style={{
                width: 72,
                height: 72,
              }}
            >
              <span
                className={`p-absolute animate__animated animate__infinite 
                animate__breathing${i % 2 > 0 ? 3 : 2}
                animate__${i % 2 > 0 ? 'slow' : 'slower'} 
                animate__delay-${i % 5}s`}
              >
                <Cube
                  className="cube-img"
                  onClick={handleClickCube}
                  name={name}
                  size={72}
                />
              </span>
            </span>
          )
        })}

        {/* Circle */}
        <div className="circle pointer-events-none">
          <div className="circle-div absolute-center" />
        </div>

        {/* Details */}
        <Modal
          opened={open}
          onClose={() => setOpen(false)}
          fullScreen
          transitionDuration={750}
          exitTransitionDuration={1000}
          withCloseButton={false}
          styles={{
            modal: {
              background: 'transparent',
              padding: '0 !important',
            },
          }}
        >
          <>
            <CarouselPage open={open} />
            <Box
              sx={{
                position: 'fixed',
                zIndex: 1,
                top: 20,
                left: 24,
                border: '1px solid white',
                borderRadius: 99,
              }}
            >
              <CloseButton onClick={() => setOpen(false)} />
            </Box>
          </>
        </Modal>
      </Center>

      <Sections />
    </>
  )
}
