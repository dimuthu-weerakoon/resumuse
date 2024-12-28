import Skill from "../../types/Skill";

export default interface SkillContextProps {
  skills: Skill[];
  filteredSkills: Skill[];
  skillInput: string;
  selectedSkills: Skill[];
  setSkillInput: (skill: string) => void;
  handleSkill: (id: number) => void;
  removeSkill: (id: number) => void;
  clearSelectedSkills:()=>void;
}
