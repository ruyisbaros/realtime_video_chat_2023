import React from "react";
import { useSelector } from "react-redux";
import Video from "./Video";

const VideoContainer = () => {
  const { localStream } = useSelector((store) => store.videos);
  return (
    <div className="video-container-main">
      <Video localStream={localStream} isLocalStream />
    </div>
  );
};

export default VideoContainer;
