import { createSlice } from "@reduxjs/toolkit";
//import Cookies from "js-cookie";
const user = window.localStorage.getItem("registeredUserDiscord");
let onUsers = window.localStorage.getItem("onlineUsersDiscord");
const initialState = {
  loggedUser: user ? JSON.parse(user) : null,
  onLineUsers: onUsers ? JSON.parse(onUsers) : [],
  mySocketId: null,
};

const currentUSlicer = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    reduxLogout: (state, action) => {
      state.loggedUser = null;
    },

    reduxRegisterUser: (state, action) => {
      const { id, email, name, picture, username } = action.payload;
      state.loggedUser = { id, name, email, picture, username };
    },
    reduxSetOnlineUsers: (state, action) => {
      state.onLineUsers = action.payload;
    },
    reduxAUserBecameOffline: (state, action) => {
      state.onLineUsers = state.onLineUsers.filter(
        (usr) => usr.id !== action.payload
      );
    },
    reduxSetMySocketId: (state, action) => {
      state.mySocketId = action.payload;
    },
  },
});

export const {
  reduxLogout,
  reduxRegisterUser,
  reduxSetOnlineUsers,
  reduxAUserBecameOffline,
  reduxSetMySocketId,
} = currentUSlicer.actions;

export default currentUSlicer.reducer;