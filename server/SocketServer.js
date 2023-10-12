const User = require("./models/userModel");
const { v4: uuidv4 } = require("uuid");
let users = [];
let activeRooms = [];
exports.socketServer = (socket, io) => {
  console.log(`User with ${socket.id} connected`);
  //User status listen
  //Join User (Online)
  socket.on("joinUser", (id) => {
    const user = users.find((user) => user.id === id);
    if (!user) {
      users.push({ id, socketId: socket.id });
      socket.broadcast.emit("onlineUsers", users);
    }
    socket.emit("setup socketId", socket.id);
    console.log(users);
  });

  socket.on("disconnect", async () => {
    const user = users.find((u) => u.socketId === socket.id);
    users = users.filter((user) => user.socketId !== socket.id);
    //console.log(users);
    //console.log(user);
    const date = new Date();
    if (user) {
      await User.findByIdAndUpdate(user.id, {
        lastSeen: date,
      });
    }
    io.emit("user got offline", user?.id);
    //Check for active rooms
    activeRooms.forEach((rooms) => {
      const userInRoom = rooms.participants.some(
        (prt) => prt.socketId === socket.id
      );
      if (userInRoom) {
        rooms.participants = rooms.participants.filter(
          (prt) => prt.socketId !== socket.id
        );
      }
    });
    io.emit("leave from room", activeRooms);
  });
  socket.on("logout", async (id) => {
    const user = users.find((u) => u.id === id);
    users = users.filter((user) => user.socketId !== socket.id);
    //console.log(users);
    //console.log(user);
    const date = new Date();
    if (user) {
      await User.findByIdAndUpdate(user.id, {
        lastSeen: date,
      });
    }
    io.emit("user got offline", user?.id);
  });

  //Users invitations actions listen
  socket.on("invite friend", async ({ invitedMail, inviterUser }) => {
    //console.log(invitedMail, inviterUser);
    const invitedUser = await User.findOne({ email: invitedMail });
    //console.log(String(invitedUser._id));
    const user = users.find((u) => String(u.id) === String(invitedUser._id));
    //console.log(user);
    if (user) {
      //console.log(user);
      socket.to(`${user.socketId}`).emit("got invitation", inviterUser);
    }
  });
  socket.on("invitation accepted", ({ id, accepter }) => {
    const user = users.find((u) => String(u.id) === String(id));
    //console.log(user);
    if (user) {
      //console.log(user);
      socket.to(`${user.socketId}`).emit("invitation accepted", accepter);
    }
  });
  //Users chat actions listen
  socket.on("new message", ({ msg, id }) => {
    const user = users.find((u) => String(u.id) === String(id));
    //console.log(user);
    if (user) {
      //console.log(user);
      socket.to(`${user.socketId}`).emit("new message", msg);
    }
  });

  socket.on("typing", ({ chattedId, activeConversation }) => {
    const user = users.find((u) => String(u.id) === String(chattedId));
    if (user) {
      //console.log(user);
      socket
        .to(`${user.socketId}`)
        .emit("openTypingToClient", activeConversation);
    }
  });
  socket.on("stop typing", ({ chattedId, activeConversation }) => {
    const user = users.find((u) => String(u.id) === String(chattedId));
    if (user) {
      //console.log(user);
      socket
        .to(`${user.socketId}`)
        .emit("closeTypingToClient", activeConversation);
    }
  });

  //Calls Videos actions listen
  //1.) Rooms events
  socket.on("create room", (user) => {
    const usr = activeRooms.find((rm) => rm.roomCreator.userId === user.id);
    //console.log(usr);
    if (!usr) {
      const newActiveRoom = {
        roomCreator: {
          userId: user.id,
          name: user.name,
          picture: user.picture,
          socketId: socket.id,
        },
        participants: [
          {
            userId: user.id,
            socketId: socket.id,
          },
        ],
        roomId: uuidv4(),
      };
      activeRooms.push(newActiveRoom);
      io.emit("created new room", newActiveRoom);
    }
  });

  socket.on("emit active rooms", (id) => {
    if (id) {
      const user = users.find((u) => String(u.id) === String(id));
      socket.to(`${user.socketId}`).emit("emit active rooms", activeRooms);
    } else {
      io.emit("get active rooms", activeRooms);
    }
  });

  socket.on("join active room", ({ userId, roomId }) => {
    const room = activeRooms.find((rm) => rm.roomId === roomId);
    const user = room.participants.find((prt) => prt.userId === userId);
    if (!user) {
      activeRooms.forEach((rm) => {
        if (rm.roomId === roomId) {
          rm.participants.push({ userId, socketId: socket.id });
        }
      });
    }
    io.emit("updated rooms", activeRooms);
  });

  socket.on("leave from room", ({ userId, roomId }) => {
    let room = activeRooms.find((rm) => rm.roomId === roomId);
    room.participants = room.participants.filter(
      (prt) => prt.userId !== userId
    );

    activeRooms = activeRooms.map((rm) => {
      if (rm.roomId === roomId) {
        return room;
      } else {
        return rm;
      }
    });
    io.emit("leave from room", activeRooms);
  });

  socket.on("close the room", (roomId) => {
    activeRooms = activeRooms.filter((rm) => rm.roomId !== roomId);
    io.emit("close the room", activeRooms);
  });

  //2.) Video streams events
  socket.on("conn-prepare", ({ userId, roomId }) => {
    const room = activeRooms.find((rm) => rm.roomId === roomId);
    const user = room.participants.find((prt) => prt.userId === userId);
    room.participants.length > 0 &&
      room.participants.forEach((prt) => {
        if (prt.socketId !== user.socketId) {
          //to not myself!
          socket.to(`${prt.socketId}`).emit("conn-prepare", user?.socketId);
        }
      });
  });
};
