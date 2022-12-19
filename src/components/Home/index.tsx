import { useRef, useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { Center, Box, createStyles } from '@mantine/core'
import Cube from './Cube'
import { fillArray } from 'utils/helper'

const dusts = fillArray(4)
const cubes = fillArray(6)

const useStyles = createStyles((theme) => ({
  item: {
    position: 'absolute',
  },
}))

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
      // start line
      tl.set('.line', {
        width: '100%',
      })
      // start dust
      tl.set('.dust0', {
        top: '30%',
        left: '29%',
      })
      tl.set('.dust1', {
        top: '28%',
        right: '29%',
      })
      tl.set('.dust2', {
        top: '44%',
        left: '3%',
      })
      tl.set('.dust3', {
        top: '41%',
        right: '1%',
      })
      // start cube
      tl.set('.cube0', {
        top: '29%',
        left: '9%',
      })
      tl.set('.cube1', {
        top: '30%',
      })
      tl.set('.cube2', {
        top: '27%',
        right: '8%',
      })
      tl.set('.cube3', {
        top: '42%',
        left: '13%',
      })
      tl.set('.cube4', {
        top: '45%',
        right: '38%',
      })
      tl.set('.cube5', {
        top: '40%',
        right: '11%',
      })
    }, root)
  }, [])

  return (
    <Center
      ref={root}
      sx={{ position: 'relative', width: '100vw', height: '100vh' }}
    >
      {/* Background */}
      <Box
        className="absolute-center"
        sx={{
          width: '160vw',
          textAlign: 'center',
        }}
      >
        <img
          className="line"
          src="/images/line.png"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
          }}
        />
      </Box>

      {/* Dust */}
      {dusts.map((o, i) => {
        const name = `dust${i}`
        return (
          <Cube
            key={name}
            className={`${classes.item} ${name} dust`}
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
            className={`${classes.item} ${name} cube`}
            name={name}
            size={72}
          />
        )
      })}
    </Center>
  )
}
