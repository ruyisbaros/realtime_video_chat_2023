import React from "react";
import InvitationsBar from "./InvitationsBar";
import FriendsBar from "./FriendsBar";
import { IoIosPeople } from "react-icons/io";

const Sidebar = ({ setOpenAddFriendBox, setMessagesStatus }) => {
  return (
    <div className="sidebar-main">
      <div className="sidebar-left">
        <button className="group-icon-btn">
          <IoIosPeople size={20} />
        </button>
      </div>
      <div className="sidebar-right">
        <div className="sidebar-right_top">
          <FriendsBar
            setOpenAddFriendBox={setOpenAddFriendBox}
            setMessagesStatus={setMessagesStatus}
          />
        </div>
        <div className="sidebar-right_bottom">
          <InvitationsBar />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
