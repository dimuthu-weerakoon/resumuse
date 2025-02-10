import { PersonalInfo } from "../../types/PersonalInfo";
import { useDispatch, useSelector } from "react-redux";
import { addPersonalInfo } from "../../redux/slices/PersonalInfoSlice";
import { useNavigate } from "react-router-dom";
import { Input, Button } from "@nextui-org/react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const InputPersonalInfo = ({ templateId }: { templateId: number }) => {
  const personalInfo: PersonalInfo = useSelector(
    (state: any) => state.personalInfo
  );  //personal info state from redux store

  const dispatch = useDispatch();
  const navigate = useNavigate();
  //naviagte to next component
  const handleNext = () => {
    navigate(`/template/${templateId}/create/contact-Info`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.8 }}
      className="w-full"
    >
      <div className="flex justify-end mb-4">
        <Button onPress={handleNext} variant="flat" size="sm" className="input-nav-btn">
          {" "}
          <FontAwesomeIcon icon={faArrowRight} />{" "}
        </Button>
      </div>

      <form>
        <div className="mb-4">
          <h2 className=" input-heading">Personal Information</h2>
          <p className="input-sub-heading">
            Enter your personal information to get started
          </p>
        </div>

        <div className="flex flex-col justify-center gap-3 items-center ">
          <Input
            label="First Name"
            value={personalInfo.firstName}
            onChange={(e) =>
              // 
              dispatch(
                addPersonalInfo({ ...personalInfo, firstName: e.target.value })
              )
            }
            size={"sm"}
            type="text"
          />
          <Input
            label="Middle Name"
            value={personalInfo.middleName}
            onChange={(e) =>
              dispatch(
                addPersonalInfo({ ...personalInfo, middleName: e.target.value })
              )
            }
            size={"sm"}
            type="text"
          />
          <Input
            label="Last Name"
            value={personalInfo.lastName}
            onChange={(e) =>
              dispatch(
                addPersonalInfo({ ...personalInfo, lastName: e.target.value })
              )
            }
            size={"sm"}
            type="text"
          />
        </div>
      </form>


    </motion.div>
  );
};

export default InputPersonalInfo;
