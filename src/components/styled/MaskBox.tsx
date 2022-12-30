import { Box } from '@mantine/core'
import type { BoxProps } from '@mantine/core'
import type { PropsWithChildren } from 'react'

type MaskBoxProps = {
  rootProps?: BoxProps
  boxProps?: BoxProps
}

export default function MaskBox(props: PropsWithChildren<MaskBoxProps>) {
  const { rootProps, boxProps, children } = props

  return (
    <Box
      {...rootProps}
      style={{
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Box style={{ visibility: 'hidden' }}>{children}</Box>
      <Box
        {...boxProps}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      >
        {children}
      </Box>
    </Box>
  )
}
