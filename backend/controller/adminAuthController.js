const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../model/userModel");
const adminLogin = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD ||
      role !== process.env.ROLE
    ) {
      return res.status(401).json({
        success: false,
        message: "You are not Authorized",
      });
    }
    const payload = { email, role };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "2d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxage: 2 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: "Login Successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const adminLogout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });
    res.status(200).json({
      success: true,
      message: "Logout successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const adminGetAllUser = async (req, res) => {
  try {
    const adminId = req.adminId;
    if (!adminId) {
      return res.status(401).json({
        success: false,
        message: "unauthorized request",
      });
    }
    const allUser = await userModel.find({}, "name email isAccountVerified");

    res.status(200).json({
      success: true,
      data: allUser,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const adminDeleteUser = async (req, res) => {
  try {
    const adminId = req.adminId;
    if (!adminId) {
      return res.status(401).json({
        success: false,
        message: "unauthorized request",
      });
    }
    const userId = req.params.id;
    const data = await userModel.findByIdAndDelete(userId);
    res.status(200).json({
      success: true,
      data: userId,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const checkAuth = async (req, res) => {
  try {
    const adminId = req.adminId;
    if (!adminId) {
      return res.status(401).json({
        success: false,
        message: "unauthorized request",
      });
    }
    res.status(200).json({
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  adminLogin,
  adminLogout,
  adminGetAllUser,
  adminDeleteUser,
  checkAuth,
};
