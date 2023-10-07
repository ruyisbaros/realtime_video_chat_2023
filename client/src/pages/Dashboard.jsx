import React, { useCallback, useEffect, useState } from "react";
import Sidebar from "../components/dashBoard/Sidebar";
import Messenger from "./../components/dashBoard/Messenger";
import { VscChromeClose } from "react-icons/vsc";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import axios from "../axios";
import { reduxMakeTokenExpired } from "../redux/currentUserSlice";
import { reduxFetchMyFriends } from "../redux/FriendsSlice";
import { reduxFetchMyInvitations } from "../redux/invitationsSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const [openAddFriendBox, setOpenAddFriendBox] = useState(false);
  const [invitedMail, setInvitedMail] = useState("");

  const fetchMyFriendsAndInvitations = useCallback(async () => {
    try {
      const { data } = await axios.get("/friends/myFriends");
      console.log(data);

      dispatch(reduxFetchMyFriends(data?.friends));
      dispatch(reduxFetchMyInvitations(data?.invitations));
    } catch (error) {
      if (error.response.data.message === "jwt expired") {
        dispatch(reduxMakeTokenExpired());
      } else {
        toast.error(error.response.data.message);
      }
    }
  }, [dispatch]);

  useEffect(() => {
    fetchMyFriendsAndInvitations();
  }, [fetchMyFriendsAndInvitations]);

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
