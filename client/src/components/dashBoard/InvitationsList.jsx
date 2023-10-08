import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "../../axios";
import { PulseLoader } from "react-spinners";
import { reduxRemoveMyInvitations } from "../../redux/invitationsSlice";
import { reduxAddMyFriends } from "../../redux/FriendsSlice";

const InvitationsList = ({ inv }) => {
  const dispatch = useDispatch();
  const { loggedUser } = useSelector((store) => store.currentUser);
  const { socket } = useSelector((store) => store.sockets);
  const [statusAccept, setStatusAccept] = useState(false);
  const [statusReject, setStatusReject] = useState(false);

  const acceptInvitation = async () => {
    try {
      setStatusAccept(true);
      const { data } = await axios.get(`/friends/accept_invite/${inv.email}`);
      setStatusAccept(false);
      console.log(data);
      //Emit socket action
      socket.emit("invitation accepted", {
        id: inv.id,
        accepter: loggedUser,
      });
      //update redux store
      dispatch(reduxRemoveMyInvitations(inv.id));
      dispatch(reduxAddMyFriends(data.user));
    } catch (error) {
      setStatusAccept(false);
      toast.error(error.response.data.message);
    }
  };
  const rejectInvitation = async () => {
    try {
      setStatusReject(true);
      const { data } = await axios.get(`/friends/reject_invite/${inv.email}`);
      setStatusReject(false);
      console.log(data);
      //update redux store
      dispatch(reduxRemoveMyInvitations(inv._id));
    } catch (error) {
      setStatusReject(false);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="my_invitations">
      <div className="inviter" data-mail={inv.email}>
        <div className="inviter-picture">
          <img src={inv.picture} alt="" />
        </div>
        <div className="inviter-name ">{inv.name.slice(0, 10)}...</div>
        <div className="decision-buttons">
          <button className="invite-accept" onClick={acceptInvitation}>
            {statusAccept ? <PulseLoader color="#fff" size={8} /> : "Accept"}
          </button>
          <button className="invite-reject" onClick={rejectInvitation}>
            {statusReject ? <PulseLoader color="#fff" size={8} /> : "Reject"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvitationsList;
