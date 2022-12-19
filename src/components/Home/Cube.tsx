type CubeProps = {
  name: string
  className: string
  size: number
}

export default function Cube(props: CubeProps) {
  const { className, name, size } = props
  return (
    <img
      className={className}
      src={`/images/${name}.png`}
      style={{
        width: size,
        height: size,
        objectFit: 'contain',
      }}
    />
  )
}
