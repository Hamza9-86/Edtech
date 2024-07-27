const express = require("express");
const router = express.Router();

const {
  capturePayment,
  verifyPayment,
  sendPaymentSuccessEmail,
} = require("../controllers/PaymentController");

const { authMiddleware, isStudent } = require("../middlewares/AuthMiddleware");
router.post("/capturePayment", authMiddleware, isStudent, capturePayment);
router.post("/verifyPayment",authMiddleware, isStudent, verifyPayment);
router.post("/sendPaymentSuccessEmail", authMiddleware, isStudent,sendPaymentSuccessEmail)

module.exports = router;
