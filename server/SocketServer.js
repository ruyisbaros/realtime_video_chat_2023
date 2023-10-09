const User = require("./models/userModel");
let users = [];
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
    socket.broadcast.emit("user got offline", user?.id);
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
    socket.broadcast.emit("user got offline", user?.id);
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
    console.log(user);
    if (user) {
      //console.log(user);
      socket.to(`${user.socketId}`).emit("invitation accepted", accepter);
    }
  });

  socket.on("new message", ({ msg, id }) => {
    const user = users.find((u) => String(u.id) === String(id));
    console.log(user);
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
};
