import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { makeCapitalize } from "../../utils/capitalize";

const ActiveRoomBtn = ({ room }) => {
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
  console.log(isUserInRoom);

  const handleJoinActiveRoom = () => {
    if (!isUserInRoom && room.participants.length < 3) {
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
