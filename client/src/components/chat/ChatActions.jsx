import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ChatActions = () => {
  const dispatch = useDispatch();
  const { activeConversation, chattedUser } = useSelector(
    (store) => store.messages
  );
  const { loggedUser } = useSelector((store) => store.currentUser);
  const [message, setMessage] = useState("");
  return (
    <div className="chat-actions-main">
      <div className="chat-actions-content">
        <input type="text" className="input-message" />
        <button type="submit" className="send-message-btn">
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatActions;
/* 

sender: {
      type: ObjectId,
      ref: "User",
    },
    recipient: {
      type: ObjectId,
      ref: "User",
    },
    message: {
      type: String,
    },
    conversation: {
      type: ObjectId,
      ref: "Conversation",
    },
    sameSender: {
      type: Boolean,
      default: false,
    },
    sameDay: {
      type: Boolean,
      default: false,
    },
*/
