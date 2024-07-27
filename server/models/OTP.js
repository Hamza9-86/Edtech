const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");

const OTPSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: 60*10,
  },
  otp: {
    type: String,
    required: true,
  },
});

async function sendVerificationEmail(email, otp) {
  try {
    const mailTitle = "Verification email by Udemy";
    const mailResponse = await mailSender(email, mailTitle, otp);
    console.log("Mail res", mailResponse);
  } catch (error) {
    console.log("Error while sending mail ", error.message);
  }
}

OTPSchema.pre("save" , async function(next){
    await sendVerificationEmail(this.email,this.otp);
    next();
})

module.exports = mongoose.model("OTP", OTPSchema);
