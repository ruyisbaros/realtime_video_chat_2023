const User = require("../models/userModel");

const friendsInvCtrl = {
  getMyFriends: async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.user._id })
        .populate("friends", "-password")
        .populate("invitations", "-password");
      if (!user) {
        return res.status(500).json({ message: "You should sign in!" });
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
      const { email } = req.params;
      const invitedUser = await User.findOne({ email });
      if (!invitedUser) {
        return res
          .status(500)
          .json({ message: `No user found with ${email} email!` });
      }
      //1.) Check if he/she is already in friend list
      const includes = await User.findOne({
        friends: { $in: [invitedUser._id] },
      });
      if (includes) {
        return res.status(500).json({
          message: `User with ${email} emailId already in your friend list!`,
        });
      }
      //2.) Push me his/her invitations list
      await invitedUser.updateOne({ $push: { invitations: req.user._id } });

      res.status(200).json({ message: "Your invite has been sent!" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  acceptInvite: async (req, res) => {
    try {
      const { email } = req.params;
      const acceptedUser = await User.findOne({ email });
      if (!acceptedUser) {
        return res
          .status(500)
          .json({ message: `No user found with ${email} email!` });
      }
      //1.) Push me his/her friend list
      await acceptedUser.updateOne({ $push: { friends: req.user._id } });
      //2.) Remove him/her from my invitations list
      await User.findByIdAndUpdate(
        { _id: req.user._id },
        { $pull: { invitations: acceptedUser._id } }
      );
      //3.) Push him/her to my friend list
      await User.findByIdAndUpdate(
        { _id: req.user._id },
        { friends: acceptedUser._id }
      );

      res.status(200).json({
        user: acceptedUser,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  rejectInvite: async (req, res) => {
    try {
      const { email } = req.params;
      const rejectedUser = await User.findOne({ email });
      if (!rejectedUser) {
        return res
          .status(500)
          .json({ message: `No user found with ${email} email!` });
      }
      //Remove him/her from my invitations list
      await User.findByIdAndUpdate(
        { _id: req.user._id },
        {
          $pull: { invitations: rejectedUser._id },
        }
      );
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = friendsInvCtrl;
