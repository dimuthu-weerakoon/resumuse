import { Outlet } from "react-router-dom"



const ResumeInput = () => {


  return (
    <>
      <div className="flex flex-col justify-center items-start p-4 m-4 w-full">
          <Outlet/>
      </div>
    </>

  )
}

export default ResumeInput