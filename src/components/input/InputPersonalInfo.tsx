import { FormEvent, useEffect, useState } from "react"
import { PersonalInfo } from "../../types/PersonalInfo";
import { useDispatch, } from "react-redux";
import { addPersonalInfo } from "../../redux/slices/PersonalInfoSlice";
import { useNavigate } from "react-router-dom";
import {Input,Button} from "@nextui-org/react";


const InputPersonalInfo = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [middleName, setMiddleName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleNext = () => {
    navigate("/create/contact-info");
  };
  const newPersonalInfo: PersonalInfo = {
    firstName: firstName,
    middleName: middleName,
    lastName: lastName
  }

 


useEffect(()=>{
  dispatch(addPersonalInfo(newPersonalInfo))

},[dispatch,newPersonalInfo])


  return (

    <div >

      <div className="flex justify-center gap-3 items-center max-lg:flex-wrap w-full">

       
      <Input label="First Name"  value={firstName} onChange={e=>setFirstName(e.target.value)} size={"md"} type="text" />
      <Input label="Middle Name" value={middleName} onChange={e=>setMiddleName(e.target.value)} size={"md"} type="text" />
      <Input label="Last Name" value={lastName} onChange={e=>setLastName(e.target.value)} size={"md"} type="text" />

       
      </div>
      <div className="flex justify-end mt-3">

        <Button onPress={handleNext} variant="flat" color="secondary" >Next</Button>
      </div>
    </div>




  )
}

export default InputPersonalInfo