import {  useEffect, useMemo, useState } from "react"
import { PersonalInfo } from "../../types/PersonalInfo";
import { useDispatch, useSelector, } from "react-redux";
import { addPersonalInfo } from "../../redux/slices/PersonalInfoSlice";
import { useNavigate } from "react-router-dom";
import { Input, Button } from "@nextui-org/react";


const InputPersonalInfo = () => {
  const personalInfo = useSelector((state: any) => state.personalInfo)

  const [firstName, setFirstName] = useState<string>(personalInfo.firstName);
  const [middleName, setMiddleName] = useState<string>(personalInfo.middleName);
  const [lastName, setLastName] = useState<string>(personalInfo.lastName);
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




  useEffect(() => {
    dispatch(addPersonalInfo(newPersonalInfo))

  }, [dispatch, newPersonalInfo])


  return (

    <div >
      <form>
        <div className="flex justify-center gap-3 items-center max-lg:flex-wrap w-full">


          <Input label="First Name" value={firstName} onChange={e => setFirstName(e.target.value)} size={"md"} type="text" />
          <Input label="Middle Name" value={middleName} onChange={e => setMiddleName(e.target.value)} size={"md"} type="text" />
          <Input label="Last Name" value={lastName} onChange={e => setLastName(e.target.value)} size={"md"} type="text" />


        </div>
      </form>

      <div className="flex justify-end mt-3">

        <Button onPress={handleNext} variant="flat" color="secondary" >Next</Button>
      </div>
    </div>




  )
}

export default InputPersonalInfo