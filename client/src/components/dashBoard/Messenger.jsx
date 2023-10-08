import React, { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import axios from "../../axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { reduxLogout } from "../../redux/currentUserSlice";
import { logoutDisconnect } from "../../SocketIOConnection";
import DiscordInitial from "../chat/DiscordInitial";
import ActiveChat from "./../chat/ActiveChat";

const Messenger = ({ messagesStatus }) => {
  const dispatch = useDispatch();
  const [showDrop, setShowDrop] = useState(false);
  const { loggedUser } = useSelector((store) => store.currentUser);
  const { activeConversation } = useSelector((store) => store.messages);
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
      <header>
        <img src={loggedUser.picture} alt="" className="profile-photo" />
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
      {activeConversation ? (
        <ActiveChat messagesStatus={messagesStatus} />
      ) : (
        <DiscordInitial />
      )}
    </div>
  );
};

export default Messenger;
