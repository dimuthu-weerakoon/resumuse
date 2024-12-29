import { Education } from "../../types/Education";

export interface EducContextProps {
    educations: Education[];
    addEducation: (education: Education) => void;
    updateEducation: (id: number) => void;
    removeEducation: (education: Education) => void;
}