import { useState, useEffect, useRef } from 'react'
import { Image } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { Carousel, Embla } from '@mantine/carousel'
import Autoplay from 'embla-carousel-autoplay'

type CellProps = {
  img: string
}

const data: CellProps[] = [
  {
    img: '/images/sect5-0.png',
  },
  {
    img: '/images/sect5-1.png',
  },
  {
    img: '/images/sect5-2.png',
  },
  {
    img: '/images/sect5-3.png',
  },
  {
    img: '/images/sect5-4.png',
  },
]

function Cell(props: CellProps) {
  const { img } = props
  const matches = useMediaQuery('(min-width: 576px)')
  return (
    <>
      <Image
        src={img}
        width="100%"
        alt=""
        sx={{
          overflow: 'hidden',
          border: '1px solid white',
          borderRadius: matches ? 30 : 20,
        }}
      />
    </>
  )
}

export default function Sect5() {
  const matches = useMediaQuery('(min-width: 576px)')
  const size = matches ? '16.66%' : '27.5%'
  const autoplay = useRef(Autoplay({ delay: 2000 }))
  const [embla, setEmbla] = useState<Embla | null>(null)

  useEffect(() => {
    if (embla) {
      embla.reInit()
    }
  }, [embla, size])

  return (
    <>
      <Carousel
        align="start"
        slideSize={size}
        slideGap={matches ? 'md' : 'xs'}
        withControls={false}
        loop
        dragFree
        getEmblaApi={setEmbla}
        plugins={[autoplay.current]}
        onMouseEnter={autoplay.current.stop}
        onMouseLeave={() => autoplay.current.play()}
      >
        {[...data, ...data].map((el, i) => (
          <Carousel.Slide key={`sect5-${i}`}>
            <Cell {...el} />
          </Carousel.Slide>
        ))}
      </Carousel>
    </>
  )
}
