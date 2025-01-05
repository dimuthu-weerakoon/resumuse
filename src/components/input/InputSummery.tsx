import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addSummery } from "../../redux/slices/SummerySlice"

import { generateAiSummery } from "../../Ai/AiGeneratives"
import { Experience } from "../../types/Experience"
import { useNavigate } from "react-router"





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
        <div className="input-div">
            <label htmlFor="">Enter some summary about your career</label>
            <form >
                <textarea className="p-4" value={summery} cols={5} rows={5} onChange={e => setSummery(e.target.value)}></textarea>
                <div className="flex justify-end gap-5">
                <button type="button" className="p-2 rounded bg-black text-white" onClick={handleSubmit}>add</button>
                <button type="button" className="p-2 rounded bg-black text-white" onClick={handleAiSummery}>Generate Ai</button>
                </div>

            </form>
            <button onClick={handleBack}>back</button>
        </div>
    )
}

export default InputSummery