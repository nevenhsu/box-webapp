import { useState, useEffect, useRef } from 'react'
import { Box, Text, AspectRatio } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { Carousel, Embla } from '@mantine/carousel'
import Autoplay from 'embla-carousel-autoplay'

type CellProps = {
  img: string
  imgS: string
  title: string
  details: string[]
}

const data: CellProps[] = [
  {
    img: '/images/sect2-0.png',
    imgS: '/images/sect2-0.png',
    title: '独家自研引擎',
    details: [
      '自主研发，基于WebGL，技术先进',
      '适用各种业务场景，可按需求定制功能',
      '自由度高，可快速创造各种数字场景',
    ],
  },
  {
    img: '/images/sect2-1.png',
    imgS: '/images/sect2-1-s.png',
    title: '适合各种应用场景',
    details: [
      '多端数据互通，可跨端跨平台应用',
      '无需下载，点击即用，方便快捷',
      '可快速嵌入APP、小程序、网站等',
    ],
  },
  {
    img: '/images/sect2-2.png',
    imgS: '/images/sect2-2-s.png',
    title: '多人同时在线',
    details: [
      '支持多人同时在线游玩，满足多功能社交',
      '场景多人联机创作，打造完善的UGC生态',
    ],
  },
  {
    img: '/images/sect2-3.png',
    imgS: '/images/sect2-3-s.png',
    title: '一站式解决方案',
    details: [
      '提供全方位的服务，可定制开发各种场景',
      '提供元宇宙UGC工具、数字藏品等业务模块',
      '一站式接入',
    ],
  },
]

const slides = [...data, ...data]

function Cell(props: CellProps) {
  const { img, imgS, title, details } = props
  const matches = useMediaQuery('(min-width: 576px)')
  const image = matches ? img : imgS
  return (
    <Box miw={matches ? '25vw' : '80vw'}>
      <AspectRatio
        ratio={matches ? 420 / 340 : 280 / 180}
        sx={{
          overflow: 'hidden',
          border: '1px solid white',
          borderRadius: matches ? 30 : 20,
          marginBottom: 16,
        }}
      >
        <img
          className="object-fit-cover"
          src={image}
          width="100%"
          height="100%"
          alt=""
        />
      </AspectRatio>

      <Box>
        <Text fz={matches ? 30 : 18} fw={500}>
          {title}
        </Text>

        <Box fz={matches ? 16 : 12} fw={400}>
          {details.map((el, i) => (
            <Text key={`text-${i}`} sx={{ whiteSpace: 'nowrap' }}>
              {el}
            </Text>
          ))}
        </Box>
      </Box>
    </Box>
  )
}

export default function Sect2() {
  const matches = useMediaQuery('(min-width: 576px)')
  const size = matches ? '30%' : '80%'
  const autoplay = useRef(Autoplay({ delay: 6000 }))
  const [embla, setEmbla] = useState<Embla | null>(null)

  useEffect(() => {
    if (embla) {
      embla.reInit()
    }
  }, [embla, size])

  return (
    <Carousel
      align="start"
      slideSize={size}
      slideGap={24}
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
        <Carousel.Slide key={`sect2-${i}`}>
          <Cell {...el} />
        </Carousel.Slide>
      ))}
    </Carousel>
  )
}
