import React, { useCallback, useEffect, useState } from "react";
import Sidebar from "../components/dashBoard/Sidebar";
import Messenger from "./../components/dashBoard/Messenger";
import { VscChromeClose } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "../axios";
import { PulseLoader } from "react-spinners";
import { reduxLogout } from "../redux/currentUserSlice";
import { reduxFetchMyFriends } from "../redux/FriendsSlice";
import { reduxFetchMyInvitations } from "../redux/invitationsSlice";
import { inviteFriend } from "../SocketIOConnection";
import Room from "../components/videos/Room";

const Dashboard = () => {
  const dispatch = useDispatch();
  const [openAddFriendBox, setOpenAddFriendBox] = useState(false);
  const [invitedMail, setInvitedMail] = useState("");
  const [status, setStatus] = useState(false);
  const [messagesStatus, setMessagesStatus] = useState(false);
  const { loggedUser } = useSelector((store) => store.currentUser);
  const { isUserInRoom } = useSelector((store) => store.videos);

  const fetchMyFriendsAndInvitations = useCallback(async () => {
    try {
      const { data } = await axios.get("/friends/myFriends");
      console.log(data);

      dispatch(reduxFetchMyFriends(data?.friends));
      window.localStorage.setItem(
        "friendsDiscord",
        JSON.stringify(data?.friends)
      );
      dispatch(reduxFetchMyInvitations(data?.invitations));
      window.localStorage.setItem(
        "invitationsDiscord",
        JSON.stringify(data?.invitations)
      );
    } catch (error) {
      if (error.response.data.message === "jwt expired") {
        dispatch(reduxLogout());
      } else {
        toast.error(error.response.data.message);
      }
    }
  }, [dispatch]);

  useEffect(() => {
    if (loggedUser) {
      fetchMyFriendsAndInvitations();
    }
  }, [fetchMyFriendsAndInvitations, loggedUser]);

  const handleSendInvitation = async () => {
    try {
      setStatus(true);
      const { data } = await axios.get(
        `/friends/invite_friends/${invitedMail}`
      );
      console.log(data);
      //Socket emit
      inviteFriend({
        invitedMail: invitedMail,
        inviterUser: loggedUser,
      });
      setStatus(false);
      toast.success(data?.message);
      setOpenAddFriendBox(false);
    } catch (error) {
      setStatus(false);
      toast.error(error.response.data.message);
    }
  };
  return (
    <>
      <div
        className={`dash-wrapper ${openAddFriendBox ? "manage-opacity" : ""}`}
      >
        <Sidebar
          setOpenAddFriendBox={setOpenAddFriendBox}
          setMessagesStatus={setMessagesStatus}
        />
        <Messenger messagesStatus={messagesStatus} />
        {isUserInRoom && <Room />}
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
              {status ? <PulseLoader color="#fff" size={14} /> : "Send"}
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
