const OTP = require("../models/OTP");
const User = require("../models/User");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mailSender = require("../utils/mailSender");
const Profile = require("../models/Profile");
require("dotenv").config();

//send OTP
exports.sendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return res.status(401).json({
        success: false,
        message: "User already exist",
      });
    }
    var otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
			lowerCaseAlphabets: false,
			specialChars: false,
    });
    const existingOTP = await OTP.findOne({ otp: otp });

    while (existingOTP) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      existingOTP = await OTP.findOne({ otp: otp });
    }
    const otpBody = await OTP.create({ otp: otp, email: email });
    console.log("OTP Body ", otpBody);
    return res.status(200).json({
      success: true,
      message: "OTP sent successfully",
      otp,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `"Error while sending OTP",${error.message}`,
    });
  }
};

//signup controller

exports.signupController = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      accountType,
      otp,
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !otp
    ) {
      return res.status(401).json({
        success: false,
        message: "All fields are required",
      });
    }
    if (password !== confirmPassword) {
      return res.status(401).json({
        success: false,
        message: "Password and Confirm Password should be same",
      });
    }
    const existingUser1 = await User.findOne({ email: email });
    if (existingUser1) {
      return res.status(401).json({
        success: false,
        message: "User is already registered",
      }); 
    }
    const recentOTP = await OTP.findOne({ email })
      .sort({ createdAt: -1 })
      .limit(1);
      console.log("recent",recentOTP.otp);
  
    if (recentOTP.length === 0) {
      return res.status(400).json({
        success: false,
        message: "OTP not found",
      });
    }
    else if (otp !== recentOTP.otp) {
      return res.status(400).json({
        success: false,
        message: "OTP is invalid",
      });
    }
    const hashedPassword = await bcrypt.hash(password,10);
    console.log("hashed",hashedPassword);
    let approved = "";
		approved === "Instructor" ? (approved = false) : (approved = true);
    console.log(approved);
    const userDetails = await Profile.create({
      gender: null,
      dateOfBirth: null,
      contactNumber: null,
      about: null,
    });
    console.log("User",userDetails);
    const result = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      confirmPassword,
      approved: approved,
      additionalDetails: userDetails._id,
      accountType,
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
    });
    return res.status(200).json({
      success: true,
      message: "User registered successfully",
      result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `"Error while signing in",${error.message}`,
    });
  }
};

//loginController
exports.loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(403).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingUser2 = await User.findOne({ email: email });
    if (!existingUser2) {
      return res.status(403).json({
        success: false,
        message: "User is not registered",
      });
    }

    if (await bcrypt.compare(password, existingUser2.password)) {
      const payload = {
        email: existingUser2.email,
        id: existingUser2._id,
        accountType: existingUser2.accountType,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });
      existingUser2.token = token;
      existingUser2.password = undefined;

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user:existingUser2,
        message: "User logged in successfully",
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Incorrect Password",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `"Error while loging in",${error.message}`,
    });
  }
};

//changePassword
exports.changePassword = async (req, res) => {
  try {
    const { email, password, newPassword, confirmNewPassword } = req.body;

    const existingUser3 = await User.findOne({ email });
    if (!existingUser3) {
      return res.status(403).json({
        success: false,
        message: "User is not registered",
      });
    }
    if (await bcrypt.compare(password, existingUser3.password)) {
      if (newPassword !== confirmNewPassword) {
        return res.status(401).json({
          success: false,
          message: "Password and Confirm Password should be same",
        });
      }

      const updatedUser = await User.findOneAndUpdate(
        { email: email },
        { password: newPassword, confirmPassword: confirmNewPassword },
        { new: true }
      );

      await mailSender(email, "New Password Updated successfully", "");

      return res.status(200).json({
        success:true,
        message:"Password changed successfully",
        updatedUser
      })
    }
    else{
        return res.status(401).json({
            success:false,
            message:"Enter a valid old password"
        })
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `"Error while changing password",${error.message}`,
    });
  }
};
