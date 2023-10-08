import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reduxSetChattedUser } from "../../redux/chatSlice";

const ActiveChat = ({ messagesStatus }) => {
  const dispatch = useDispatch();
  const { activeConversation } = useSelector((store) => store.messages);
  const { loggedUser } = useSelector((store) => store.currentUser);
  useEffect(() => {
    const usr = activeConversation.users.find(
      (usr) => usr._id !== loggedUser.id
    );
    dispatch(reduxSetChattedUser(usr));
  }, [activeConversation, loggedUser, dispatch]);
  return <div>ActiveChat</div>;
};

export default ActiveChat;
