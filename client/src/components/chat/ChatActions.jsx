import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RiSendPlane2Fill } from "react-icons/ri";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import axios from "../../axios";
import {
  sendNewMessage,
  userStartMessageTyping,
  userStopMessageTyping,
} from "../../SocketIOConnection";
import { reduxAddMyMessages } from "../../redux/chatSlice";

const ChatActions = () => {
  const dispatch = useDispatch();
  const { activeConversation, chattedUser, isTyping } = useSelector(
    (store) => store.messages
  );
  //const { loggedUser } = useSelector((store) => store.currentUser);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleMessageType = (e) => {
    setMessage(e.target.value);
    if (!isTyping) {
      userStartMessageTyping(chattedUser._id, activeConversation._id);
    }
    let lastTypeTime = new Date().getTime();
    let timer = 1000;
    setTimeout(() => {
      let timeNow = new Date().getTime();
      let tDifference = timeNow - lastTypeTime;
      if (tDifference >= timer && isTyping) {
        userStopMessageTyping(chattedUser._id, activeConversation._id);
      }
    }, timer);
  };

  const handleSendMessage = async () => {
    try {
      setStatus(true);
      /* message, conversation, recipient */
      const { data } = await axios.post("/messages/new_message", {
        message,
        conversation: activeConversation?._id,
        recipient: chattedUser?._id,
      });
      setStatus(false);
      console.log(data);
      dispatch(reduxAddMyMessages(data));
      //Emit socket
      sendNewMessage(data, chattedUser?._id);
      userStopMessageTyping(chattedUser?._id, activeConversation?._id);
      setMessage("");
    } catch (error) {
      setStatus(false);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="chat-actions-main">
      <div className="chat-actions-content">
        <input
          type="text"
          className="input-message"
          placeholder="Enter message..."
          value={message}
          onChange={handleMessageType}
          onBlur={() =>
            userStopMessageTyping(chattedUser?._id, activeConversation?._id)
          }
        />
        <button
          type="submit"
          className="send-message-btn"
          disabled={!message}
          onClick={handleSendMessage}
        >
          {status ? (
            <ClipLoader color="#e9edef" size={25} />
          ) : (
            <RiSendPlane2Fill size={25} />
          )}
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
