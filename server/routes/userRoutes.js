const express = require("express");
const {
  registerUser,
  authUser,
  allusers,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/login").post(authUser);
router.route("/").get(protect, allusers);
router.post("/register", registerUser);

module.exports = router;
