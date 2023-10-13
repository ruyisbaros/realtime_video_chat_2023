import { toast } from "react-toastify";
import { store } from "../../redux/store";
import Peer from "simple-peer";
import {
  reduxSetLocalStream,
  reduxSetRemoteStreams,
} from "../../redux/videoSlice";
const audioOnlyConstraints = {
  audio: true,
  video: false,
};
const defaultConstraints = {
  audio: true,
  video: true,
};
export const getLocalStreamPreview = (audioOnly = false, callbackFunc) => {
  const constraints = audioOnly ? audioOnlyConstraints : defaultConstraints;

  navigator.mediaDevices
    .getUserMedia(constraints)
    .then((stream) => {
      store.dispatch(reduxSetLocalStream(stream));
      callbackFunc();
    })
    .catch((error) => {
      toast.error(error.message);
    });
};

export const getConfiguration = () => {
  const turnIceServers = null;

  if (turnIceServers) {
    //We can create our TURN server
  } else {
    return {
      iceServers: [
        {
          urls: [
            "stun:stun.l.google.com:19302",
            "stun:stun1.l.google.com:19302",
          ],
        },
      ],
    };
  }
};

let peers = {};
export const prepareNewPeerConnection = (remoteUserSocket, isInitiator) => {
  //console.log(remoteUserSocket);
  const localStream = store.getState().videos.localStream;
  const socket = store.getState().sockets.socket;

  if (isInitiator) {
    console.log("Im initiator");
  } else {
    console.log("Im answerer");
  }
  peers[remoteUserSocket] = new Peer({
    initiator: isInitiator,
    configuration: getConfiguration(),
    stream: localStream,
  });

  peers[remoteUserSocket].on("signal", (data) => {
    const signalData = {
      signal: data,
      remoteUserSocket,
    };
    socket.emit("conn-signal", signalData);
  });

  peers[remoteUserSocket].on("stream", (remoteStream) => {
    //console.log("remote stream from another user");
    //console.log(remoteStream);
    //remoteStream.connectedUserSocketId = remoteUserSocket;
    store.dispatch(reduxSetRemoteStreams({ remoteUserSocket, remoteStream }));
  });
  console.log(Object.entries(peers));
};

export const handleSignallingData = ({ signal, socketId }) => {
  if (peers[socketId]) {
    peers[socketId].signal(signal);
  }
};

export const closeAllConnections = () => {
  Object.entries(peers).forEach((mappedObject) => {
    const remoteUserSocket = mappedObject[0];
    if (peers[remoteUserSocket]) {
      peers[remoteUserSocket].destroy();
      delete peers[remoteUserSocket];
    }
  });
};

export const handleParticipantLeftRoom = (leftUserSocketId) => {
  if (peers[leftUserSocketId]) {
    peers[leftUserSocketId].destroy();
    delete peers[leftUserSocketId];
  }

  let remoteStreams = store.getState().videos.remoteStreams;
  const newRemoteStreams = remoteStreams.filter(
    (str) => str.remoteUserSocket !== leftUserSocketId
  );
  store.dispatch(reduxSetRemoteStreams(newRemoteStreams));
};
