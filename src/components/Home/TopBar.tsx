import { useState, useEffect } from 'react'
import { Header, Burger, Drawer, Stack, Box, Group } from '@mantine/core'
import { useMantineTheme } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import StyledButton from 'components/styled/StyledButton'
import { scrollIntoView } from 'utils/helper'
import type { BoxProps, HeaderProps } from '@mantine/core'

type TopBarProps = {
  boxProps?: BoxProps
  headerProps?: HeaderProps
}

type Anchor = {
  txt: string
  link: string
}

const links: Anchor[] = [
  {
    txt: '能力优势',
    link: 'sect2',
  },
  {
    txt: '资讯',
    link: 'sect3',
  },
  {
    txt: '自由创作',
    link: 'sect4',
  },
  {
    txt: '合作伙伴',
    link: 'sect5',
  },
  {
    txt: '联系我们',
    link: 'sect6',
  },
]

export default function TopBar(props: TopBarProps) {
  const { boxProps, headerProps } = props
  const [opened, setOpened] = useState(false)
  const theme = useMantineTheme()
  const matches = useMediaQuery('(min-width: 576px)')

  const handleClick = (id: string) => {
    scrollIntoView(id)
    setOpened(false)
  }

  // turn off drawer
  useEffect(() => {
    if (opened && matches) {
      setOpened(false)
    }
  }, [opened, matches])

  return (
    <Box
      {...boxProps}
      sx={{
        position: 'fixed',
        zIndex: 100,
        overflow: 'hidden',
        ...boxProps?.sx,
      }}
    >
      <Header
        height={56}
        p="md"
        bg="transparent"
        display="flex"
        {...headerProps}
        sx={{
          width: '100vw',
          alignItems: 'center',
          justifyContent: 'space-between',
          backdropFilter: 'saturate(180%) blur(20px)',
          ...headerProps?.sx,
        }}
      >
        <Box className="c-pointer" onClick={() => handleClick('sect0')}>
          <img src="/images/logo.svg" height={12} />
        </Box>

        {matches ? (
          <Group className="topBar-group" spacing={0} opacity={0}>
            {links.map((el, i) => (
              <StyledButton
                key={`nav-${i}`}
                variant="subtle"
                sx={{
                  fontWeight: 300,
                  border: 'none',
                }}
                onClick={() => handleClick(el.link)}
              >
                {el.txt}
              </StyledButton>
            ))}
          </Group>
        ) : null}
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
              onClick={() => handleClick(el.link)}
            >
              {el.txt}
            </StyledButton>
          ))}
        </Stack>
      </Drawer>
      {matches ? null : (
        <Burger
          className="animate__animated animate__fadeIn animate__delay-1s"
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
      )}
    </Box>
  )
}
