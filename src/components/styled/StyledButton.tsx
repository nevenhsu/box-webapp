import _ from 'lodash'
import { Button, ButtonProps, createPolymorphicComponent } from '@mantine/core'
import styled from '@emotion/styled'

type StyledButtonProps = ButtonProps & {
  colorScheme?: 'dark' | 'light'
  fw?: number | string
}

const _StyledButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'colorScheme',
})<StyledButtonProps>(({ colorScheme, theme, fw }) => {
  const scheme = colorScheme || theme.colorScheme
  const isLight = scheme === 'light'
  const color = isLight ? theme.black : theme.white
  const color2 = isLight ? '#555' : '#ddd'
  return {
    color,
    borderColor: color,
    fontWeight: fw || 400,
    padding: '0 16px',
    '&:hover': {
      color: color2,
      backgroundColor: 'transparent',
    },
    '&:active': {
      backgroundColor: 'transparent',
    },
    transition: 'all 250ms',
  }
})

const StyledButton = createPolymorphicComponent<'button', StyledButtonProps>(
  _StyledButton
)

export default StyledButton
