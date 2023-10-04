const User = require("./models/userModel");
let users = [];
exports.socketServer = (socket, io) => {
  console.log(`User with ${socket.id} connected`);
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
    socket.broadcast.emit("offlineUsers", user?.id);
  });
};
