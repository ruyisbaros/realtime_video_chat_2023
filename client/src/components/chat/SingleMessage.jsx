import React from "react";
import { dateHandler } from "./../../utils/momentHandler";

const SingleMessage = ({ msg, me }) => {
  return (
    <div className="single-message-main">
      <div
        className={`single-message-content ${me ? "single-message-mine" : ""}`}
      >
        {/* {!msg.sameSender && !msg.sameDay && !me ? (
          <img src={msg.sender.picture} alt="" className="single-message-img" />
        ) : (
          <div className="single-message-img"></div>
        )} */}
        <div className={`single-message-box ${me ? "if-me" : ""}`}>
          {/* {!me && <div className="message-owner">{msg.sender.name}</div>} */}
          <div className="message-content">
            <p className="message-text"> {msg.message}</p>
            {!msg.sameDay ? (
              <span className="message-date">{dateHandler(msg.createdAt)}</span>
            ) : (
              <span className="message-date"></span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleMessage;
