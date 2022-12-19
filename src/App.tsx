import { extend } from '@react-three/fiber'
import { UnrealBloomPass } from 'three-stdlib'
import Home from 'components/Home'

extend({ UnrealBloomPass })

const App = () => {
  return (
    <>
      <Home />
    </>
  )
}

export default App
