import { createSlice } from "@reduxjs/toolkit";

//initialstate false
const initialState: boolean = false;

const editModeSlice = createSlice({
  name: "editmode", // slice name
  initialState: initialState,
  reducers: {
    enableEditmode: () => true, // function to enalble editmode 
    disableEditmode: () => false, // function to disable editmode 
  },
});

// export all actions
export const { enableEditmode, disableEditmode } = editModeSlice.actions;
// export  reducer
export default editModeSlice.reducer;
