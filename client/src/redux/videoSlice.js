import { createSlice } from "@reduxjs/toolkit";

let rooms = window.localStorage.getItem("activeRoomsDiscord");
const initialState = {
  isUserInRoom: false,
  isUserRoomCreator: false,
  activeRooms: rooms ? JSON.parse(rooms) : [],
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
    reduxOpenRoom: (state, action) => {
      state.isUserInRoom = action.payload.isInRoom;
      state.isUserRoomCreator = action.payload.isCreator;
    },
    reduxCloseRoom: (state, action) => {
      state.isUserInRoom = false;
      state.isUserRoomCreator = false;
    },
    reduxRoomDetails: (state, action) => {
      state.roomDetails = action.payload;
    },
    reduxSetActiveRooms: (state, action) => {
      state.activeRooms = action.payload;
    },
    reduxSetLocalStream: (state, action) => {},
    reduxSetRemoteStreams: (state, action) => {},
    reduxSetAudioOnly: (state, action) => {},
    reduxSetScreenShareStream: (state, action) => {},
  },
});

export const {
  reduxOpenRoom,
  reduxRoomDetails,
  reduxSetActiveRooms,
  reduxSetAudioOnly,
  reduxSetLocalStream,
  reduxSetRemoteStreams,
  reduxSetScreenShareStream,
} = makeVideoSlice.actions;

export default makeVideoSlice.reducer;
