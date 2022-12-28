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
  const color = scheme === 'light' ? theme.black : theme.white
  return {
    color,
    borderColor: color,
    fontWeight: fw || 400,
    padding: '0 16px',
    '&:hover': {
      color: '#ddd',
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
