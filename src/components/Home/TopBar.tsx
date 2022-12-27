import { useState } from 'react'
import { Header, Burger, Drawer, Stack, Box } from '@mantine/core'
import { useMantineTheme } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import StyledButton from 'components/styled/StyledButton'

type Anchor = {
  txt: string
  link: string
}

const links: Anchor[] = [
  {
    txt: '能力优势',
    link: '',
  },
  {
    txt: '资讯',
    link: '',
  },
  {
    txt: '自由创作',
    link: '',
  },
  {
    txt: '合作伙伴',
    link: '',
  },
  {
    txt: '联系我们',
    link: '',
  },
]

export default function TopBar() {
  const [opened, setOpened] = useState(false)
  const theme = useMantineTheme()
  const matches = useMediaQuery('(min-width: 576px)')

  return (
    <Box
      sx={{
        position: 'fixed',
        zIndex: 100,
      }}
    >
      <Header
        height={56}
        p="md"
        bg="transparent"
        display="flex"
        sx={{
          width: '100vw',
          alignItems: 'center',
          justifyContent: 'space-between',
          backdropFilter: 'saturate(180%) blur(20px)',
        }}
      >
        <img src="/images/logo.svg" height={12} />
      </Header>
      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        position="right"
        size="sm"
        overlayColor={
          theme.colorScheme === 'dark'
            ? theme.colors.dark[9]
            : theme.colors.gray[2]
        }
        overlayOpacity={0.55}
        overlayBlur={3}
        withinPortal={false}
        withCloseButton={false}
        zIndex={200}
      >
        <Stack p={40} pt={80} spacing={24}>
          {links.map((el, i) => (
            <StyledButton
              key={`nav-${i}`}
              variant="subtle"
              sx={{
                display: 'flex',
                border: 'none',
                textAlign: 'left',
              }}
            >
              {el.txt}
            </StyledButton>
          ))}
        </Stack>
      </Drawer>
      <Burger
        opened={opened}
        onClick={() => setOpened((o) => !o)}
        size={16}
        w={24}
        h={24}
        p={4}
        sx={{
          position: 'fixed',
          right: 12,
          top: 12,
          zIndex: 201,
        }}
      />
    </Box>
  )
}
