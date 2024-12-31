import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Skill from "../../types/Skill";

export interface SkillsState {
  skills: Skill[];
  filteredSkills: Skill[];
  selectedSkills: Skill[];
}

const initialState: SkillsState = {
  skills: [],
  filteredSkills: [],
  selectedSkills: [],
};

const skillSlice = createSlice({
  name: "skills",
  initialState: initialState,
  reducers: {
    setSkills(state, action: PayloadAction<Skill[]>) {
      state.skills = action.payload;
    },
    setSelectedSkills(state, action: PayloadAction<number>) {
      const selectedSkill = state.skills.find((skill) => skill.id === action.payload);
      if (
        selectedSkill &&
        !state.selectedSkills.some((skill) => skill.id === selectedSkill.id)) {
        state.selectedSkills.push(selectedSkill);
        
      }
    },

    setFilteredSkills(state, action: PayloadAction<string>) {
      if (action.payload === "") {
        state.filteredSkills = [];
      } else {
        state.filteredSkills = state.skills.filter((skill) =>
          skill.skill.toLowerCase().includes(action.payload.toLowerCase())
        );
      }
    },
    removeSelectedSkill(state, action: PayloadAction<number>) {
      state.selectedSkills = state.selectedSkills.filter(
        (skill) => skill.id !== action.payload
      );
    },
    clearSelectedSkills(state){
      state.selectedSkills = []
    }
  },
});

export const {
  setSelectedSkills,
  setFilteredSkills,
  removeSelectedSkill,
  setSkills,
  clearSelectedSkills
} = skillSlice.actions;

export default skillSlice.reducer;
