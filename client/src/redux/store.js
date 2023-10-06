import { configureStore } from "@reduxjs/toolkit";
import currentUserSlice from "./currentUserSlice";
import invitesSlice from "./invitesSlice";
import FriendsSlice from "./FriendsSlice";
import chatSlice from "./chatSlice";

export const store = configureStore({
  reducer: {
    currentUser: currentUserSlice,
    invites: invitesSlice,
    friends: FriendsSlice,
    messages: chatSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
