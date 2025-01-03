

import { useState } from "react"
import Template1 from "../cv_templates/Template1"
import PreviewPanel from "./Preview"
import { Outlet } from "react-router"


const CreateCV = () => {

    const [open, setOpen] = useState<boolean>(false)
    return (

        <div className="grid grid-cols-2 max-md:grid-cols-1 gap-4 p-2" >
            <div className="flex flex-col justify-center items-start p-4 m-4 w-full">
                <Outlet />
            </div>
            <div>
                <Template1 />
                <button onClick={() => setOpen(!open)} type="button">Preview</button>
            </div>

            <PreviewPanel open={open} setOpen={setOpen} />


        </div>
    )
}

export default CreateCV