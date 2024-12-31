import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedSkills,
  removeSelectedSkill,
  setSkills,
  setFilteredSkills,
} from "../../redux/slices/SkillsSlice";
import Skill from "../../types/Skill";

const initialSkills: Skill[] = [
  { id: 1, skill: "Java" },
  { id: 4, skill: "Janva" },
  { id: 5, skill: "Javaaa" },
  { id: 2, skill: "PHP" },
  { id: 3, skill: "Jenkins" },
];

const InputSkills = () => {
  const { filteredSkills: filtered, selectedSkills } = useSelector(
    (state: any) => state.skills
  );
  const [searchQuery, setSearchQuery] = useState<string>("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSkills(initialSkills));
  }, [dispatch]);

  useEffect(() => {
    dispatch(setFilteredSkills(searchQuery));
  }, [dispatch, searchQuery]);

  return (
    <div className="input-div">
      <label htmlFor="skills-input" className="z-50">
        Enter Skills you gained
      </label>
      <div className="grid grid-cols-1 w-full relative">
        <input
          type="text"
          id="skills-input"
          className="skill-input"
          placeholder="Type to search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {filtered.length > 0 && (
          <ul className="shadow-xl bg-white w-full z-10 flex flex-col items-start overflow-y-auto max-h-40 absolute top-full left-0">
            {filtered.map((filteredSkill: Skill) => (
              <li
                key={filteredSkill.id}
                className="w-full cursor-pointer hover:bg-slate-100 hover:rounded"
              >
                <button
                  type="button"
                  className="font-medium text-left w-full p-1"
                  onClick={() => {
                    dispatch(setSelectedSkills(filteredSkill.id));
                    setSearchQuery("");
                  }}
                >
                  {filteredSkill.skill}
                </button>
              </li>
            ))}
          </ul>
        )}
        {!filtered.length && <span>No matching skills found.</span>}
        <div className="selected-skills flex gap-2 mt-2">
          {selectedSkills.map((skill: Skill) => (
            <span
              className="selected-skill bg-slate-300 px-2 border rounded-md border-slate-400 font-medium text-sm"
              key={skill.id}
            >
              {skill.skill}
              <button
                className="remove-skill p-1 rounded-full text-slate-600"
                onClick={() => dispatch(removeSelectedSkill(skill.id))}
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
