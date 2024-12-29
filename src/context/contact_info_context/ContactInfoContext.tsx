import { createContext, useContext, useState } from "react";
import { ContactInfoContextProps } from "./ContactInfoContextProps";
import CommonProviderProps from "../CommonProviderProps";
import ContactInfo from "../../types/ContactInfo";



const ContactInfoContext = createContext<ContactInfoContextProps>({

    contactInfo: {},
    addContactInfo: () => { },
    removeContactInfo: () => void {}
})


export const ContactInfoProvider = ({ children }: CommonProviderProps) => {
    const [contactInfo, setContactInfo] = useState<ContactInfo>({});

    const addContactInfo = (info: ContactInfo) => {
        setContactInfo(info);
    }
    const removeContactInfo = (info: ContactInfo) => {
        setContactInfo({})
    }
    return (<ContactInfoContext.Provider value={{
        contactInfo, addContactInfo, removeContactInfo
    }}>{children}</ContactInfoContext.Provider>)

}

export function useContactInfo() {
    return useContext(ContactInfoContext)
}