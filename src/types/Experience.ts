import { Dates } from "./Dates";
import Skill from "./Skill";

export interface Experience {
  title: string;
  type: string;
  company: string;
  Dates:Dates;
  description: string;
  status:boolean;
  skills: Skill[];
}

