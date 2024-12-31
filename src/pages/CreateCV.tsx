import ResumeInput from "../components/ResumeInput"
import Template1 from "../cv_templates/Template1"


const CreateCV = () => {
    return (
        <div className="grid grid-cols-2 max-md:grid-cols-1 gap-4" >

           <div>
           <ResumeInput />

           </div>
           <div>
           <Template1 />

           </div>
           




        </div>
    )
}

export default CreateCV