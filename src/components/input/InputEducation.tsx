import { useEffect, useState } from "react";
import { Location } from "../../types/Location";
import { Education } from "../../types/Education";
import InputLocation from "./InputLocation";
import { useDispatch } from "react-redux";
import { addEducation } from "../../redux/slices/EducationSlice";
import { useNavigate, useParams } from "react-router";
import { generateQualifications } from "../../Ai/AiGeneratives";
import {
  Checkbox,
  Input,
  Listbox,
  ListboxItem,
  Textarea,
} from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { easeInOut, motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";

const InputEducation = ({ templateId }: { templateId: number }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>("");
  const [institute, setInstitute] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [studying, setStudying] = useState<boolean>(false);
  const [location, setLocation] = useState<Location | undefined>();
  const [suggestedEducations, setSuggestedEducations] = useState<string[]>([]);

  const newEducation: Education = {
    title: title,
    institute: institute,
    description: description,
    dates: {
      startDate: startDate,
      endDate: endDate,
    },
    location: location,
    studying: studying,
  };

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
    setDescription("");
    setStartDate("");
    setEndDate("");
    setStudying(false);
    setSuggestedEducations([]);
  };

  useEffect(() => {
    setLocation({ state, city, country });
  }, [state, city, country]);

  const handlesubmit = () => {
    dispatch(addEducation(newEducation));
    clearForm();
  };

  const handleEndDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedEndDate = e.target.value;

    if (!selectedEndDate) {
      setEndDate("");
      return;
    }

    if (new Date(selectedEndDate) >= new Date(startDate)) {
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
        <Button
          size="sm"
          onPress={handleBack}
          className="input-nav-btn"
          variant="flat"
        >
          {" "}
          <FontAwesomeIcon icon={faArrowLeft} />{" "}
        </Button>
        <Button
          size="sm"
          onPress={handleNext}
          className="input-nav-btn"
          variant="flat"
        >
          {" "}
          <FontAwesomeIcon icon={faArrowRight} />{" "}
        </Button>
      </div>

      <div className="mb-4">
        <h2 className=" input-heading">Education</h2>
        <p className="input-sub-heading">
          Enter your academic background, including degrees, institutions, and
          graduation dates.
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
            size={"md"}
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
              {suggestedEducations.map((edu: string) => (
                <ListboxItem textValue={edu} key={edu}>
                  {edu}
                </ListboxItem>
              ))}
            </Listbox>
          )}

          <Input
            label="Institute / Collage"
            value={institute}
            onChange={(e) => {
              setInstitute(e.target.value);
            }}
            size={"md"}
            type="text"
          />

          <div>
            <Checkbox
            checked={studying}
            isSelected={studying}
              className="mb-1"
              onChange={() => {
                setStudying((prev) => !prev);
              }}
            >
              <span className="text-blue-950 text-xs">
                I'm currently follwing this
              </span>
            </Checkbox>

            <div className="flex gap-3 flex-nowrap">
              <Input
                label="Start Date"
                type="date"
                id="start-date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              {!studying && (
                <Input
                  label="End Date"
                  type="date"
                  id="end-date"
                  value={endDate !== "present" ? endDate || "" : ""}
                  onChange={handleEndDate}
                  disabled={studying}
                  hidden={studying}
                />
              )}
            </div>
          </div>

          <InputLocation
            location={location}
            setCity={setCity}
            setState={setState}
            setCountry={setCountry}
          />

          <Textarea
            label="Description - (optional)"
            onChange={(e) => setDescription(e.target.value)}
          />
          <Button
            variant="flat"
            className="input-action-btn max-w-fit"
            type="button"
            onPress={handlesubmit}
          >
            <FontAwesomeIcon icon={faPlusCircle} /> Add education
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default InputEducation;
