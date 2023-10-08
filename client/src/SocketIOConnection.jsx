import { io } from "socket.io-client";
import { store } from "./redux/store";
import { BACKEND_URL } from "./axios";
import {
  reduxAddMyConversations,
  reduxAddMyMessagesFromSocket,
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
    console.log(users);
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
    console.log(user);
    store.dispatch(reduxAddMyInvitations(user));
  });
  //Users messages listen
  socket.on("new message", (msg) => {
    store.dispatch(reduxAddMyMessagesFromSocket(msg));
  });
  socket.on("update conversationList", (convo) => {
    store.dispatch(reduxAddMyConversations(convo));
  });

  socket.on("openTypingToClient", ({ typeTo, convo }) => {
    store.dispatch(reduxStartTyping({ situation: true, id: typeTo, convo }));
  });
  socket.on("closeTypingToClient", ({ convo, message }) => {
    store.dispatch(reduxStopTyping({ situation: false, convo, message }));
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

export const joinAConversation = (convo) => {
  socket?.emit("Join conversation", convo);
};

export const sendNewMessage = (msg, id) => {
  socket?.emit("new message", { msg, id });
};
//first time chat means other user's conversation list should include me real time
export const createNewConversation = (newConversation, id) => {
  socket?.emit("update conversationList", { newConversation, id });
};

export const userStartMessageTyping = (chattedUserId, typeTo, convo) => {
  socket?.emit("typing", { chattedUserId, typeTo, convo });
};

export const userStopMessageTyping = (chattedUserId, convo, message) => {
  socket?.emit("stop typing", { chattedUserId, convo, message });
};
