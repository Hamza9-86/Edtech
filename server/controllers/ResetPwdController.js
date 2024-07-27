const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const crypto = require("crypto");
const bcrypt = require("bcrypt");

exports.resetPasswordToken = async (req, res) => {
  try {
    const { email } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(401).json({
        success: false,
        message: "User is not registered",
      });
    }
    const resetToken = crypto.randomUUID();
    const updatedUser = await User.findOneAndUpdate(
      { email: email },
      { token: resetToken, resetExpirationTime: Date.now() + 5 * 60 * 1000 },
      { new: true }
    );
    const url = `http://localhost:3000/update-password/${resetToken}`;

    await mailSender(
      email,
      "Reset Password Link",
      `Reset Password Link : ${url}`
    );

    return res.status(200).json({
      success: true,
      message: "Reset Password Link sent successfully",
      updatedUser
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Error while generating reset password token ${error.message}`,
    });
  }
};

//resetPassword
exports.resetPassword = async (req, res) => {
  try {
    const { password, confirmPassword, token } = req.body;
    console.log("pass",password);
    if (password !== confirmPassword) {
      return res.json({
        success: false,
        message: "Password not matching",
      });
    }
    const user = await User.findOne({ token: token });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Token is not valid",
      });
    }
    if (user.resetExpirationTime < Date.now()) {
      return res.status(401).json({
        success: false,
        message: "Token time is expired",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const updatedUser2 = await User.findOneAndUpdate(
      { token: token },
      { password: hashedPassword, confirmPassword:confirmPassword },
      
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Password reset successfully",
      updatedUser2
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error while reseting password",
     
    });
  }
};
