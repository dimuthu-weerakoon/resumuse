import { PersonalInfo } from "../../types/PersonalInfo";

export interface PersonalInfoContextProps{
    
    personalInfo:PersonalInfo;
    addPersonalInfo:(info:PersonalInfo)=>void;
    removePersonalInfo:(info:PersonalInfo)=>void;
}

