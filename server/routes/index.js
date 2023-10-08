const authRoutes = require("./authRoutes");
const healthRoutes = require("./healthRoutes");
const friendsRoutes = require("./friendsInvRoutes");
const messagesRoutes = require("./messageRoutes");

const routes = {
  authRoutes,
  healthRoutes,
  friendsRoutes,
  messagesRoutes,
};

module.exports = routes;
