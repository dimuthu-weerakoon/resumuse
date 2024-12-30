import { createContext, useContext } from "react";
import { UniversalContextProps } from "./UniversalContextProps";
import CommonProviderProps from "../CommonProviderProps";
import { useContactInfo } from "../contact_info_context/ContactInfoContext";
import { useEdu } from "../edu_context/EduContext";
import { useExp } from "../exp_context/ExpContext";
import { usePersonalInfo } from "../personal_info_context/PersonalInfoContext";
import { useSocialLink } from "../social_links_context/SocialLinksContext";
import { useSkill } from "../skill_context/SkillContext";
import { useSummery } from "../summery_Context.tsx/SummeryContext";

export const UniversalContext = createContext<UniversalContextProps>({
  contactInfoContextProps: {
    contactInfo: {},
    addContactInfo: () => {},
    removeContactInfo: () => {},
  },
  eduContextProps: {
    educations: [],
    addEducation: () => {},
    updateEducation: () => {},
    removeEducation: () => {},
  },
  expContextProps: {
    experience: [],
    addExperience: () => {},
    updateExperience: () => {},
    removeExperience: () => {},
  },
  personalInfoContextProps: {
    personalInfo: {},
    addPersonalInfo: () => {},
    removePersonalInfo: () => {},
  },
  socialLinksContextProps: {
    socialLinks: [],
    addSocialLink: () => {},
    removeSocialLink: () => {},
  },
  skillContextProps: {
    skills: [],
    filteredSkills: [],
    skillInput: "",
    selectedSkills: [],
    setSkillInput: () => {},
    handleSkill: () => {},
    removeSkill: () => {},
    clearSelectedSkills: () => {},
  },
  summeryContextProps: {
    summery: "",
    addSummery: () => {},
    clearSummery: () => {},
  },
});

export const UniversalProvider = ({ children }: CommonProviderProps) => {
  const contactInfoContextProps = useContactInfo();
  const eduContextProps = useEdu();
  const expContextProps = useExp();
  const personalInfoContextProps = usePersonalInfo();
  const socialLinksContextProps = useSocialLink();
  const skillContextProps = useSkill();
  const summeryContextProps = useSummery();

  // Debug: Ensure that context values are not undefined
  console.log(contactInfoContextProps, eduContextProps, expContextProps, personalInfoContextProps, socialLinksContextProps, skillContextProps, summeryContextProps);

  return (
    <UniversalContext.Provider
      value={{
        contactInfoContextProps,
        eduContextProps,
        expContextProps,
        personalInfoContextProps,
        socialLinksContextProps,
        skillContextProps,
        summeryContextProps,
      }}
    >
      {children}
    </UniversalContext.Provider>
  );
};

export function useUniversal() {
  const context = useContext(UniversalContext);
  if (!context) {
    throw new Error("useUniversal must be used within a UniversalProvider");
  }
  return context;
}
