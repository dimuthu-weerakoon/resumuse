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
import { CustomInitialStateProps } from "../../redux/slices/CustomSlice";
import { useMemo } from "react";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

const Template2Preview = () => {
  const experience: Experience[] = useSelector(
    (state: any) => state.experience
  );
  const educations: Education[] = useSelector((state: any) => state.education);
  const contactInfo: ContactInfo = useSelector(
    (state: any) => state.contactInfo
  );
  const socialLinks: SocialLink[] = useSelector(
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
    <div className=" w-[21cm] h-[29.7cm]  ">
      <div className="shadow-lg p-4 bg-white font-serif  h-[100%] ">
        <div className="grid grid-cols-3 h-full">
          <div className="bg-slate-50 h-full p-4 rounded-s-md">
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

            <div className="flex flex-col mb-2">
              <h3 className="mb-2 font-medium"> Contact Infomation</h3>

              <div className="bg-slate-100 p-4 rounded-md">
                <ul className="text-[0.65rem] italic">
                  {contactInfo && (
                    <>
                      <li className="mb-1">
                        {contactInfo.address} ,{contactInfo.location.city}
                      </li>
                      <li className="mb-1">{contactInfo.phone}</li>
                    </>
                  )}

                  {socialLinks &&
                    socialLinks.map((social, index) => (
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
              <h3 className="mb-2 font-medium"> Refrees</h3>
              <div className="bg-slate-100 p-3 rounded-md ">
                {refree &&
                  refree.map((ref, index) => (
                    <div className="flex flex-col mb-2" key={index}>
                      <h4 className="font-medium capitalize">
                        {ref.refreeName}
                      </h4>
                      <span className="text-sm capitalize ">
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

          <div className="bg-slate-100 col-span-2 p-4 rounded-e-md">
            <div className="mb-2">
              <h3 className="mb-2">
                <span className="font-medium">Profile</span>
              </h3>

              <p className="bg-slate-50 p-4 rounded-md text-xs text-justify">
                {summery}
              </p>
            </div>

            <div className="mb-2">
              <h3 className="mb-2">
                <span className="font-medium">Work Experience</span>
              </h3>
              <div className="bg-slate-50 p-4 rounded-md ">
                {experience &&
                  experience.map((exp, index) => (
                    <div className="flex flex-col mb-2" key={index}>
                      <h4 className="font-medium text-sm">{exp.company}</h4>
                      <span className="text-[0.65rem]">
                        {formattedDate(exp.dates)}
                      </span>
                      <span className="text-[0.65rem]">
                        {exp.location?.city} ,{exp.location?.state}
                      </span>
                      <h5 className="text-xs font-medium">{exp.title}</h5>
                      <ul className="text-xs">
                        {exp.description.map((des, index) => (
                          <li key={index}>- {des}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
              </div>
            </div>

            <div className="mb-2">
              <h3 className="mb-2">
                <span className="font-medium">
                  {" "}
                  Education and Academic Qualification
                </span>
              </h3>
              <div className="bg-slate-50 p-4 rounded-md ">
                {educations &&
                  educations.map((edu, index) => (
                    <div className="flex flex-col mb-2" key={index}>
                      <h4 className="font-medium text-sm">{edu.title}</h4>
                      <h5 className="text-xs font-medium">{edu.institute}</h5>
                      <span className="text-[0.65rem]">
                        {formattedDate(edu.dates)}
                      </span>
                      <span className="text-[0.65rem]">
                        {edu.location?.city},{edu.location?.state}
                      </span>
                      <p className="text-[.7rem]">{edu.description}</p>
                    </div>
                  ))}
              </div>
            </div>

            {custom && custom.customs.length > 0 && (
              <div className="mb-2">
                <h3 className="mb-2">
                  <span className="font-medium"> {custom.heading}</span>
                </h3>
                <div className="bg-slate-50 p-4 rounded-md ">
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
                      <ul className="text-xs">
                        {custom.description.map((des, index) => (
                          <li key={index}>- {des}</li>
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
