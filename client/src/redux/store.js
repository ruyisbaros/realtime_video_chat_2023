import { configureStore } from "@reduxjs/toolkit";
import currentUserSlice from "./currentUserSlice";
import invitesSlice from "./invitationsSlice";
import FriendsSlice from "./FriendsSlice";
import chatSlice from "./chatSlice";
import socketSlicer from "./socketSlicer";
import videoSlice from "./videoSlice";

export const store = configureStore({
  reducer: {
    currentUser: currentUserSlice,
    invitations: invitesSlice,
    friends: FriendsSlice,
    messages: chatSlice,
    sockets: socketSlicer,
    videos: videoSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
