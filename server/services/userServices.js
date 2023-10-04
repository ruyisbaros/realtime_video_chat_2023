const User = require("../models/userModel");
exports.findUser = async (username, email) => {
  if (email) {
    return await User.findOne({ email: email.toLowerCase() });
  } else if (username) {
    return await User.findOne({ username: username.toLowerCase() });
  }
};
