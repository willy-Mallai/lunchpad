const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../model/userModel");
const {
  sendVerifyOtpEmail,
  sendResetOtpEmail,
} = require("../services/emailService");

const register = async (req, res) => {
  try {
    // 1. Extract name, email, and password from req.body
    const { name, email, password } = req.body;

    // 2. Validate that all required fields are provided
    if (!name || !email || !password) {
      return res.status(403).json({
        success: false,
        message: "Fill the required Field",
      });
    }

    // 3. Check if a user with this email already exists in the database
    const user = await userModel.findOne({ email });

    // 4. If they do exist, return an error (e.g., "User already exists")
    if (user) {
      return res.status(403).json({
        success: false,
        message: "User already exists",
      });
    }

    // 5. Hash the password using bcrypt.hash()
    const hashedPassword = await bcrypt.hash(password, 10);

    // 6. Create a new user instance using your userModel and the hashed password
    const newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    // 8. Generate a JWT token using the new user's ID
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // 9. Set the token as an httpOnly cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // 10. Return a success response
    res.status(201).json({
      success: true,
      message: "Register Successfully",
      email: newUser.email,
    });
  } catch (error) {
    // 11. Catch any server errors and return a 500 status
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    // 1. Extract email and password from req.body
    const { email, password } = req.body;

    // 2. Validate that both email and password are provided
    if (!email || !password) {
      return res.status(403).json({
        success: false,
        message: "Fill the required Fields",
      });
    }

    // 3. Find the user in the database by their email (remember to await!)
    const user = await userModel.findOne({ email });

    // 4. If the user does NOT exist, return an error (e.g., "Invalid credentials")
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credential",
      });
    }

    // 5. Use bcrypt.compare(providedPassword, user.password) to check if passwords match
    const isMatch = await bcrypt.compare(password, user.password);

    // 6. If passwords do NOT match, return an error
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // 7. Generate a JWT token using the user's ID
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // 8. Set the token as an httpOnly cookie (exactly like you did in register)
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    // 9. Return a success response (you can send back the user's name and email too!)
    res.status(200).json({
      success: true,
      message: "Login Successfully",
      email: user.email,
      name: user.name,
      isAccountVerified: user.isAccountVerified,
    });
  } catch (error) {
    // 10. Catch any server errors and return a 500 status
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const logout = async (req, res) => {
  try {
    // 1. Clear the token cookie using res.clearCookie()
    // Make sure to pass the EXACT same options (httpOnly, secure, sameSite) you used when creating it!
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });

    // 2. Return a success response with a 200 (OK) status code
    res.status(200).json({
      success: true,
      message: "Logout successfully",
    });
  } catch (error) {
    // 3. Catch any server errors and return a 500 status code
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const sendVerfyOtp = async (req, res) => {
  try {
    // 1. Get the user's email from req.body (or req.userId if this route uses your auth middleware)
    const userId = req.userId;

    // 2. Find the user in the database
    const user = await userModel.findById(userId);

    // 3. If user doesn't exist, return an error
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid Users",
      });
    }

    // 4. If user.isAccountVerified is already true, return an error (e.g., "Account already verified")
    if (user.isAccountVerified === true) {
      return res.status(401).json({
        success: false,
        message: "Account already verified",
      });
    }
    // 5. Generate a random 6-digit OTP
    // Example: const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otp = await Math.floor(100000 + Math.random() * 900000).toString();
    // 6. Save the OTP and its expiration time to the user's document
    user.verifyOtp = otp;
    user.verifyOtpExpireAt = Date.now() + 15 * 60 * 1000;
    await user.save();

    // 7. Send the OTP to the user's email!
    await sendVerifyOtpEmail(user.email, otp);

    // 8. Return a 200 success response saying "OTP sent successfully"
    res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (error) {
    // 9. Catch any server errors and return a 500 status code
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const verifyEmail = async (req, res) => {
  try {
    // 1. Extract the email and OTP (e.g., 'verifyOtp') from req.body
    const { email, otp } = req.body;

    // 2. Validate that both email and OTP are provided
    if (!email || !otp) {
      return res.status(401).json({
        success: false,
        message: "Enter your OTP",
      });
    }

    // 3. Find the user in the database by their email
    const user = await userModel.findOne({ email });

    // 4. If the user doesn't exist, return an error
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User Not Found",
      });
    }
    // 5. Check if the provided OTP matches user.verifyOtp in the database.
    if (user.verifyOtp !== otp) {
      return res.status(401).json({
        success: false,
        message: "Invalid OTP",
      });
    }
    // If it doesn't, return an error (e.g., "Invalid OTP")
    // 6. Check if the OTP is expired by comparing user.verifyOtpExpireAt with Date.now()

    // If it is expired, return an error (e.g., "OTP has expired")
    if (user.verifyOtpExpireAt < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "OTP has expired. Please request a new one.",
      });
    }

    user.isAccountVerified = true;
    user.verifyOtp = "";
    user.verifyOtpExpireAt = 0;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Account verified successfully",
    });

    // 7. If everything is valid, update the user:
    // - Set user.isAccountVerified = true
    // - Clear the OTP: user.verifyOtp = ""
    // - Clear the expiration: user.verifyOtpExpireAt = 0
    // 8. Save the updated user to the database using await user.save()
    // 9. Return a 200 success response saying "Account verified successfully"
  } catch (error) {
    // 10. Catch any server errors and return a 500 status code
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const isAuthenticated = async (req, res) => {
  try {
    // Note: You will protect this route with your 'userAuth' middleware!
    // Because of that, this controller ONLY runs if the token was 100% valid.
    // 1. Since they made it here, they are definitely authenticated!
    const user = await userModel.findById(req.userId);
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User not found" });
    }

    // Simply return a 200 success response with the user data
    res.json({
      success: true,
      email: user.email,
      name: user.name,
      isAccountVerified: user.isAccountVerified,
    });
  } catch (error) {
    // 2. Catch any server errors and return a 500 status code
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const sendResetOtp = async (req, res) => {
  try {
    // 1. Get the email from req.body
    const { email } = req.body;
    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Email is required" });
    }

    // 2. Find the user by email
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // 3. Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // 4. Save to resetOtp and set expiration (15 minutes)
    user.resetOtp = otp;
    user.resetOtpExpireAt = Date.now() + 15 * 60 * 1000;
    await user.save();

    // 5. Send the OTP to the user's email!
    await sendResetOtpEmail(user.email, otp);

    // 6. Return success
    res
      .status(200)
      .json({ success: true, message: "Reset OTP sent successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    // 1. Extract email, otp, and newPassword from req.body
    const { email, otp, newPassword } = req.body;
    if (!email || !otp || !newPassword) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // 2. Find user in the database
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // 3. Verify OTP and expiration
    if (user.resetOtp !== otp) {
      return res.status(401).json({ success: false, message: "Invalid OTP" });
    }
    if (user.resetOtpExpireAt < Date.now()) {
      return res
        .status(400)
        .json({ success: false, message: "OTP has expired" });
    }

    // 4. Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // 5. Update user password and clear OTP fields
    user.password = hashedPassword;
    user.resetOtp = "";
    user.resetOtpExpireAt = 0;
    await user.save();

    // 6. Return success
    res
      .status(200)
      .json({ success: true, message: "Password reset successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  register,
  login,
  logout,
  sendVerfyOtp,
  verifyEmail,
  isAuthenticated,
  sendResetOtp,
  resetPassword,
};
