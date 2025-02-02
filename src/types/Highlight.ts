import { Dates } from "./Dates";
import { SocialLink } from "./SocialLinks";

export default interface Highlight {
  
  title: string;
  dates: Dates;
  urls: SocialLink[];
  description: string[];
}
