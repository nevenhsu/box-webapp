import { forwardRef } from 'react'
import { Box, Group, Text, Stack, Center } from '@mantine/core'
import { useMediaQuery, useElementSize } from '@mantine/hooks'
import { VscArrowRight, VscChromeMinimize } from 'react-icons/vsc'
import type { PropsWithChildren, Ref } from 'react'
import type { GroupProps, BoxProps } from '@mantine/core'

type CellProps = {
  img?: string
  groupProps?: GroupProps
  boxProps?: BoxProps
}

const Cell = forwardRef(
  (
    props: PropsWithChildren<CellProps>,
    ref: Ref<HTMLDivElement> | undefined
  ) => {
    const { img, groupProps, boxProps, children } = props
    const matches = useMediaQuery('(min-width: 576px)')
    return (
      <Box ref={ref}>
        <Group
          noWrap
          pl={matches ? 72 : 36}
          pr={matches ? 72 : 48}
          py={matches ? 36 : 24}
          maw={440}
          {...groupProps}
          sx={{
            border: '1px solid white',
            borderRadius: 900,
            ...groupProps?.sx,
          }}
        >
          <Box {...boxProps}>{children}</Box>
          {img ? (
            <Box
              w={matches ? 96 : 72}
              sx={{
                overflow: 'hidden',
                borderRadius: matches ? 20 : 10,
              }}
            >
              <img width="100%" src={img} alt="" />
            </Box>
          ) : null}
        </Group>
      </Box>
    )
  }
)

export default function Sect7() {
  const matches = useMediaQuery('(min-width: 576px)')
  const matchesLarge = useMediaQuery('(min-width: 992px)')
  const { ref, width, height } = useElementSize()

  return (
    <>
      <Box pb={matches ? 120 : 60}>
        <Text fz={matches ? 16 : 12}>
          Box3引擎诚邀各合作伙伴，共同探索元宇宙发展路径，一起打造中国特色元宇宙。
        </Text>
      </Box>
      <Stack spacing={matches ? 36 : 16} maw={1140}>
        <Group sx={{ justifyContent: matchesLarge ? 'start' : 'end' }}>
          <Cell
            img="/images/sect7-0.png"
            groupProps={{
              fz: matches ? 22 : 14,
            }}
          >
            <Text fz="0.72em">微信搜索</Text>
            <Text fz="inherit">「BOX3元宇宙」</Text>
            <Text fz="0.72em">或扫码关注微信公众号</Text>
          </Cell>
          <Cell
            ref={ref}
            img="/images/sect7-1.png"
            groupProps={{
              fz: matches ? 22 : 14,
            }}
          >
            <Text fz="inherit">「BOX3元宇宙」</Text>
            <Text fz="0.72em">抖音扫码关注</Text>
          </Cell>
        </Group>
        <Group sx={{ justifyContent: 'end' }}>
          <Cell
            img="/images/sect7-2.png"
            groupProps={{
              fz: matches ? 22 : 14,
            }}
          >
            <Text fz="0.72em">微信搜索</Text>
            <Text fz="inherit">「BOX3元宇宙」</Text>
            <Text fz="0.72em">或扫码关注微信公众号</Text>
          </Cell>
          <Cell
            groupProps={{
              className: 'c-pointer',
              w: width,
              h: height,
              bg: 'white',
              grow: true,
              pl: matches ? 80 : 48,
              sx: {
                '&:hover .sect7-link': {
                  transform: 'translateX(4px)',
                },
              },
            }}
          >
            <Center c="black">
              <Text ta="center" fw={300} fz={matches ? 30 : 16} pr={4}>
                bilibili
              </Text>
              <span
                className="sect7-link"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  transition: 'transform 250ms ease-out',
                }}
              >
                <VscChromeMinimize
                  size={matches ? 24 : 20}
                  style={{
                    position: 'relative',
                    right: -6,
                  }}
                />
                <VscArrowRight size={matches ? 24 : 20} />
              </span>
            </Center>
          </Cell>
        </Group>
      </Stack>
    </>
  )
}
