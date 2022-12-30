import { Box, Text, Divider } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import Sect1 from './Sect1'
import Sect2 from './Sect2'
import Sect3 from './Sect3'
import Sect4 from './Sect4'
import Sect5 from './Sect5'
import Sect6 from './Sect6'
import Sect7 from './Sect7'
import Footer from './Footer'
import type { BoxProps } from '@mantine/core'

type TitleProps = {
  title: string
  subtitle: string
  boxProps?: BoxProps
}
function Title(props: TitleProps) {
  const { title, subtitle, boxProps } = props
  const matches = useMediaQuery('(min-width: 576px)')
  return (
    <Box mb={matches ? 80 : 64} {...boxProps}>
      <Text fw={300} fz={matches ? 60 : 30}>
        {title}
      </Text>
      <Text fw={300} fz={matches ? 40 : 16}>
        {subtitle.toUpperCase()}
      </Text>
    </Box>
  )
}

export default function Sections() {
  const matches = useMediaQuery('(min-width: 576px)')
  const m = matches ? 160 : 80
  return (
    <>
      <Box px={matches ? 72 : 16}>
        <Divider id="sect1" mb={m} />
        <Sect1 />
        <Divider id="sect2" my={m} />
        <Title title="能力优势" subtitle="Advantages" />
        <Sect2 />
        <Divider id="sect3" my={m} />
        <Title title="资讯" subtitle="News" />
        <Sect3 />
        <Divider id="sect4" my={m} />
        <Title title="自由创作" subtitle="Free Creation" />
        <Sect4 />
        <Divider id="sect5" my={m} />
        <Title title="合作伙伴" subtitle="Partnership" />
        <Sect5 />
        <Divider id="sect6" my={m} />
        <Title title="联系方式" subtitle="Contact" />
        <Sect6 />
        <Divider my={m} />
        <Title
          title="合作邀请"
          subtitle="Business Cooperation"
          boxProps={{ mb: 24 }}
        />
        <Sect7 />
        <Divider mt={m} />
        <Footer />
      </Box>

      {/* <Box h={120} /> */}
    </>
  )
}
