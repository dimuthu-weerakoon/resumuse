import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedSkills,
  removeSelectedSkill,
  setSkills
} from "../../redux/slices/SkillsSlice";
import Skill from "../../types/Skill";
import { generateSkills } from "../../Ai/AiGeneratives";
import { Input } from "@nextui-org/react";




const InputSkills = ({ jobRole }: { jobRole: string }) => {
  const { skills, selectedSkills } = useSelector(
    (state: any) => state.skills
  );

  const [searchQuery, setSearchQuery] = useState<string>("");
  const dispatch = useDispatch();

  const fetchAiSkills = async () => {
    try {
      const skills: Skill[] = await generateSkills(jobRole, searchQuery);
      dispatch(setSkills(skills))
    } catch (err) {
      console.log(err);
    }
  }


  useEffect(() => {
    if (jobRole !== "" && searchQuery !== "") {
      fetchAiSkills()
    }
  }, [dispatch, searchQuery]);


  return (
    <div className="input-div">

      <div className="grid grid-cols-1 w-full relative">
        <Input
          label="Improved Skills"
          type="text"
          id="skills-input"
          className="skill-input"
          placeholder="Type Keywords"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery ? (
          <ul className="shadow-xl bg-white w-full z-10 flex flex-col items-start overflow-y-auto max-h-40 absolute top-full left-0">
            {skills.map((skill: Skill, index: any) => (
              <li
                key={index}
                className="w-full cursor-pointer hover:bg-slate-100 hover:rounded"
              >
                <button
                  type="button"
                  className="font-medium text-left w-full p-1"
                  onClick={() => {
                    dispatch(setSelectedSkills(skill));
                    setSearchQuery("");
                  }}
                >
                  {skill.skill}
                </button>
              </li>
            ))}
          </ul>
        ) : ("")}

        <div className="selected-skills flex gap-2 mt-2">
          {selectedSkills.map((skill: Skill, index: number) => (
            <span
              className="selected-skill bg-slate-300 px-2 border rounded-md border-slate-400 font-medium text-sm"
              key={index}
            >
              {skill.skill}
              <button
                type="button"
                className="remove-skill p-1 rounded-full text-slate-600 "

                onClick={() =>
                  dispatch(removeSelectedSkill(skill))
                }
              >
                x
              </button>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InputSkills;