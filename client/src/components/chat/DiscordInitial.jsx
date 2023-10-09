import React from "react";
import discord from "../../assets/online_meeting.png";
const DiscordInitial = () => {
  return (
    <div className="discord-main">
      <div className="discord-content">
        <img src={discord} alt="" className="discord-img" />
        <p>To start chatting - choose conversation...</p>
      </div>
    </div>
  );
};

export default DiscordInitial;
