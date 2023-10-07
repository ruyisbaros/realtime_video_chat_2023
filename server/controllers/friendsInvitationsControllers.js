const User = require("../models/userModel");

const friendsInvCtrl = {
  getMyFriends: async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.user._id });
      if (!user) {
        res.status(500).json({ message: "You should sign in!" });
      }
      res
        .status(200)
        .json({ friends: user.friends, invitations: user.invitations });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  inviteFriend: async (req, res) => {
    try {
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  acceptInvite: async (req, res) => {
    try {
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  rejectInvite: async (req, res) => {
    try {
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = friendsInvCtrl;
