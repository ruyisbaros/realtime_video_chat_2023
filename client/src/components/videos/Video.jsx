import React, { useEffect, useRef } from "react";

const Video = ({ localStream, isLocalStream }) => {
  const videoRef = useRef();

  useEffect(() => {
    const video = videoRef.current;
    video.srcObject = localStream;

    video.onloadedmetadata = () => {
      video.play();
    };
  }, [localStream]);

  return (
    <div className="video-main">
      <video ref={videoRef} autoPlay muted={isLocalStream ? true : false} />
    </div>
  );
};

export default Video;
