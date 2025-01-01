import { useState } from "react"
import { useDispatch } from "react-redux"
import { addSummery } from "../../redux/slices/SummerySlice"




const InputSummery = () => {
    const [summery, setSummery] = useState<string>("")
    const dispatch = useDispatch()



    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        dispatch(addSummery(summery))
    }

    return (
        <div className="input-div">
            <label htmlFor="">Enter some summary about your career</label>
            <form >
                <textarea  value={summery} onChange={e => setSummery(e.target.value)}></textarea>
                <button type="button" onClick={handleSubmit}>add</button>
            </form>

        </div>
    )
}

export default InputSummery