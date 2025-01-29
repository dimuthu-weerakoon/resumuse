import { createSlice } from "@reduxjs/toolkit";

const initialState: boolean = false;

const editModeSlice = createSlice({
  name: "editmode",
  initialState: initialState,
  reducers: {
    enableEditmode: () => true,
    disableEditmode: () => false,
  },
});

export const { enableEditmode, disableEditmode } = editModeSlice.actions;

export default editModeSlice.reducer;
