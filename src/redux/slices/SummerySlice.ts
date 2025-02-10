import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: string = "";

const summerySlice = createSlice({
  name: "summery",
  initialState: initialState,
  reducers: {
    addSummery(state, action: PayloadAction<string>) {
      return action.payload
    },
    clearSummery() {
      return "";
    },
  },
});

export const { addSummery, clearSummery } = summerySlice.actions;

export default summerySlice.reducer;
