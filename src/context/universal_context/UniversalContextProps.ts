import { ContactInfoContextProps } from "../contact_info_context/ContactInfoContextProps";
import { EducContextProps } from "../edu_context/EduContextProps";
import ExpContextProps from "../exp_context/ExpContextProps";
import { PersonalInfoContextProps } from "../personal_info_context/PersonalInfoContextProps";
import SkillContextProps from "../skill_context/SkillContextProps";
import { SocialLinksContextProps } from "../social_links_context/SocialLinksContextProps";
import SummeryContextProps from "../summery_Context.tsx/SummeryContextProps";

export interface UniversalContextProps {
  contactInfoContextProps: ContactInfoContextProps ;
  eduContextProps: EducContextProps;
  expContextProps: ExpContextProps;
  personalInfoContextProps: PersonalInfoContextProps;
  socialLinksContextProps: SocialLinksContextProps;
  skillContextProps: SkillContextProps;
  summeryContextProps: SummeryContextProps;
}
