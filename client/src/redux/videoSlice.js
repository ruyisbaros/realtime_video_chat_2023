import { createSlice } from "@reduxjs/toolkit";

//let friends = window.localStorage.getItem("friendsDiscord");
const initialState = {
  isUserInRoom: false,
  isUserRoomCreator: false,
  activeRooms: [],
  roomDetails: null,
  localStream: null,
  remoteStreams: [],
  audioOnly: false,
  screenSharingStream: null,
  isScreenSharingActive: false,
};

const makeVideoSlice = createSlice({
  name: "videos",
  initialState,
  reducers: {
    reduxFetchRooms: (state, action) => {
      state.activeRooms = action.payload;
    },
    reduxOpenRoom: (state, action) => {
      state.isUserInRoom = action.payload.isInRoom;
      state.isUserRoomCreator = action.payload.isCreator;
    },
    reduxRoomDetails: (state, action) => {},
    reduxSetActiveRooms: (state, action) => {},
    reduxSetLocalStream: (state, action) => {},
    reduxSetRemoteStreams: (state, action) => {},
    reduxSetAudioOnly: (state, action) => {},
    reduxSetScreenShareStream: (state, action) => {},
  },
});

export const {
  reduxFetchRooms,
  reduxOpenRoom,
  reduxRoomDetails,
  reduxSetActiveRooms,
  reduxSetAudioOnly,
  reduxSetLocalStream,
  reduxSetRemoteStreams,
  reduxSetScreenShareStream,
} = makeVideoSlice.actions;

export default makeVideoSlice.reducer;
