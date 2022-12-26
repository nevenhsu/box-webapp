import { Box, Group, Text, AspectRatio, Center } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import StyledButton from 'components/styled/StyledButton'
import { ReactComponent as Svg0 } from '../../../public/images/sect4-0.svg'
import { ReactComponent as Svg1 } from '../../../public/images/sect4-1.svg'

type Anchor = {
  txt: string
  link: string
}

type CellProps = {
  key: string
  img: JSX.Element
  content: string
  links: Anchor[]
}

const data: CellProps[] = [
  {
    key: '0',
    img: <Svg0 height="100%" />,
    content:
      '学习使用Box3引擎，你可以使用我们独家研发的模型编辑器和场景编辑器，创建属于你自己的元宇宙空间。将自己的想法的商业场景创造出来，让其更加有趣和炫酷。',
    links: [
      { txt: '学习使用', link: '' },
      { txt: '开始创作', link: '' },
    ],
  },
  {
    key: '1',
    img: <Svg1 height="100%" />,
    content:
      '神奇代码岛作为box3引擎的创作者社区，每个月都有上百万的用户在其中活跃，快来加入社区，共同创作有趣有料的新项目。',
    links: [{ txt: '访问社区', link: '' }],
  },
]

function Cell(props: CellProps) {
  const { img, content, links } = props
  const matches = useMediaQuery('(min-width: 576px)')
  const matchesLarge = useMediaQuery('(min-width: 992px)')
  return (
    <>
      <AspectRatio
        ratio={matchesLarge ? 640 / 440 : 1}
        sx={{
          overflow: 'hidden',
          border: '1px solid white',
          borderRadius: 30,
          color: 'white',
        }}
      >
        <Center px={48} py={24}>
          <Box
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 24,
            }}
          >
            <Text fz="xs" fw={400}>
              {content}
            </Text>
            <Box sx={{ height: 120 }}>{img}</Box>
            <Group>
              {links.map((el) => (
                <StyledButton key={el.txt} variant="outline" radius="xl">
                  {el.txt}
                </StyledButton>
              ))}
            </Group>
          </Box>
        </Center>
      </AspectRatio>
    </>
  )
}

export default function Sect2() {
  const matches = useMediaQuery('(min-width: 576px)')
  return (
    <Group spacing={24}>
      {data.map((el) => (
        <Box
          key={el.key}
          sx={{
            width: matches ? 'calc(50% - 12px)' : '100%',
          }}
        >
          <Cell {...el} />
        </Box>
      ))}
    </Group>
  )
}
