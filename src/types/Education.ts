import { Dates } from "./Dates";
import { Location } from "./Location";

export interface Education {
  title: string;
  institute: string;
  studying:boolean;
  description:string|null;
  dates: Dates;
  location?: Location | null ;
}
