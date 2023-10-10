const ConversationModel = require("../models/conversationModel");

exports.isConversationExist = async (sId, rId) => {
  let conversation = await ConversationModel.findOne({
    isGroup: false,
    $and: [
      { users: { $elemMatch: { $eq: sId } } },
      { users: { $elemMatch: { $eq: rId } } },
    ],
  }).populate("users", "-password");

  return conversation;
};

//Another way with mongo
exports.isConversationExist2 = async (sId, rId) => {
  let conversation = await ConversationModel.findOne({
    isGroup: false,
    users: { $all: [sId, rId] },
  }).populate("users", "-password");

  return conversation;
};
