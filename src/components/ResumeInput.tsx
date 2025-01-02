import InputContactInfo from "./input/InputContactInfo"
import InputEducation from "./input/InputEducation"
import InputExperience from "./input/InputExperience"
import InputPersonalInfo from "./input/InputPersonalInfo"
import InputSocialLink from "./input/InputSocialLink"

import InputSummery from "./input/InputSummery"


const ResumeInput = () => {


  return (
    <>
      <div className="flex flex-col justify-center items-start p-4 m-4 w-full">

        <InputPersonalInfo />
        <InputContactInfo />
        <InputSocialLink />
        <InputSummery />
        <InputEducation />
        <InputExperience />
       

      </div>
    </>

  )
}

export default ResumeInput