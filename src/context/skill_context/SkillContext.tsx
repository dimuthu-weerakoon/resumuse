import { createContext, useContext, useEffect, useState } from "react";
import SkillContextProps from "./SkillContextProps";
import Skill from "../../types/Skill";
import CommonProviderProps from "../CommonProviderProps";

export const SkillContext = createContext<SkillContextProps>({
    skills: [],
    filteredSkills: [],
    skillInput: "",
    handleSkill: () => { },
    removeSkill: () => { },
    setSkillInput: () => { },
    selectedSkills: [],
    clearSelectedSkills:  ()=> {}
});

export const SkillProvider = ({ children }: CommonProviderProps) => {
    const [skills, setSkills] = useState<Skill[]>([
        { id: 1, skill: "java" },
        { id: 2, skill: "php" },
        { id: 3, skill: "jenkins" }
    ]);
    const [filteredSkills, setFilteredSkills] = useState<Skill[]>([]);
    const [selectedSkills, setSelectedSkills] = useState<Skill[]>([]);
    const [skillInput, setSkillInput] = useState<string>("");
    
    const handleSkill = (id: number) => {
        const selectedSkill = skills.find(skill => skill.id === id);
        if (selectedSkill && !selectedSkills.some(skill => skill.id === selectedSkill.id)) {
            setSelectedSkills(prevSkills => [...prevSkills, selectedSkill]);
            console.log("Added skill:", selectedSkill);
            console.log("Updated selectedSkills:", [...selectedSkills, selectedSkill]);
        }
    };
    

    const removeSkill = (id: number) => {
        setSelectedSkills(prevSkills => prevSkills.filter(skill => skill.id !== id));
    };

    const clearSelectedSkills = ()=>{
        setSkillInput("")
        setSelectedSkills([])
    }

    useEffect(() => {
        if (skillInput === "") {
            setFilteredSkills([]);
        } else {
            setFilteredSkills(
                skills.filter(skill =>
                    skill.skill?.toLowerCase().includes(skillInput.toLowerCase())
                )
            );
        }
    }, [skills, skillInput]);



    return (
        <SkillContext.Provider
            value={{
                skills, filteredSkills, setSkillInput, handleSkill,
                removeSkill, selectedSkills, skillInput ,clearSelectedSkills
            }}>
            {children}
        </SkillContext.Provider>
    );
};

export function useSkill() {
    return useContext(SkillContext);
}
