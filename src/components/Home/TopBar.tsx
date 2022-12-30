import clsx from 'clsx'
import { useState, useEffect } from 'react'
import { Header, Burger, Drawer, Stack, Box, Group } from '@mantine/core'
import { useMantineTheme } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import StyledButton from 'components/styled/StyledButton'
import { scrollIntoView } from 'utils/helper'
import type { BoxProps, HeaderProps } from '@mantine/core'
import type { BurgerProps, GroupProps } from '@mantine/core'

type TopBarProps = {
  backdropProps?: BoxProps
  boxProps?: BoxProps
  headerProps?: HeaderProps
  burgerProps?: Omit<BurgerProps, 'opened'>
  groupProps?: GroupProps
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
  const { backdropProps, boxProps, headerProps, burgerProps, groupProps } =
    props
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
    <>
      <Box
        {...backdropProps}
        sx={{
          position: 'fixed',
          zIndex: 50,
          width: '100vw',
          height: 56,
          ...backdropProps?.sx,
        }}
      />
      <Box
        {...boxProps}
        sx={(theme) =>
          ({
            position: 'fixed',
            zIndex: 100,
            overflow: 'hidden',
            borderBottom: `1px solid ${theme.colors.dark[5]}`,
            ...boxProps?.sx,
          } as any)
        }
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
            borderBottom: 'none',
            ...headerProps?.sx,
          }}
        >
          <Box className="c-pointer" onClick={() => handleClick('sect0')}>
            <img src="/images/logo.svg" height={12} />
          </Box>

          {matches ? (
            <Group
              spacing={0}
              opacity={0}
              {...groupProps}
              className={clsx(
                'animate__animated animate__fadeIn animate__slower',
                groupProps?.className
              )}
            >
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
      </Box>
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
          opened={opened}
          onClick={() => setOpened((o) => !o)}
          size={16}
          w={24}
          h={24}
          p={4}
          {...burgerProps}
          sx={{
            position: 'fixed',
            right: 12,
            top: 16,
            zIndex: 201,
            ...burgerProps?.sx,
          }}
        />
      )}
    </>
  )
}
