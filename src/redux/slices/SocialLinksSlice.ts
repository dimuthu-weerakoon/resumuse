import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SocialLink } from "../../types/SocialLinks";

const initialState: SocialLink[] = [];

const SocialLinkSlice = createSlice({
  name: "socialLink",
  initialState: initialState,
  reducers: {
    addSocialLink(state, action: PayloadAction<SocialLink>) {
      state.push(action.payload);
    },
    removeSocialLink(state, action: PayloadAction<SocialLink>) {
      return state.filter((social) => social !== action.payload);
    },
    clearSocialLinks(state) {
      state = [];
    },
  },
});

export const { addSocialLink, removeSocialLink, clearSocialLinks } = SocialLinkSlice.actions;

export default SocialLinkSlice.reducer;

