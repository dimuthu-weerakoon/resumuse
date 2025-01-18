import { Dates } from "./Dates";
import { SocialLink } from "./SocialLinks";

export default interface Custom {
  
  title: string;
  dates: Dates;
  urls: SocialLink[];
  description: string[];
}
