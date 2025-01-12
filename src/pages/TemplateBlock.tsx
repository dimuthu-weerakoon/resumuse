import { Outlet } from "react-router"


import { useState } from "react"

import PreviewPanel from "./Preview"
import Template2Preview from "../cv_templates/preview/Template2Preview"


const TemplateBlock = () => {
    const [open, setOpen] = useState<boolean>(false)
    return (
        <div>
            <div className=" ">
                <div >
                    <Outlet />
                    <PreviewPanel open={open} setOpen={setOpen} >
                        <Template2Preview />
                    </PreviewPanel>

                    <button onClick={() => setOpen(!open)} type="button">Preview</button>
                </div>


            </div>




        </div>


    )
}

export default TemplateBlock