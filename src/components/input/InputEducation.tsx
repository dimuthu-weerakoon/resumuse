import { useEffect, useState } from "react";
import { Location } from "../../types/Location";
import { Education } from "../../types/Education";
import InputLocation from "./InputLocation";
import { useDispatch, useSelector } from "react-redux";
import {
  addEducation,
  clearEditingEducation,
  updateEducation,
} from "../../redux/slices/EducationSlice";
import { useNavigate } from "react-router";
import { generateQualifications } from "../../Ai/AiGeneratives";
import {
  Checkbox,
  Input,
  Listbox,
  ListboxItem,
  Textarea,
  Button,
  Form,
} from "@heroui/react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faPlusCircle,
  faRepeat,
} from "@fortawesome/free-solid-svg-icons";

const InputEducation = ({ templateId }: { templateId: number }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState<string>("");
  const [institute, setInstitute] = useState<string>("");
  const [description, setDescription] = useState<string | null>(null);
  const [state, setState] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [studying, setStudying] = useState<boolean>(false);
  const [location, setLocation] = useState<Location | undefined | null>();
  const [suggestedEducations, setSuggestedEducations] = useState<string[]>([]);
  const [isInvalidEndDate, setisInvalidDate] = useState<boolean>(false);

  const editMode: boolean = useSelector((state: any) => state.editmode); //editmode state from redux store
  const editingEducation: Education | null = useSelector(
    (state: any) => state.education.editingEducation // editng education state from redux store
  );

  // funcation to handle ai generated educational qualifications
  const handleAiGenerateEducations = async () => {
    try {
      //call generateAulifications function from AI Generatives
      const generatedEdu: string[] = await generateQualifications(title);
      //set fetched qualifications to suggested educations state
      setSuggestedEducations(generatedEdu);
    } catch (error) {
      // display console catched error
      console.log("Error generating qualifications:", error);
      //set empty suggested educartions array
      setSuggestedEducations([]);
    }
  };

  //funtion to clear form
  const clearForm = () => {
    setTitle("");
    setInstitute("");
    setDescription(null);
    setStartDate("");
    setEndDate("");
    setStudying(false);
    setSuggestedEducations([]);
    setLocation(null);
  };

  //useEffect to update location

  useEffect(() => {
    //update location state when location related props chnaged
    setLocation({ state, city, country });
  }, [state, city, country]);

  //useEffect to set Editing education object values to locak state
  useEffect(() => {
    //check if in editmode and has editing education object
    if (editMode && editingEducation) {
      // update local states to values of editing education
      setTitle(editingEducation?.title);
      setInstitute(editingEducation?.institute);
      setDescription(editingEducation?.description);
      setStartDate(editingEducation?.dates?.startDate);
      setEndDate(editingEducation?.dates?.endDate);
      setStudying(editingEducation?.studying);
      setLocation(editingEducation?.location || undefined);
    }
  }, [editMode, editingEducation]); //re run when edimode and editing education changed

  //useEffect to clear editng education object and clear form when exti edit mode
  useEffect(() => {
    //check if in not edit mode
    if (!editMode) {
      //dispath action to claer editing education object
      dispatch(clearEditingEducation());
      //also clear the form
      clearForm();
    }
  }, [editMode, dispatch]); // re run when editmode and dispacth changed

  // function to submit form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // prevent default submit event
    // new object of education
    const newEducation: Education = {
      title,
      institute,
      description,
      dates: { startDate, endDate },
      location,
      studying,
    };
    //check if  title and institute not empty
    if (title.trim() !== "" && institute.trim() !== "") {
      // dispatch action whwn editmode updated editing educations
      // if not add education
      dispatch(
        editMode ? updateEducation(newEducation) : addEducation(newEducation)
      );
      //clear form after submit form
      clearForm();
    } else {
      // if condition false return
      return;
    }
  };

  const handleEndDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    //target element value
    const selectedEndDate = e.target.value;
    //check selected date after or equal to start date
    if (new Date(selectedEndDate) >= new Date(startDate)) {
      setEndDate(selectedEndDate); // set endd ate to local state end date
      setisInvalidDate(false); // set false invaliddate state
    } else {
      setisInvalidDate(true); // else set true invalid date state
    }
    //check if status true
    if (studying) {
      //set Invaliddate flase
      setisInvalidDate(false);
      //  setEnd date to present
      setEndDate("Present");
    }
  };

  // navigate route to next Input component
  const handleNext = () => {
    navigate(`/template/${templateId}/create/experience`);
  };

  //navigate Route to previous Input Component
  const handleBack = () => {
    navigate(`/template/${templateId}/create/social-link`);
  };

  return (
    //framer motion element
    (<motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.8 }}
      className="w-full"
    >
      {/*navigation buttons*/}
      <div className="flex justify-between mb-4">
        <Button
          size="sm"
          onPress={handleBack}
          className="input-nav-btn"
          variant="flat"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </Button>
        <Button
          size="sm"
          onPress={handleNext}
          className="input-nav-btn"
          variant="flat"
        >
          <FontAwesomeIcon icon={faArrowRight} />
        </Button>
      </div>
      <div className="mb-4">
        <h2 className="input-heading">Education</h2>
        <p className="input-sub-heading">
          Enter your academic background, including degrees, institutions, and
          graduation dates.
        </p>
      </div>
      {/* Next ui Form  */}
      <Form validationBehavior="native"  onSubmit={handleSubmit} >
        <div className="flex flex-col gap-3 w-full">
          {/* qualifications input  */}

          <Input
            label="Qualification / Certifications"
            value={title}
            //disbale when editmode and if not editng eductaion object
            isDisabled={editMode && !editingEducation}
            isRequired
            //validatie next ui componenet if empty return error message
            validate={(value) => {
              if (value.trim() === "") {
                return "Please fill this field";
              }
            }}
            //onChnage event  run hnadle ai generate eductaion function and update title state to input value
            onChange={(e) => {
              handleAiGenerateEducations();
              setTitle(e.target.value);
            }}
            size="sm"
            type="text"
          />

          {/*check if title exits and  sugggested educations array not empty */}

          {title && suggestedEducations.length > 0 && (


            <Listbox
              selectionMode="single"
              onAction={(key) => {
                //update title stae to selcted listboxItem key as string
                setTitle(key as string);
                //set back empty suggested education array
                setSuggestedEducations([]);
              }}
            >
              {/* showing suggested education qualifications as listboxitems  */}

              {suggestedEducations.map((edu) => (
                <ListboxItem textValue={edu} key={edu}>
                  {edu}
                </ListboxItem>
              ))}
            </Listbox>
          )}
{/* Input institute */}

          <Input
            label="Institute / College,University"
            value={institute}
            isRequired
            //disable when editmode and if not editing education
            isDisabled={editMode && !editingEducation}
            //validate componet if empty return error message
            validate={(value) => {
              if (value.trim() === "") {
                return "Please fill this field";
              }
            }}
            // on change event update state to input value
            onChange={(e) => setInstitute(e.target.value)}
            size="sm"
            type="text"
          />

