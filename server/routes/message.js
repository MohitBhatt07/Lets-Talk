const Auth = require('../middlewares/user.js');
const express = require('express');
const router = express.Router();
const {sendMessage, getMessages} = require("../controllers/messageControllers.js");

router.post("/", Auth, sendMessage);
router.get("/:chatId", Auth, getMessages);


module.exports = router;