import { createContext, useContext, useState } from "react";
import SummeryContextProps from "./SummeryContextProps";
import CommonProviderProps from "../CommonProviderProps";



export const SummeryContext = createContext<SummeryContextProps>({
    summery: "",
    addSummery: () => void {},
    clearSummery: () => void {}
})

export const SummeryProvider = ({ children }: CommonProviderProps) => {

    const [summery, setSummery] = useState<string>("")

    const addSummery = (createdSummery: string) => {
        setSummery(createdSummery)
    }

    const clearSummery = () => {
        setSummery("")
    }
    return <SummeryContext.Provider value={{ summery, addSummery, clearSummery }}>
        {children}
        </SummeryContext.Provider>
}

export function useSummery() {
    return useContext(SummeryContext);
}