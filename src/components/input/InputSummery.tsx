import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addSummery } from "../../redux/slices/SummerySlice"

import { generateAiSummery } from "../../Ai/AiGeneratives"
import { Experience } from "../../types/Experience"
import { useNavigate } from "react-router"
import { Textarea } from "@nextui-org/react"
import { motion } from "framer-motion"





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
            <form className="w-full">
                <Textarea label="Enter your Summery or Generate Using AI" className="p-4" value={summery} cols={5} rows={5} onChange={e => setSummery(e.target.value)}></Textarea>
                <div className="flex justify-between gap-5 w-full">

                    <div className="flex gap-3">
                        <button type="button" className="p-2 rounded bg-black text-white" onClick={handleSubmit}>add</button>
                        <button type="button" className="p-2 rounded bg-black text-white" onClick={handleAiSummery}>Generate Ai</button>
                    </div>
                </div>
            </form>
            <div className="flex justify-between">
                <button onClick={handleBack}>back</button>
                {


                    templateId === 2 && (<button onClick={handleNext}>Next</button>) 
                }
            </div>


        </motion.div>
    )
}

export default InputSummery