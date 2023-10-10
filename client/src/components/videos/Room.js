import React, { useState } from "react";
import VideoContainer from "./VideoContainer";
import CallActions from "./CallActions";

const Room = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  return (
    <div
      className={`room-main ${
        isFullScreen ? "room-full-screen" : "room-min-screen"
      }`}
    >
      <VideoContainer />
      <CallActions
        setIsFullScreen={setIsFullScreen}
        isFullScreen={isFullScreen}
      />
    </div>
  );
};

export default Room;
