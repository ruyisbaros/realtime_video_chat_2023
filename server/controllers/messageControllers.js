const Message = require("../models/MessageModel");
const Conversation = require("../models/conversationModel");
const User = require("../models/userModel");

const messageCtrl = {
  sendMessage: async (req, res) => {
    try {
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getMessages: async (req, res) => {
    try {
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = messageCtrl;
