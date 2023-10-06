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
      <div className="inviter" data-mail={inv.senderInfo.email}>
        <div className="inviter-picture">
          <img
            src="https://res.cloudinary.com/dmhcnhtng/image/upload/v1643044376/avatars/default_pic_jeaybr.png"
            alt=""
          />
        </div>
        <div className="inviter-name ">{inv.senderInfo.name}</div>
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
