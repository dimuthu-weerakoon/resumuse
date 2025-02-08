import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import ContactInfo from "../../types/ContactInfo";
import { Education } from "../../types/Education";
import { Experience } from "../../types/Experience";
import { PersonalInfo } from "../../types/PersonalInfo";
import { SocialLink } from "../../types/SocialLinks";
import { iconNames } from "../../common_functions/SocialIconObject";
import formattedDate from "../../common_functions/dateformat";
import Highlight from "../../types/Highlight";
import { useNavigate } from "react-router-dom";
import { editSocialLink, removeSocialLink } from "../../redux/slices/SocialLinksSlice";
import { editEducation, removeEducation } from "../../redux/slices/EducationSlice";
import { editExperience, removeExperience } from "../../redux/slices/ExpSlice";
import { editHighlight, removeHighlight } from "../../redux/slices/HighlightSlice";
import { faClose, faPen } from "@fortawesome/free-solid-svg-icons";

const Template3Preview = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const editMode: boolean = useSelector((state: any) => state.editmode)
  const { experiences }: { experiences: Experience[] } = useSelector(
    (state: any) => state.experience
  );
  const { educations }: { educations: Education[] } = useSelector((state: any) => state.education);
  const contactInfo: ContactInfo = useSelector(
    (state: any) => state.contactInfo
  );
  const { links }: { links: SocialLink[] } = useSelector(
    (state: any) => state.socialLink
  );
  const personalInfo: PersonalInfo = useSelector((state: any) => state.personalInfo);
  const summery: string = useSelector((state: any) => state.summery);
  const { highlights, heading }: { highlights: Highlight[], heading: string } = useSelector(
    (state: any) => state.highlight
  );

  const handleEditSocialMedia = (index: number) => {
    dispatch(editSocialLink(index))
    navigate(`/template/3/create/social-link`);
  }

  const handleEditEducation = (index: number) => {
    dispatch(editEducation(index))
    navigate(`/template/3/create/education`);
  }

  const handleEditExperiences = (index: number) => {
    dispatch(editExperience(index))
    navigate(`/template/3/create/experience`)
  }
  const handleEditHighlights = (index: number) => {
    dispatch(editHighlight(index))
    navigate(`/template/3/create/custom-section`)
  }

  return (
    <div className=" w-full h-[29.7cm]  ">
      <div className="p-8 font-sans-serif w-full h-full bg-white">
        <div className="mb-4">
          <h3 className="font-semibold text-xl -tracking-tighter capitalize">
            {personalInfo.firstName}{" "} {personalInfo.middleName}{" "}
            {personalInfo.lastName}
          </h3>
          <ul className="flex gap-2 items-center font-light text-xs italic">
            <li>
              {(contactInfo.location?.city || contactInfo.location?.country) && (
                <>
                  {contactInfo.location?.city && contactInfo.location?.country
                    ? `${contactInfo.location.city}, ${contactInfo.location.state}`
                    : contactInfo.location?.city || contactInfo.location?.state}
                </>
              )}
              <span className="font-bold text-sm ml-2 not-italic text-blue-950">|</span>
            </li>

            <li>{contactInfo.phone}<span className="font-bold ml-2 not-italic text-sm text-blue-950">|</span></li>
            <li>{contactInfo.email}</li>
          </ul>
          <ul className="flex gap-2 items-center font-light text-xs italic">
            {links.map((social, index) => (
              <li key={index} className="flex items-center relative">
                {index > 0 && (
                  <span className="font-bold not-italic text-sm mr-2 text-blue-950">|</span>
                )}
                <FontAwesomeIcon icon={iconNames[social.platform]} className="mr-2" />
                <a href={social.link} target="_blank">{social.link}</a>
                {editMode &&
                  <div className="absolute bottom-0 right-0">
                    <div className="flex gap-2">
                      <button onClick={() => handleEditSocialMedia(index)}>
                        <FontAwesomeIcon
                          icon={faPen} size="xl"
                          className="mb-2 cursor-pointer " />
                      </button>
                      <button onClick={() => dispatch(removeSocialLink(social))}>
                        <FontAwesomeIcon
                          icon={faClose} size="xl"
                          className="mb-2 cursor-pointer text-red-700" />
                      </button>
                    </div>
                  </div>
                }
              </li>
            ))}
          </ul>

        </div>

        <div className="mb-4">
          <h3 className="font-medium text-lg -tracking-tighter uppercase">Carrer Overview</h3>
          <hr className="border-blue-900 border-1 mb-2" />
          <p className="text-xs text-justify font-light">
            {summery}
          </p>
        </div>

        <div className="mb-4">
          <h3 className="font-medium text-lg -tracking-tighter uppercase">Work Experience</h3>
          <hr className="border-blue-900 border-1 mb-2" />
          {experiences.map((exp, index) => (
            <div className="mb-2 relative" key={index}>
              <div className="flex justify-between flex-nowrap">
                <div className="flex gap-2 items-center">
                  <h4 className="font-medium text-sm">{exp.company} </h4>
                  <span className="font-medium text-xs italic">
                    {(exp.location?.state || exp.location?.country) && (
                      <>
                        {exp.location?.state && exp.location?.country
                          ? `- ${exp.location.state}, ${exp.location.country}`
                          : exp.location?.state || exp.location?.country}
                      </>
                    )}
                  </span>
                </div>

                <span className="font-medium text-xs">{formattedDate(exp.dates)}</span>
              </div>
              <h5 className="font-medium text-[0.78rem]">{exp.title}</h5>
              <ul className="text-xs font-light">
                {exp.description.map((desc, index) => (
                  <li className="list-disc mx-4" key={index}>{desc}</li>
                ))}
              </ul>
              {exp.skills && exp.skills.length > 0 && (
                <div className="flex items-center gap-3">
                  <h5 className="text-xs font-medium mt-1">Improved skills: </h5>
                  <span className="text-xs">{exp.skills.map(skill=>skill.skill).join(",")} </span>
                </div>
              )}

              {editMode &&
                <div className="absolute bottom-0 right-0">

                  <div className="flex gap-2">
                    <button onClick={() => handleEditExperiences(index)}>
                      <FontAwesomeIcon
                        icon={faPen} size="xl"
                        className="mb-2 cursor-pointer " />
                    </button>
                    <button onClick={() => dispatch(removeExperience(index))}>
                      <FontAwesomeIcon
                        icon={faClose} size="xl"
                        className="mb-2 cursor-pointer text-red-700" />
                    </button>
                  </div>
                </div>
              }
            </div>
          ))}

        </div>
        {highlights.length > 0 && (
          <div className="mb-4">
            <h3 className="font-medium text-lg -tracking-tighter uppercase">{heading}</h3>
            <hr className="border-blue-900 border-1 mb-2" />

            {highlights.map((h, index) => (
              <div key={index} className="mb-2 relative">
                <div className="flex justify-between flex-nowrap">
                  <h5 className="font-medium text-sm">{h.title}</h5>
                  <span className="font-medium text-xs" >{formattedDate(h.dates)}</span>
                </div>
                <ul className="flex items-center gap-3 text-xs italic">
                  {h.urls.map((url, index) => (
                    <li key={index}>
                      <FontAwesomeIcon icon={iconNames[url.platform]} className="mr-2" />
                      <a href={url.link} target="_blank" >{url.link}</a>
                    </li>
                  ))}
                </ul>
                <ul className="text-xs font-light mt-1 mx-4">
                  {h.description.map((desc, index) => (
                    <li className="list-disc" key={index}>{desc}</li>
                  ))}
                </ul>
                {editMode &&
                  <div className="absolute bottom-0 right-0">

                    <div className="flex gap-2">
                      <button onClick={() => handleEditHighlights(index)}>
                        <FontAwesomeIcon
                          icon={faPen} size="xl"
                          className="mb-2 cursor-pointer " />
                      </button>
                      <button onClick={() => dispatch(removeHighlight(index))}>
                        <FontAwesomeIcon

                          icon={faClose} size="xl"
                          className="mb-2 cursor-pointer text-red-700" />
                      </button>

                    </div>

                  </div>
                }
              </div>
            ))}

          </div>
        )}
        <div className="mb-4">
          <h3 className="font-medium text-lg -tracking-tighter uppercase">Education</h3>
          <hr className="border-blue-900 border-1 mb-2" />
          {educations.map((edu, index) => (
            <div className="mb-2 relative" key={index}>
              <div className="flex justify-between flex-nowrap mb-1">
                <h5 className="text-sm font-medium">{edu.title}</h5>
                <span className="font-medium text-xs">{formattedDate(edu.dates)}</span>
              </div>
              <h5 className="text-xs">
                {edu.institute}
                <span className="italic">
                  {(edu.location?.state || edu.location?.country) && (
                    <>
                      {edu.location?.state && edu.location?.country
                        ? ` - ${edu.location.state}, ${edu.location.country}`
                        : edu.location?.state || edu.location?.country}
                    </>
                  )}
                </span>
              </h5>

              <p className="text-xs font-light">
                {edu.description}
              </p>
              {editMode &&
                <div className="absolute bottom-0 right-0">
                  <div className="flex gap-2">
                    <button onClick={() => handleEditEducation(index)}>
                      <FontAwesomeIcon
                        icon={faPen} size="xl"
                        className="mb-2 cursor-pointer " />
                    </button>
                    <button onClick={() => dispatch(removeEducation(index))}>
                      <FontAwesomeIcon
                        icon={faClose} size="xl"
                        className="mb-2 cursor-pointer text-red-700" />
                    </button>
                  </div>
                </div>
              }
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default Template3Preview;
