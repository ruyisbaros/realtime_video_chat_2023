import React, { useCallback, useEffect, useState } from "react";
import InvitationsBar from "./InvitationsBar";
import FriendsBar from "./FriendsBar";
import { IoIosPeople } from "react-icons/io";
import { MdCreateNewFolder } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { reduxOpenRoom } from "../../redux/videoSlice";
import { emitActiveRooms, openCreateNewRoom } from "../../SocketIOConnection";
import ActiveRoomBtn from "../videos/ActiveRoomBtn";

const Sidebar = ({ setOpenAddFriendBox, setMessagesStatus }) => {
  const dispatch = useDispatch();
  const { loggedUser } = useSelector((store) => store.currentUser);
  const { activeRooms, isUserInRoom } = useSelector((store) => store.videos);
  const { myFriends } = useSelector((store) => store.friends);
  const [rooms, setRooms] = useState([]);

  const createNewRoom = async () => {
    dispatch(reduxOpenRoom({ isInRoom: true, isCreator: true }));
    openCreateNewRoom(loggedUser);
    emitActiveRooms(); //This id will be set
  };

  useEffect(() => {
    const item = myFriends.map((fr) =>
      activeRooms.filter((rm) => rm.roomCreator.userId === fr._id)
    );
    if (item) {
      setRooms(...item);
    }
  }, [activeRooms, myFriends]);
  console.log(rooms);
  return (
    <div className="sidebar-main">
      <div className="sidebar-left">
        <button className="group-icon-btn">
          <IoIosPeople size={20} />
        </button>
        <button className="create-room-icon-btn" onClick={createNewRoom}>
          <MdCreateNewFolder size={20} />
        </button>
        {rooms.length > 0 &&
          rooms.map((rm) => <ActiveRoomBtn key={rm.roomId} room={rm} />)}
      </div>
      <div className="sidebar-right">
        <div className="sidebar-right_top">
          <FriendsBar
            setOpenAddFriendBox={setOpenAddFriendBox}
            setMessagesStatus={setMessagesStatus}
          />
        </div>
        <div className="sidebar-right_bottom">
          <InvitationsBar />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
