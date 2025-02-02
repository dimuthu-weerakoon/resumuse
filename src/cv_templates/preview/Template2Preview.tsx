import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import ContactInfo from "../../types/ContactInfo";
import { Education } from "../../types/Education";
import { Experience } from "../../types/Experience";
import { SocialLink } from "../../types/SocialLinks";
import formattedDate from "../../common_functions/dateformat";
import { PersonalInfo } from "../../types/PersonalInfo";
import { iconNames } from "../../common_functions/SocialIconObject";
import { Refree } from "../../types/Refree";
import { CustomInitialStateProps } from "../../redux/slices/HighlightSlice";
import { useMemo } from "react";
import { faLocationDot, faPhone, faUserCircle } from "@fortawesome/free-solid-svg-icons";

const Template2Preview = () => {
  const experience: Experience[] = useSelector(
    (state: any) => state.experience
  );
  const educations: Education[] = useSelector((state: any) => state.education);
  const contactInfo: ContactInfo = useSelector(
    (state: any) => state.contactInfo
  );
  const {links}: {links:SocialLink[]} = useSelector(
    (state: any) => state.socialLink
  );
  const personalInfo: PersonalInfo = useSelector(
    (state: any) => state.personalInfo
  );
  const refree: Refree[] = useSelector((state: any) => state.refree);
  const summery: string = useSelector((state: any) => state.summery);
  const custom: CustomInitialStateProps = useSelector(
    (state: any) => state.custom
  );
  const pictureFile: File | null = useSelector(
    (state: { picture: { pictureFile: File | null } }) =>
      state.picture.pictureFile
  );
  const pictureUrl = useMemo(
    () => (pictureFile ? URL.createObjectURL(pictureFile) : null),
    [pictureFile]
  );

  return (
    <div className=" h-[29.7cm]   w-full ">
      <div className="shadow-lg p-4 bg-white font-sans-serif w-full h-full ">
        <div className="grid grid-cols-3 h-full">
          <div className=" h-full p-4 rounded-s-md">
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
            <div className="flex justify-center mt-4 mb-10 items-center ">
              <h3 className="text-gray-800 font-semibold text-xl text-center">
                {personalInfo.firstName} {personalInfo.middleName}{" "}
                {personalInfo.lastName}
              </h3>
            </div>

            <div className="flex flex-col mb-4">
              <h3 className="mb-1 font-medium"> Contact Infomation</h3>
              <hr className="border-blue-400 rounded-lg border-1 mb-4" />
              <div className=" rounded-md">
                <ul className="text-[0.75rem] italic">
                  {contactInfo && (
                    <>
                      <li className="mb-1">
                  <FontAwesomeIcon icon={faLocationDot}/>{" "} {contactInfo.address} ,{contactInfo.location.city} ,{contactInfo.location.country}
                      </li>
                         <li className="mb-1"> <FontAwesomeIcon icon={faPhone}/>{" "} {contactInfo.phone}</li>
                    </>
                  )}

                  {links &&
                    links.map((social, index) => (
                      <li key={index} className="mb-2">
                        <FontAwesomeIcon icon={iconNames[social.platform]} />{" "}
                        <a
                          className="italic hover:underline ml-1 "
                          href={social.link}
                          target="_blank"
                        >
                          {" "}
                          {social.link}
                        </a>{" "}
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

            <div className="flex flex-col">
              <h3 className="font-medium mb-1"> Refrees</h3>
              <hr className="border-blue-400 rounded-lg border-1 mb-2" />
              <div className=" rounded-md ">
                {refree &&
                  refree.map((ref, index) => (
                    <div className="flex flex-col mb-2" key={index}>
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
                    </div>
                  ))}
              </div>
            </div>
          </div>

          <div className=" col-span-2 p-4 rounded-e-md">
            <div className="mb-2">
              <h3 className="mb-1">
                <span className="font-medium">Profile</span>
              </h3>
              <hr className="border-blue-400 rounded-lg border-1 mb-2" />
              <p className="  rounded-md text-xs font-light">
                {summery}
              </p>
            </div>

            <div className="mb-2">
              <h3 className="mb-1">
                <span className="font-medium">Work Experience</span>
              </h3>
              <hr className="border-blue-400 rounded-lg border-1 mb-2" />
              <div className="  rounded-md ">
                {experience &&
                  experience.map((exp, index) => (
                    <div className="flex flex-col mb-2" key={index}>
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
                    </div>
                  ))}
              </div>
            </div>

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
                    <div className="flex flex-col mb-2" key={index}>
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
                    </div>
                  ))}
              </div>
            </div>

            {custom && custom.customs.length > 0 && (
              <div className="mb-2">
                <h3 className="mb-1">
                  <span className="font-medium"> {custom.heading}</span>
                </h3>
              <hr className="border-blue-400 rounded-lg border-1 mb-2" />
                <div className=" rounded-md ">
                  {custom.customs.map((custom, index) => (
                    <div className="flex flex-col mb-2" key={index}>
                      <h4 className="font-medium text-sm">{custom.title}</h4>
                      <ul className="flex text-[.65rem] gap-3 ">
                        {custom.urls.map((url, index) => (
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
                        {formattedDate(custom.dates)}
                      </span>
                      <ul className="text-xs mx-4">
                        {custom.description.map((des, index) => (
                          <li className="list-disc font-light" key={index}>{des}</li>
                        ))}
                      </ul>
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
