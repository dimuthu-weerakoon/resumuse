import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Skill from "../../types/Skill";

export interface SkillsState {
  skills: Skill[];
  selectedSkills: Skill[];
}

const initialState: SkillsState = {
  skills: [],
  selectedSkills: [],
};

const skillSlice = createSlice({
  name: "skills",
  initialState: initialState,
  reducers: {
    setSkills(state, action: PayloadAction<Skill[]>) {
      state.skills = action.payload;
    },
    setSelectedSkills(state, action: PayloadAction<Skill>) {
      if (!state.selectedSkills.includes(action.payload)) {
        state.selectedSkills.push(action.payload);
      }
    },
    removeSelectedSkill(state, action: PayloadAction<Skill>) {
      state.selectedSkills = state.selectedSkills.filter(
        (skill) => skill.skill !== action.payload.skill
      );
    },
    
    clearSelectedSkills(state) {
      state.selectedSkills = [];
    },
  },
});

export const {
  setSelectedSkills,
  removeSelectedSkill,
  setSkills,
  clearSelectedSkills,
} = skillSlice.actions;

export default skillSlice.reducer;
