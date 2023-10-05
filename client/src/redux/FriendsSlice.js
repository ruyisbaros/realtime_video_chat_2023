import { createSlice } from "@reduxjs/toolkit";

let friends = window.localStorage.getItem("friendsDiscord");
const initialState = {
  myFriends: friends ? JSON.parse(friends) : [],
};

const makeFriendSlice = createSlice({
  name: "friends",
  initialState,
  reducers: {
    reduxFetchMyFriends: (state, action) => {
      state.myFriends = action.payload;
    },
    reduxAddMyFriends: (state, action) => {
      state.myFriends.push(action.payload);
    },
    reduxRemoveMyFriend: (state, action) => {
      state.myFriends = state.myFriends.filter(
        (usr) => usr.id !== action.payload
      );
    },
  },
});

export const { reduxAddMyFriends, reduxFetchMyFriends, reduxRemoveMyFriend } =
  makeFriendSlice.actions;

export default makeFriendSlice.reducer;
