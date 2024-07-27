const express = require("express");
const router = express.Router();

const {
  signupController,
  loginController,
  sendOTP,
  changePassword,
} = require("../controllers/AuthController");

const {
  resetPassword,
  resetPasswordToken,
} = require("../controllers/ResetPwdController");
const { authMiddleware } = require("../middlewares/AuthMiddleware");

router.post("/signup", signupController);
router.post("/login", loginController);
router.post("/sendotp", sendOTP);
router.post("/changepassword", authMiddleware,changePassword);
router.post("/reset-password", resetPassword);
router.post("/reset-password-token", resetPasswordToken);

module.exports = router;
