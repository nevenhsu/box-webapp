import { useState, useEffect, useRef } from 'react'
import { Image } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { Carousel, Embla } from '@mantine/carousel'
import Autoplay from 'embla-carousel-autoplay'
import { fillArray } from 'utils/helper'

type CellProps = {
  img: string
}

const data: CellProps[] = fillArray(11).map((o, i) => ({
  img: `/images/sect5-${i}.png`,
}))
const slides = [...data, ...data]

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
        onMouseDown={autoplay.current.stop}
        onMouseUp={() => autoplay.current.play()}
        onTouchStart={autoplay.current.stop}
        onTouchEnd={() => autoplay.current.play()}
      >
        {slides.map((el, i) => (
          <Carousel.Slide key={`sect5-${i}`}>
            <Cell {...el} />
          </Carousel.Slide>
        ))}
      </Carousel>
    </>
  )
}
