import { createSlice } from "@reduxjs/toolkit";
//import Cookies from "js-cookie";
const user = window.localStorage.getItem("registeredUserDiscord");
const onUsers = window.localStorage.getItem("onlineUsersDiscord");
const mySocket = window.localStorage.getItem("mySocketDiscord");
const initialState = {
  loggedUser: user ? JSON.parse(user) : null,
  onlineUsers: onUsers.length > 0 ? JSON.parse(onUsers) : [],
  mySocketId: mySocket ? JSON.parse(mySocket) : null,
};
//console.log(JSON.parse(onUsers));
const currentUSlicer = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    reduxLogout: (state, action) => {
      state.loggedUser = null;
      state.mySocketId = null;
      window.localStorage.removeItem("registeredUserDiscord");
    },

    reduxRegisterUser: (state, action) => {
      const { id, email, name, picture, username } = action.payload;
      state.loggedUser = { id, name, email, picture, username };
    },
    reduxSetOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
      state.onlineUsers = state.onlineUsers?.filter(
        (usr) => usr.id !== state.loggedUser.id
      );
      // console.log(state.onLineUsers);
    },
    reduxAUserBecameOffline: (state, action) => {
      state.onlineUsers = state.onlineUsers?.filter(
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
