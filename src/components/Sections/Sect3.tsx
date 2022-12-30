import { Box, Group, Text, AspectRatio } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import StyledButton from 'components/styled/StyledButton'

type CellProps = {
  img: string
  title: string
  detail: string
  link: string
}

const data: CellProps[] = [
  {
    img: '/images/sect3-0.png',
    title: '元宇宙如何改写人类社会生活',
    detail: '2021年12月23日，中央纪委国家监委网站发…',
    link: 'https://www.ccdi.gov.cn/toutiaon/202112/t20211223_160087.html',
  },
  {
    img: '/images/sect3-1.png',
    title: '万乡千城，在BOX3元宇宙…',
    detail: '奇梦岛科技原创自主研发的BOX3元宇宙引擎将为…',
    link: 'https://mp.weixin.qq.com/s/NmS5PXPAUWyWzhvbBfaFFg',
  },
  {
    img: '/images/sect3-2.png',
    title: '各地元宇宙相关政策汇总',
    detail: '自元宇宙概念火爆以来，多个城市加速布局相关产业…',
    link: 'https://c.m.163.com/news/a/HEDFN4TP0553E2FB.html',
  },
  {
    img: '/images/sect3-3.png',
    title: '开门大“机”！福建舰主题景…',
    detail: '基于BOX3元宇宙引擎搭建的福建舰主题景区正式…',
    link: 'https://mp.weixin.qq.com/s/LXSlwXSyULSlcU62qgboVg',
  },
  {
    img: '/images/sect3-4.png',
    title: '当广州遇上BOX3——看得见…',
    detail: '当广州遇上BOX3元宇宙，又能擦出什么样的火花…',
    link: 'https://mp.weixin.qq.com/s/_T_K9MKmyeL36_YBk6Y_QA',
  },
  {
    img: '/images/sect3-5.png',
    title: '2022年中国元宇宙政策汇编',
    detail: '竞逐元宇宙赛道，将给城市数字经济发展带来很大的…',
    link: 'http://gxxxzx.gxzf.gov.cn/jczxfw/dsjfzyj/t12993139.shtml',
  },
]

function Cell(props: CellProps) {
  const { img, title, detail, link } = props
  const matches = useMediaQuery('(min-width: 576px)')
  return (
    <>
      <AspectRatio
        ratio={340 / 235}
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
      <Group noWrap sx={{ justifyContent: 'space-between' }}>
        <Box>
          <Text fz={matches ? 30 : 18} fw={500} lineClamp={1}>
            {title}
          </Text>
          <Text fz={matches ? 16 : 12} fw={400} lineClamp={1}>
            {detail}
          </Text>
        </Box>
        <StyledButton component="a" href={link} variant="outline" radius="xl">
          继续阅读
        </StyledButton>
      </Group>
    </>
  )
}

export default function Sect1() {
  const matches = useMediaQuery('(min-width: 576px)')
  return (
    <Group spacing={matches ? 24 : 56}>
      {data.map((el) => (
        <Box
          key={el.img}
          sx={{
            width: matches ? 'calc(50% - 12px)' : '100%',
            paddingBottom: matches ? 48 : 0,
          }}
        >
          <Cell {...el} />
        </Box>
      ))}
    </Group>
  )
}