{/* check box for if currently studing   */}

          <div>
            <Checkbox
            // if studing slelcted 
              isSelected={studying}
              className="mb-1"
              //toggle studing to previous state 
              onChange={() => setStudying((prev) => !prev)}
            >
              <span className="text-blue-950 text-xs">
                I'm currently following this
              </span>
            </Checkbox>

            <div className="flex gap-3 flex-nowrap">
{/* Input start date */}

              <Input
                label="Start Date"
                type="date"
                size="sm"
                isDisabled={editMode && !editingEducation}
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />

{/*Input end date only show if not studying */}
              
              {!studying && (
                <Input
                  size="sm"
                  label="End Date"
                  type="date"
                  isInvalid={isInvalidEndDate}
                  isDisabled={editMode && !editingEducation}
                  value={endDate !== "Present" ? endDate : ""}
                  onChange={handleEndDate}
                  disabled={studying}
                />
              )}
            </div>
          </div>

{/* Input location Component  */}

          <InputLocation
          //pass updated location
            location={location}
            // setter functions to update state , city , country
            setCity={setCity}
            setState={setState}
            setCountry={setCountry}
          />

{/* input description - optional  */}

          <Textarea
            size="sm"
            label="Description - (optional)"
            value={description || ""}
            isDisabled={editMode && !editingEducation}
            onChange={(e) => setDescription(e.target.value)}
          />
{/* Submit button */}

          <Button
            size="sm"
            variant="flat"
            className="input-action-btn max-w-fit"
            type="submit"
            isDisabled={editMode && !editingEducation}
            //onclick trigger submit function
           
          >
            <FontAwesomeIcon icon={editMode ? faRepeat : faPlusCircle} />{" "}
            {editMode ? "Update" : "Add education"}
          </Button>
        </div>
      </Form>
    </motion.div>)
  );
};

export default InputEducation;
