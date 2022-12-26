import { Button, ButtonProps, createPolymorphicComponent } from '@mantine/core'
import styled from '@emotion/styled'

const _StyledButton = styled(Button)`
  color: ${({ theme }) =>
    theme.colorScheme === 'dark' ? theme.white : theme.black};
  border-color: ${({ theme }) =>
    theme.colorScheme === 'dark' ? theme.white : theme.black};
`

const StyledButton = createPolymorphicComponent<'button', ButtonProps>(
  _StyledButton
)

export default StyledButton
