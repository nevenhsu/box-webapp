import { Box, Group, Text, Stack } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'

export default function Sect6() {
  const matches = useMediaQuery('(min-width: 576px)')

  return (
    <Group sx={{ justifyContent: matches ? 'end' : 'center' }}>
      <Group
        w="100%"
        maw={720}
        sx={{
          border: '1px solid white',
          borderRadius: 900,
          justifyContent: 'space-between',
        }}
        py={48}
        px={matches ? 96 : 48}
      >
        <Stack
          fz={matches ? 'md' : 'xs'}
          w={matches ? 'calc(100% - 160px)' : 160}
          maw={448}
          spacing={matches ? 'md' : 2}
        >
          <Text fz="inherit">电话: 13484924056</Text>
          <Text fz="inherit">邮箱: maas@box.game</Text>
          <Text fz="inherit">
            地址: 广东省深圳市南山区南山街道信利康大厦30F
          </Text>
        </Stack>
        <Box>
          <Box
            w={matches ? 128 : 56}
            mb={4}
            sx={{
              overflow: 'hidden',
              borderRadius: matches ? 20 : 8,
            }}
          >
            <img width="100%" src="/images/sect6-0.png" alt="" />
          </Box>
          <Text ta="center" fz={8}>
            扫码添加微信
          </Text>
        </Box>
      </Group>
    </Group>
  )
}
