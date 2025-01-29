import { configureStore } from "@reduxjs/toolkit";
import personalInfoReducer from "./slices/PersonalInfoSlice";
import contactInfoReducer from "./slices/ContactInfoSlice";
import skillsReducer from "./slices/SkillsSlice";
import experienceReducer from "./slices/ExpSlice";
import educationReducer from "./slices/EducationSlice";
import socialLinkReducer from "./slices/SocialLinksSlice";
import summeryReducer from "./slices/SummerySlice";
import customReducer from "./slices/CustomSlice";
import refreeReducer from "./slices/RefreeSlice";
import pictureReducer from "./slices/PictureSlice";
import editModeSliceReducer from "./slices/editModeSlice";

const Store = configureStore({
  reducer: {
    personalInfo: personalInfoReducer,
    contactInfo: contactInfoReducer,
    skills: skillsReducer,
    experience: experienceReducer,
    education: educationReducer,
    socialLink: socialLinkReducer,
    summery: summeryReducer,
    custom: customReducer,
    refree: refreeReducer,
    picture: pictureReducer,
    editmode: editModeSliceReducer,
  },
});

export default Store;
