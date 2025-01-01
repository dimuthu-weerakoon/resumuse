import { Location } from "./Location";

export default interface ContactInfo {
  address: string;
  email:string;
  location:Location | undefined;
  phone: string | undefined;
}
