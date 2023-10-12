import { createSlice } from "@reduxjs/toolkit";

let rooms = window.localStorage.getItem("activeRoomsDiscord");
let room = window.localStorage.getItem("roomDetailsDiscord");
const initialState = {
  activeRooms: rooms ? JSON.parse(rooms) : [],
  roomDetails: room ? JSON.parse(room) : null,
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
    reduxRoomDetails: (state, action) => {
      state.roomDetails = action.payload;
    },
    reduxSetActiveRooms: (state, action) => {
      state.activeRooms = action.payload;
    },
    reduxLeaveTheRoom: (state, action) => {
      let room = state.activeRooms.find(
        (rm) => rm.roomId === action.payload.idR
      );
      room.participants = room.participants.filter(
        (prt) => prt.userId !== action.payload.idU
      );

      state.activeRooms = state.activeRooms.map((rm) => {
        if (rm.roomId === action.payload.idR) {
          return room;
        } else {
          return rm;
        }
      });
    },
    reduxCloseTheRoom: (state, action) => {
      state.activeRooms = state.activeRooms.filter(
        (rm) => rm.roomId !== action.payload.idR
      );
    },
    reduxSetLocalStream: (state, action) => {
      state.localStream = action.payload;
    },
    reduxSetRemoteStreams: (state, action) => {
      state.remoteStreams = action.payload;
    },
    reduxSetAudioOnly: (state, action) => {
      state.audioOnly = true;
    },
    reduxUnSetAudioOnly: (state, action) => {
      state.audioOnly = false;
    },
    reduxSetScreenShareStream: (state, action) => {},
  },
});

export const {
  reduxRoomDetails,
  reduxSetActiveRooms,
  reduxSetAudioOnly,
  reduxSetLocalStream,
  reduxSetRemoteStreams,
  reduxSetScreenShareStream,
  reduxLeaveTheRoom,
  reduxCloseTheRoom,
  reduxUnSetAudioOnly,
} = makeVideoSlice.actions;

export default makeVideoSlice.reducer;
