import React from "react";

const FriendsList = ({ friend }) => {
  return (
    <div className="my_friends">
      <div className="friend">
        <div className="friend-picture">
          <img
            src="https://res.cloudinary.com/dmhcnhtng/image/upload/v1643044376/avatars/default_pic_jeaybr.png"
            alt=""
          />
        </div>
        <div className="friend-name">{friend.name}</div>
        <span
          className="isUser-online"
          style={{ background: friend.isOnline ? "#3ba55d" : "" }}
        ></span>
      </div>
    </div>
  );
};

export default FriendsList;
