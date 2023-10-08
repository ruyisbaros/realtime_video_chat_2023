import { createSlice } from "@reduxjs/toolkit";

let invitations = window.localStorage.getItem("invitationsDiscord");
const initialState = {
  myInvitations: invitations ? JSON.parse(invitations) : [],
};

const makeInvitesSlice = createSlice({
  name: "invitations",
  initialState,
  reducers: {
    reduxFetchMyInvitations: (state, action) => {
      state.myInvitations = action.payload;
    },
    reduxAddMyInvitations: (state, action) => {
      state.myInvitations.push(action.payload);
    },
    reduxRemoveMyInvitations: (state, action) => {
      state.myInvitations = state.myInvitations.filter(
        (usr) => usr.id !== action.payload
      );
    },
  },
});

export const {
  reduxFetchMyInvitations,
  reduxAddMyInvitations,
  reduxRemoveMyInvitations,
} = makeInvitesSlice.actions;

export default makeInvitesSlice.reducer;
