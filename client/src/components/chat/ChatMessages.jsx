import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import Typing from "./Typing";

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
    <div>
      ChatMessages
      {isTyping && typeTo === chattedUser._id ? <Typing /> : ""}
      <div ref={endRef} className="h-[40px]"></div>
    </div>
  );
};

export default ChatMessages;
