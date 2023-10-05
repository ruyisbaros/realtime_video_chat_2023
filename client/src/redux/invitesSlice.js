import { createSlice } from "@reduxjs/toolkit";

let invites = window.localStorage.getItem("invitesDiscord");
const initialState = {
  myInvites: invites ? JSON.parse(invites) : [],
};

const makeInvitesSlice = createSlice({
  name: "invites",
  initialState,
  reducers: {
    reduxFetchMyInvites: (state, action) => {
      state.myInvites = action.payload;
    },
    reduxAddMyInvites: (state, action) => {
      state.myInvites.push(action.payload);
    },
    reduxRemoveMyInvite: (state, action) => {
      state.myInvites = state.myInvites.filter(
        (usr) => usr.id !== action.payload
      );
    },
  },
});

export const { reduxFetchMyInvites, reduxAddMyInvites, reduxRemoveMyInvite } =
  makeInvitesSlice.actions;

export default makeInvitesSlice.reducer;
