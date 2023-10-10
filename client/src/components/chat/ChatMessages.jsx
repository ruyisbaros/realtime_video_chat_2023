import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import Typing from "./Typing";
import { DUMMY_MESSAGES } from "../../utils/dummies";
import SingleMessage from "./SingleMessage";

const ChatMessages = () => {
  const endRef = useRef();
  const { messages, chattedUser, isTyping } = useSelector(
    (store) => store.messages
  );
  const { loggedUser } = useSelector((store) => store.currentUser);
  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);
  return (
    <div className="scrollBar chat-messages-main">
      <header className="chat-messages-header"></header>
      {messages.length > 0 &&
        messages.map((msg, i) => (
          /* sameSender= i>0&&messages[i].sender._id===messages[i-1].sender._id*/
          /* sameDay= i>convertDate*/
          <SingleMessage
            key={msg._id}
            msg={msg}
            me={loggedUser.id === msg.sender?._id.toString()}
          />
        ))}
      {isTyping ? <Typing /> : ""}
      <div ref={endRef} style={{ height: "40px" }}></div>
    </div>
  );
};

export default ChatMessages;
