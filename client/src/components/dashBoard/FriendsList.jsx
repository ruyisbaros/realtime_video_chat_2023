import React from "react";
import { useSelector } from "react-redux";

const FriendsList = ({ friend }) => {
  const { onlineUsers } = useSelector((store) => store.currentUser);
  return (
    <div className="my_friends">
      <div className="friend">
        <div className="friend-picture">
          <img src={friend.picture} alt="" />
        </div>
        <div className="friend-name">{friend.name}</div>
        <span
          className="isUser-online"
          style={{
            background: onlineUsers.find((usr) => usr.id === friend._id)
              ? "#3ba55d"
              : "",
          }}
        ></span>
      </div>
    </div>
  );
};

export default FriendsList;
