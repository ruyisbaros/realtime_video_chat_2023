import React, { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { AiOutlineWechat } from "react-icons/ai";
import axios from "../../axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { reduxLogout } from "../../redux/currentUserSlice";
import { logoutDisconnect } from "../../SocketIOConnection";
import DiscordInitial from "../chat/DiscordInitial";
import ActiveChat from "./../chat/ActiveChat";
import { dateHandler2 } from "../../utils/momentHandler";

const Messenger = ({ messagesStatus }) => {
  const dispatch = useDispatch();
  const [showDrop, setShowDrop] = useState(false);
  const { loggedUser, onlineUsers } = useSelector((store) => store.currentUser);
  const { activeConversation, chattedUser } = useSelector(
    (store) => store.messages
  );
  const handleLogout = async () => {
    try {
      await axios.get("/auth/logout");
      dispatch(reduxLogout());
      logoutDisconnect(loggedUser.id);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="messenger-main">
      {
        <header className="messenger-header">
          <div className="dialog_img">
            <img src={loggedUser?.picture} alt="" className="profile-photo" />

            {chattedUser && (
              <div className="dialog_with">
                <AiOutlineWechat size={20} color="#ddd" />
                <img
                  src={chattedUser?.picture}
                  alt=""
                  className="profile-photo"
                />
                <div className="dialog-info">
                  <span className="dialog_with_name">{chattedUser?.name}</span>
                  <span className="dialog_with_status">
                    {onlineUsers.find((usr) => usr.id === chattedUser?._id)
                      ? "online"
                      : "Last online " + dateHandler2(chattedUser?.lastSeen)}
                  </span>
                </div>
              </div>
            )}
          </div>
          <button
            className="drop-btn"
            onClick={() => setShowDrop((prev) => !prev)}
          >
            <BsThreeDotsVertical size={20} />
          </button>
          {showDrop && (
            <div className="drop-menu">
              <ul>
                <li onClick={handleLogout}>Logout</li>
              </ul>
            </div>
          )}
        </header>
      }
      {activeConversation ? (
        <ActiveChat messagesStatus={messagesStatus} />
      ) : (
        <DiscordInitial />
      )}
    </div>
  );
};

export default Messenger;
