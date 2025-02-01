import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Experience } from "../../types/Experience";
import Skill from "../../types/Skill";

interface ExpStateProps {
  experiences: Experience[];
  editingExperience: Experience | null;
  editingExpDescription: String | null;
  editingExpSkill: Skill | null;
}
const initialState: ExpStateProps = {
  experiences: [],
  editingExperience: null,
  editingExpDescription: null,
  editingExpSkill: null,
};

const experienceSlice = createSlice({
  name: "experience",
  initialState: initialState,
  reducers: {
    addExperience(state, action: PayloadAction<Experience>) {
      state.experiences.unshift(action.payload);
    },
    removeExperience(state, action: PayloadAction<number>) {
      state.experiences = state.experiences.filter(
        (_, index) => index !== action.payload
      );
    },
    clearEditingExperience(state) {
      state.editingExperience = null;
    },
    editExperience(state, action: PayloadAction<number>) {
      state.editingExperience =
        state.experiences.find((_, index) => index === action.payload) ||
        null;
    },
    updateExpereince(state, action: PayloadAction<Experience>) {
      if (state.editingExperience) {
        const index = state.experiences.findIndex(
          (e) =>
            e.company === action.payload.company &&
            e.title === action.payload.title
        );

        if (index !== -1) {
          state.experiences[index] = action.payload;
          state.editingExperience = null;
        }
      }
    },
    editExperienceDescription(state, action: PayloadAction<number>) {
      state.editingExpDescription =
        state.editingExperience?.description?.find(
          (_, index) => index === action.payload
        ) || null;
    },
    updateExperienceDescription(state, action: PayloadAction<string>) {
      if (state.editingExpDescription && state.editingExperience?.description) {
        const index = state.editingExperience.description.findIndex(
          (desc) => desc === state.editingExpDescription
        );

        if (index !== -1) {
          state.editingExperience.description[index] = action.payload;
          state.editingExpDescription = null;
        }
      }
    },
    removeExperienceSkill(state, action: PayloadAction<number>) {
      if (state.editingExperience?.skills) {
        state.editingExperience.skills =
          state.editingExperience.skills.filter(
            (_, index) => index !== action.payload
          );
      }
    },
    addMoreSkills(state, action: PayloadAction<Skill>) {
      if (state.editingExperience?.skills) {
        state.editingExperience.skills.push(action.payload);
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
  removeExperienceSkill
} = experienceSlice.actions;
export default experienceSlice.reducer;
