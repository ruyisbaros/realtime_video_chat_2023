import React from "react";

const SingleMessage = ({ msg, me }) => {
  return (
    <div className="single-message-main">
      <div className="single-message-content">
        {!msg.sameSender && !msg.sameDay ? (
          <img
            src={!me ? msg.sender.picture : ""}
            alt=""
            className="single-message-img"
          />
        ) : (
          <div className="single-message-img"></div>
        )}
        <div className="single-message-box">
          {!msg.sameSender && (
            <div className="message-owner">{msg.sender.name}</div>
          )}
          <div className="message-content">
            <p className="message-text"> {msg.message}</p>
            {!msg.sameDay ? (
              <span className="message-date">{msg.createdAt}</span>
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
