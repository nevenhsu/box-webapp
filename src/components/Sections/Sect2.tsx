import { Tabs, Box, Text, SimpleGrid, AspectRatio } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { HiOutlineMapPin } from 'react-icons/hi2'

type CellProps = {
  img: string
  title: string
  details: string[]
  caption: string
}

const data: CellProps[] = [
  {
    img: '/images/sect2-0.png',
    title: '独家自研引擎',
    details: [
      '自主研发，基于WebGL，技术先进',
      '适用各种业务场景，可按需求定制功能',
      '自由度高，可快速创造各种数字场景',
    ],
    caption: '福建舰虚拟展馆',
  },
  {
    img: '/images/sect2-1.png',
    title: '适合各种应用场景',
    details: [
      '多端数据互通，可跨端跨平台应用',
      '无需下载，点击即用，方便快捷',
      '可快速嵌入APP、小程序、网站等',
    ],
    caption: '福建舰虚拟展馆',
  },
  {
    img: '/images/sect2-2.png',
    title: '多人同时在线',
    details: [
      '支持多人同时在线游玩，满足多功能社交',
      '场景多人联机创作，打造完善的UGC生态',
    ],
    caption: '福建舰虚拟展馆',
  },
  {
    img: '/images/sect2-3.png',
    title: '一站式解决方案',
    details: [
      '提供全方位的服务，可定制开发各种场景',
      '提供元宇宙UGC工具、数字藏品等业务模块',
      '一站式接入',
    ],
    caption: '福建舰虚拟展馆',
  },
]

function Cell(props: CellProps) {
  const { img, title, details, caption } = props
  const matches = useMediaQuery('(min-width: 768px)')

  return (
    <Box className="p-relative">
      <AspectRatio
        ratio={1260 / 870}
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

      <Text
        fz={matches ? 14 : 10}
        pl={matches ? 36 : 20}
        pr={matches ? 20 : 10}
        py={matches ? 6 : 2}
        sx={{
          position: 'absolute',
          top: matches ? 32 : 16,
          right: matches ? 32 : 16,
          borderRadius: 99,
          border: '1px solid white',
          backgroundColor: 'rgba(0,0,0,0.8)',
          '& .sect2-icon': {
            left: matches ? 16 : 10,
          },
        }}
      >
        <HiOutlineMapPin
          className="absolute-vertical sect2-icon"
          size={matches ? 16 : 10}
        />
        {caption}
      </Text>
    </Box>
  )
}

export default function Sect2() {
  const matches = useMediaQuery('(min-width: 768px)')

  return (
    <>
      <Tabs.List>
        <Tabs.Tab value="gallery">Gallery</Tabs.Tab>
        <Tabs.Tab value="messages">Messages</Tabs.Tab>
        <Tabs.Tab value="settings">Settings</Tabs.Tab>
      </Tabs.List>
      <SimpleGrid cols={matches ? 2 : 1} sx={{ gap: matches ? 40 : 24 }}>
        {data.map((el, i) => (
          <Cell {...el} />
        ))}
      </SimpleGrid>
    </>
  )
}
