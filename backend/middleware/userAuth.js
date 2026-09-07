const jwt = require("jsonwebtoken");

const userAuth = async (req, res, next) => {
  try {
    // 1. Get the token from the cookies (req.cookies.token)
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not Authorized. Please login again.",
      });
    }

    // Note: You might need to install and use the 'cookie-parser' package in your server.js for this to work!
    // 2. If the token doesn't exist, return a 401 (Unauthorized) error
    // 3. Verify the token using jwt.verify() and your JWT_SECRET
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    // 4. If the token is valid, it will return the decoded payload (which has the user's id)
    if (decodedToken.id) {
      req.userId = decodedToken.id;
    } else {
      return res.status(401).json({
        success: false,
        message: "Not Authorized. Please login again.",
      });
    }
    // Attach that id to the request object, like this: req.userId = decoded.id;
    // 5. Call next() to pass control to the actual route handler!
    next();
  } catch (error) {
    // 6. If jwt.verify() fails (e.g., token is expired or fake), it will throw an error.
    // Catch it here and return a 401 (Unauthorized) error.
    res.status(401).json({
      success: false,
      message: "Token is invalid or expired. Please login again.",
    });
  }
};

module.exports = userAuth;
