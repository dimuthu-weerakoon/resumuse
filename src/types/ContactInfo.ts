import { Location } from "./Location";

export default interface ContactInfo {
  address: string;
  location:Location | undefined;
  phone: string | undefined;
}
