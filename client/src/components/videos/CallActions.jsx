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

const CallActions = ({ setIsFullScreen, isFullScreen }) => {
  const [shareScreen, setShareScreen] = useState(false);
  const [audioMuted, setAudioMuted] = useState(false);
  const [cameraOpen, setCameraOpen] = useState(false);

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
            <button
              className="resize-btn"
              onClick={() => setCameraOpen((prev) => !prev)}
            >
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
