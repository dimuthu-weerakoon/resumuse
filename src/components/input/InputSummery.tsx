import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addSummery } from "../../redux/slices/SummerySlice"

import { generateAiSummery } from "../../Ai/AiGeneratives"
import { Experience } from "../../types/Experience"
import { useNavigate } from "react-router"
import { Textarea, Button } from "@heroui/react"
import { motion } from "framer-motion"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft, faMagicWandSparkles, faPlusCircle } from "@fortawesome/free-solid-svg-icons"
import RouteRules from "../../TemplateRoutes/RouteRules"





const InputSummery = ({ templateId }: { templateId: number }) => {

    //experince global state from redux store 
    const experience: Experience[] = useSelector((state: any) => state.experience)
    // use navigate from react router 
    const navigate = useNavigate()
    // summery state 
    const [summery, setSummery] = useState<string>("")
    //dispatch redux action
    const dispatch = useDispatch()
    // function to handle ai genearted summery
    const handleAiSummery = async () => {
        // clear exitsiting input
        setSummery("")
        //call function generateAiSummery.
        //passs experiences array ass parameter to generate summery to relavent experinces
        const aiSummery = await generateAiSummery(experience);
        //update summery state to ai generate summery or if not generated empty value
        setSummery(aiSummery || "")
    }

    // handle summery 
    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        //dispatch add summery 
        dispatch(addSummery(summery))
    }

    //naviagete back to previous section

    const handleBack = () => {
        navigate(`/template/${templateId}/create/custom-section`);
    };

    return (

        <motion.div initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.8, }} className="w-full">
            <div className="flex justify-between mb-4">
                <Button size="sm" onPress={handleBack} className="input-nav-btn"> <FontAwesomeIcon icon={faArrowLeft} /> </Button>
                {/* component to retuirn navigation 
            only naviagte next route when matching template id
            */}
                <RouteRules templateId={templateId} />
            </div>

            <div className="mb-4">
                <h2 className=" input-heading">Career Overview</h2>
                <p className="input-sub-heading">Add your work experience, highlighting your roles, companies, and key achievements</p>
            </div>
            <form >
                <Textarea label="Enter your Summery or Generate Using AI" className=" mb-3" value={summery} cols={5} rows={5} onChange={e => setSummery(e.target.value)}></Textarea>
                <div className="flex justify-between gap-5 w-full">

                    <div className="flex gap-3">
                        <Button size="sm" type="button" className="input-action-btn" onClick={handleSubmit}>
                            <FontAwesomeIcon icon={faPlusCircle} />   Add</Button>
                        <Button size="sm" type="button" className="input-action-btn" onClick={handleAiSummery}>
                            <FontAwesomeIcon icon={faMagicWandSparkles} />  Generate </Button>
                    </div>
                </div>
            </form>


        </motion.div>
    )
}

export default InputSummery