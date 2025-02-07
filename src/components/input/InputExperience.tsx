import { FormEvent, useEffect, useMemo, useState } from "react";
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
} from "@nextui-org/react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faClose,
  faEdit,
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

  const employeeTypes = ["Intership", "Contract", "Employee", "Freelance"];

  useEffect(() => {
    if (editMode && editingExpDescription) {
      setCurrentInput(editingExpDescription);
    }
  }, [editMode, editingExpDescription]);

  useEffect(() => {
    if (editMode && editingExperience?.skills) {
      const newSkills = selectedSkills.filter(
        (newSkill: Skill) =>
          !editingExperience.skills.some(
            (existingSkill) => existingSkill.skill === newSkill.skill
          )
      );
      if (newSkills.length > 0) dispatch(addMoreSkills(newSkills));
    }
  }, [editMode, editingExperience?.skills, selectedSkills, dispatch]);

  async function handleAiSuggestTitle() {
    const aiSuggestJobRoles: string[] = await suggestJobRole(title);
    setSuggestedJobRoles(aiSuggestJobRoles);
  }

  useEffect(() => {
    setLocation({ state, city, country });
  }, [state, city, country]);

  const clearExp = () => {
    setTitle("");
    setType("");
    setCompany("");
    setStartDate("");
    setEndDate("");
    setDescription([]);
    setStatus(false);
    setLocation(null);
  };

  useEffect(() => {
    if (editMode && editingExperience) {
      setTitle(editingExperience.title);
      setType(editingExperience.type);
      setCompany(editingExperience.company);
      setStartDate(editingExperience.dates.startDate);
      setEndDate(editingExperience.dates.endDate);
      setDescription(editingExperience.description);
      setStatus(editingExperience.status);
      setLocation(editingExperience.location);
    }
  }, [editMode, editingExperience]);
  useEffect(() => {
    if (!editMode) {
      dispatch(clearEditingExperience());
      dispatch(clearSelectedSkills());
      clearExp();
    }
  }, [editMode, dispatch]);

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value.trim();
    if (e.key === "Enter" && value) {
      e.preventDefault();
      if (editMode && !editingExpDescription) {
        dispatch(addMoreDescriptions(value));
      }
      editMode
        ? dispatch(updateExperienceDescription(value))
        : setDescription((prev) => [...prev, value]);
      setCurrentInput("");
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newExp: Experience = {
      title,
      type,
      company,
      description,
      status,
      skills: editMode ? editingExperience?.skills : selectedSkills,
      dates: { startDate, endDate },
      location,
    };
    if (
      title.trim() !== "" &&
      company.trim() !== "" &&
      startDate.trim() !== ""
    ) {
      editMode
        ? dispatch(updateExpereince(newExp))
        : dispatch(addExperience(newExp));
    } else {
      return;
    }
    clearExp();
    dispatch(clearSelectedSkills());
  };

  const handleEndDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedEndDate = e.target.value;
    if (new Date(selectedEndDate) >= new Date(startDate)) {
      setEndDate(selectedEndDate);
      setisInvalidDate(false);
    } else {
      setisInvalidDate(true);
    }
    if (status) {
      setisInvalidDate(false);
      setEndDate("Present");
    }
  };

  const handleNext = () => {
    navigate(`/template/${templateId}/create/custom-section`);
  };
  const handleBack = () => {
    navigate(`/template/${templateId}/create/education`);
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
        <h2 className=" input-heading">Experience</h2>
        <p className="input-sub-heading">
          Add your work experience, highlighting your roles, companies, and key
          achievements
        </p>
      </div>

      <Form validationBehavior="native">
        <div className="flex flex-col gap-3 w-full">
          <Input
            size="sm"
            type="text"
            label="Podition / Job Role"
            value={title}
            isRequired
            isDisabled={editMode && !editingExperience}
            validate={(value) => {
              if (value.trim() === "") {
                return "Please fill this field";
              }
            }}
            onChange={(e) => {
              setTitle(e.target.value);
              handleAiSuggestTitle();
            }}
          />

          {title && suggestedJobRoles.length > 0 && (
            <Listbox
              className="max-h-40"
              onAction={(key) => {
                setTitle(key as string);
                setSuggestedJobRoles([]);
              }}
            >
              {suggestedJobRoles.map((job) => (
                <ListboxItem key={job} textValue={job}>
                  {job}
                </ListboxItem>
              ))}
            </Listbox>
          )}
          <Select
            size="sm"
            label="Select Employment Type"
            selectedKeys={new Set([type])}
            value={type}
            isDisabled={editMode && !editingExperience}
            onChange={(e) => setType(e.target.value)}
          >
            {employeeTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </Select>

          <Input
            size="sm"
            isDisabled={editMode && !editingExperience}
            type="text"
            label="Company / Organization"
            value={company}
            isRequired
            validate={(value) => {
              if (value.trim() === "") {
                return "Please fill this field";
              }
            }}
            onChange={(e) => {
              setCompany(e.target.value);
            }}
          />

          <InputLocation
            location={location}
            setCity={setCity}
            setState={setState}
            setCountry={setCountry}
          />

          <Checkbox
            type="checkbox"
            id="current-job"
            isSelected={status}
            isDisabled={editMode && !editingExperience}
            onChange={() => setStatus((prev) => !prev)}
          >
            <span className="text-xs text-blue-950">
              I'm currently working here
            </span>
          </Checkbox>

          <div className="flex gap-2 flex-nowrap">
            <Input
              validate={(value) => {
                if (value.trim() === "") {
                  return "Please add Start date";
                }
              }}
              isDisabled={editMode && !editingExperience}
              size="sm"
              label="Start Date"
              type="date"
              id="start-date"
              value={startDate}
              isRequired
              onChange={(e) => setStartDate(e.target.value)}
            />

            {!status && (
              <Input
                size="sm"
                isDisabled={editMode && !editingExperience}
                isInvalid={isInvalidEndDate}
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
                      dispatch(removeExperienceSkill(skill.skill));
                      dispatch(removeSelectedSkill(skill));
                    }}
                  >
                    x
                  </button>
                </span>
              ))}
          </div>
          <InputSkills jobRole={title} />

          <div>
            {editMode &&
            editingExperience?.description &&
            editingExperience.description.length > 0 ? (
              <ul className="text-xs text-slate-900">
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

            <Textarea
              size="sm"
              isDisabled={editMode && !editingExperience}
              label="Description"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyUp={handleKeyUp}
              placeholder="- Enter some decriptions about your work as a list and press Enter"
            ></Textarea>
          </div>
          <div className="p-2">
            <Button
              size="sm"
              variant="flat"
              isDisabled={editMode && !editingExperience}
              className="input-action-btn max-w-fit"
              type="button"
              onClick={handleSubmit}
            >
              <FontAwesomeIcon icon={editMode ? faRepeat : faPlusCircle} />{" "}
              {editMode ? "Update" : "Add Experience"}
            </Button>
          </div>
        </div>
      </Form>
    </motion.div>
  );
};

export default InputExperience;
