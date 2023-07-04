const express = require("express");
const {
    authController,
    getUserProfile,
    registerUser
} = require("../controllers/usersController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();


//user registration
router.route("/").post(registerUser);

//post email and password auth
router.route("/login").post(authController);


//get user profile Private Route
router.route("/profile").get(protect, getUserProfile);

module.exports = router;