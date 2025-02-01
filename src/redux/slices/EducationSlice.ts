import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Education } from "../../types/Education";

interface EduIntialStaeProps {
  educations: Education[];
  editingEducation: Education | null;
}
const intialState: EduIntialStaeProps = {
  educations: [],
  editingEducation: null,
};

const educationSlice = createSlice({
    name: "education",
    initialState: intialState,
    reducers: {
      addEducation(state, action: PayloadAction<Education>) {
        state.educations.push(action.payload);
      },
      removeEducation(state, action: PayloadAction<number>) {
        state.educations = state.educations.filter(
          (edu, index) => index !== action.payload
        );
      },
      editEducation(state, action: PayloadAction<number>) {
        state.editingEducation = state.educations.find(
          (e, index) => index === action.payload
        ) || null;
      },
      updateEducation(state, action: PayloadAction<Education>) {
        if (state.editingEducation ) { 
          const index = state.educations.findIndex(
            (e) => e.title === state.editingEducation?.title && e.institute === state.editingEducation?.institute
          );
          if (index !== -1) {
            state.educations[index] = action.payload;
            state.editingEducation = null;
          }
        }
      },
      clearEditingEducation(state){
        state.editingEducation=null
      }
    },
  });
  
  export const { addEducation,clearEditingEducation, removeEducation, editEducation, updateEducation } = educationSlice.actions;
  
  export default educationSlice.reducer;
  