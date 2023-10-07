import React from "react";
import InvitationsList from "./InvitationsList";

const InvitationsBar = () => {
  const dummyInvitations = [
    {
      _id: 1,
      senderInfo: {
        name: "Hulya",
        email: "h@a.com",
      },
    },
    {
      _id: 2,
      senderInfo: {
        name: "Saver",
        email: "s@a.com",
      },
    },
  ];
  return (
    <div className="invitations-container">
      <h2>Invitations</h2>
      {dummyInvitations.map((inv) => (
        <InvitationsList key={inv._id} inv={inv} />
      ))}
    </div>
  );
};

export default InvitationsBar;
