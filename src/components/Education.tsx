import { useSelector } from "react-redux"
import { Education } from "../types/Education"
import formattedDate from "../common_functions/dateformat"


const EducationView = () => {
  const educations: Education[] = useSelector((state: any) => state.education)
  return (
    <div>
      {
        educations &&

        <div className="mb-3">
          {educations.map((edu, index) => (
            <div key={index} className="text-xs mb-3">
              <div className="flex justify-between items-center mb-1 capitalize">
                <div className="flex flex-col">
                  <span className="font-semibold ">{edu.title}</span>
                  <span>{edu.institute}</span>
                  <p className="text-[.7rem]">{edu?.description}</p>
                  <div className="flex justify-between nowrap text-[0.65rem] italic mt-1">
                  <span className="">{formattedDate(edu.dates)}</span>
                  <span className="">{edu.location?.city},{edu.location?.state}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      }

    </div>
  )
}

export default EducationView