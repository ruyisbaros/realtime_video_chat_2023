import React from "react";
import FriendsList from "./FriendsList";

const dummyFriends = [
  {
    id: 1,
    name: "Ahmet",
    isOnline: true,
  },
  {
    id: 2,
    name: "Ruya",
    isOnline: false,
  },
  {
    id: 3,
    name: "Baran",
    isOnline: true,
  },
];

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
        {dummyFriends.map((friend) => (
          <FriendsList key={friend.id} friend={friend} />
        ))}
      </div>
    </div>
  );
};

export default FriendsBar;
