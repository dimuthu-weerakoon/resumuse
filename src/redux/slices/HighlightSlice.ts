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
    removeHighlight(state, action: PayloadAction<number>) {
      state.highlights = state.highlights.filter(
        (_, index) => index !== action.payload
      );
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
    addMoreDescriptions(state, action: PayloadAction<string>) {
      if (state.editingHighlight) {
        state.editingHighlight.description.push(action.payload);
      }
    },
    removeHighlightDescription(state, action: PayloadAction<number>) {
      if (state.editingHighlight?.description) {
        state.editingHighlight.description =
          state.editingHighlight.description.filter(
            (_, index) => index !== action.payload
          );
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
    removeHighlightUrl(state, action: PayloadAction<SocialLink>) {
      if (state.editingHighlight?.urls) {
        state.editingHighlight.urls = state.editingHighlight.urls.filter(
          (url) =>
            url.link !== action.payload.link &&
            url.platform !== action.payload.platform
        );
      }
    },
    addMoreUrls(state, action: PayloadAction<SocialLink>) {
      if (!state.editingHighlight?.urls.some(url=>(
         url.link === action.payload.link &&
         url.platform === action.payload.platform
        ))) {
      state.editingHighlight?.urls.push(action.payload);
        
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
  removeHighlight,
  setHeading,
  editHighlight,
  editHighlightDescription,
  updateEditingHighlightDesc,
  updateHighlight,
  clearEditingHighlight,
  editHighlightUrl,
  updateHighlightUrl,
  addMoreDescriptions,
  removeHighlightDescription,
  addMoreUrls,
  removeHighlightUrl
} = highlightSlice.actions;
