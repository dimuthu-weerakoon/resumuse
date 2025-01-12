

import { useState } from "react"

import PreviewPanel from "./Preview"

import Template1Preview from "../cv_templates/preview/Template1Preview"
import TemplateBlock from "./TemplateBlock"
import InputSteps from "../components/input/InputSteps"


const CreateCV = () => {

    const [open, setOpen] = useState<boolean>(false)
    return (

        <div className="grid grid-cols-2 max-md:grid-cols-1 gap-4 p-2 items-start " >


            <div className="flex ">

                <TemplateBlock />


                <button onClick={() => setOpen(!open)} type="button">Preview</button>
            </div>



            <PreviewPanel open={open} setOpen={setOpen} >
                <Template1Preview />
            </PreviewPanel>




        </div>
    )
}

export default CreateCV