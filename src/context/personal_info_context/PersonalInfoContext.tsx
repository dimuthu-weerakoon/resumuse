import { createContext, useContext, useState } from "react"
import CommonProviderProps from "../CommonProviderProps"
import { PersonalInfoContextProps } from "./PersonalInfoContextProps"
import { PersonalInfo } from "../../types/PersonalInfo"


const PersonalInfoContext = createContext<PersonalInfoContextProps>({
    addPersonalInfo: () => { },
    removePersonalInfo: () => { },
    personalInfo: {},
})

export const PersonalInfoProvider = ({ children }: CommonProviderProps) => {
    const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({})

    const addPersonalInfo = (info: PersonalInfo) => {
        setPersonalInfo(info)
    }

    const removePersonalInfo = (info: PersonalInfo) => {
        setPersonalInfo({})
    }

    return (<PersonalInfoContext.Provider value={{ personalInfo, addPersonalInfo, removePersonalInfo }}>
        {children}
        </PersonalInfoContext.Provider>)
}

export function usePersonalInfo() {
    return useContext(PersonalInfoContext)
}