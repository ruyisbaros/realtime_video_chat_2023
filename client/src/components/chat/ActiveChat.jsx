import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reduxGetMyMessages, reduxSetChattedUser } from "../../redux/chatSlice";
import { CircleLoader } from "react-spinners";
import { toast } from "react-toastify";
import axios from "../../axios";
import ChatMessages from "./ChatMessages";
import ChatActions from "./ChatActions";

const ActiveChat = ({ messagesStatus }) => {
  const dispatch = useDispatch();
  const { activeConversation, chattedUser } = useSelector(
    (store) => store.messages
  );
  const { loggedUser } = useSelector((store) => store.currentUser);

  useEffect(() => {
    const usr = activeConversation.users.find(
      (usr) => usr._id !== loggedUser.id
    );
    dispatch(reduxSetChattedUser(usr));
  }, [activeConversation, loggedUser, dispatch]);

  const fetchRelevantMessages = useCallback(async () => {
    try {
      const { data } = await axios.get(
        `/messages/get_messages/${activeConversation?._id}`
      );
      console.log(data);
      dispatch(reduxGetMyMessages(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }, [dispatch, activeConversation]);

  useEffect(() => {
    fetchRelevantMessages();
  }, [fetchRelevantMessages]);

  return (
    <div className="active_chat_main">
      <ChatMessages />
      <ChatActions />
      {messagesStatus && (
        <div className="active_loading">
          <CircleLoader color="#36d7b7" />
        </div>
      )}
    </div>
  );
};

export default ActiveChat;
