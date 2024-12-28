import {  useSkill } from "../../context/skill_context/SkillContext";

const InputSkills = () => {
    const { selectedSkills, setSkillInput, filteredSkills, handleSkill, removeSkill } = useSkill();


    return (
 
            <div>
                <label htmlFor="skills-input">Skills</label>
                <div className="grid grid-rows-2">
                    {/* Input Field */}
                    <input
                        type="text"
                        id="skills-input"
                        className="skill-input"
                        placeholder="Type to search..."
                        onChange={(e) => setSkillInput(e.target.value)}
                    />

                    {/* Filtered Skills */}
                    {filteredSkills.length > 0 ? (
                        <ul>
                            {filteredSkills.map((filteredSkill) => (
                                <li key={filteredSkill.id}>
                                    <button type="button" onClick={() => handleSkill(filteredSkill.id)}>
                                        {filteredSkill.skill}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No matching skills found.</p>
                    )}

                    {/* Selected Skills */}
                    <div className="selected-skills">
                        {selectedSkills.map((skill) => (
                            <span className="selected-skill" key={skill.id}>
                                {skill.skill}{" "}
                                <button
                                    className="remove-skill"
                                    onClick={() => removeSkill(skill.id)}
                                >
                                    X
                                </button>
                            </span>
                        ))}
                    </div>
                </div>
            </div>
       
    )
}

export default InputSkills