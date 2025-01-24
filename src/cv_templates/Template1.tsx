import { useOutlet } from "react-router-dom"

import Template1Preview from "./preview/Template1Preview"
import PreviewPanel from "../components/Preview"

import { useState } from "react"





const Template1 = () => {


  return (
    <>
      <div className="template-grid">

        <div>
          {useOutlet()}

        </div>


        <div className="template-preview-container">
          <div className="scaled-template" >
            <Template1Preview />
          </div>
        </div>
      </div>
      


    </>
  )
}

export default Template1