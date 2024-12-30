import { useSkill } from "../../context/skill_context/SkillContext";

const InputSkills = () => {
    const { selectedSkills, setSkillInput, filteredSkills, handleSkill, removeSkill } = useSkill();


    return (

        <div className="input-div">
            <label htmlFor="skills-input">Enter Skills you gained</label>
            <div className="grid grid-rows-2 w-1/2">
                {/* Input Field */}
                <input
                    type="text"
                    id="skills-input"
                    className="skill-input"
                    placeholder="Type to search..."
                    onChange={(e) => setSkillInput(e.target.value)}
                />

             
                {filteredSkills.length > 0 ? (
                    <ul className=" shadow-xl  flex flex-col items-start z-10 mb-3">
                        {filteredSkills.map((filteredSkill) => (
                            <li key={filteredSkill.id} className="w-full  cursor-pointer hover:bg-slate-100 hover:rounded">
                                <button type="button" className="font-medium text-left  w-full p-1" onClick={() => handleSkill(filteredSkill.id)}>
                                    {filteredSkill.skill}
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <span>No matching skills found.</span>
                )}

                {selectedSkills &&
                    <div className="selected-skills flex gap-2" >
                        {selectedSkills.map((skill) => (
                            <span className="selected-skill   bg-slate-300 px-2 border rounded-md border-slate-400 font-medium text-sm" key={skill.id}>
                                {skill.skill}
                                <button
                                    className="remove-skill p-1 rounded-full text-slate-600"
                                    onClick={() => removeSkill(skill.id)}
                                >
                                    x
                                </button>
                            </span>
                        ))}
                    </div>
                    }
            </div>
        </div>

    )
}

export default InputSkills