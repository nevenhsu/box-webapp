import { useState, useEffect, useRef } from 'react'
import { Box, Text, AspectRatio } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { Carousel, Embla } from '@mantine/carousel'
import Autoplay from 'embla-carousel-autoplay'

type CellProps = {
  img: string
  title: string
  detail: string
}

const data: CellProps[] = [
  {
    img: '/images/sect2-0.png',
    title: '独家自研引擎',
    detail:
      '自主研发，基于WebGL，技术先进适用各种业务场景，可按需求定制功能自由度高，可快速创造各种数字场景',
  },
  {
    img: '/images/sect2-1.png',
    title: '适合各种应用场景',
    detail:
      '多端数据互通，可跨端跨平台应用无需下载，点击即用，方便快捷可快速嵌入APP、小程序、网站等',
  },
  {
    img: '/images/sect2-2.png',
    title: '多人同时在线',
    detail:
      '支持多人同时在线游玩，满足多功能社交场景多人联机创作，打造完善的UGC生态',
  },
  {
    img: '/images/sect2-3.png',
    title: '一站式解决方案',
    detail:
      '提供全方位的服务，可定制开发各种场景提供元宇宙UGC工具、数字藏品等业务模块一站式接入',
  },
]

function Cell(props: CellProps) {
  const { img, title, detail } = props
  const matches = useMediaQuery('(min-width: 576px)')
  return (
    <>
      <AspectRatio
        ratio={282 / 182}
        sx={{
          overflow: 'hidden',
          border: '1px solid white',
          borderRadius: matches ? 30 : 20,
          marginBottom: 16,
        }}
      >
        <img
          className="object-fit-cover"
          src={img}
          width="100%"
          height="100%"
          alt=""
        />
      </AspectRatio>

      <Box>
        <Text fz={matches ? 30 : 18} fw={500}>
          {title}
        </Text>
        <Text fz={matches ? 16 : 12} fw={400} maw={matches ? 288 : 212}>
          {detail}
        </Text>
      </Box>
    </>
  )
}

export default function Sect2() {
  const matches = useMediaQuery('(min-width: 576px)')
  const size = matches ? '40%' : '80%'
  const autoplay = useRef(Autoplay({ delay: 3000 }))
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
      slideGap="md"
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
      {data.map((el, i) => (
        <Carousel.Slide key={`sect2-${i}`}>
          <Cell {...el} />
        </Carousel.Slide>
      ))}
    </Carousel>
  )
}
