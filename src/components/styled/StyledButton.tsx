import { Button, ButtonProps, createPolymorphicComponent } from '@mantine/core'
import styled from '@emotion/styled'

type StyledButtonProps = ButtonProps & {
  colorScheme?: 'dark' | 'light'
}

const _StyledButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'colorScheme',
})<StyledButtonProps>(({ colorScheme, theme }) => {
  const scheme = colorScheme || theme.colorScheme
  const color = scheme === 'light' ? theme.black : theme.white
  return {
    color,
    borderColor: color,
    fontWeight: 400,
  }
})

const StyledButton = createPolymorphicComponent<'button', StyledButtonProps>(
  _StyledButton
)

export default StyledButton
