import React, { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import axios from "../../axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { reduxLogout } from "../../redux/currentUserSlice";
const Messenger = () => {
  const dispatch = useDispatch();
  const [showDrop, setShowDrop] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.get("/auth/logout");
      dispatch(reduxLogout());
      window.localStorage.removeItem("registeredUserDiscord");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="messenger-main">
      <header>
        Header
        <button
          className="drop-btn"
          onClick={() => setShowDrop((prev) => !prev)}
        >
          <BsThreeDotsVertical size={20} />
        </button>
        {showDrop && (
          <div className="drop-menu">
            <ul>
              <li onClick={handleLogout}>Logout</li>
            </ul>
          </div>
        )}
      </header>
    </div>
  );
};

export default Messenger;
