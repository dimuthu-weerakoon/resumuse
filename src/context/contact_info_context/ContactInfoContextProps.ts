import  ContactInfo  from "../../types/ContactInfo";

export interface ContactInfoContextProps {
  contactInfo: ContactInfo|undefined;
  addContactInfo: (contactInfo: ContactInfo) => void;
  removeContactInfo: (contactInfo: ContactInfo) => void;
}
