const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: ObjectId,
      ref: "User",
    },
    recipient: {
      type: ObjectId,
      ref: "User",
    },
    message: {
      type: String,
    },
    conversation: {
      type: ObjectId,
      ref: "Conversation",
    },
    sameSender: {
      type: Boolean,
      default: false,
    },
    sameDay: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, collection: "messages" }
);

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
