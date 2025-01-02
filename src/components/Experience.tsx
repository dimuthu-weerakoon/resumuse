import { useSelector } from "react-redux"
import { Experience } from "../types/Experience"
import formattedDate from "../common_functions/dateformat"


const ExperienceView = () => {
  <div>Experience</div>

  const experience: Experience[] = useSelector((state: any) => state.experience)
  return (

    <div className="">
      {experience && (
        <div className="mb-3 ">
          <div>
            {experience.map((exp, index) => (
              <div key={index} className=" text-xs mb-3 ">

                <div className="flex justify-between items-center mb-2">

                  <div className="flex flex-col">
                    <span className="font-medium capitalize">{exp.company}</span>
                    <span>{exp.title} - {exp.type}</span>
                  </div>


                  <div className="flex flex-col text-end italic text-[0.7rem] h-fit">
                    <span className="text-nowrap">{formattedDate(exp.dates)}</span>
                    <span>{exp.location?.city} , {exp.location?.state}</span>
                  </div>

                </div>



                <div className="mb-2">
                    {exp.description.length > 0 && (
                      <ul>
                        {exp.description.map(desc=>(
                          <li key={index}> - {desc}</li>
                        ))}
                      </ul>
                    )}
                </div>


                {exp.skills.length > 0 && (

                  <ul>
                    <li >Improved Skills - {exp.skills.map(skill => skill.skill).join(" , ")}</li>
                  </ul>

                )}


              </div>

            ))}
          </div>

        </div>
      )}
    </div>
  )
}

export default ExperienceView  