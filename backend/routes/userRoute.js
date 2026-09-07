const express = require("express");
const {
  getUserProfile,
  updateUserProfile,
  getStreak,
  updateStreak,
} = require("../controller/userController");
const userAuth = require("../middleware/userAuth");

const userRouter = express.Router();

// 🚨 Both of these routes require the user to be logged in!
// So we protect them with the userAuth middleware.

userRouter.get("/profile", userAuth, getUserProfile);
userRouter.put("/profile", userAuth, updateUserProfile);
userRouter.get("/streak", userAuth, getStreak);
userRouter.put("/streak", userAuth, updateStreak);

module.exports = userRouter;
