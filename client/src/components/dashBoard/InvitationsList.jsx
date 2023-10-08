import React from "react";

const InvitationsList = ({ inv }) => {
  const acceptInvitation = async () => {
    console.log("ok");
  };
  const rejectInvitation = async () => {
    console.log("not ok");
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
            Accept
          </button>
          <button className="invite-reject" onClick={rejectInvitation}>
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvitationsList;
