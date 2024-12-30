
import { useUniversal } from "../context/universal_context/UniversalContext"


const Summery = () => {
  const {
   
    summeryContextProps
  } = useUniversal();

  return (
   <div>
    <div>Summery</div>

  <div>this is summery from{summeryContextProps?.summery}</div>
   </div>
  )
}

export default Summery