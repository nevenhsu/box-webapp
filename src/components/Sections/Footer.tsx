import { Group, Text, Box } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'

const txt0 = '版权所有 © 2022 深圳奇梦岛科技有限公司'
const txt1 = '粤公网安备 44030502009192号'
const txt2 = '粤ICP备 2022075904号-1'
const txt3 = '软著2021SR0654199'

export default function Footer() {
  const matches = useMediaQuery('(min-width: 576px)')
  const matchesLarge = useMediaQuery('(min-width: 1100px)')

  return (
    <Box py={16}>
      {matches ? (
        <Group
          fz={matchesLarge ? 16 : 12}
          sx={{ justifyContent: 'space-between' }}
          noWrap
        >
          <Text>{txt0}</Text>
          <Box sx={{ flex: 2 }} />
          <Text>{txt1}</Text>
          <Text>{txt2}</Text>
          <Text>{txt3}</Text>
        </Group>
      ) : (
        <Group sx={{ justifyContent: 'space-between' }}>
          <Box fz={10}>
            <Text>{txt0}</Text>
            <Text>{txt1}</Text>
          </Box>
          <Box fz={10}>
            <Text>{txt2}</Text>
            <Text>{txt3}</Text>
          </Box>
        </Group>
      )}
    </Box>
  )
}
