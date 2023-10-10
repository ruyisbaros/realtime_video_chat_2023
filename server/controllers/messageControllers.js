const Message = require("../models/MessageModel");
const Conversation = require("../models/conversationModel");
const User = require("../models/userModel");

const messageCtrl = {
  sendMessage: async (req, res) => {
    try {
      const sender = req.user._id;
      const { message, conversation, recipient } = req.body;

      const newMessage = await Message.create({
        sender,
        message,
        conversation,
        recipient,
      });
      const returnedMessage = await Message.findOne({ _id: newMessage._id })
        .populate("sender", "-password")
        .populate("recipient", "-password");
      // console.log("Returning Message:::: ", returnedMessage);
      res.status(201).json(returnedMessage);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getMessages: async (req, res) => {
    try {
      const { conversation } = req.params;

      const messages = await Message.find({ conversation })
        .populate("sender", "-password")
        .populate("recipient", "-password");
      //console.log("messages: ", messages);
      res.status(200).json(messages);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = messageCtrl;
