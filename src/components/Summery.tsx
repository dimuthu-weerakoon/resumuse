import { useSelector } from "react-redux"




const Summery = () => {
const summery:string = useSelector((state:any)=>state.summery)

  return (
   <div>
  <p className="text-xs">{summery} </p>
   </div>
  )
}

export default Summery