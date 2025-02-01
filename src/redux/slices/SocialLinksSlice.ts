import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SocialLink } from "../../types/SocialLinks";
export interface SocialLinkState {
  links: SocialLink[];
  editingLink: SocialLink | null;
}
const initialState: SocialLinkState = {
  links: [],
  editingLink: null,
};

const SocialLinkSlice = createSlice({
  name: "socialLink",
  initialState: initialState,
  reducers: {
    addSocialLink(state, action: PayloadAction<SocialLink>) {
      state.links.push(action.payload);
    },
    removeSocialLink(state, action: PayloadAction<SocialLink>) {
      state.links = state.links.filter((social) => social !== action.payload);
    },
    editSocialLink(state, action: PayloadAction<number>) {
      state.editingLink =
        state.links.find((el, index) => index === action.payload) || null;
    },
    updateSocialLink(state, action: PayloadAction<SocialLink>) {
      if (state.editingLink) {
        const index = state.links.findIndex(
          (link) =>
            link.platform === state.editingLink?.platform &&
            link.link === state.editingLink?.link
        );
        if (index !== -1) {
          state.links[index] = action.payload;
          state.editingLink = null;
        }
      }
    },
    clearSocialLinks(state) {
      state.links = [];
    },
    clearEditingLink(state) {
      state.editingLink = null;
    },
  },
});

export const {
  addSocialLink,
  editSocialLink,
  updateSocialLink,
  removeSocialLink,
  clearSocialLinks,
  clearEditingLink,
} = SocialLinkSlice.actions;

export default SocialLinkSlice.reducer;
