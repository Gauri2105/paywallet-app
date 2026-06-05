const User = require("../models/User");
const bcrypt =
  require("bcryptjs");

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(
      req.user.userId
    ).select("-password");

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user.userId,
      req.body,
      {
        new: true,
      }
    ).select("-password");

    res.status(200).json({
      success: true,
      message: "Profile updated",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const changePassword = async (
  req,
  res
) => {
  try {
    const user =
      await User.findById(
        req.user.userId
      );

    const {
      currentPassword,
      newPassword,
    } = req.body;

    const isMatch =
      await bcrypt.compare(
        currentPassword,
        user.password
      );

    if (!isMatch) {
      return res.status(400).json({
        message:
          "Current password incorrect",
      });
    }

    user.password =
      await bcrypt.hash(
        newPassword,
        10
      );

    await user.save();

    res.json({
      success: true,
      message:
        "Password updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getProfile,
  updateProfile,
  changePassword,
};