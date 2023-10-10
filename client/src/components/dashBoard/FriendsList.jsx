import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "../../axios";
import { reduxSetActiveConversation } from "../../redux/chatSlice";

const FriendsList = ({ friend, setMessagesStatus }) => {
  //console.log(friend);
  const dispatch = useDispatch();
  const { onlineUsers } = useSelector((store) => store.currentUser);
  //const { socket } = useSelector((store) => store.sockets);

  const setCreateActiveConversation = async () => {
    try {
      setMessagesStatus(true);
      const { data } = await axios.post("/messages/new_conversation", {
        receiver_id: friend._id,
      });
      console.log(data);
      dispatch(reduxSetActiveConversation(data));
      setMessagesStatus(false);
    } catch (error) {
      setMessagesStatus(false);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="my_friends">
      <div className="friend" onClick={setCreateActiveConversation}>
        <div className="friend-picture">
          <img src={friend.picture} alt="" />
        </div>
        <div className="friend-name">{friend.name}</div>
        <span
          className="isUser-online"
          style={{
            background: `${
              onlineUsers?.find((usr) => usr.id === friend._id) ? "#3ba55d" : ""
            }`,
          }}
        ></span>
      </div>
    </div>
  );
};

export default FriendsList;
