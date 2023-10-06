import { configureStore } from "@reduxjs/toolkit";
import currentUserSlice from "./currentUserSlice";
import invitesSlice from "./invitesSlice";
import FriendsSlice from "./FriendsSlice";
import chatSlice from "./chatSlice";
import socketSlicer from "./socketSlicer";

export const store = configureStore({
  reducer: {
    currentUser: currentUserSlice,
    invites: invitesSlice,
    friends: FriendsSlice,
    messages: chatSlice,
    sockets: socketSlicer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
