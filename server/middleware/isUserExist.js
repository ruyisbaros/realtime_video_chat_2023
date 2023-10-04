const User = require("../models/userModel");
exports.isUserExist = async (req, res, next) => {
  const { email, username } = req.body;

  const user1 = await User.findOne({ email });
  if (user1) {
    return res
      .status(500)
      .json({ message: `${email} email address is already in used` });
  }
  const user2 = await User.findOne({ username });
  if (user2) {
    return res
      .status(500)
      .json({ message: `${username} username is already in used` });
  }
  next();
};
