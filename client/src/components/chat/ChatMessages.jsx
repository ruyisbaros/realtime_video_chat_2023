import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import Typing from "./Typing";
import { DUMMY_MESSAGES } from "../../utils/dummies";
import SingleMessage from "./SingleMessage";

const ChatMessages = () => {
  const endRef = useRef();
  const { messages, chattedUser, isTyping, typeTo } = useSelector(
    (store) => store.messages
  );
  const { loggedUser } = useSelector((store) => store.currentUser);
  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);
  return (
    <div className="scrollBar chat-messages-main">
      <header className="chat-messages-header"></header>
      {DUMMY_MESSAGES.map((msg) => (
        <SingleMessage
          key={msg._id}
          msg={msg}
          me={loggedUser.id === msg.sender?._id}
        />
      ))}
      {isTyping && typeTo === chattedUser._id ? <Typing /> : ""}
      <div ref={endRef} className="h-[40px]"></div>
    </div>
  );
};

export default ChatMessages;
