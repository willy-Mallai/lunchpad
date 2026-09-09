const express = require("express");
const {
  adminLogin,
  adminLogout,
  adminGetAllUser,
  adminDeleteUser,
  checkAuth,
} = require("../controller/adminAuthController");
const adminAuth = require("../middleware/adminAuth");
const adminRouter = express.Router();

adminRouter.post("/login", adminLogin);
adminRouter.post("/logout", adminLogout);
adminRouter.get("/get-user", adminAuth, adminGetAllUser);
adminRouter.delete("/delete-user/:id", adminAuth, adminDeleteUser);
adminRouter.get("/check-auth", adminAuth, checkAuth);

module.exports = adminRouter;
