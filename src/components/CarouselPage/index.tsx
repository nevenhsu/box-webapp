import { useState } from 'react'
import { Box, Center } from '@mantine/core'
import { Carousel } from '@mantine/carousel'
import Scene3d from 'components/Scene3d'
// models
import { Model as Planet0 } from 'models/Planet0'
import { Model as Planet1 } from 'models/Planet1'
import { Model as Planet2 } from 'models/Planet2'
import { Model as Planet3 } from 'models/Planet3'
import { Model as Planet4 } from 'models/Planet4'
import type { SceneProps } from 'components/Scene3d'

type CarouselPageProps = {
  open: boolean
}

type Detail = {
  key: string
  sceneProps: SceneProps
}

type DetailProps = Detail & {
  open: boolean
  active: boolean
}

const slides: Detail[] = [
  {
    key: 'Planet0',
    sceneProps: {
      z: 35,
      intensity: 2,
      renderModel: (ref) => <Planet0 ref={ref} />,
    },
  },
  {
    key: 'Planet1',
    sceneProps: {
      z: 23.5,
      intensity: 2,
      renderModel: (ref) => <Planet1 ref={ref} />,
    },
  },
  {
    key: 'Planet2',
    sceneProps: {
      z: 35,
      intensity: 2,
      renderModel: (ref) => <Planet2 ref={ref} />,
    },
  },
  {
    key: 'Planet3',
    sceneProps: {
      z: 34,
      intensity: 1,
      renderModel: (ref) => <Planet3 ref={ref} />,
    },
  },
  {
    key: 'Planet4',
    sceneProps: {
      z: 32,
      intensity: 0.5,
      renderModel: (ref) => <Planet4 ref={ref} />,
    },
  },
]

function Detail(props: DetailProps) {
  const { sceneProps, open, active } = props
  return (
    <Center sx={{ width: '100%', height: '100%' }}>
      {/* Ratio: 1 */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          paddingTop: '100%',
          height: 0,
        }}
      >
        <Box className="absolute-center" sx={{ width: '100%', height: '100%' }}>
          <Scene3d {...sceneProps} visible={active} />
        </Box>
      </Box>
    </Center>
  )
}

const initialSlide = 1

export default function CarouselPage(props: CarouselPageProps) {
  const { open } = props
  const [slide, setSlide] = useState(initialSlide)

  return (
    <Box>
      <Carousel
        initialSlide={initialSlide}
        slideGap="xs"
        slideSize="60%"
        height="100vh"
        draggable={false}
        onSlideChange={(index) => setSlide(index)}
        loop
        styles={{
          controls: {
            padding: 0,
            height: '40%',
            transform: 'translateY(-50%)',
          },
          control: {
            width: '10%',
            height: '100%',
            background: 'red',
            opacity: 0,
            '&:hover': {
              opacity: 0,
            },
          },
        }}
      >
        {slides.map((el, i) => (
          <Carousel.Slide key={el.key}>
            <Detail {...el} open={open} active={i === slide} />
          </Carousel.Slide>
        ))}
      </Carousel>
    </Box>
  )
}
