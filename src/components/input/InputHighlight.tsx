import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  Button,
  Form,
  Input,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";
import { SocialLink } from "../../types/SocialLinks";
import {
  faArrowCircleRight,
  faArrowLeft,
  faArrowRight,
  faClose,
  faPen,
  faPlusCircle,
  faRepeat,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  addHighlight,
  addMoreDescriptions,
  addMoreUrls,
  clearEditingHighlight,
  editHighlightDescription,
  editHighlightUrl,
  removeHighlightDescription,
  removeHighlightUrl,
  setHeading,
  updateEditingHighlightDesc,
  updateHighlight,
  updateHighlightUrl,
} from "../../redux/slices/HighlightSlice";
import { motion } from "framer-motion";
import Highlight from "../../types/Highlight";
import { iconNames } from "../../common_functions/SocialIconObject";
import { socialPlatforms } from "../../common_functions/SocialPlatforms";

const InputHighlight = ({ templateId }: { templateId: number }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [description, setDescription] = useState<string[]>([]);
  const [urls, setUrls] = useState<SocialLink[]>([]);
  const [currentInput, setCurrentInput] = useState<string>();
  const [platform, setPlatform] = useState<string>("");
  const [link, setLink] = useState<string>("");
  const [inValid, setInvalid] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>();

  const {
    heading,
    editingHighlight,
    editingHighlightDesc,
    editingHighlightUrl,
  }: {
    heading: string;
    editingHighlight: Highlight | null;
    editingHighlightDesc: string | null;
    editingHighlightUrl: SocialLink | null;
  } = useSelector((state: any) => state.highlight);
  const editMode: boolean = useSelector((state: any) => state.editmode);
  const clearForm = () => {
    setTitle("");
    setStartDate("");
    setEndDate("");
    setDescription([]);
    setUrls([]);
    setPlatform("");
    setLink("");
    setCurrentInput("");
  };
  useEffect(() => {
    if (!editMode) {
      dispatch(clearEditingHighlight());
      clearForm();
    }
  }, [editMode, dispatch]);

  useMemo(() => {
    if (editMode && editingHighlight) {
      setTitle(editingHighlight.title);
      setStartDate(editingHighlight.dates.startDate);
      setEndDate(editingHighlight.dates.endDate);
      setDescription(editingHighlight.description);
      setUrls(editingHighlight.urls);
    }
  }, [editMode, editingHighlight]);

  useMemo(() => {
    if (editMode && editingHighlightDesc) {
      setCurrentInput(editingHighlightDesc);
    }
  }, [editMode, editingHighlightDesc]);
  useMemo(() => {
    if (editMode && editingHighlightUrl) {
      setLink(editingHighlightUrl.link);
      setPlatform(editingHighlightUrl.platform);
    }
  }, [editMode, editingHighlightUrl]);

  const handleUrls = () => {
    const trimmedLink = link.trim();
    if (!platform && !trimmedLink) {
      setPlatform("");
      setLink("");
      setInvalid(false);
      setErrorMessage(null);
    }
    try {
      const checkUrl = new URL(trimmedLink);
      if (checkUrl.protocol !== "https:" || !platform) {
        setInvalid(true);
        setErrorMessage("Invalid URL");
        return;
      }
      if (platform === "github" && checkUrl.hostname !== "github.com") {
        setInvalid(true);
        setErrorMessage("Enter a Valid Platform URL");
        return;
      }
    } catch (error) {
      setInvalid(true);
      setErrorMessage("Invalid URL");
      return;
    }
    if (!platform && !link) {
      setInvalid(false);
      setErrorMessage(null);
    }
    setInvalid(false);
    setErrorMessage(null);

    const newUrl: SocialLink = {
      platform: platform,
      link: link,
    };

    if (editMode && !editingHighlightUrl) {
      dispatch(addMoreUrls(newUrl));
    }

    editMode
      ? dispatch(updateHighlightUrl(newUrl))
      : setUrls((prev) => [...prev, newUrl]);

    setPlatform("");
    setLink("");

    console.log(urls);
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value.trim();
    if (e.key === "Enter" && value) {
      e.preventDefault();
      if (editMode && !editingHighlightDesc) {
        dispatch(addMoreDescriptions(value));
      }
      editMode
        ? dispatch(updateEditingHighlightDesc(value))
        : setDescription((prev) => [...prev, value]);
      setCurrentInput("");
    }
  };

  const handleSubmit = () => {
    const newHighlight: Highlight = {
      title: title,
      dates: {
        startDate: startDate,
        endDate: endDate,
      },
      urls: urls,
      description: description,
    };

    if (
      title.trim() !== "" &&
      heading.trim() !== "" &&
      description.length > 0
    ) {
      editMode
        ? dispatch(updateHighlight(newHighlight))
        : dispatch(addHighlight(newHighlight));
    } else {
      return;
    }
    clearForm();
  };

  const handleNext = () => {
    navigate(`/template/${templateId}/create/summery`);
  };
  const handleBack = () => {
    navigate(`/template/${templateId}/create/experience`);
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
        <h2 className=" input-heading">Highlights</h2>
        <p className="input-sub-heading">
          Showcase your unique accomplishments, such as research, projects, or
          other notable contributions.
        </p>
      </div>
      <Form validationBehavior="native" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-3 w-full">
          <Input
            size="sm"
            type="text"
            validate={(value) => {
              if (value.trim() === "") {
                return "Please fill this field";
              }
            }}
            isDisabled={editMode && !editingHighlight}
            label="Section Heading (Projects,Researches...)"
            value={heading}
            onChange={(e) => {
              dispatch(setHeading(e.target.value));
            }}
          />

          <Input
            type="text"
            size="sm"
            isDisabled={editMode && !editingHighlight}
            label="Title (Project title,Research Title)"
            value={title}
            validate={(value) => {
              if (value.trim() === "") {
                return "Please fill this field";
              }
            }}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />

          <div className="flex gap-2 flex-nowrap">
            <Input
              size="sm"
              label="Start Date"
              isDisabled={editMode && !editingHighlight}
              type="date"
              id="start-date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />

            <Input
              label="End Date"
              isDisabled={editMode && !editingHighlight}
              type="date"
              size="sm"
              id="end-date"
              value={endDate !== "present" ? endDate || "" : ""}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>

          <div>
            {editMode &&
            editingHighlight?.description &&
            editingHighlight.description.length > 0 ? (
              <ul className="text-xs text-slate-900">
                {editingHighlight.description.map((desc, index) => (
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
                            dispatch(editHighlightDescription(index))
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
                          onClick={() =>
                            dispatch(removeHighlightDescription(index))
                          }
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
              label="Description"
              validate={(value) => {
                if (value.trim() === "") {
                  return "Please add some descriptions";
                }
              }}
              size="sm"
              value={currentInput}
              isDisabled={editMode && !editingHighlight}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyUp={handleKeyUp}
              placeholder="- Enter some decriptions about your work as a list and press Enter"
            ></Textarea>
          </div>

          <div>
            {editMode &&
            editingHighlight?.urls &&
            editingHighlight.urls.length > 0 ? (
              <ul className="text-xs text-slate-900">
                {editingHighlight.urls.map((url, index) => (
                  <li key={index} 
                  className="relative selected-skill bg-slate-300 p-1 mb-1 border rounded-md border-slate-400 font-medium text-xs"

                  >
                    

                    <FontAwesomeIcon icon={iconNames[url.platform]} />{" "}
                    <a
                      className="italic hover:underline"
                      href={url.link}
                      target="_blank"
                    >
                      {url.link}
                    </a>{" "}



                    <div className="absolute top-1 right-1 ">
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            dispatch(editHighlightUrl(index))
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
                          onClick={() =>
                            dispatch(removeHighlightUrl(url))
                          }
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
          </div>

          <div className="flex w-full justify-center items-center gap-3 max-lg:flex-wrap">
            <Select
              value={platform}
              selectedKeys={new Set(platform ? [platform] : [])}
              onChange={(e) => setPlatform(e.target.value)}
              label="Select Platform"
              isDisabled={editMode && !editingHighlight}
              size="sm"
            >
              {socialPlatforms.map((social) => (
                <SelectItem
                  key={social.platform}
                  value={social.platform}
                  
                  isReadOnly={editingHighlightDesc?.valueOf &&  platform !== social.platform}
                  startContent={
                    <FontAwesomeIcon
                      icon={iconNames[social.platform]}
                      color={social.color}
                    />
                  }
                >
                  {social.Label}
                </SelectItem>
              ))}
            </Select>
            <Input
              size="sm"
              type="url"
              isDisabled={editMode && !editingHighlight}
              label="URL"
              value={link}
              isInvalid={inValid}
              errorMessage={errorMessage}
              endContent={
                <Button size="sm" isIconOnly onPress={handleUrls}>
                  <FontAwesomeIcon
                    size="lg"
                    icon={editMode ? faRepeat : faArrowCircleRight}
                  />
                </Button>
              }
              onChange={(e) => setLink(e.target.value)}
            />
          </div>

          <div className="p-2">
            <Button
              variant="flat"
              className="input-action-btn max-w-fit"
              type="button"
              onPress={handleSubmit}
              size="sm"
              isDisabled={editMode && !editingHighlight}
            >
              <FontAwesomeIcon icon={editMode ? faRepeat : faPlusCircle} />{" "}
              {editMode ? "Update" : "Add"}
            </Button>
          </div>
        </div>
      </Form>
    </motion.div>
  );
  
};

export default InputHighlight;
