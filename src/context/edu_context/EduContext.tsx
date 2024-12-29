import { createContext, useContext, useState } from "react";
import { EducContextProps } from "./EduContextProps";
import { Education } from "../../types/Education";
import CommonProviderProps from "../CommonProviderProps";

export const EduContext = createContext<EducContextProps>({
    educations: [],
    addEducation: () => void {},
    updateEducation: () => void {},
    removeEducation: () => void {}
})

export const EduProvider = ({ children }: CommonProviderProps) => {

    const [educations, setEducations] = useState<Education[]>([]);

    const addEducation = (education: Education) => {

        setEducations(prevEdu => [...prevEdu, education]);
    }

    const updateEducation = (id: number) => {

    }

    const removeEducation = (education: Education) => {
        setEducations((prevEdu) => prevEdu.filter((edu) => edu !== education))
    }

    return <EduContext.Provider value={{ educations, addEducation, updateEducation, removeEducation }}>
        {children}
    </EduContext.Provider>
}

export function useEdu() {
    return useContext(EduContext)
}
