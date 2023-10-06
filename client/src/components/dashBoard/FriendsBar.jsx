import React from "react";
import FriendsList from "./FriendsList";

const FriendsBar = ({ setOpenAddFriendBox }) => {
  return (
    <div className="friendsBar_main">
      <button
        className="add-friend-btn"
        onClick={() => setOpenAddFriendBox(true)}
      >
        Add Friend
      </button>
      <div className="friendsBar-container">
        <h2>Private Messages</h2>
        <FriendsList />
      </div>
    </div>
  );
};

export default FriendsBar;
