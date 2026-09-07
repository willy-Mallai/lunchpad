const { json } = require("express");
const userModel = require("../model/userModel");

// Get the user's profile data
const getUserProfile = async (req, res) => {
  try {
    // 1. Find the user in the database using their ID.
    const userId = req.userId;
    const user = await userModel.findById(userId);
    // (Hint: The userAuth middleware attached it to req.userId!)
    // Example: const user = await userModel.findById(req.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }

    // 2. If the user doesn't exist, return a 404 error
    res.status(200).json({
      success: true,
      data: {
        name: user.name,
        email: user.email,
        username: user.username,
        bio: user.bio,
      },
    });

    // 3. Return a success response with the user's data (name, email, username, bio)
    // NOTE: Don't send their password back to the frontend!
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update the user's profile data
const updateUserProfile = async (req, res) => {
  try {
    const { username, bio } = req.body;
    // 1. Get name, username, and bio from the request body (req.body)

    // 2. Find the user by req.userId and update those fields in the database.

    await userModel.findByIdAndUpdate(req.userId, { username, bio });
    res.status(201).json({
      success: true,
      message: "Profile updated successfully!",
    });
    // Example: await userModel.findByIdAndUpdate(req.userId, { name, username, bio });
    // 3. Return a success response with a message like "Profile updated successfully!"
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getStreak = async (req, res) => {
  try {
    const user = await userModel.findById(req.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      data: {
        currentStreak: user.currentStreak,
        longestStreak: user.longestStreak,
        lastStreakDate: user.lastStreakDate,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const updateStreak = async (req, res) => {
  try {
    const user = await userModel.findById(req.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const today = new Date().toDateString();
    if (user.lastStreakDate === today) {
      return res.status(200).json({
        success: true,
        data: {
          currentStreak: user.currentStreak,
          longestStreak: user.longestStreak,
          lastStreakDate: user.lastStreakDate,
        },
      });
    }

    let newCurrent = 1;
    if (user.lastStreakDate) {
      const last = new Date(user.lastStreakDate);
      const diffTime = Math.abs(new Date(today) - last);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        newCurrent = user.currentStreak + 1;
      }
    }
    const newLongest = Math.max(newCurrent, user.longestStreak);
    user.currentStreak = newCurrent;
    user.longestStreak = newLongest;
    user.lastStreakDate = today;
    await user.save();
    res.status(200).json({
      success: true,
      data: {
        currentStreak: newCurrent,
        longestStreak: newLongest,
        lastStreakDate: today,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  getUserProfile,
  updateUserProfile,
  getStreak,
  updateStreak,
};
