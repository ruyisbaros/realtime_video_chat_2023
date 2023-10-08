const router = require("express").Router();
const friendsInvCtrl = require("../controllers/friendsInvitationsControllers");
const { isUserExist } = require("../middleware/isUserExist");
const { protect } = require("../middleware/protect");
router.get("/myFriends", protect, friendsInvCtrl.getMyFriends);
router.get("/invite_friends/:email", protect, friendsInvCtrl.inviteFriend);
module.exports = router;
