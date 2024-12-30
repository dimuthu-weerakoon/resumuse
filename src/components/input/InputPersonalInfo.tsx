import { FormEvent, useEffect, useState } from "react"
import { PersonalInfo } from "../../types/PersonalInfo";


const InputPersonalInfo = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [middleName, setMiddleName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");



  const newPersonalInfo: PersonalInfo = {
    firstName: firstName,
    middleName: middleName,
    lastName: lastName
  }


  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
  
  }



  return (
    <div className="flex justify-center items-center w-full">

      <div className="input-div">
        <label htmlFor="" className="" >First Name</label>
        <input type="text" className="" value={firstName} onChange={e => setFirstName(e.target.value)} id="firstname" />
      </div>
      <div className="input-div">
        <label htmlFor="">Middle Name</label>
        <input type="text" value={middleName} onChange={e => setMiddleName(e.target.value)} id="firstname" className="" />
      </div>
      <div className="input-div">
        <label htmlFor="">Last Name</label>
        <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} id="lastname" className="" />
      </div>
      <div><button className="" type="button" onClick={handleSubmit}>add</button></div>
    </div>



  )
}

export default InputPersonalInfo