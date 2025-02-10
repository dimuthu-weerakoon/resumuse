import { useEffect, useMemo, useState } from "react";
import { Location } from "../../types/Location";
import InputLocation from "./InputLocation";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Form, Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { motion } from "framer-motion";
import { Refree } from "../../types/Refree";
import {
  addRefrees,
  clearEditingRefree,
  updateRefree,
} from "../../redux/slices/RefreeSlice";
import {
  faArrowLeft,
  faArrowRight,
  faPlusCircle,
  faRepeat,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { phoneNumberAutoFormat } from "../../common_functions/phonenumberAutoFormat";

const InputRefrees = ({ templateId }: { templateId: number }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [refreeName, setRefreeName] = useState<string>("");
  const [position, setPosition] = useState<string>("");
  const [institute, setInstitute] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [location, setLocation] = useState<Location | null>();
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  //function to validate email
  const validateEmail = (value: string) => {
    return value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i); // matching regex
  };

  // memorize validate email
  const isInvalidEmail = useMemo(() => {
    //Check if the input is empty:
    if (email.trim() === "") return true;
    //validate email
    return validateEmail(email) ? false : true;
  }, [email]); // recompute when email change

  //if template id equals 1 navigate to create component
  if (templateId === 1) {
    navigate(`/templates/template/1/create`);
  }

  // editmode state from redux store
  const editMode: boolean = useSelector((state: any) => state.editmode);
  //editing refree state from redux redux
  const {
    editingRefree,
  }: {
    editingRefree: Refree | null;
  } = useSelector((state: any) => state.refree);
  // function to clear form
  const clearForm = () => {
    setRefreeName("");
    setPosition("");
    setInstitute("");
    setEmail("");
    setPhone("");
    setLocation(null);
  };

  //use Effect to update states to editngRefree object values
  useEffect(() => {
    if (editMode && editingRefree) {
      setRefreeName(editingRefree.refreeName);
      setPosition(editingRefree.positions);
      setInstitute(editingRefree.institute);
      setEmail(editingRefree.email);
      setPhone(editingRefree.phone);
      setLocation(editingRefree.location);
    }
  }, [editMode, editingRefree]); // re run when editmode and editing refree object changed

  //useEffect to update location state
  useEffect(() => {
    setLocation({ state, city, country });
  }, [state, city, country]); // re run when location object related states updated (state,city,country)

  //useeffect for if not editmode clear editng refree and clear form
  useEffect(() => {
    if (!editMode) {
      dispatch(clearEditingRefree());
      clearForm();
    }
  }, [editMode, dispatch]);

  // function to handle submit
  const handleSubmit = () => {
    // created object new refree
    const newRefree: Refree = {
      refreeName: refreeName,
      positions: position,
      institute: institute,
      location: location,
      email: email,
      phone: phone,
    };
    //  check if is not invalid email and refrename,position and phone not empty
    if (
      !isInvalidEmail &&
      refreeName.trim() !== "" &&
      position.trim() !== "" &&
      phone.trim() !== ""
    ) {
        //dispatch action if editmode update editing refree else add refree
      dispatch(editMode ? updateRefree(newRefree) : addRefrees(newRefree));
    } else {
        //if condition failed return
      return;
    }
    //clear inputs 
    clearForm();
  };

  //navigate route to next component
  const handleNext = () => {
    navigate(`/template/${templateId}/create/picture`);
  };
  //navigate route to previous  component

  const handleBack = () => {
    navigate(`/template/${templateId}/create/summery`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.8 }}
      className="w-full"
    >
      <div className="flex justify-between mb-4">
        <Button
          size="sm"
          onPress={handleBack}
          variant="flat"
          className="input-nav-btn"
        >
          {" "}
          <FontAwesomeIcon icon={faArrowLeft} />{" "}
        </Button>
        <Button
          size="sm"
          onPress={handleNext}
          variant="flat"
          className="input-nav-btn"
        >
          {" "}
          <FontAwesomeIcon icon={faArrowRight} />{" "}
        </Button>
      </div>
      <div className="mb-4">
        <h2 className=" input-heading">Refrees</h2>
        <p className="input-sub-heading">
          Provide details of individuals who can vouch for your professional or
          academic background.
        </p>
      </div>
      <Form validationBehavior="native">
        <div className="flex flex-col gap-3 w-full">
          <Input
            label="Refree Mr/Mrs"
            value={refreeName}
            isRequired
            validate={(value) => {
              if (value.trim() === "") {
                return "Please fill this field";
              }
            }}
            onChange={(e) => {
              setRefreeName(e.target.value);
            }}
            size={"sm"}
            type="text"
          />

          <Input
            label="Position / Job Role"
            value={position}
            onChange={(e) => {
              setPosition(e.target.value);
            }}
            validate={(value) => {
              if (value.trim() === "") {
                return "Please fill this field";
              }
            }}
            isRequired
            size={"sm"}
            type="text"
          />

          <Input
            label="Institute / Comapany"
            value={institute}
            onChange={(e) => {
              setInstitute(e.target.value);
            }}
            size={"sm"}
            validate={(value) => {
              if (value.trim() === "") {
                return "Please fill this field";
              }
            }}
            type="text"
          />

          <Input
            size="sm"
            type="tel"
            label="Phone"
            value={phone}
            isRequired
            validate={(value) => {
              if (value.trim() === "") {
                return "Please fill this field";
              }
            }}
            required
            onChange={(e) => {
              const targetValue = e.target.value;
              // update phone state with formatted value
              setPhone(phoneNumberAutoFormat(targetValue));
            }}
          />

          <Input
            size="sm"
            type="email"
            label="Email Address"
            value={email}
            isRequired
            isInvalid={isInvalidEmail}
            errorMessage={"Please Enter valid Email Address"}
            onChange={(e) => setEmail(e.target.value)}
          />

          <InputLocation
            location={location}
            setCity={setCity}
            setState={setState}
            setCountry={setCountry}
          />

          <Button
            size="sm"
            variant="flat"
            color="secondary"
            onPress={handleSubmit}
            className="input-action-btn max-w-fit"
            type="button"
          >
            <FontAwesomeIcon icon={editMode ? faRepeat : faPlusCircle} />{" "}
            {editMode ? "Update" : "Add Refree"}
          </Button>
        </div>
      </Form>
    </motion.div>
  );
};

export default InputRefrees;
