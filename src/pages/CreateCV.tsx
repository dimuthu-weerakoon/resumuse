import ResumeInput from "../components/ResumeInput"
import { UniversalProvider } from "../context/universal_context/UniversalContext"
import Template1 from "../cv_templates/Template1"


const CreateCV = () => {
    return (
        <div className="flex ">

            <UniversalProvider>
                <ResumeInput />
                <Template1 />
            </UniversalProvider>




        </div>
    )
}

export default CreateCV