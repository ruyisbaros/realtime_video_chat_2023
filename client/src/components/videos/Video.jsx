import React, { useEffect, useRef } from "react";

const Video = ({ stream, isLocalStream }) => {
  const videoRef = useRef();

  useEffect(() => {
    const video = videoRef.current;
    video.srcObject = stream;

    video.onloadedmetadata = () => {
      video.play();
    };
  }, [stream]);

  return (
    <div className="video-main">
      <video ref={videoRef} autoPlay muted={isLocalStream ? true : false} />
    </div>
  );
};

export default Video;
