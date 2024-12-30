import {  useState } from "react"




const InputSummery = () => {
    const [summery, setSummery] = useState<string>("")
   



function handleSubmit(e:React.FormEvent){
    e.preventDefault()
    
}
  
    return (
        <div className="input-div">
            <label htmlFor="">Enter some summary about your career</label>
            <form >
            <textarea name="" id="" value={summery} onChange={e => setSummery(e.target.value)}></textarea>
            <button type="button" onClick={handleSubmit}>add</button>
            </form>

        </div>
    )
}

export default InputSummery