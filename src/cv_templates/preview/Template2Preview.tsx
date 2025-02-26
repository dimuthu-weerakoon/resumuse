import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import ContactInfo from "../../types/ContactInfo";
import { Education } from "../../types/Education";
import { Experience } from "../../types/Experience";
import { SocialLink } from "../../types/SocialLinks";
import formattedDate from "../../common_functions/dateformat";
import { PersonalInfo } from "../../types/PersonalInfo";
import { iconNames } from "../../common_functions/SocialIconObject";
import { Refree } from "../../types/Refree";
import { useMemo } from "react";
import { faClose, faLocationDot, faPen, faPhone, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import Highlight from "../../types/Highlight";
import { useNavigate } from "react-router-dom";
import { editRefree, removeRefree } from "../../redux/slices/RefreeSlice";
import { editSocialLink, removeSocialLink } from "../../redux/slices/SocialLinksSlice";
import { editEducation, removeEducation } from "../../redux/slices/EducationSlice";
import { editExperience, removeExperience } from "../../redux/slices/ExpSlice";
import { editHighlight, removeHighlight } from "../../redux/slices/HighlightSlice";

const Template2Preview = () => {

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
  const personalInfo: PersonalInfo = useSelector(
    (state: any) => state.personalInfo
  );
  const { refrees }: { refrees: Refree[] } = useSelector((state: any) => state.refree);
  const summery: string = useSelector((state: any) => state.summery);
  const { highlights, heading }: { highlights: Highlight[], heading: string } = useSelector(
    (state: any) => state.highlight
  );
  const pictureFile: File | null = useSelector(
    (state: { picture: { pictureFile: File | null } }) =>
      state.picture.pictureFile
  );

  // memorize picture url
  const pictureUrl = useMemo(
    () => (pictureFile ? URL.createObjectURL(pictureFile) : null),
    [pictureFile]
  );
  // function to handle edit social media links

  const handleEditSocialMedia = (index: number) => {
    dispatch(editSocialLink(index))
    navigate(`/template/2/create/social-link`);
  }
  // function to handle edit education
  const handleEditEducation = (index: number) => {
    dispatch(editEducation(index))
    navigate(`/template/2/create/education`);
  }
  // function to handle edit experince
  const handleEditExperiences = (index: number) => {
    dispatch(editExperience(index))
    navigate(`/template/2/create/experience`)
  }

  // function to handle edit highlights
  const handleEditHighlights = (index: number) => {
    dispatch(editHighlight(index))
    navigate(`/template/2/create/custom-section`)
  }
  // function to handle edit refrees
  const handleEditRefree = (index: number) => {
    dispatch(editRefree(index))
    navigate(`/template/2/create/refrees`)
  }
  return (
    <div className=" h-[29.7cm]   w-full ">
      <div className="shadow-lg p-4 bg-white font-sans-serif w-full h-full ">
        <div className="grid grid-cols-3 h-full">
          <div className=" h-full p-4 rounded-s-md">
            {/* Picture section */}
            <div className="flex justify-center items-start">
              {pictureUrl ? (
                <img
                  className="w-36 h-36  object-cover object-top border-2 border-white rounded-full"
                  src={pictureUrl}
                  alt={"profile"}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faUserCircle}
                  size="10x"
                  className={`w-36 h-36 rounded-full text-blue-100`}
                />
              )}
            </div>
            {/* Personal information section */}
            <div className="flex justify-center mt-4 mb-10 items-center ">
              <h3 className="text-gray-800 font-semibold text-xl text-center">
                {personalInfo.firstName} {personalInfo.middleName}{" "}
                {personalInfo.lastName}
              </h3>
            </div>

            <div className="flex flex-col mb-4">
              {/* Conatct information */}
              <h3 className="mb-1 font-medium"> Contact Infomation</h3>
              <hr className="border-blue-400 rounded-lg border-1 mb-4" />
              <div className=" rounded-md">
                <ul className="text-[0.75rem] italic">
                  {contactInfo && (
                    <>
                      <li className="mb-1">
                        <FontAwesomeIcon icon={faLocationDot} />{" "} {contactInfo.address} ,{contactInfo.location.city} ,{contactInfo.location.country}
                      </li>
                      <li className="mb-1"> <FontAwesomeIcon icon={faPhone} />{" "} {contactInfo.phone}</li>
                    </>
                  )}
                  {/*Social links */}
                  {links &&
                    links.map((social, index) => (
                      <li key={index} className="mb-2 relative">
                        <FontAwesomeIcon icon={iconNames[social.platform]} />{" "}
                        <a
                          className="italic hover:underline ml-1 "
                          href={social.link}
                          target="_blank"
                        >
                          {" "}
                          {social.link}
                        </a>{" "}
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
            </div>

            {/* <div className="flex flex-col">
              <h3 className="mb-2 font-medium"><FontAwesomeIcon icon={faLanguage} size="sm" className="mr-2" /> Languages</h3>

              <div className="bg-slate-100 p-4 rounded-md">
                <ul className="text-sm">
                  <li className="mb-2">English</li>
                  <li className="mb-2">Spanish</li>
                  <li className="mb-2">French</li>
                </ul>
              </div>
            </div> */}
            {/* Refrees section */}
            <div className="flex flex-col">
              <h3 className="font-medium mb-1"> Refrees</h3>
              <hr className="border-blue-400 rounded-lg border-1 mb-2" />
              <div className=" rounded-md ">
                {refrees &&
                  refrees.map((ref, index) => (
                    <div className="flex flex-col mb-2 relative" key={index}>
                      <h4 className="font-medium text-sm capitalize">
                        {ref.refreeName}
                      </h4>
                      <span className="text-xs capitalize ">
                        {ref.positions}
                      </span>
                      <span className="text-xs ">{ref.institute} </span>
                      <span className="text-xs italic">
                        {ref.location?.city}, {ref.location?.state}
                      </span>
                      <span className="text-xs italic">{ref.email}</span>
                      <span className="text-xs italic">{ref.phone}</span>
                      {editMode &&
                        <div className="absolute bottom-0 right-0">

                          <div className="flex gap-2">
                            <button onClick={() => handleEditRefree(index)}>
                              <FontAwesomeIcon
                                icon={faPen} size="xl"
                                className="mb-2 cursor-pointer " />
                            </button>
                            <button onClick={() => dispatch(removeRefree(ref))}>
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

          <div className=" col-span-2 p-4 rounded-e-md">
            {/* summery*/}
            <div className="mb-2">
              <h3 className="mb-1">
                <span className="font-medium">Profile</span>
              </h3>
              <hr className="border-blue-400 rounded-lg border-1 mb-2" />
              <p className="  rounded-md text-xs font-light">
                {summery}
              </p>
            </div>
            {/* Experience section */}
            <div className="mb-2">
              <h3 className="mb-1">
                <span className="font-medium">Work Experience</span>
              </h3>
              <hr className="border-blue-400 rounded-lg border-1 mb-2" />
              <div className="  rounded-md ">
                {experiences &&
                  experiences.map((exp, index) => (
                    <div className="flex flex-col mb-2 relative" key={index}>
                      <h4 className="font-medium text-sm">{exp.company}</h4>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[0.65rem]">
                          {exp.location?.city} ,{exp.location?.state}
                        </span>
                        <span className="text-[0.65rem]">
                          {formattedDate(exp.dates)}
                        </span>
                      </div>
                      <h5 className="text-xs font-medium">{exp.title}</h5>
                      <ul className="text-xs mx-4">
                        {exp.description.map((des, index) => (
                          <li className=" list-disc font-light" key={index}>{des}</li>
                        ))}
                      </ul>
                      {exp.skills!.length > 0 && (
                        <ul>
                          <li className="text-xs">
                            <span >Improved Skills - </span>
                            <span className="font-medium">
                              {exp.skills!
                                .map((skill) => skill.skill)
                                .join(" , ")}
                            </span>
                          </li>
                        </ul>
                      )}                      {editMode &&
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
            </div>
            {/* Education section */}
            <div className="mb-2">
              <h3 className="mb-1">
                <span className="font-medium">
                  {" "}
                  Education and Academic Qualification
                </span>
              </h3>
              <hr className="border-blue-400 rounded-lg border-1 mb-2" />
              <div className="  rounded-md ">
                {educations &&
                  educations.map((edu, index) => (
                    <div className="flex flex-col mb-2 relative" key={index}>
                      <h4 className="font-medium text-sm">{edu.title}</h4>
                      <h5 className="text-xs ">{edu.institute}</h5>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[0.65rem]">
                          {edu.location?.city} ,{edu.location?.state}
                        </span>
                        <span className="text-[0.65rem]">
                          {formattedDate(edu.dates)}
                        </span>
                      </div>
                      <p className="text-[.7rem] font-light">{edu.description}</p>
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

            {/* Highlights section */}
            {highlights && highlights.length > 0 && (
              <div className="mb-2">
                <h3 className="mb-1">
                  <span className="font-medium"> {heading}</span>
                </h3>
                <hr className="border-blue-400 rounded-lg border-1 mb-2" />
                <div className=" rounded-md ">
                  {highlights.map((h, index) => (
                    <div className="flex flex-col mb-2 relative" key={index}>
                      <h4 className="font-medium text-sm">{h.title}</h4>
                      <ul className="flex text-[.65rem] gap-3 ">
                        {h.urls.map((url, index) => (
                          <li key={index} className="mb-2">
                            <FontAwesomeIcon icon={iconNames[url.platform]} />{" "}
                            <a
                              className="italic hover:underline ml-1 "
                              href={url.link}
                              target="_blank"
                            >
                              {" "}
                              {url.link}
                            </a>{" "}
                          </li>
                        ))}
                      </ul>
                      <span className="text-[0.65rem]">
                        {formattedDate(h.dates)}
                      </span>
                      <ul className="text-xs mx-4">
                        {h.description.map((des, index) => (
                          <li className="list-disc font-light" key={index}>{des}</li>
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
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Template2Preview;
