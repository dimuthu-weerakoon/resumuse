import { Outlet, useOutlet } from "react-router-dom"


import Template2Preview from "./preview/Template2Preview"
import PreviewPanel from "../components/Preview"
import { useState } from "react"





const Template1 = () => {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <>


      <div className="template-grid">

        <div>
          {useOutlet()}


        </div>

        <div className="template-preview-container">
          <div className="scaled-template" >
            <Template2Preview />
          </div>

        </div>
      </div>
     
    </>
  )
}

export default Template1