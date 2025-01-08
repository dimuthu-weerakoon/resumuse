import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addSummery } from "../../redux/slices/SummerySlice"

import { generateAiSummery } from "../../Ai/AiGeneratives"
import { Experience } from "../../types/Experience"
import { useNavigate } from "react-router"
import { Textarea } from "@nextui-org/react"





const InputSummery = () => {

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


      const handleBack = () => {
        navigate("/create/experience");
      };

    return (
    
         <div className="w-full">
            <form className="w-full">
                <Textarea label="Enter your Summery or Generate Using AI" className="p-4" value={summery} cols={5} rows={5} onChange={e => setSummery(e.target.value)}></Textarea>
                <div className="flex justify-between gap-5 w-full">
                
                    <div className="flex gap-3">
                    <button type="button" className="p-2 rounded bg-black text-white" onClick={handleSubmit}>add</button>
                    <button type="button" className="p-2 rounded bg-black text-white" onClick={handleAiSummery}>Generate Ai</button>
                    </div>
                </div>
            </form>
            <button onClick={handleBack}>back</button>
            </div>
    )
}

export default InputSummery