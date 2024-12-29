import { Experience } from "../../types/Experience";

export default interface ExpContextProps {
  experience: Experience[];
  addExperience: (experience: Experience) => void;
  updateExperience: (id: number) => void;
  removeExperience: (experience: Experience) => void;
}
