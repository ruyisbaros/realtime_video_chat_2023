import React from "react";
import FriendsList from "./FriendsList";
import { useSelector } from "react-redux";

const FriendsBar = ({ setOpenAddFriendBox, setMessagesStatus }) => {
  const { myFriends } = useSelector((store) => store.friends);
  //console.log(myFriends);
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
            <FriendsList
              key={friend._id}
              friend={friend}
              setMessagesStatus={setMessagesStatus}
            />
          ))}
      </div>
    </div>
  );
};

export default FriendsBar;
