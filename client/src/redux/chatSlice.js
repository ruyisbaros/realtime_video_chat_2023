import { createSlice } from "@reduxjs/toolkit";
//const user = window.localStorage.getItem("registeredUser");
const initialState = {
  conversations: [],
  messages: [],
  activeConversation: null,
  chattedUser: null,
  isTyping: false,
  files: [],
  chatType: "",
};

const chatSlicer = createSlice({
  name: "messages",
  initialState,
  reducers: {
    reduxSetActiveConversation: (state, action) => {
      state.activeConversation = action.payload;
      state.files = [];
    },
    reduxSetChattedUser: (state, action) => {
      state.chattedUser = action.payload;
    },
    reduxGetMyConversations: (state, action) => {
      state.conversations = action.payload;
    },
    reduxAddMyConversations: (state, action) => {
      //console.log(action.payload);
      const newConversation = state.conversations?.find(
        (cnv) => cnv._id === action.payload._id
      );
      if (!newConversation) {
        state.conversations.push(action.payload);
      }
    },
    reduxRemoveFromMyConversations: (state, action) => {
      state.conversations.pop(action.payload);
    },
    reduxGetMyMessages: (state, action) => {
      state.messages = action.payload;
    },
    reduxAddMyMessages: (state, action) => {
      console.log(action.payload);
      state.messages.push(action.payload);
      //Update latest message
    },

    reduxRemoveFromMyMessages: (state, action) => {
      state.messages.pop(action.payload);
    },

    reduxStartTyping: (state, action) => {
      //console.log(action.payload);
      if (action.payload.convo === state.activeConversation?._id) {
        state.isTyping = action.payload.situation;
      }
    },
    reduxStopTyping: (state, action) => {
      if (action.payload.convo === state.activeConversation?._id) {
        state.isTyping = action.payload.situation;
      }
    },
    reduxAddFile: (state, action) => {
      state.files.push(action.payload);
    },
    reduxRemoveFile: (state, action) => {
      //state.files = state.files.splice(action.payload, 1);
      const index = action.payload;
      let files = [...state.files];
      let fileToRemove = [files[index]];
      state.files = files.filter((f) => !fileToRemove.includes(f));
    },
    reduxMakeFilesEmpty: (state, action) => {
      state.files = [];
    },
  },
});

export const {
  reduxSetActiveConversation,
  reduxGetMyConversations,
  reduxAddMyConversations,
  reduxRemoveFromMyConversations,
  reduxGetMyMessages,
  reduxAddMyMessages,
  reduxRemoveFromMyMessages,
  reduxSetChattedUser,
  reduxStartTyping,
  reduxStopTyping,
  reduxAddFile,
  reduxMakeFilesEmpty,
  reduxRemoveFile,
} = chatSlicer.actions;

export default chatSlicer.reducer;
