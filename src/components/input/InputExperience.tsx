import { FormEvent, useEffect, useState } from "react";
import InputSkills from "./InputSkills";
import { Experience } from "../../types/Experience";
import InputLocation from "./InputLocation";
import { Location } from "../../types/Location";
import { useDispatch, useSelector } from "react-redux";
import {
  addExperience,
  addMoreDescriptions,
  addMoreSkills,
  clearEditingExperience,
  editExperienceDescription,
  removeExpDescription,
  removeExperienceSkill,
  updateExpereince,
  updateExperienceDescription,
} from "../../redux/slices/ExpSlice";
import {
  clearSelectedSkills,
  removeSelectedSkill,
} from "../../redux/slices/SkillsSlice";
import { useNavigate } from "react-router";
import { suggestJobRole } from "../../Ai/AiGeneratives";
import {
  Button,
  Input,
  Textarea,
  Listbox,
  ListboxItem,
  Select,
  SelectItem,
  Checkbox,
  Form,
} from "@heroui/react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faClose,
  faPen,
  faPlusCircle,
  faRepeat,
} from "@fortawesome/free-solid-svg-icons";
import Skill from "../../types/Skill";

const InputExperience = ({ templateId }: { templateId: number }) => {
  const { selectedSkills } = useSelector((state: any) => state.skills);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [title, setTitle] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [company, setCompany] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [description, setDescription] = useState<string[]>([]);
  const [status, setStatus] = useState<boolean>(false);
  const [state, setState] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [currentInput, setCurrentInput] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [location, setLocation] = useState<Location | undefined | null>();
  const [suggestedJobRoles, setSuggestedJobRoles] = useState<string[]>([]);
  const editMode: boolean = useSelector((state: any) => state.editmode);
  const [isInvalidEndDate, setisInvalidDate] = useState<boolean>(false);

  const {
    editingExperience,
    editingExpDescription,
  }: {
    editingExperience: Experience | null;
    editingExpDescription: string | null;
  } = useSelector((state: any) => state.experience);
  //array of employee types
  const employeeTypes = ["Internship", "Contract", "Employee", "Freelance"];

  useEffect(() => {
    if (editMode && editingExpDescription) {
      setCurrentInput(editingExpDescription);
    }
  }, [editMode, editingExpDescription]);
  //use effect for add more skills when edit mode and if has editing experience

  useEffect(() => {
    if (editMode && editingExperience?.skills) {
      //check selcted skills already exits in editing experince skill array

      const newSkills: Skill[] = selectedSkills.filter(
        (newSkill: Skill) =>
          !editingExperience.skills.some(
            (existingSkill) => existingSkill.skill === newSkill.skill
          )
      );
      //if skill not exites push it to editing experince skills

      if (newSkills.length > 0) dispatch(addMoreSkills(newSkills));
    }
  }, [editMode, editingExperience?.skills, selectedSkills, dispatch]); // dependecy array if changes editmode , editng experince and selected skills and dispacth

  //function to suggest Job Roles

  async function handleAiSuggestTitle() {
    //calling async function suggestJobroles from AiGeneratives
    const aiSuggestJobRoles: string[] = await suggestJobRole(title);
    // set suggested jobroles to suggestedjobroles local state
    setSuggestedJobRoles(aiSuggestJobRoles);
  }

  //use effect to set location
  useEffect(() => {
    //set state ,city ,country  as prop of location object
    setLocation({ state, city, country });
  }, [state, city, country]); // re run when state , city ,country change

  // function to clear form
  const clearExp = () => {
    setTitle("");
    setType("");
    setCompany("");
    setStartDate("");
    setEndDate("");
    setDescription([]);
    setStatus(false);
    setLocation(null);
    setCurrentInput("");
  };

  //useEffect for set values of editng experince to current local state
  useEffect(() => {
    //check when editmode and has editng experice object
    if (editMode && editingExperience) {
      // setting each value to each local state
      setTitle(editingExperience.title);
      setType(editingExperience.type);
      setCompany(editingExperience.company);
      setStartDate(editingExperience.dates.startDate);
      setEndDate(editingExperience.dates.endDate);
      setDescription(editingExperience.description);
      setStatus(editingExperience.status);
      setLocation(editingExperience.location);
    }
  }, [editMode, editingExperience]); // when edit mode change or if change ediitng experince

  //useEffect for clear editing experince and clear slelcted skills when if not in edit mode
  useEffect(() => {
    //check when not in edit mode
    if (!editMode) {
      //if not in editmode dispatch action to clear editng experince and clear selected skills
      dispatch(clearEditingExperience());
      dispatch(clearSelectedSkills());
      //also clear the form
      clearExp();
    }
  }, [editMode, dispatch]); // re-run when change edit mode or dispatch

  //function to add description or edit
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // trimmed user input
    const value = e.currentTarget.value.trim();
    // check has user input and press enter
    if (e.key === "Enter" && value) {
      //checks when editmode and has not editng experince desciption
      if (editMode && !editingExpDescription) {
        //dispatch action to add more description to editng experince
        dispatch(addMoreDescriptions(value));
      }
      // if in edit mode diapatch action to updated editing experince description
      // else set description state add current user input value
      editMode
        ? dispatch(updateExperienceDescription(value))
        : setDescription((prev) => [...prev, value]);
      setCurrentInput("");
    }
  };
  //
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault(); //prevent default form submition

    //local states as propperties of experince object
    const newExp: Experience = {
      title,
      type,
      company,
      description,
      status,
      skills: editMode ? editingExperience?.skills : selectedSkills, //when editmode skills set to editing experince skills else skills as selected skills
      dates: { startDate, endDate },
      location,
    };
    //check title and company and start date are not empty
    if (
      title.trim() !== "" &&
      company.trim() !== "" &&
      startDate.trim() !== ""
    ) {
      //when editmode update editng experince else add new experince
      editMode
        ? dispatch(updateExpereince(newExp))
        : dispatch(addExperience(newExp));
    } else {
      //if false return back
      return;
    }
    //clear form after submit
    clearExp();
    // dispatch action to clear slected skills
    dispatch(clearSelectedSkills());
  };

  // function for handle end date

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
    if (status) {
      //set Invaliddate flase
      setisInvalidDate(false);
      //  setEnd date to present
      setEndDate("Present");
    }
  };

  //navigate route to next Input component
  const handleNext = () => {
    navigate(`/template/${templateId}/create/custom-section`);
  };
  //navigate route to previous Input component
  const handleBack = () => {
    navigate(`/template/${templateId}/create/education`);
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
        <h2 className=" input-heading">Experience</h2>
        <p className="input-sub-heading">
          Add your work experience, highlighting your roles, companies, and key
          achievements
        </p>
      </div>
      {/* Next UI input form */}
      <Form validationBehavior="native" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-3 w-full">
          <Input
            size="sm"
            type="text"
            label="Podition / Job Role"
            value={title}
            isRequired
            // when edit mode and if not editing experince disavle element
            isDisabled={editMode && !editingExperience}
            //validate prop to validate ui if empty return error message
            validate={(value) => {
              if (value.trim() === "") {
                return "Please fill this field";
              }
            }}
            //on change event set title to value and run handleAiSuggest title
            onChange={(e) => {
              setTitle(e.target.value);
              handleAiSuggestTitle();
            }}
          />
          {/*  check title exits and suggested job roles array not empty */}

          {title && suggestedJobRoles.length > 0 && (
            <Listbox
              className="max-h-40"
              //next ui on action event. get key of listbox items as string and set it title
              onAction={(key) => {
                setTitle(key as string);
                //clear suggestions by set suggestesd job roles empty array
                setSuggestedJobRoles([]);
              }}
            >
              {/* showing fetched suggestions */}

              {suggestedJobRoles.map((job) => (
                <ListboxItem key={job} textValue={job}>
                  {job}
                </ListboxItem>
              ))}
            </Listbox>
          )}

          {/*  selected employment type */}

          <Select
            size="sm"
            label="Select Employment Type"
            selectedKeys={new Set([type])}
            value={type}
            //disable when edit mode and if not editig experince
            isDisabled={editMode && !editingExperience}
            //onchange set value to type
            onChange={(e) => setType(e.target.value)}
          >
            {/*  showing elemnts of emplyment array */}

            {employeeTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </Select>

          {/*Input company  */}

          <Input
            size="sm"
            //disable when edit mode and if not editig experince
            isDisabled={editMode && !editingExperience}
            type="text"
            label="Company / Organization"
            value={company}
            isRequired
            //next ui validate prop to validate if empty return error
            validate={(value) => {
              if (value.trim() === "") {
                return "Please fill this field";
              }
            }}
            onChange={(e) => {
              setCompany(e.target.value);
            }}
          />
          {/* Input Location component */}

          <InputLocation
            //loaction object to memeorize current location
            location={location}
            //fuction to update location field
            setCity={setCity}
            setState={setState}
            setCountry={setCountry}
          />
          {/*checkbox to update state status to cuurent working this company  */}

          <Checkbox
            type="checkbox"
            id="current-job"
            isSelected={status}
            isDisabled={editMode && !editingExperience}
            //toggle update status state
            onChange={() => setStatus((prev) => !prev)}
          >
            <span className="text-xs text-blue-950">
              I'm currently working here
            </span>
          </Checkbox>

          <div className="flex gap-2 flex-nowrap">
            {/*Input satrt date   */}

            <Input
              //validate start date if empty return error message
              validate={(value) => {
                if (value.trim() === "") {
                  return "Please add Start date";
                }
              }}
              //disable when in edit mode and if not editng experince
              isDisabled={editMode && !editingExperience}
              size="sm"
              label="Start Date"
              type="date"
              id="start-date"
              value={startDate}
              isRequired
              onChange={(e) => setStartDate(e.target.value)}
            />
            {/*if not currently working show end date  */}

            {!status && (
              <Input
                size="sm"
                isDisabled={editMode && !editingExperience}
                //isInvalid prop if IsInvalidatedate true
                isInvalid={isInvalidEndDate}
                //if status true / currently working
                hidden={status}
                label="End Date"
                type="date"
                errorMessage={"Invalid end date"}
                id="end-date"
                value={endDate !== "present" ? endDate || "" : ""}
                onChange={handleEndDate}
                disabled={status}
              />
            )}
          </div>

          <div className="selected-skills flex gap-2 mt-2">
            {/*if in editmode and not null editingexperinceskills map  editind experinceskills  */}

            {editMode &&
              editingExperience?.skills &&
              editingExperience.skills.map((skill: Skill, index: number) => (
                <span
                  className="selected-skill bg-slate-300 px-2 border rounded-md border-slate-400 font-medium text-sm"
                  key={index}
                >
                  {skill.skill}
                  <button
                    type="button"
                    className="remove-skill p-1 rounded-full text-slate-600 "
                    onClick={() => {
                      //dispatch actions to remove experience skill and and same skill remove from selected skills once
                      dispatch(removeExperienceSkill(skill.skill));
                      dispatch(removeSelectedSkill(skill));
                    }}
                  >
                    x
                  </button>
                </span>
              ))}
          </div>

          {/*Input Input skills component  */}

          <InputSkills jobRole={title} />

          <div>
            {/*check if in edit mode and editngexperince description not null    */}

            {editMode &&
              editingExperience?.description &&
              editingExperience.description.length > 0 ? (
              <ul className="text-xs text-slate-900">
                {/* mapping editing experince descriptions     */}

                {editingExperience.description.map((desc, index) => (
                  <li
                    key={index}
                    className="relative selected-skill bg-slate-300 p-1 mb-1 border rounded-md border-slate-400 font-medium text-xs"
                  >
                    <p> {desc}</p>

                    <div className="absolute top-1 right-1 ">
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            //dispatch action to edit selected description by index
                            dispatch(editExperienceDescription(index))
                          }
                        >
                          <FontAwesomeIcon
                            icon={faPen}
                            size="sm"
                            className="mb-2 cursor-pointer "
                          />
                        </button>
                        <button
                          type="button"
                          //dispatch action to remove selected description
                          onClick={() => dispatch(removeExpDescription(index))}
                        >
                          <FontAwesomeIcon
                            icon={faClose}
                            size="sm"
                            className="mb-2 cursor-pointer"
                          />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : null}
            {/* input textarea for enter descripotion   */}

            <Textarea
              enterKeyHint="enter"
              inputMode="text"
              size="sm"
              //diable in editmode and not editing experince
              isDisabled={editMode && !editingExperience}
              label="Description"
              //set value to current input
              value={currentInput}
              // onchnage update currentinput state to user input value
              onChange={(e) => setCurrentInput(e.target.value)}
              //trigger function when onKeyUp function
              onKeyDown={handleKeyDown}
              placeholder="- Enter some decriptions about your work as a list and press Enter"
            ></Textarea>
          </div>
          <div className="p-2">
            {/* button for submit   */}

            <Button
              size="sm"
              variant="flat"
              //diable when edit mode and if no editing experince object
              isDisabled={editMode && !editingExperience}
              className="input-action-btn max-w-fit"
              type="submit"


            >
              {/*change fontawesome icon and button text when in edit mode   */}
              <FontAwesomeIcon icon={editMode ? faRepeat : faPlusCircle} />{" "}
              {editMode ? "Update" : "Add Experience"}
            </Button>
          </div>
        </div>
      </Form>
    </motion.div>)
  );
};

export default InputExperience;
