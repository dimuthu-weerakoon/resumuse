import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PersonalInfo } from "../../types/PersonalInfo";

const initialState: PersonalInfo = {
  firstName: "",
  middleName: "",
  lastName: "",
};

const personalInfoSlice = createSlice({
  name: "personalInfo",
  initialState: initialState,
  reducers: {
    addPersonalInfo(state, action: PayloadAction<PersonalInfo>) {
      state.firstName = action.payload.firstName;
      state.middleName = action.payload.middleName;
      state.lastName = action.payload.lastName;
    },
    clearPersonalInfo(state) {
      state.firstName = "";
      state.middleName = "";
      state.lastName = "";
    },
  },
});

export const { addPersonalInfo, clearPersonalInfo } = personalInfoSlice.actions;

export default personalInfoSlice.reducer;
