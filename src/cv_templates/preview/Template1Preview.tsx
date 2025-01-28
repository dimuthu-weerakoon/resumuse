import { useSelector } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import formattedDate from "../../common_functions/dateformat";
import { Experience } from "../../types/Experience";
import { Education } from "../../types/Education";
import ContactInfo from "../../types/ContactInfo";
import { iconNames } from "../../common_functions/SocialIconObject";
import { SocialLink } from "../../types/SocialLinks";
import { CustomInitialStateProps } from "../../redux/slices/CustomSlice";

const Template1Preview = () => {
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
  const personalInfo = useSelector((state: any) => state.personalInfo);
  const summery: string = useSelector((state: any) => state.summery);
  const custom: CustomInitialStateProps = useSelector(
    (state: any) => state.custom
  );


  return (
    <div className=" p-4 bg-white w-full h-[29.7cm]">
      <div className="p-2  grid font-sans-serif  grid-flow-dense grid-cols-7 w-full ">
        <div className="p-4 col-span-7  text-gray-800   rounded bg-blue-100">
          <div className=" flex justify-between">
            <div className="flex flex-col gap-4 ">
              <div>
                <h4 className="font-semibold capitalize -tracking-tighter  text-2xl">
                  {" "}
                  {personalInfo.firstName} {personalInfo.middleName}{" "}
                  {personalInfo.lastName}
                </h4>
              </div>
              <div>
                {socialLinks && (
                  <ul className="text-xs flex gap-5">
                    {socialLinks.map((social, index) => (
                      <li key={index}>
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
          <div className="col-span-7 mt-5">
            <div>
              <p className="text-xs">{summery} </p>
            </div>
          </div>
        </div>

        <div className="Exp-section mt-4 col-span-4 mr-6">
          <div>
            <h3 className="font-semibold -tracking-tighter uppercase">Experience</h3>
            <hr className="my-1 w-full rounded-lg border-2 mb-3 border-blue-100" />
            <div>
              {experience && (
                <div className="mb-3 ">
                  <div>
                    {experience.map((exp, index) => (
                      <div key={index} className=" text-xs mb-3 ">
                        <div className="flex justify-between items-center mb-1">
                          <div className="flex flex-col">
                            <span className="font-semibold capitalize">
                              {exp.company}
                            </span>
                            <span className="font-medium">
                              {exp.title}
                            </span>
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
                          {exp.description.length > 0 && (
                            <ul className="mx-4  leading-4">
                              {exp.description.map((desc) => (
                                <li className="list-disc font-light" key={index}>{desc}</li>
                              ))}
                            </ul>
                          )}
                        </div>

                        {exp.skills.length > 0 && (
                          <ul>
                            <li>
                              <span>Improved Skills - </span>
                              <span className="font-medium">
                                {exp.skills
                                  .map((skill) => skill.skill)
                                  .join(" , ")}
                              </span>
                            </li>
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>


          {custom.customs.length > 0 &&
            <div>
              <h3 className="font-semibold -tracking-tighter uppercase">{custom.heading}</h3>
              <hr className="my-1 w-full rounded-lg border-2 mb-3 border-blue-100" />
              <div>
                {custom.customs && (
                  <div className="mb-3 ">
                    <div>
                      {custom.customs.map((custom, index) => (
                        <div key={index} className=" text-xs mb-3 ">
                          <div className="flex justify-between items-center mb-1">
                            <div className="flex flex-col">
                              <span className="font-semibold capitalize">
                                {custom.title}
                              </span>
                            </div>
                            <div className="flex flex-col text-start italic text-[0.7rem] h-fit">
                              <span className="text-nowrap">
                                {formattedDate(custom.dates)}
                              </span>
                            </div>
                          </div>
                          <ul className="flex items-center gap-3 mb-1 font-medium text-xs italic">
                            {custom.urls.map((url, index) => (
                              <li key={index}>
                                <FontAwesomeIcon size="xs" icon={iconNames[url.platform]} className="mr-2" />
                                <a href={url.link} target="_blank" >{url.link}</a>
                              </li>
                            ))}
                          </ul>
                          <div className="mb-2">
                            {custom.description.length > 0 && (
                              <ul className="mx-4  leading-4">
                                {custom.description.map((desc) => (
                                  <li className="list-disc font-light" key={index}>{desc}</li>
                                ))}
                              </ul>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>}
        </div>

        <div className="Educ-section mt-4 col-span-3">
          <h3 className="font-semibold -tracking-tighter uppercase ">Education</h3>
          <hr className="my-1 w-full rounded-lg border-2 mb-3 border-blue-100" />
          <div>
            {educations && (
              <div className="mb-3">
                {educations.map((edu, index) => (
                  <div key={index} className="text-xs mb-3">
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
