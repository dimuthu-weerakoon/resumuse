import { FormEvent, useEffect, useState } from "react"
import { PersonalInfo } from "../../types/PersonalInfo";
import { useDispatch, } from "react-redux";
import { addPersonalInfo } from "../../redux/slices/PersonalInfoSlice";
import { useNavigate } from "react-router";


const InputPersonalInfo = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [middleName, setMiddleName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleNext = () => {
    navigate("/create/experience");
  };
  const newPersonalInfo: PersonalInfo = {
    firstName: firstName,
    middleName: middleName,
    lastName: lastName
  }

  useEffect(() => {
    dispatch(addPersonalInfo(newPersonalInfo))
  })
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

  }



  return (

    <div className="">

      <div className="flex justify-center items-center max-lg:flex-wrap w-full">

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
      </div>
      <div className="flex justify-end">

        <button onClick={() => navigate('/create/contact-info')} >Next</button>
      </div>
    </div>




  )
}

export default InputPersonalInfo