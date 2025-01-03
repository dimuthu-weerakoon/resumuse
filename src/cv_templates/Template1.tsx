import ContactInfoView from "../components/ContactInfo"
import EducationView from "../components/Education"
import ExperienceView from "../components/Experience"
import PersonelInfo from "../components/PersonelInfo"
import Social from "../components/Social"
import Summery from "../components/Summery"





const Template1 = () => {

  return (
    <>
     
      <div className="shadow-lg p-4 font-serif">
        <div className="text-gray-800  rounded bg-slate-100">
          <div className=" p-2 grid  grid-flow-row-dense grid-cols-4 grid-rows-2   ">
            <div className="col-span-3 flex flex-col gap-4">
              <PersonelInfo />
              <Social />
            </div>

            <div className="flex flex-col gap-2 text-right italic text-[0.7rem]">
              <ContactInfoView />
            </div>
            <div className="col-span-4 mt-4">
              <Summery />

            </div>
          </div>
        </div>
        <div className=" p-2 grid  grid-flow-col grid-cols-5 ">
          <div className="Exp-section col-span-3 mr-5">
          <h3 className="font-semibold ">Experience</h3>
          <hr className="my-1 w-full" />
          <ExperienceView/>

          </div>


          <div className="Educ-section col-span-2">
          <h3 className="font-semibold ">Education</h3>
          <hr className="my-1 w-full" />
           <EducationView/>
          </div>

          </div> 
       

      </div>
    </>
  )
}

export default Template1