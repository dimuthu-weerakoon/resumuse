import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Experience } from "../../types/Experience";
import Skill from "../../types/Skill";

interface ExpStateProps {
  experiences: Experience[];
  editingExperience: Experience | null;
  editingExpDescription: String | null;
}
const initialState: ExpStateProps = {
  experiences: [],
  editingExperience: null,
  editingExpDescription: null,
};

const experienceSlice = createSlice({
  name: "experience",
  initialState: initialState,
  reducers: {
    //add experinnce
    //add new experince to beginning of array
    addExperience(state, action: PayloadAction<Experience>) {
      state.experiences.unshift(action.payload);
    },
    // remove experince by index
    removeExperience(state, action: PayloadAction<number>) {
      state.experiences = state.experiences.filter(
        (_, index) => index !== action.payload
      );
    },
    // clear editng experince
    clearEditingExperience(state) {
      state.editingExperience = null;
    },
    //edit experince. select by index
    editExperience(state, action: PayloadAction<number>) {
      state.editingExperience =
        state.experiences.find((_, index) => index === action.payload) || null;
    },
    //update editng experince.

    updateExpereince(state, action: PayloadAction<Experience>) {
      if (state.editingExperience) {
        // find index from experince array equal title and company to editng experince
        const index = state.experiences.findIndex(
          (e) =>
            e.title === state.editingExperience?.title &&
            e.company === state.editingExperience.company
        );

        if (index !== -1) {
          // update education to editng experince
          state.experiences[index] = action.payload;
          state.editingExperience = null;
        }
      }
    },
    //edit editingexperince description
     
    editExperienceDescription(state, action: PayloadAction<number>) {
      // find description by index 
      // update state editng experince description to editingexpdescription
      state.editingExpDescription =
        state.editingExperience?.description?.find(
          (_, index) => index === action.payload
        ) || null;
    },
    //update editng expp description
    
    updateExperienceDescription(state, action: PayloadAction<string>) {
      // if editng experinces and description has 
      if (state.editingExpDescription && state.editingExperience?.description) {
        const index = state.editingExperience.description.findIndex(
          (desc) => desc === state.editingExpDescription
        );

        if (index !== -1) {
          //update element 
          state.editingExperience.description[index] = action.payload;
          state.editingExpDescription = null;
        }
      }
    },
    addMoreDescriptions(state, action: PayloadAction<string>) {
      if (state.editingExperience) {
        state.editingExperience.description.push(action.payload);
      }
    },
    removeExpDescription(state, action: PayloadAction<number>) {
      if (state.editingExperience) {
        state.editingExperience.description =
          state.editingExperience.description.filter(
            (_, index) => index !== action.payload
          );
      }
    },
    removeExperienceSkill(state, action: PayloadAction<string>) {
      if (state.editingExperience?.skills) {
        state.editingExperience.skills = state.editingExperience.skills.filter(
          (skill) => skill.skill !== action.payload
        );
      }
    },
    addMoreSkills(state, action: PayloadAction<Skill[]>) {
      if (state.editingExperience?.skills) {
        const newSkills = action.payload;
        state.editingExperience.skills =
          state.editingExperience.skills.concat(newSkills);
      }
    },
  },
});

export const {
  addExperience,
  removeExperience,
  editExperience,
  updateExpereince,
  updateExperienceDescription,
  editExperienceDescription,
  clearEditingExperience,
  addMoreSkills,
  removeExperienceSkill,
  removeExpDescription,
  addMoreDescriptions,
} = experienceSlice.actions;
export default experienceSlice.reducer;
