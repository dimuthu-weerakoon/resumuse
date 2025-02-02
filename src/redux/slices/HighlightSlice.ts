import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Highlight from "../../types/Highlight";
import { SocialLink } from "../../types/SocialLinks";

export interface CustomInitialStateProps {
  heading: string;
  highlights: Highlight[];
  editingHighlight: Highlight | null;
  editingHighlightDesc: string | null;
  editingHighlightUrl: SocialLink | null;
}

const initialState: CustomInitialStateProps = {
  heading: "",
  highlights: [],
  editingHighlight: null,
  editingHighlightDesc: null,
  editingHighlightUrl: null,
};

const highlightSlice = createSlice({
  name: "highlight",
  initialState: initialState,
  reducers: {
    setHeading(state, action: PayloadAction<string>) {
      state.heading = action.payload;
    },
    addHighlight(state, action: PayloadAction<Highlight>) {
      state.highlights.unshift(action.payload);
    },
    removeCustom(state, action: PayloadAction<Highlight>) {
      state.highlights = state.highlights.filter((e) => e !== action.payload);
    },
    editHighlight(state, action: PayloadAction<number>) {
      state.editingHighlight =
        state.highlights.find((_, index) => index === action.payload) || null;
    },
    updateHighlight(state, action: PayloadAction<Highlight>) {
      if (state.editingHighlight) {
        const index = state.highlights.findIndex(
          (h) => h.title === state.editingHighlight?.title
        );
        if (index !== -1) {
          state.highlights[index] = action.payload;
          state.editingHighlight = null;
        }
      }
    },
    editHighlightDescription(state, action: PayloadAction<number>) {
      state.editingHighlightDesc =
        state.editingHighlight?.description.find(
          (_, index) => index === action.payload
        ) || null;
    },
    updateEditingHighlightDesc(state, action: PayloadAction<string>) {
      if (state.editingHighlightDesc && state.editingHighlight) {
        const index = state.editingHighlight.description.findIndex(
          (d) => d === state.editingHighlightDesc
        );
        if (index !== -1) {
          state.editingHighlight.description[index] = action.payload;
          state.editingHighlightDesc = null;
        }
      }
    },
    editHighlightUrl(state, action: PayloadAction<number>) {
      state.editingHighlightUrl =
        state.editingHighlight?.urls.find(
          (_, index) => index === action.payload
        ) || null;
    },
    updateHighlightUrl(state, action: PayloadAction<SocialLink>) {
      if (state.editingHighlightUrl && state.editingHighlight) {
        const index = state.editingHighlight.urls.findIndex(
          (url) =>
            url.link === state.editingHighlightUrl?.link &&
            url.platform === state.editingHighlightUrl.platform
        );

        if (index !== -1) {
          state.editingHighlight.urls[index] = action.payload;
          state.editingHighlightUrl = null;
        }
      }
    },
    clearEditingHighlight(state) {
      state.editingHighlight = null;
    },
  },
});

export default highlightSlice.reducer;

export const {
  addHighlight,
  removeCustom,
  setHeading,
  editHighlight,
  editHighlightDescription,
  updateEditingHighlightDesc,
  updateHighlight,
  clearEditingHighlight,
  editHighlightUrl,
  updateHighlightUrl
} = highlightSlice.actions;
