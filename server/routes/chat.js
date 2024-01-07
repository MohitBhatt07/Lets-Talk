const express = require("express");
const Auth = require("../middlewares/user.js");
const router = express.Router();
const {
  accessChats,
  createGroup,
  renameGroup,
  fetchAllChats,
  addToGroup,
  removeFromGroup,
} = require("../controllers/chatControllers.js");

router.post("/", Auth, accessChats);
router.get("/", Auth, fetchAllChats);
router.post("/group", Auth, createGroup);
router.patch("/group/rename", Auth, renameGroup);
router.patch("/groupAdd", Auth, addToGroup);
router.patch("/groupRemove", Auth, removeFromGroup);
router.delete("/removeuser", Auth);


module.exports = router;
