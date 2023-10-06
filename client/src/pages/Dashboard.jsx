import React, { useRef, useState } from "react";
import Sidebar from "../components/dashBoard/Sidebar";
import Messenger from "./../components/dashBoard/Messenger";

const Dashboard = () => {
  const [openAddFriendBox, setOpenAddFriendBox] = useState(false);
  const [invitedMail, setInvitedMail] = useState("");

  const handleSendInvitation = () => {};
  return (
    <div className={`dash-wrapper ${openAddFriendBox ? "manage-opacity" : ""}`}>
      <Sidebar setOpenAddFriendBox={setOpenAddFriendBox} />
      <Messenger />
      {openAddFriendBox && (
        <div
          className="invite_friend_box"
          onClick={() => setOpenAddFriendBox(false)}
        >
          inviteFriend
        </div>
      )}
    </div>
  );
};

export default Dashboard;
