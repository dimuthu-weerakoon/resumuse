import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import { CustomInitialStateProps } from "../../redux/slices/CustomSlice";
import ContactInfo from "../../types/ContactInfo";
import { Education } from "../../types/Education";
import { Experience } from "../../types/Experience";
import { PersonalInfo } from "../../types/PersonalInfo";
import { SocialLink } from "../../types/SocialLinks";
import { iconNames } from "../../common_functions/SocialIconObject";
import formattedDate from "../../common_functions/dateformat";

const Template3Preview = () => {

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
  const summery: string = useSelector((state: any) => state.summery);
  const custom: CustomInitialStateProps = useSelector(
    (state: any) => state.custom
  );

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
              <li key={index} className="flex items-center">
                {index > 0 && (
                  <span className="font-bold not-italic text-sm mr-2 text-blue-950">|</span>
                )}
                <FontAwesomeIcon icon={iconNames[social.platform]} className="mr-2" />
                <a href={social.link} target="_blank">{social.link}</a>
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
          {experience.map((exp, index) => (
            <div className="mb-2" key={index}>
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
              {exp.skills.length > 0 && (
                <div className="flex items-center gap-3">
                  <h5 className="text-sm font-medium mt-1">Improved skills: </h5>
                  <span className="text-sm ">{exp.skills.join(", ")} </span>
                </div>
              )}
            </div>
          ))}

        </div>
        {custom.customs.length > 0 && (
          <div className="mb-4">
            <h3 className="font-medium text-lg -tracking-tighter uppercase">{custom.heading}</h3>
            <hr className="border-blue-900 border-1 mb-2" />

            {custom.customs.map((custom, index) => (
              <div key={index} className="mb-2">
                <div className="flex justify-between flex-nowrap">
                  <h5 className="font-medium text-sm">{custom.title}</h5>
                  <span className="font-medium text-xs" >{formattedDate(custom.dates)}</span>
                </div>
                <ul className="flex items-center gap-3 text-xs italic">
                  {custom.urls.map((url, index) => (
                    <li key={index}>
                      <FontAwesomeIcon icon={iconNames[url.platform]} className="mr-2" />
                      <a href={url.link} target="_blank" >{url.link}</a>
                    </li>
                  ))}
                </ul>
                <ul className="text-xs font-light mt-1 mx-4">
                  {custom.description.map((desc, index) => (
                    <li className="list-disc" key={index}>{desc}</li>
                  ))}
                </ul>
              </div>
            ))}

          </div>
        )}
        <div className="mb-4">
          <h3 className="font-medium text-lg -tracking-tighter uppercase">Education</h3>
          <hr className="border-blue-900 border-1 mb-2" />
          {educations.map((edu, index) => (
            <div className="mb-2" key={index}>
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
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default Template3Preview;
