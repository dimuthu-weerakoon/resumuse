import { createContext, useContext, useState } from "react"
import CommonProviderProps from "../CommonProviderProps"

import { Experience } from "../../types/Experience"
import ExpContextProps from "./ExpContextProps"


export const ExpContext = createContext<ExpContextProps>({
    experience: [],
    addExperience: () => { },
    updateExperience: () => { },
    removeExperience: () => { }
})

export const ExpProvider = ({ children }: CommonProviderProps) => {

    const [experience, setExperience] = useState<Experience[]>([]);



    const addExperience = (experience: Experience) => {
        
        setExperience((prevExp) => [...prevExp, experience]);
    }

    const removeExperience = (exp: Experience) => {
        setExperience((prevExp)=> prevExp.filter((currentExp) =>currentExp !== exp))
    }

    const updateExperience = (id: number) => {

    }
    return <ExpContext.Provider value={{
        experience, updateExperience, removeExperience, addExperience
    }}>
        {children}
    </ExpContext.Provider>
}

export function useExp(){
    return useContext(ExpContext)
}