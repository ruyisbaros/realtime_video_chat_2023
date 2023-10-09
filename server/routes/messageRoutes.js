const router = require("express").Router();
const messageCtrl = require("../controllers/messageControllers");
const conversationCtrl = require("../controllers/conversationController");
const { protect } = require("../middleware/protect");
router.get("/get_messages/:conversation", protect, messageCtrl.getMessages);
router.post("/new_conversation", protect, conversationCtrl.create_open);
router.post("/new_message", protect, messageCtrl.sendMessage);

module.exports = router;
