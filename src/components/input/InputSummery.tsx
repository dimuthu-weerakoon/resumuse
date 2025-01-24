import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addSummery } from "../../redux/slices/SummerySlice"

import { generateAiSummery } from "../../Ai/AiGeneratives"
import { Experience } from "../../types/Experience"
import { useNavigate } from "react-router"
import { Textarea, Button } from "@nextui-org/react"
import { motion } from "framer-motion"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft, faArrowRight, faMagicWandSparkles, faPlusCircle } from "@fortawesome/free-solid-svg-icons"





const InputSummery = ({ templateId }: { templateId: number }) => {

    const experience: Experience[] = useSelector((state: any) => state.experience)
    const navigate = useNavigate()

    const [summery, setSummery] = useState<string>("")
    const dispatch = useDispatch()

    const handleAiSummery = async () => {
        setSummery("")
        const aiSummery = await generateAiSummery(experience);
        setSummery(aiSummery || "")
    }


    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        dispatch(addSummery(summery))
    }


    const handleNext = () => {
        navigate(`/template/${templateId}/create/refrees`);
    };
    const handleBack = () => {
        navigate(`/template/${templateId}/create/custom-section`);
    };

    return (

        <motion.div initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.8, }} className="w-full">

            <div className="mb-4">
                <h2 className=" input-heading">Career Overview</h2>
                <p className="input-sub-heading">Add your work experience, highlighting your roles, companies, and key achievements</p>
            </div>
            <form >
                <Textarea label="Enter your Summery or Generate Using AI" className=" mb-3" value={summery} cols={5} rows={5} onChange={e => setSummery(e.target.value)}></Textarea>
                <div className="flex justify-between gap-5 w-full">

                    <div className="flex gap-3">
                        <Button type="button" className="input-action-btn" onClick={handleSubmit}>
                            <FontAwesomeIcon icon={faPlusCircle} />   Add</Button>
                        <Button type="button" className="input-action-btn" onClick={handleAiSummery}>
                            <FontAwesomeIcon icon={faMagicWandSparkles} />  Generate </Button>
                    </div>
                </div>
            </form>
            <div className="flex justify-between mt-3">
                <Button onPress={handleBack} className="input-nav-btn"> <FontAwesomeIcon icon={faArrowLeft} /> </Button>
                {

                    (templateId === 2 || templateId === 3) && (<Button onPress={handleNext} className="input-nav-btn"> <FontAwesomeIcon icon={faArrowRight} /> </Button>)
                }

            </div>


        </motion.div>
    )
}

export default InputSummery