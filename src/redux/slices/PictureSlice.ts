import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FileState {
  pictureFile: File | null;
}

const initialState: FileState = {
  pictureFile: null,
};

const pictureSlice = createSlice({
  name: "picture",
  initialState: initialState,
  reducers: {
    setPicture(state, action: PayloadAction<File>) {
      const allowedTypes = ["image/png", "image/jpeg", "image/webp"];
      if (allowedTypes.includes(action.payload.type)) {
        state.pictureFile = action.payload;
      } else {
        console.log("Unsupported file types: ", action.payload.type);
      }
    },
    clearPicture(state) {
      state.pictureFile = null;
    },
  },
});

export const {setPicture,clearPicture} = pictureSlice.actions
export default pictureSlice.reducer