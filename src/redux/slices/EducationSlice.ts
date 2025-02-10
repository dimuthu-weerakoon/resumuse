import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Education } from "../../types/Education";
// intialstate props interface
interface EduIntialStaeProps {
  educations: Education[];
  editingEducation: Education | null;
}
const intialState: EduIntialStaeProps = {
  educations: [], // list of educations
  editingEducation: null, // editinf education object
};

const educationSlice = createSlice({
  name: "education", // slice name
  initialState: intialState,
  reducers: {
    // function to add eduction. push new education to educations array
    addEducation(state, action: PayloadAction<Education>) {
      state.educations.push(action.payload);
    },
    // functions to remove education. get education by index and filter without it to new array.
    removeEducation(state, action: PayloadAction<number>) {
      state.educations = state.educations.filter(
        (_, index) => index !== action.payload
      );
    },
    // function to edit education
    // get education by index and update state editing education to it
    editEducation(state, action: PayloadAction<number>) {
      state.editingEducation =
        state.educations.find((_, index) => index === action.payload) || null;
    },
    //find index of education which equal title and institute of editing edcation
    // update editing education to payload actions
    updateEducation(state, action: PayloadAction<Education>) {
      if (state.editingEducation) {
        const index = state.educations.findIndex(
          (e) =>
            e.title === state.editingEducation?.title &&
            e.institute === state.editingEducation?.institute
        );
        if (index !== -1) {
          state.educations[index] = action.payload;
          state.editingEducation = null;
        }
      }
    },
    // clear editing education
    clearEditingEducation(state) {
      state.editingEducation = null;
    },
  },
});
// exporting actions
export const {
  addEducation,
  clearEditingEducation,
  removeEducation,
  editEducation,
  updateEducation,
} = educationSlice.actions;
// export reducer
export default educationSlice.reducer;
