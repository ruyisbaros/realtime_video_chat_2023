const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const conversationSchema = new mongoose.Schema(
  {
    isGroup: {
      type: Boolean,
      required: true,
      default: false,
    },
    users: [
      {
        type: ObjectId,
        ref: "User",
      },
    ],

    admin: {
      type: ObjectId,
      ref: "User",
    },
  },
  { timestamps: true, collection: "conversations" }
);

const Conversation = mongoose.model("Conversation", conversationSchema);

module.exports = Conversation;
