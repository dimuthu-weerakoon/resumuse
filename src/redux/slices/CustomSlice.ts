import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Custom from "../../types/Custom";

interface InitialStateProps {
  heading: string;
  customs: Custom[];
}

const initialState: InitialStateProps = {
  heading: "",
  customs: [],
};

const CustomSlice = createSlice({
  name: "custom",
  initialState: initialState,
  reducers: {
    setHeading(state, action: PayloadAction<string>) {
      state.heading = action.payload;
    },
    addCustom(state, action: PayloadAction<Custom>) {
      state.customs.unshift(action.payload);
    },
    removeCustom(state, action: PayloadAction<Custom>) {
      state.customs = state.customs.filter(
        (custom) => custom !== action.payload
      );
    },
  },
});

export default CustomSlice.reducer;

export const { addCustom, removeCustom,setHeading } = CustomSlice.actions;
