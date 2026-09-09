const jwt = require("jsonwebtoken");

const adminAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not Authorized. Please login again.",
      });
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (decodedToken.role !== "admin") {
      return res.status(401).json({
        success: false,
        message: "Not Authorized. ",
      });
    }
    req.adminId = decodedToken.role;
    next();
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = adminAuth;
