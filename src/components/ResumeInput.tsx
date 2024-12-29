import { ContactInfoProvider } from "../context/contact_info_context/ContactInfoContext"
import { EduProvider } from "../context/edu_context/EduContext"
import { ExpProvider } from "../context/exp_context/ExpContext"
import { SkillProvider } from "../context/skill_context/SkillContext"
import { SocialLinksProvider } from "../context/social_links_context/SocialLinksContext"
import InputContactInfo from "./input/InputContactInfo"
import InputEducation from "./input/InputEducation"
import InputExperience from "./input/InputExperience"
import InputPersonalInfo from "./input/InputPersonalInfo"
import InputSocialLink from "./input/InputSocialLink"
import { PersonalInfoProvider } from "../context/personal_info_context/PersonalInfoContext"


const ResumeInput = () => {


  return (
    <>
      <div>
        <PersonalInfoProvider>
          <InputPersonalInfo />

        </PersonalInfoProvider>


        <ContactInfoProvider>
          <InputContactInfo />
        </ContactInfoProvider>

        <SocialLinksProvider>
          <InputSocialLink />
        </SocialLinksProvider>


        <div>
          <label htmlFor="">Summery</label>
          <textarea name="" id=""></textarea>
        </div>

        <EduProvider>
          <InputEducation />
        </EduProvider>

        <ExpProvider>
          <SkillProvider>
            <InputExperience />

          </SkillProvider>

        </ExpProvider>


      </div>


    </>

  )
}

export default ResumeInput