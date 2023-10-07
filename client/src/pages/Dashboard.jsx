import React, { useState } from "react";
import Sidebar from "../components/dashBoard/Sidebar";
import Messenger from "./../components/dashBoard/Messenger";
import { VscChromeClose } from "react-icons/vsc";

const Dashboard = () => {
  const [openAddFriendBox, setOpenAddFriendBox] = useState(false);
  const [invitedMail, setInvitedMail] = useState("");

  const handleSendInvitation = () => {};
  return (
    <>
      <div
        className={`dash-wrapper ${openAddFriendBox ? "manage-opacity" : ""}`}
      >
        <Sidebar setOpenAddFriendBox={setOpenAddFriendBox} />
        <Messenger />
      </div>
      {openAddFriendBox && (
        <div className="invite_friend_box">
          <div className="invite_friend_content">
            <h2>Invite a Friend</h2>
            <p>Enter e-mail address of a user which you would like to invite</p>
            <input
              type="email"
              value={invitedMail}
              onChange={(e) => setInvitedMail(e.target.value)}
              placeholder="Type the email address correctly"
            />
            <button
              className="send_invitation_btn"
              disabled={!invitedMail}
              onClick={handleSendInvitation}
            >
              Send
            </button>
            <span
              className="close_dialog"
              onClick={() => setOpenAddFriendBox(false)}
            >
              <VscChromeClose color="#fff" />
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
