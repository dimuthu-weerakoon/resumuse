import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Refree } from "../../types/Refree";

interface RefreeSliceProps {
  refrees: Refree[];
  editingRefree: Refree | null;
}

const initialState: RefreeSliceProps = {
  refrees: [],
  editingRefree: null,
};

const refreeSlice = createSlice({
  name: "refree",
  initialState: initialState,
  reducers: {
    addRefrees(state, action: PayloadAction<Refree>) {
      state.refrees.push(action.payload);
    },
    removeRefree(state, action: PayloadAction<Refree>) {
      state.refrees = state.refrees.filter(
        (refree) => refree !== action.payload
      );
    },
    editRefree(state, action: PayloadAction<number>) {
      state.editingRefree =
        state.refrees.find((_, index) => index === action.payload) || null;
    },
    updateRefree(state, action: PayloadAction<Refree>) {
      if (state.editingRefree) {
        const index = state.refrees.findIndex(
          (ref) =>
            ref.email === state.editingRefree?.email &&
            ref.phone === state.editingRefree?.phone
        );
        if (index !== -1) {
          state.refrees[index] = action.payload;
          state.editingRefree = null;
        }
      }
    },
    clearEditingRefree(state) {
      state.editingRefree = null;
    },
  },
});

export const { addRefrees, removeRefree, editRefree, updateRefree,clearEditingRefree } =
  refreeSlice.actions;

export default refreeSlice.reducer;
