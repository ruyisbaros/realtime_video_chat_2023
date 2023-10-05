import { configureStore } from "@reduxjs/toolkit";
import currentUserSlice from "./currentUserSlice";
import invitesSlice from "./invitesSlice";
import FriendsSlice from "./FriendsSlice";

export const store = configureStore({
  reducer: {
    currentUser: currentUserSlice,
    invites: invitesSlice,
    friends: FriendsSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
