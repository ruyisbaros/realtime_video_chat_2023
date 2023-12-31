import React, { useCallback, useEffect, useState } from "react";
import InvitationsBar from "./InvitationsBar";
import FriendsBar from "./FriendsBar";
import { IoIosPeople } from "react-icons/io";
import { MdCreateNewFolder } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { emitActiveRooms, openCreateNewRoom } from "../../SocketIOConnection";
import ActiveRoomBtn from "../videos/ActiveRoomBtn";
import { getLocalStreamPreview } from "../videos/WebRTCHandler";

const Sidebar = ({ setOpenAddFriendBox, setMessagesStatus }) => {
  const dispatch = useDispatch();
  const { loggedUser } = useSelector((store) => store.currentUser);
  const { activeRooms, audioOnly } = useSelector((store) => store.videos);
  const { myFriends } = useSelector((store) => store.friends);
  const [rooms, setRooms] = useState([]);

  const createNewRoom = async () => {
    const successCallBackFunc = () => {
      openCreateNewRoom(loggedUser);
      emitActiveRooms();
    };

    getLocalStreamPreview(audioOnly, successCallBackFunc);
  };

  useEffect(() => {
    if (activeRooms.length > 0) {
      const item = myFriends.map((fr) =>
        activeRooms.filter((rm) =>
          rm.participants.find((prt) => prt.userId === fr._id)
        )
      );
      //console.log(item);
      if (item) {
        setRooms(...item);
      }
    } else {
      setRooms([]);
    }
  }, [activeRooms, myFriends]);
  //console.log(rooms);
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
