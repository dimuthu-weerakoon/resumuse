import { FormEvent, useState } from "react"
import { PersonalInfo } from "../../types/PersonalInfo";
import { usePersonalInfo } from "../../context/personal_info_context/PersonalInfoContext";

const InputPersonalInfo = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [middleName, setMiddleName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const { addPersonalInfo, personalInfo } = usePersonalInfo()

  const newPersonalInfo: PersonalInfo = {
    firstName: firstName,
    middleName: middleName,
    lastName: lastName
  }


  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    addPersonalInfo(newPersonalInfo);
  }



  return (
    <div>
      <form >
      <div>
        <label htmlFor="">First Name</label>
        <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} id="firstname" className="" />
      </div>
      <div>
        <label htmlFor="">Middle Name</label>
        <input type="text" value={middleName} onChange={e => setMiddleName(e.target.value)} id="firstname" className="" />
      </div>
      <div>
        <label htmlFor="">Last Name</label>
        <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} id="lastname" className="" />
      </div>
      <button type="button" onClick={handleSubmit}>add</button>


      </form>

      <div>
        result
        <br />
        {personalInfo.firstName}
        {personalInfo.middleName}
        {personalInfo.lastName}
      </div>
    </div>
  )
}

export default InputPersonalInfo