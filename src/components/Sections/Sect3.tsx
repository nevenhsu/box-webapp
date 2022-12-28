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
    title: '元宇宙服务新篇章',
    detail: '奇梦岛BOX3引擎助元宇宙进入"万乡千城"',
    link: '',
  },
  {
    img: '/images/sect3-1.png',
    title: '2022年中国元宇宙政策汇编',
    detail: '在国家层面，中央纪委国家监委曾于...',
    link: '',
  },
  {
    img: '/images/sect3-2.png',
    title: '元宇宙服务新篇章',
    detail: '奇梦岛BOX3引擎助元宇宙进入"万乡千城"',
    link: '',
  },
  {
    img: '/images/sect3-3.png',
    title: '2022年中国元宇宙政策汇编',
    detail: '在国家层面，中央纪委国家监委曾于...',
    link: '',
  },
  {
    img: '/images/sect3-4.png',
    title: '元宇宙服务新篇章',
    detail: '奇梦岛BOX3引擎助元宇宙进入"万乡千城"',
    link: '',
  },
  {
    img: '/images/sect3-5.png',
    title: '2022年中国元宇宙政策汇编',
    detail: '在国家层面，中央纪委国家监委曾于...',
    link: '',
  },
]

function Cell(props: CellProps) {
  const { img, title, detail, link } = props
  // TODO: add link
  return (
    <>
      <AspectRatio
        ratio={340 / 235}
        sx={{
          overflow: 'hidden',
          border: '1px solid white',
          borderRadius: 10,
          marginBottom: 24,
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
          <Text fz="lg" fw={500} lineClamp={1}>
            {title}
          </Text>
          <Text fz="xs" fw={400} lineClamp={1}>
            {detail}
          </Text>
        </Box>
        <StyledButton variant="outline" radius="xl">
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
