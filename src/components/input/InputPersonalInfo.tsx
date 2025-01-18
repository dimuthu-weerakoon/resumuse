
import { PersonalInfo } from "../../types/PersonalInfo";
import { useDispatch, useSelector, } from "react-redux";
import { addPersonalInfo } from "../../redux/slices/PersonalInfoSlice";
import { useNavigate, useParams } from "react-router-dom";
import { Input, Button } from "@nextui-org/react";
import { motion } from "framer-motion";


const InputPersonalInfo = ({ templateId }: { templateId: number }) => {

  const personalInfo: PersonalInfo = useSelector((state: any) => state.personalInfo)


  const dispatch = useDispatch()
  const navigate = useNavigate()


  const handleNext = () => {
    navigate(`/templates/template/${templateId}/create/contact-Info`);
  };



  return (

    <motion.div initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.8, }}  >

        
        
      <form>
        <div className="flex justify-center gap-3 items-center max-lg:flex-wrap w-full">

          <Input label="First Name" value={personalInfo.firstName} onChange={e => dispatch(addPersonalInfo({ ...personalInfo, firstName: e.target.value }))} size={"md"} type="text" />
          <Input label="Middle Name" value={personalInfo.middleName} onChange={e => dispatch(addPersonalInfo({ ...personalInfo, middleName: e.target.value }))} size={"md"} type="text" />
          <Input label="Last Name" value={personalInfo.lastName} onChange={e => dispatch(addPersonalInfo({ ...personalInfo, lastName: e.target.value }))} size={"md"} type="text" />


        </div>
      </form>

      <div className="flex justify-end mt-3">

        <Button onPress={handleNext} variant="flat" color="secondary" >Next</Button>
      </div>
    </motion.div>




  )
}

export default InputPersonalInfo