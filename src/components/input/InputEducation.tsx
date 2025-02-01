import { useEffect, useState } from "react";
import { Location } from "../../types/Location";
import { Education } from "../../types/Education";
import InputLocation from "./InputLocation";
import { useDispatch, useSelector } from "react-redux";
import { addEducation, clearEditingEducation, updateEducation } from "../../redux/slices/EducationSlice";
import { useNavigate } from "react-router";
import { generateQualifications } from "../../Ai/AiGeneratives";
import {
  Checkbox,
  Input,
  Listbox,
  ListboxItem,
  Textarea,
  Button,
} from "@nextui-org/react";
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

  const editMode: boolean = useSelector((state: any) => state.editmode);
  const editingEducation: Education | null = useSelector(
    (state: any) => state.education.editingEducation
  );

  const handleAiGenerateEducations = async () => {
    try {
      const generatedEdu: string[] = await generateQualifications(title);
      setSuggestedEducations(generatedEdu);
    } catch (error) {
      console.error("Error generating qualifications:", error);
      setSuggestedEducations([]);
    }
  };

  const clearForm = () => {
    setTitle("");
    setInstitute("");
    setDescription(null);
    setStartDate("");
    setEndDate("");
    setStudying(false);
    setSuggestedEducations([]);
    setLocation(null)
  };

  useEffect(() => {
    setLocation({ state, city, country });
  }, [state, city, country]);

  useEffect(() => {
    if (editMode && editingEducation) {
      setTitle(editingEducation?.title);
      setInstitute(editingEducation?.institute);
      setDescription(editingEducation?.description);
      setStartDate(editingEducation?.dates?.startDate);
      setEndDate(editingEducation?.dates?.endDate);
      setStudying(editingEducation?.studying);
      setLocation(editingEducation?.location || undefined);
    } 
  }, [editMode,editingEducation]);
  useEffect(() => {
    if (!editMode) {

      dispatch(clearEditingEducation())

      clearForm()

    }
  }, [editMode, dispatch]);


  const handleSubmit = (isEdit: boolean) => {
    const newEducation: Education = {
      title,
      institute,
      description,
      dates: { startDate, endDate },
      location,
      studying,
    };
    dispatch(isEdit ? updateEducation(newEducation) : addEducation(newEducation));
    clearForm();
  };

  const handleEndDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedEndDate = e.target.value;

    if (!selectedEndDate) {
      setEndDate("");
      return;
    }

    if (startDate && new Date(selectedEndDate) >= new Date(startDate)) {
      setEndDate(selectedEndDate);
    } else {
      alert("End date cannot be earlier than the start date.");
    }

    if (studying) {
      setEndDate("Present");
    }
  };

  const handleNext = () => {
    navigate(`/template/${templateId}/create/experience`);
  };
  const handleBack = () => {
    navigate(`/template/${templateId}/create/social-link`);
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
        <Button size="sm" onPress={handleBack} className="input-nav-btn" variant="flat">
          <FontAwesomeIcon icon={faArrowLeft} />
        </Button>
        <Button size="sm" onPress={handleNext} className="input-nav-btn" variant="flat">
          <FontAwesomeIcon icon={faArrowRight} />
        </Button>
      </div>

      <div className="mb-4">
        <h2 className="input-heading">Education</h2>
        <p className="input-sub-heading">
          Enter your academic background, including degrees, institutions, and graduation dates.
        </p>
      </div>

      <form>
        <div className="flex flex-col gap-3">
          <Input
            label="Qualification / Certifications"
            value={title}
            onChange={(e) => {
              handleAiGenerateEducations();
              setTitle(e.target.value);
            }}
            size="md"
            type="text"
          />

          {title && suggestedEducations.length > 0 && (
            <Listbox
              selectionMode="single"
              onAction={(key) => {
                setTitle(key as string);
                setSuggestedEducations([]);
              }}
            >
              {suggestedEducations.map((edu) => (
                <ListboxItem textValue={edu} key={edu}>
                  {edu}
                </ListboxItem>
              ))}
            </Listbox>
          )}

          <Input
            label="Institute / College"
            value={institute}
            onChange={(e) => setInstitute(e.target.value)}
            size="md"
            type="text"
          />

          <div>
            <Checkbox
              isSelected={studying}
              className="mb-1"
              onChange={() => setStudying((prev) => !prev)}
            >
              <span className="text-blue-950 text-xs">I'm currently following this</span>
            </Checkbox>

            <div className="flex gap-3 flex-nowrap">
              <Input
                label="Start Date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              {!studying && (
                <Input
                  label="End Date"
                  type="date"
                  value={endDate !== "Present" ? endDate : ""}
                  onChange={handleEndDate}
                  disabled={studying}
                />
              )}
            </div>
          </div>

          <InputLocation location={location} setCity={setCity} setState={setState} setCountry={setCountry} />

          <Textarea
            label="Description - (optional)"
            value={description || ""}
            onChange={(e) => setDescription(e.target.value)}
          />

          <Button
            variant="flat"
            className="input-action-btn max-w-fit"
            type="button"
            onPress={() => handleSubmit(editMode)}
          >
            <FontAwesomeIcon icon={editMode ? faRepeat : faPlusCircle} /> {editMode ? "Update" : "Add education"}
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default InputEducation;
