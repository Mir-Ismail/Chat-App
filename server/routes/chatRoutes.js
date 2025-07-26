const express = require("express");
const {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  removeFromGroup,
  addToGroup,
} = require("../controllers/chatControllers.js");
const { protect } = require("../middleware/authMiddleware.js");

const router = express.Router();

// Access or create one-to-one chat
router.route("/").post(protect, accessChat);

// Fetch all chats for a user
router.route("/").get(protect, fetchChats);

// Create a group chat
router.route("/group").post(protect, createGroupChat);

// Rename a group chat
router.route("/rename").put(protect, renameGroup);

// Remove a user from group
router.route("/groupremove").put(protect, removeFromGroup);

// Add a user to group
router.route("/groupadd").put(protect, addToGroup);

module.exports = router;
