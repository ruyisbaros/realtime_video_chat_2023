import React from "react";
import FriendsList from "./FriendsList";
import { useSelector } from "react-redux";

const FriendsBar = ({ setOpenAddFriendBox }) => {
  const { myFriends } = useSelector((store) => store.friends);
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
        {myFriends.length > 0 &&
          myFriends.map((friend) => (
            <FriendsList key={friend.id} friend={friend} />
          ))}
      </div>
    </div>
  );
};

export default FriendsBar;
