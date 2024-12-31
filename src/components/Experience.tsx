import { useSelector } from "react-redux"
import { Experience } from "../types/Experience"


const ExperienceView = () => {
  <div>Experience</div>

  const experience: Experience[] = useSelector((state: any) => state.experience)
  return (

    <div>
      <h2>Experience</h2>
      {experience && experience.length > 0 ? (
        <div>
          {experience.map((exp, index) => (
            <ul key={index} className="experience-list">
              <li><strong>Title:</strong> {exp.title}</li>
              <li><strong>Type:</strong> {exp.type}</li>
              <li><strong>Company:</strong> {exp.company}</li>
              <li><strong>Start Date:</strong> {exp.dates?.startDate}</li>
              <li><strong>End Date:</strong> {exp.dates?.endDate}</li>
              <li> <strong>description</strong>   {exp.description &&

                <ul>
                  {exp.description.map(desc => (
                    <li key={index}>{desc}</li>
                  ))}
                </ul>

              } </li>

              <li><strong>Skills:</strong> {exp.skills && 
              <ul>
                {exp.skills.map(skill =>(
                  <li key={skill.id}>{skill.skill}</li>
                ))
}
              </ul> 

              }</li>
            </ul>
          ))}
        </div>
      ) : (
        <p>No experience data available.</p>
      )}
    </div>
  )
}

export default ExperienceView  