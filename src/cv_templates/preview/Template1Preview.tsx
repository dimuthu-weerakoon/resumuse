import ContactInfoView from "../../components/ContactInfo"
import EducationView from "../../components/Education"
import ExperienceView from "../../components/Experience"
import PersonelInfo from "../../components/PersonelInfo"
import Social from "../../components/Social"
import Summery from "../../components/Summery"





const Template1Preview = () => {

  return (
    <>
      <div className=" p-4 w-[21cm] h-[29.7cm] font-serif">

        <div className="p-2  grid  grid-flow-dense grid-cols-7   ">
          <div className="p-4 col-span-7  text-gray-800   rounded bg-slate-100">
            <div className=" flex justify-between">
              <div className="flex flex-col gap-4 ">
                <PersonelInfo />
                <Social />
              </div>
              <div className="flex flex-col  gap-2 text-right italic text-[0.7rem]">
                <ContactInfoView />
              </div>
            </div>
            <div className="col-span-7 mt-5">
              <Summery />
            </div>
          </div>




          <div className="Exp-section mt-4 col-span-4 mr-6">
            <h3 className="font-semibold ">Experience</h3>
            <hr className="my-1 w-full" />
            <ExperienceView />
          </div>


          <div className="Educ-section mt-4 col-span-3">
            <h3 className="font-semibold ">Education</h3>
            <hr className="my-1 w-full" />
            <EducationView />
          </div>


        </div>








      </div>
    </>
  )
}

export default Template1Preview



