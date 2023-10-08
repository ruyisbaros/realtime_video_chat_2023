import React from "react";
import InvitationsList from "./InvitationsList";
import { useSelector } from "react-redux";

const InvitationsBar = () => {
  const { myInvitations } = useSelector((store) => store.invitations);
  return (
    <div className="invitations-container">
      <h2>Invitations</h2>
      {myInvitations.length > 0 &&
        myInvitations.map((inv) => <InvitationsList key={inv._id} inv={inv} />)}
    </div>
  );
};

export default InvitationsBar;
