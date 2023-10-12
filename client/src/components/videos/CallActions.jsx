import React, { useState } from "react";
import {
  MdOutlineCloseFullscreen,
  MdOutlineOpenInFull,
  MdScreenShare,
  MdStopScreenShare,
} from "react-icons/md";
import {
  AiOutlineAudio,
  AiOutlineAudioMuted,
  AiOutlineClose,
} from "react-icons/ai";
import { BsCameraVideo, BsCameraVideoOff } from "react-icons/bs";
import { closeTheRoom, leaveFromRoom } from "../../SocketIOConnection";
import { useDispatch, useSelector } from "react-redux";
import {
  reduxLeaveTheRoom,
  reduxCloseTheRoom,
  reduxSetLocalStream,
} from "../../redux/videoSlice";

const CallActions = ({ setIsFullScreen, isFullScreen }) => {
  const dispatch = useDispatch();
  const { loggedUser } = useSelector((store) => store.currentUser);
  const { roomDetails, localStream } = useSelector((store) => store.videos);
  const [shareScreen, setShareScreen] = useState(false);
  const [audioMuted, setAudioMuted] = useState(false);
  const [cameraOpen, setCameraOpen] = useState(false);

  const handleLeaveRoom = () => {
    if (roomDetails.roomCreator.userId === loggedUser.id) {
      if (roomDetails.participants.length > 1) {
        if (
          window.confirm(
            "You are the creator of room. This will be reason of all participants lose connection. Do you want to continue?"
          )
        ) {
          closeTheRoom(roomDetails.roomId);
          dispatch(reduxCloseTheRoom({ idR: roomDetails.roomId }));
          if (localStream !== null) {
            localStream.getTracks().forEach((track) => track.stop());
            dispatch(reduxSetLocalStream(null));
          }
        }
      } else {
        closeTheRoom(roomDetails.roomId);
        dispatch(reduxCloseTheRoom({ idR: roomDetails.roomId }));
        if (localStream !== null) {
          localStream.getTracks().forEach((track) => track.stop());
          dispatch(reduxSetLocalStream(null));
        }
      }
    } else {
      leaveFromRoom(loggedUser.id, roomDetails.roomId);
      //console.log("triggered");
      dispatch(
        reduxLeaveTheRoom({ idR: roomDetails.roomId, idU: loggedUser.id })
      );
      if (localStream !== null) {
        localStream.getTracks().forEach((track) => track.stop());
        dispatch(reduxSetLocalStream(null));
      }
    }
  };
  return (
    <div className="call-actions-main">
      <div className="call-actions-content">
        <ul>
          <li>
            <button
              className="resize-btn"
              onClick={() => setShareScreen((prev) => !prev)}
            >
              {shareScreen ? (
                <MdStopScreenShare size={20} />
              ) : (
                <MdScreenShare size={20} />
              )}
            </button>
          </li>
          <li>
            <button
              className="resize-btn"
              onClick={() => setAudioMuted((prev) => !prev)}
            >
              {audioMuted ? (
                <AiOutlineAudioMuted size={20} />
              ) : (
                <AiOutlineAudio size={20} />
              )}
            </button>
          </li>
          <li>
            <button
              className="resize-btn"
              onClick={() => setCameraOpen((prev) => !prev)}
            >
              {cameraOpen ? (
                <BsCameraVideoOff size={20} />
              ) : (
                <BsCameraVideo size={20} />
              )}
            </button>
          </li>
          <li>
            <button className="resize-btn" onClick={handleLeaveRoom}>
              <AiOutlineClose size={20} />
            </button>
          </li>
          <li>
            <button
              className="resize-btn"
              onClick={() => setIsFullScreen((prev) => !prev)}
            >
              {isFullScreen ? (
                <MdOutlineCloseFullscreen size={20} />
              ) : (
                <MdOutlineOpenInFull size={20} />
              )}
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CallActions;
