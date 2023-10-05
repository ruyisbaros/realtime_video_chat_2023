import React from "react";
import InvitationsBar from "./InvitationsBar";
import FriendsBar from "./FriendsBar";
const Sidebar = () => {
  return (
    <div className="sidebar-main">
      <div className="sidebar-left">Left</div>
      <div className="sidebar-right">
        <div className="sidebar-right_top">
          <FriendsBar />
        </div>
        <div className="sidebar-right_bottom">
          <InvitationsBar />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
