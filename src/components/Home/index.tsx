import { useRef, useLayoutEffect, useState } from 'react'
import { gsap } from 'gsap'
import { Box, Center, CloseButton, Modal } from '@mantine/core'
import CarouselPage from 'components/CarouselPage'
import TopBar from './TopBar'
import Cube from './Cube'
import Sect1 from './Sect1'
import Sect2 from './Sect2'
import Sect3 from './Sect3'
import Sect4 from './Sect4'
import Sect5 from './Sect5'
import Sect6 from './Sect6'
import { fillArray } from 'utils/helper'
import { animations } from './data'
import './style.css'

const dusts = fillArray(4)
const cubes = fillArray(6)

export default function Home() {
  const root = useRef<HTMLImageElement>(null)
  const tlRef = useRef<gsap.core.Timeline>()
  const [open, setOpen] = useState(false)

  useLayoutEffect(() => {
    // loading
    const ctx = gsap.context(() => {
      // init timeline
      const tl = gsap.timeline()
      // line
      tl.set('.line-img', { width: '0%' })
      tl.to('.line-img', { width: '100%', duration: 2.5 })
      // cube & dust
      animations.forEach((el) => {
        tl.set(el.target, { opacity: 0 }, 0)
        tl.to(el.target, { opacity: 1, duration: 0.75 }, el.sec)
      })

      gsap.to('.cube', {
        x: gsap.utils.random(-2, 2, 1, true),
        y: gsap.utils.random(-2, 2, 1, true),
        repeat: -1,
        repeatRefresh: true,
      })
    }, root)
  }, [])

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
    }, root)
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
      <TopBar />

      <Center
        ref={root}
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
            />
          </div>
        </div>

        {/* Gradient */}
        <div className="absolute-center gradient" />

        {/* Dust */}
        {dusts.map((o, i) => {
          const name = `dust${i}`
          return (
            <Cube
              key={name}
              name={name}
              size={36}
              className={`p-absolute cube ${name}`}
            />
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
              <Cube
                className="cube-img"
                onClick={handleClickCube}
                name={name}
                size={72}
              />
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

function Sections() {
  return (
    <>
      <Box px={16}>
        <Sect1 />
        <Sect2 />
        <Sect3 />
        <Sect4 />
        <Sect5 />
        <Sect6 />
      </Box>

      <Box h={120} />
    </>
  )
}
