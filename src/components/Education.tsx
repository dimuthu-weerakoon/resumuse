import { useSelector } from "react-redux"
import { Education } from "../types/Education"


const EducationView = () => {
  const educations:Education[] = useSelector((state:any)=>state.education)
  return (
    <div><h2>Education</h2>
    {
      educations && 

      <div>
        {educations.map((edu,index)=>(
          <ul key={index}>
            <li>{edu.title}</li>
            <li>{edu.institute}</li>
            <li>{edu.dates.startDate}</li>
            <li>{edu.dates.endDate}</li>
            <li>{edu.description}</li>
            <li>{edu.location?.city}</li>
            <li>{edu.location?.state}</li>
            <li>{edu.location?.country}</li>
          </ul>
        ))}
      </div>

    }
    
    </div>
  )
}

export default EducationView