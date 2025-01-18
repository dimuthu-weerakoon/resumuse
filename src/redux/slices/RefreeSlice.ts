import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Refree } from "../../types/Refree";

const initialState: Refree[] = [];

const refreeSlice = createSlice({
  name: "refree",
  initialState: initialState,
  reducers: {
    addRefrees(state, action: PayloadAction<Refree>) {
      state.unshift(action.payload);
    },
    removeRefree(state, action: PayloadAction<Refree>) {
      return state.filter((refree) => refree !== action.payload);
    },
  },
});

export const { addRefrees, removeRefree } = refreeSlice.actions;

export default refreeSlice.reducer;
