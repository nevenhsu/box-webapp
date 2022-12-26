import { useState } from 'react'
import { Header, Burger } from '@mantine/core'

type TopBarProps = {}

export default function TopBar(props: TopBarProps) {
  const [opened, setOpened] = useState(false)

  return (
    <Header
      height={56}
      p="md"
      bg="transparent"
      display="flex"
      fixed
      sx={{
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <img src="/images/logo.svg" height={12} />
      <Burger opened={opened} onClick={() => setOpened((o) => !o)} size={16} />
    </Header>
  )
}
