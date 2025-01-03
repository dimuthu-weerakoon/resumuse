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
        const aiSummery = await generateAiSummery(experience);
        setSummery(aiSummery || "")
    }


    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        dispatch(addSummery(summery))
    }


    return (
        <div className="input-div">
            <label htmlFor="">Enter some summary about your career</label>
            <form >
                <textarea value={summery} cols={5} rows={2} onChange={e => setSummery(e.target.value)}></textarea>
                <button type="button" onClick={handleSubmit}>add</button>
                <button type="button" onClick={handleAiSummery}>Generate Ai</button>

            </form>
            <button onClick={() => navigate(-1)}>back</button>
        </div>
    )
}

export default InputSummery