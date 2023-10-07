import { configureStore } from "@reduxjs/toolkit";
import currentUserSlice from "./currentUserSlice";
import invitesSlice from "./invitationsSlice";
import FriendsSlice from "./FriendsSlice";
import chatSlice from "./chatSlice";
import socketSlicer from "./socketSlicer";

export const store = configureStore({
  reducer: {
    currentUser: currentUserSlice,
    Invitations: invitesSlice,
    friends: FriendsSlice,
    messages: chatSlice,
    sockets: socketSlicer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
