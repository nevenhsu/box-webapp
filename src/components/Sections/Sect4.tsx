import { Box, Group, Text, AspectRatio, Center } from '@mantine/core'
import { useHover, useMediaQuery } from '@mantine/hooks'
import StyledButton from 'components/styled/StyledButton'
import { ReactComponent as Svg0 } from 'assets/sect4-0.svg'
import { ReactComponent as Svg1 } from 'assets/sect4-1.svg'

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
    img: <Svg0 width="100%" height="100%" />,
    content:
      '学习使用BOX3引擎，你可以使用我们独家研发的模型编辑器和场景编辑器，创建属于你自己的元宇宙空间。将自己的想法和场景创造出来，让其更加有趣和炫酷，并达到自己的商业目标。',
    links: [
      { txt: '学习使用', link: 'https://docs.box3.fun/' },
      { txt: '开始创作', link: 'https://docs.box3.fun/' },
    ],
  },
  {
    key: '1',
    img: <Svg1 width="100%" height="100%" />,
    content:
      '神奇代码岛，BOX3引擎的创作者社区，这里聚集了超过50万的创作者，每个月都有上百万的用户在其中活跃，快来加入社区，共同创作、交流有趣有料的项目。',
    links: [
      { txt: '访问社区', link: 'https://box3.codemao.cn/?filter=common' },
    ],
  },
]

function Cell(props: CellProps) {
  const { img, content, links } = props
  const matches = useMediaQuery('(min-width: 576px)')
  const matchesLarge = useMediaQuery('(min-width: 992px)')
  const { hovered, ref } = useHover()
  const color = hovered ? 'black' : 'white'
  return (
    <>
      <AspectRatio
        ref={ref}
        ratio={matchesLarge ? 640 / 440 : 1}
        sx={{
          overflow: 'hidden',
          border: `1px solid white`,
          borderRadius: 30,
          color,
          background: hovered ? 'white' : 'transparent',
          transition: 'all 500ms',
        }}
      >
        <Center
          pl={matchesLarge ? 48 : 0}
          pr={matchesLarge ? 24 : 0}
          py={24}
          sx={{ gap: 32 }}
        >
          <Box
            maw={256}
            h="100%"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: matchesLarge ? 'start' : 'center',
              justifyContent: 'center',
              gap: matches ? 8 : 24,
            }}
          >
            <Text fz={matches ? 16 : 12} fw={400}>
              {content}
            </Text>
            {matchesLarge ? (
              <Box h={24} />
            ) : (
              <Box sx={{ height: 120 }}>{img}</Box>
            )}
            <Group noWrap>
              {links.map((el) => (
                <StyledButton
                  component="a"
                  href={el.link}
                  key={el.txt}
                  variant="outline"
                  radius="xl"
                  fz={matches ? 16 : 12}
                  colorScheme={hovered ? 'light' : 'dark'}
                  sx={{
                    padding: '8px 24px !important',
                  }}
                >
                  {el.txt}
                </StyledButton>
              ))}
            </Group>
          </Box>
          {matchesLarge ? (
            <>
              <Box w="50%" maw={212} miw={120}>
                {img}
              </Box>
            </>
          ) : null}
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
