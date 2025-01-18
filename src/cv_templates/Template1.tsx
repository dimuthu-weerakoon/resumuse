import { useOutlet } from "react-router-dom"

import Template1Preview from "./preview/Template1Preview"
import PreviewPanel from "../components/Preview"

import { useState } from "react"





const Template1 = () => {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <>
      <div className="grid grid-cols-2 max-md:grid-cols-1 gap-4 p-2 items-start ">
        
        <div>
          {useOutlet()}
          
        </div>

        <div className="flex flex-col justify-center">
          <div className="scale-50 origin-top shadow-2xl " >
            <Template1Preview />
          </div>
          <button onClick={() => setOpen(!open)} type="button">Preview</button>
        </div>

      </div>
      <PreviewPanel open={open} setOpen={setOpen} >
        <Template1Preview />
      </PreviewPanel>

    

    </>
  )
}

export default Template1