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
import { reduxLeaveTheRoom, reduxCloseTheRoom } from "../../redux/videoSlice";

const CallActions = ({ setIsFullScreen, isFullScreen }) => {
  const dispatch = useDispatch();
  const { loggedUser } = useSelector((store) => store.currentUser);
  const { roomDetails } = useSelector((store) => store.videos);
  const [shareScreen, setShareScreen] = useState(false);
  const [audioMuted, setAudioMuted] = useState(false);
  const [cameraOpen, setCameraOpen] = useState(false);

  const handleLeaveRoom = () => {
    if (roomDetails.roomCreator.userId === loggedUser.id) {
      closeTheRoom(roomDetails.roomId);
      dispatch(reduxCloseTheRoom({ idR: roomDetails.roomId }));
    } else {
      leaveFromRoom(loggedUser.id, roomDetails.roomId);
      console.log("triggered");
      dispatch(
        reduxLeaveTheRoom({ idR: roomDetails.roomId, idU: loggedUser.id })
      );
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
