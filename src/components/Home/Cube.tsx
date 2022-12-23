type CubeProps = React.HTMLAttributes<HTMLImageElement> & {
  name: string
  size: number
}

export default function Cube(props: CubeProps) {
  const { name, size, ...rest } = props
  return (
    <img
      src={`/images/${name}.png`}
      style={{
        width: size,
        height: size,
        objectFit: 'contain',
      }}
      alt=""
      {...rest}
    />
  )
}
