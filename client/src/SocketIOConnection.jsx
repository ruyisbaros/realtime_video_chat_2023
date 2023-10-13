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
import { reduxRoomDetails, reduxSetActiveRooms } from "./redux/videoSlice";
import {
  handleParticipantLeftRoom,
  handleSignallingData,
  prepareNewPeerConnection,
} from "./components/videos/WebRTCHandler";

let socket;

export const connectWithSocketServer = () => {
  socket = io(BACKEND_URL);
};

export const connectToSocketServer = () => {
  socket = io(BACKEND_URL);
  socket.on("connect", () => {
    console.log("Connected to socket io server");
    store.dispatch(createSocket(socket));
    //console.log(store.getState());
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
    //window.localStorage.removeItem("mySocketDiscord");
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

  //Rooms Videos actions listen
  socket.on("created new room", (room) => {
    //console.log(room);
    window.localStorage.setItem("roomDetailsDiscord", JSON.stringify(room));
    store.dispatch(reduxRoomDetails(room));
  });

  socket.on("get active rooms", (rooms) => {
    //console.log(rooms);
    window.localStorage.setItem("activeRoomsDiscord", JSON.stringify(rooms));
    store.dispatch(reduxSetActiveRooms(rooms));
  });
  socket.on("updated rooms", (rooms) => {
    //console.log(rooms);
    window.localStorage.setItem("activeRoomsDiscord", JSON.stringify(rooms));
    store.dispatch(reduxSetActiveRooms(rooms));
  });
  socket.on("leave from room", (rooms) => {
    //console.log(rooms);
    window.localStorage.setItem("activeRoomsDiscord", JSON.stringify(rooms));
    store.dispatch(reduxSetActiveRooms(rooms));
  });
  socket.on("close the room", (rooms) => {
    //console.log(rooms);
    window.localStorage.setItem("activeRoomsDiscord", JSON.stringify(rooms));
    store.dispatch(reduxSetActiveRooms(rooms));
  });
  socket.on("conn-prepare", (remoteUserSocket) => {
    //console.log(remoteUserSocket);
    prepareNewPeerConnection(remoteUserSocket, false); //Is initiator?he/she will join
    socket.emit("conn-init", remoteUserSocket);
  });
  socket.on("conn-init", (socketId) => {
    //console.log(socketId);
    prepareNewPeerConnection(socketId, true); //Is initiator?
  });

  socket.on("conn-signal", ({ signal, socketId }) => {
    //console.log(socketId);
    handleSignallingData({ signal, socketId });
  });
  socket.on("participant left", (socketId) => {
    console.log("User left room");
    handleParticipantLeftRoom(socketId);
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

export const openCreateNewRoom = (user) => {
  socket.emit("create room", user);
};
export const emitActiveRooms = (userId) => {
  socket.emit("emit active rooms", userId);
};

export const joinActiveRoom = (userId, roomId) => {
  socket.emit("join active room", { userId, roomId });
};

export const leaveFromRoom = (userId, roomId) => {
  socket.emit("leave from room", { userId, roomId });
};
export const closeTheRoom = (roomId) => {
  socket.emit("close the room", roomId);
};

export const prepConnAfterJoin = (userId, roomId) => {
  socket.emit("conn-prepare", { userId, roomId });
};

export const participantLeftInfo = (userId, roomId) => {
  socket.emit("participant left", { userId, roomId });
};
