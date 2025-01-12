import { Outlet, useOutlet } from "react-router-dom"

import Template1Preview from "./preview/Template1Preview"





const Template1 = () => {

  return (
    <>


      <div className="grid grid-cols-2 max-md:grid-cols-1 gap-4 p-2 items-start ">

        <div>
          {useOutlet()}


        </div>

        <div className="flex justify-center">
          <div className="scale-50 origin-top shadow-2xl " >
            <Template1Preview />
          </div>

        </div>


      </div>
    </>
  )
}

export default Template1