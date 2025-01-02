import { Dates } from "./Dates";
import { Location } from "./Location";
import Skill from "./Skill";

export interface Experience {
  title: string;
  type: string;
  company: string;
  location?:Location;
  dates:Dates ;
  description: string[];
  status:boolean;
  skills: Skill[];
}

