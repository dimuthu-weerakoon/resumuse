import { configureStore } from "@reduxjs/toolkit";
import personalInfoReducer from "./slices/PersonalInfoSlice";
import contactInfoReducer from "./slices/ContactInfoSlice";
import skillsReducer from "./slices/SkillsSlice"
import experienceReducer from "./slices/ExpSlice"
import educationReducer from "./slices/EducationSlice"

const Store = configureStore({
  reducer: {
    personalInfo: personalInfoReducer,
    contactInfo: contactInfoReducer,
    skills:skillsReducer,
    experience:experienceReducer,
    education:educationReducer
  },
});

export default Store;
