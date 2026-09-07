const express = require("express");
const userAuth = require("../middleware/userAuth.js");
const {
  register,
  login,
  logout,
  sendVerfyOtp,
  verifyEmail,
  isAuthenticated,
  sendResetOtp,
  resetPassword,
} = require("../controller/authController");
const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.post("/send-otp", userAuth, sendVerfyOtp);
authRouter.post("/verify-email", verifyEmail);
authRouter.get("/authenticated", userAuth, isAuthenticated); // Fixed typo and changed to GET

// Password Reset Routes
authRouter.post("/send-reset-otp", sendResetOtp);
authRouter.post("/reset-password", resetPassword);

module.exports = authRouter;
