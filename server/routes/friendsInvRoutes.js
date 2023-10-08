const router = require("express").Router();
const friendsInvCtrl = require("../controllers/friendsInvitationsControllers");
const { protect } = require("../middleware/protect");
router.get("/myFriends", protect, friendsInvCtrl.getMyFriends);
router.get("/invite_friends/:email", protect, friendsInvCtrl.inviteFriend);
router.get("/accept_invite/:email", protect, friendsInvCtrl.acceptInvite);
router.get("/reject_invite/:email", protect, friendsInvCtrl.rejectInvite);
module.exports = router;
