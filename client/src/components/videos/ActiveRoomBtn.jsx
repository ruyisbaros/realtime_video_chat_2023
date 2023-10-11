import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeCapitalize } from "../../utils/capitalize";
import { joinActiveRoom } from "../../SocketIOConnection";
import { reduxOpenRoom } from "../../redux/videoSlice";

const ActiveRoomBtn = ({ room }) => {
  const dispatch = useDispatch();
  const { loggedUser } = useSelector((store) => store.currentUser);
  const [isUserInRoom, setIsUserInRoom] = useState(false);

  useEffect(() => {
    const prt = room.participants.find((prt) => prt.userId === loggedUser.id);
    if (prt) {
      setIsUserInRoom(true);
    } else {
      setIsUserInRoom(false);
    }
  }, [loggedUser, room]);
  //console.log(isUserInRoom);

  const handleJoinActiveRoom = () => {
    if (!isUserInRoom && room.participants.length < 3) {
      dispatch(reduxOpenRoom({ isInRoom: true, isCreator: false })); //Room details???reduxRoomDetails(room)
      joinActiveRoom(loggedUser.id, room.roomId);
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
