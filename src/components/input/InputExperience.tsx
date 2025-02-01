import { useEffect, useMemo, useState } from "react";
import InputSkills from "./InputSkills";
import { Experience } from "../../types/Experience";
import InputLocation from "./InputLocation";
import { Location } from "../../types/Location";
import { useDispatch, useSelector } from "react-redux";
import {
  addExperience,
  clearEditingExperience,
  editExperienceDescription,
  updateExpereince,
  updateExperienceDescription,
} from "../../redux/slices/ExpSlice";
import { clearSelectedSkills } from "../../redux/slices/SkillsSlice";
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
} from "@nextui-org/react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faEdit,
  faPlusCircle,
  faRepeat,
} from "@fortawesome/free-solid-svg-icons";

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
      clearExp();
    }
  }, [editMode, dispatch]);

  const handleKeyUp = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const value = e.currentTarget.value.trim();
    if (e.key === "Enter" && value) {
      e.preventDefault();
      if (editMode) {
        dispatch(updateExperienceDescription(value));
        setCurrentInput("");
      } else {
        setDescription((prev) => [...prev, value]);
        setCurrentInput("");
      }
    }
  };
  

  const handleSubmit = (isEdit: boolean) => {
    const newExp: Experience = {
      title: title,
      type: type,
      company: company,
      description: description,
      status: status,
      skills: selectedSkills,
      dates: { startDate: startDate, endDate: endDate },
      location: location,
    };
    isEdit
      ? dispatch(updateExpereince(newExp))
      : dispatch(addExperience(newExp));
    clearExp();
    dispatch(clearSelectedSkills());
  };

  const handleEndDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedEndDate = e.target.value;
    if (new Date(selectedEndDate) >= new Date(startDate)) {
      setEndDate(selectedEndDate);
    } else {
      alert("End date cannot be earlier than the start date.");
    }

    if (status) {
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

      <form>
        <div className="flex flex-col gap-3">
          <Input
            type="text"
            label="Podition / Job Role"
            value={title}
            onChange={(e) => {
              handleAiSuggestTitle();
              setTitle(e.target.value);
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
            label="Select Employment Type"
            selectedKeys={new Set([type])}
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            {employeeTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </Select>

          <Input
            type="text"
            label="Company / Organization"
            value={company}
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
            onChange={() => setStatus((prev) => !prev)}
          >
            <span className="text-xs text-blue-950">
              I'm currently working here
            </span>
          </Checkbox>

          <div className="flex gap-2 flex-nowrap">
            <Input
              label="Start Date"
              type="date"
              id="start-date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />

            {!status && (
              <Input
                hidden={status}
                label="End Date"
                type="date"
                id="end-date"
                value={endDate !== "present" ? endDate || "" : ""}
                onChange={handleEndDate}
                disabled={status}
              />
            )}
          </div>

          <InputSkills jobRole={title} />

          <div>
            {editMode &&
            editingExperience?.description &&
            editingExperience.description.length > 0 ? (
              <ul className="text-xs text-slate-900">
                {editingExperience.description.map((desc, index) => (
                  <li key={index} className="list-disc ml-4 relative">
                    <p> {desc}</p>
                    <button
                      type="button"
                      onClick={() => dispatch(editExperienceDescription(index))}
                    >
                      <FontAwesomeIcon
                        icon={faEdit}
                        size="lg"
                        className="mb-2 cursor-pointer absolute top-0 right-0"
                      />
                    </button>
                  </li>
                ))}
              </ul>
            ) : null}

            <Textarea
              label="Description"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyUp={(e) => handleKeyUp(e, editMode)}
              placeholder="- Enter some decriptions about your work as a list and press Enter"
            ></Textarea>
          </div>
          <div className="p-2">
            <Button
              variant="flat"
              className="input-action-btn max-w-fit"
              type="button"
              onPress={() => handleSubmit(editMode)}
            >
              <FontAwesomeIcon icon={editMode ? faRepeat : faPlusCircle} />{" "}
              {editMode ? "Update" : "Add Experience"}
            </Button>
          </div>
        </div>
      </form>
    </motion.div>
  );
};

export default InputExperience;
