import React from "react";
import { useSelector } from "react-redux";
import Video from "./Video";

const VideoContainer = () => {
  const { localStream, remoteStreams } = useSelector((store) => store.videos);
  return (
    <div className="video-container-main">
      <Video stream={localStream} isLocalStream />
      {remoteStreams.length > 0 &&
        remoteStreams.map((str, i) => (
          <Video key={str.remoteUserSocket} stream={str.remoteStream} />
        ))}
    </div>
  );
};

export default VideoContainer;
