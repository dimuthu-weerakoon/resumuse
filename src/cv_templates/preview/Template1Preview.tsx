import { useDispatch, useSelector } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import formattedDate from "../../common_functions/dateformat";
import { Experience } from "../../types/Experience";
import { Education } from "../../types/Education";
import ContactInfo from "../../types/ContactInfo";
import { iconNames } from "../../common_functions/SocialIconObject";
import { SocialLink } from "../../types/SocialLinks";
import { faClose, faEdit, faPen } from "@fortawesome/free-solid-svg-icons";
import {
  editSocialLink,
  removeSocialLink,
} from "../../redux/slices/SocialLinksSlice";
import { useNavigate } from "react-router-dom";
import {
  editEducation,
  removeEducation,
} from "../../redux/slices/EducationSlice";
import { editExperience, removeExperience } from "../../redux/slices/ExpSlice";
import Highlight from "../../types/Highlight";
import {
  editHighlight,
  removeHighlight,
} from "../../redux/slices/HighlightSlice";
// Template 1 Preview
const Template1Preview = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //sates from redux store
  const editMode: boolean = useSelector((state: any) => state.editmode);
  const { experiences }: { experiences: Experience[] } = useSelector(
    (state: any) => state.experience
  );
  const { educations }: { educations: Education[] } = useSelector(
    (state: any) => state.education
  );
  const contactInfo: ContactInfo = useSelector(
    (state: any) => state.contactInfo
  );
  const { links }: { links: SocialLink[] } = useSelector(
    (state: any) => state.socialLink
  );
  const personalInfo = useSelector((state: any) => state.personalInfo);
  const summery: string = useSelector((state: any) => state.summery);
  const { highlights, heading }: { highlights: Highlight[]; heading: string } =
    useSelector((state: any) => state.highlight);

  // function to handle edit social media links
  const handleEditSocialMedia = (index: number) => {
    dispatch(editSocialLink(index));
    navigate(`/template/1/create/social-link`);
  };
  // function to handle edit education
  const handleEditEducation = (index: number) => {
    dispatch(editEducation(index));
    navigate(`/template/1/create/education`);
  };
  // funcrion to edit experience
  const handleEditExperiences = (index: number) => {
    dispatch(editExperience(index));
    navigate(`/template/1/create/experience`);
  };
  // function to edit highlight
  const handleEditHighlights = (index: number) => {
    dispatch(editHighlight(index));
    navigate(`/template/1/create/custom-section`);
  };
  return (
    <div className=" p-4 bg-white w-full h-[29.7cm]">
      <div className="p-2  grid font-sans-serif  grid-flow-dense grid-cols-7 w-full ">
        <div className="p-4 col-span-7  text-gray-800   rounded bg-blue-100">
          <div className=" flex justify-between">
            <div className="flex flex-col gap-4 ">
              {/* personal information section */}
              <div>
                <h4 className="font-semibold capitalize -tracking-tighter  text-2xl">
                  {" "}
                  {personalInfo.firstName} {personalInfo.middleName}{" "}
                  {personalInfo.lastName}
                </h4>
              </div>
              {/* social link section */}
              <div className="">
                {links && (
                  <ul className="text-xs flex gap-5">
                    {links.map((social, index) => (
                      <li key={index} className="relative">
                        {editMode && (
                          <div className="absolute bottom-1 right-0">
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleEditSocialMedia(index)}
                              >
                                <FontAwesomeIcon
                                  icon={faPen}
                                  size="xl"
                                  className="mb-2 cursor-pointer "
                                />
                              </button>
                              <button
                                onClick={() =>
                                  dispatch(removeSocialLink(social))
                                }
                              >
                                <FontAwesomeIcon
                                  icon={faClose}
                                  size="xl"
                                  className="mb-2 cursor-pointer text-red-700"
                                />
                              </button>
                            </div>
                          </div>
                        )}
                        <FontAwesomeIcon icon={iconNames[social.platform]} />{" "}
                        <a
                          className="italic hover:underline"
                          href={social.link}
                          target="_blank"
                        >
                          {social.link}
                        </a>{" "}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            {/* Contact information section */}
            <div className="flex flex-col  gap-2 text-right italic text-xs">
              <div>
                {contactInfo && (
                  <ul>
                    <li>{contactInfo.email}</li>
                    <li>{contactInfo.phone}</li>
                    <li>{contactInfo.location?.city}</li>
                    <li>
                      {" "}
                      {contactInfo.location?.state} ,{" "}
                      {contactInfo.location?.country}
                    </li>
                  </ul>
                )}
              </div>
            </div>
          </div>
          {/* Summery section */}
          <div className="col-span-7 mt-5">
            <div>
              <p className="text-xs">{summery} </p>
            </div>
          </div>
        </div>

        <div className="Exp-section mt-4 col-span-4 mr-6">
          {/* Experience section */}
          <div>
            <h3 className="font-semibold -tracking-tighter uppercase">
              Experience
            </h3>
            <hr className="my-1 w-full rounded-lg border-2 mb-3 border-blue-100" />
            <div>
              {experiences && (
                <div className="mb-3 ">
                  <div>
                    {experiences.map((exp, index) => (
                      <div key={index} className=" text-xs mb-3 relative">
                        <div className="flex justify-between items-center mb-1">
                          <div className="flex flex-col">
                            <span className="font-semibold capitalize">
                              {exp.company}
                            </span>
                            <span className="font-medium">{exp.title}</span>
                          </div>

                          <div className="flex flex-col text-end italic text-[0.7rem] h-fit">
                            <span className="text-nowrap">
                              {formattedDate(exp.dates)}
                            </span>
                            <span>
                              {exp.location?.city} , {exp.location?.state}
                            </span>
                          </div>
                        </div>

                        <div className="mb-2">
                          {exp.description!.length > 0 && (
                            <ul className="mx-4  leading-4">
                              {exp.description!.map((desc) => (
                                <li
                                  className="list-disc font-light"
                                  key={index}
                                >
                                  {desc}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>

                        {exp.skills!.length > 0 && (
                          <ul>
                            <li className="text-xs">
                              <span>Improved Skills - </span>
                              <span className="font-medium">
                                {exp
                                  .skills!.map((skill) => skill.skill)
                                  .join(" , ")}
                              </span>
                            </li>
                          </ul>
                        )}
                        {editMode && (
                          <div className="absolute bottom-0 right-0">
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleEditExperiences(index)}
                              >
                                <FontAwesomeIcon
                                  icon={faPen}
                                  size="xl"
                                  className="mb-2 cursor-pointer "
                                />
                              </button>
                              <button
                                onClick={() =>
                                  dispatch(removeExperience(index))
                                }
                              >
                                <FontAwesomeIcon
                                  icon={faClose}
                                  size="xl"
                                  className="mb-2 cursor-pointer text-red-700"
                                />
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* Highlights section */}
          {highlights.length > 0 && (
            <div>
              <h3 className="font-semibold -tracking-tighter uppercase">
                {heading}
              </h3>
              <hr className="my-1 w-full rounded-lg border-2 mb-3 border-blue-100" />
              <div>
                {highlights && (
                  <div className="mb-3 ">
                    <div>
                      {highlights.map((highlight, index) => (
                        <div key={index} className=" text-xs mb-3 relative">
                          <div className="flex justify-between items-center mb-1">
                            <div className="flex flex-col">
                              <span className="font-semibold capitalize">
                                {highlight.title}
                              </span>
                            </div>
                            <div className="flex flex-col text-start italic text-[0.7rem] h-fit">
                              <span className="text-nowrap">
                                {formattedDate(highlight.dates)}
                              </span>
                            </div>
                          </div>
                          <ul className="flex items-center gap-3 mb-1 font-medium text-xs italic">
                            {highlight.urls.map((url, index) => (
                              <li key={index}>
                                <FontAwesomeIcon
                                  size="xs"
                                  icon={iconNames[url.platform]}
                                  className="mr-2"
                                />
                                <a href={url.link} target="_blank">
                                  {url.link}
                                </a>
                              </li>
                            ))}
                          </ul>
                          <div className="mb-2">
                            {highlight.description.length > 0 && (
                              <ul className="mx-4  leading-4">
                                {highlight.description.map((desc) => (
                                  <li
                                    className="list-disc font-light"
                                    key={index}
                                  >
                                    {desc}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                          {editMode && (
                            <div className="absolute bottom-0 right-0">
                              <div className="flex gap-2">
                                <button
                                  onClick={() => handleEditHighlights(index)}
                                >
                                  <FontAwesomeIcon
                                    icon={faPen}
                                    size="xl"
                                    className="mb-2 cursor-pointer "
                                  />
                                </button>
                                <button
                                  onClick={() =>
                                    dispatch(removeHighlight(index))
                                  }
                                >
                                  <FontAwesomeIcon
                                    icon={faClose}
                                    size="xl"
                                    className="mb-2 cursor-pointer text-red-700"
                                  />
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        {/* Eduction section */}
        <div className="Educ-section mt-4 col-span-3">
          <h3 className="font-semibold -tracking-tighter uppercase ">
            Education
          </h3>
          <hr className="my-1 w-full rounded-lg border-2 mb-3 border-blue-100" />
          <div>
            {educations && (
              <div className="mb-3">
                {educations.map((edu, index) => (
                  <div key={index} className="text-xs mb-3 relative">
                    <div className="flex justify-between items-center mb-1 capitalize">
                      <div className="w-full flex flex-col">
                        <span className="font-semibold ">{edu.title}</span>
                        <span className="font-light">{edu.institute}</span>
                        <p className="text-[.7rem]">{edu?.description}</p>
                        <div className=" flex justify-between gap-2  flex-nowrap text-[0.65rem] italic ">
                          <div className="">{formattedDate(edu.dates)}</div>
                          <div className="">
                            {edu.location?.city},{edu.location?.state}
                          </div>
                        </div>
                      </div>
                    </div>
                    {editMode && (
                      <div className="absolute bottom-0 right-0">
                        <div className="flex gap-2">
                          <button onClick={() => handleEditEducation(index)}>
                            <FontAwesomeIcon
                              icon={faPen}
                              size="xl"
                              className="mb-2 cursor-pointer "
                            />
                          </button>
                          <button
                            onClick={() => dispatch(removeEducation(index))}
                          >
                            <FontAwesomeIcon
                              icon={faClose}
                              size="xl"
                              className="mb-2 cursor-pointer text-red-700"
                            />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Template1Preview;
