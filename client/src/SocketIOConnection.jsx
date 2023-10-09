import { io } from "socket.io-client";
import { store } from "./redux/store";
import { BACKEND_URL } from "./axios";
import {
  reduxAddMyMessages,
  reduxStartTyping,
  reduxStopTyping,
} from "./redux/chatSlice";
import {
  reduxAUserBecameOffline,
  reduxSetMySocketId,
  reduxSetOnlineUsers,
} from "./redux/currentUserSlice";

import { createSocket } from "./redux/socketSlicer";
import { reduxAddMyInvitations } from "./redux/invitationsSlice";
import { reduxAddMyFriends } from "./redux/FriendsSlice";
let socket;

export const connectWithSocketServer = () => {
  socket = io(BACKEND_URL);
};

export const connectToSocketServer = () => {
  socket = io(BACKEND_URL);
  socket.on("connect", () => {
    console.log("Connected to socket io server");
    store.dispatch(createSocket(socket));
  });
  socket.on("setup socketId", (id) => {
    console.log("remote socket id ", id);
    window.localStorage.setItem("mySocketDiscord", JSON.stringify(id));
    store.dispatch(reduxSetMySocketId(id));
  });
  socket.on("onlineUsers", (users) => {
    window.localStorage.setItem("onlineUsersDiscord", JSON.stringify(users));
    store.dispatch(reduxSetOnlineUsers(users));
  });
  socket.on("user got offline", (id) => {
    let onUsers = window.localStorage.getItem("onlineUsersDiscord");
    onUsers = JSON.parse(onUsers);
    onUsers = onUsers?.filter((usr) => usr.id !== id);
    window.localStorage.setItem("onlineUsersDiscord", JSON.stringify(onUsers));
    window.localStorage.removeItem("mySocketDiscord");
    store.dispatch(reduxAUserBecameOffline(id));
  });

  socket.on("got invitation", (user) => {
    //console.log(user);
    store.dispatch(reduxAddMyInvitations(user));
  });
  socket.on("invitation accepted", (user) => {
    store.dispatch(reduxAddMyFriends(user));
  });
  //Users messages listen
  socket.on("new message", (msg) => {
    store.dispatch(reduxAddMyMessages(msg));
  });

  socket.on("openTypingToClient", (convo) => {
    store.dispatch(reduxStartTyping({ situation: true, convo }));
  });
  socket.on("closeTypingToClient", (convo) => {
    store.dispatch(reduxStopTyping({ situation: false, convo }));
  });
};

//Emit user activities
export const joinUser = (id) => {
  socket?.emit("joinUser", id);
};
export const logoutDisconnect = (id) => {
  socket?.emit("logout", id);
};

export const inviteFriend = ({ invitedMail, inviterUser }) => {
  socket.emit("invite friend", { invitedMail, inviterUser });
};
export const acceptInvite = (email) => {
  socket.emit("accept invite", email);
};
export const rejectInvite = (email) => {
  socket.emit("reject invite", email);
};

export const sendNewMessage = (msg, id) => {
  socket?.emit("new message", { msg, id });
};

export const userStartMessageTyping = (chattedId, activeConversation) => {
  socket?.emit("typing", { chattedId, activeConversation });
};

export const userStopMessageTyping = (chattedId, activeConversation) => {
  socket?.emit("stop typing", { chattedId, activeConversation });
};
