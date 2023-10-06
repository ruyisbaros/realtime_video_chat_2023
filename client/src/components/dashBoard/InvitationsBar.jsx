import React from "react";
import InvitationsList from "./InvitationsList";

const InvitationsBar = () => {
  return (
    <div className="invitations-container">
      <h2>Invitations</h2>
      <InvitationsList />
    </div>
  );
};

export default InvitationsBar;
