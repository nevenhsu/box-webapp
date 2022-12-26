import numeral from 'numeral'
import { Box, Group, Text } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'

type CellProps = {
  img: string
  title: string
  value: number
  numFormat: string
  numPrefix?: string
}

const data: CellProps[] = [
  {
    img: '/images/sect1-0.svg',
    title: '空间数',
    value: 56,
    numFormat: '0,0',
  },
  {
    img: '/images/sect1-1.svg',
    title: '活跃用户',
    value: 1256778,
    numFormat: '0,0',
  },
  {
    img: '/images/sect1-2.svg',
    title: '创造GMV',
    value: 30590000,
    numFormat: '0[.]00a',
    numPrefix: '¥',
  },
]

function Cell(props: CellProps) {
  const { img, title, value, numFormat, numPrefix } = props
  return (
    <Group align="end" noWrap>
      <Box
        sx={{
          width: 110,
          border: '1px solid white',
          borderRadius: 10,
        }}
      >
        <img src={img} alt="" width="100%" />
      </Box>
      <Box>
        <Text fw={300} fz="xs">
          {title}
        </Text>
        <Text fw={300} fz={26}>
          {numPrefix}
          {numeral(value).format(numFormat).toUpperCase()}
        </Text>
      </Box>
    </Group>
  )
}

export default function Sect1() {
  const matches = useMediaQuery('(min-width: 992px)')
  return (
    <Group spacing={matches ? 96 : 32}>
      {data.map((el) => (
        <Box
          key={el.img}
          sx={{
            width: matches ? '' : '100%',
          }}
        >
          <Cell {...el} />
        </Box>
      ))}
    </Group>
  )
}
