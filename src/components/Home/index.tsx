import { useRef, useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { Center, Box, createStyles } from '@mantine/core'
import Cube from './Cube'
import { fillArray } from 'utils/helper'
import { animations } from './data'
import './style.css'

const dusts = fillArray(4)
const cubes = fillArray(6)

const useStyles = createStyles((theme) => ({}))

export default function Home() {
  const root = useRef<HTMLImageElement>(null)
  const tlRef = useRef<gsap.core.Timeline>()
  const { classes } = useStyles()

  useLayoutEffect(() => {
    // gsap scope
    const ctx = gsap.context(() => {
      // init timeline
      const tl = gsap.timeline()
      tlRef.current = tl
      // line
      tl.set('.line-img', {
        width: '0%',
      })
      tl.to('.line-img', {
        width: '100%',
        duration: 2.5,
      })
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

  return (
    <Center
      ref={root}
      sx={{ position: 'relative', width: '100vw', height: '100vh' }}
    >
      {/* Background */}
      <Box className="absolute-center line">
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
      </Box>

      {/* Dust */}
      {dusts.map((o, i) => {
        const name = `dust${i}`
        return (
          <Cube
            key={name}
            className={`p-absolute cube ${name}`}
            name={name}
            size={36}
          />
        )
      })}

      {/* Cubes */}
      {cubes.map((o, i) => {
        const name = `cube${i}`
        return (
          <Cube
            key={name}
            className={`p-absolute cube ${name}`}
            name={name}
            size={72}
          />
        )
      })}
    </Center>
  )
}
