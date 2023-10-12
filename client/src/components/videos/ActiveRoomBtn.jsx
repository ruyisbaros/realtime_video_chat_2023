import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeCapitalize } from "../../utils/capitalize";
import { joinActiveRoom } from "../../SocketIOConnection";
import { reduxOpenRoom } from "../../redux/videoSlice";
import { getLocalStreamPreview } from "./WebRTCHandler";

const ActiveRoomBtn = ({ room }) => {
  const dispatch = useDispatch();
  const { loggedUser } = useSelector((store) => store.currentUser);
  const { activeRooms, audioOnly } = useSelector((store) => store.videos);
  const [isUserInRoom, setIsUserInRoom] = useState(false);

  useEffect(() => {
    const prt = room.participants.find((prt) => prt.userId === loggedUser.id);
    if (prt) {
      setIsUserInRoom(true);
    } else {
      setIsUserInRoom(false);
    }
  }, [loggedUser, activeRooms, room.participants]);
  //console.log(isUserInRoom);

  const handleJoinActiveRoom = () => {
    if (!isUserInRoom && room.participants.length < 3) {
      const successCallBackFunc = () => {
        joinActiveRoom(loggedUser.id, room.roomId);
      };
      getLocalStreamPreview(audioOnly, successCallBackFunc);
    }
  };

  return (
    <button
      data-info={`Creator: ${makeCapitalize(
        room.roomCreator.name
      )}. Amount of participants: ${room.participants.length}`}
      className="my-rooms-btn"
      disabled={isUserInRoom || room.participants.length > 3}
      onClick={handleJoinActiveRoom}
    >
      <img src={room.roomCreator.picture} alt="" className="my-rooms-img" />
    </button>
  );
};

export default ActiveRoomBtn;
