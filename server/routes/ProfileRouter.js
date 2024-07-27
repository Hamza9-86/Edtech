const express = require("express");
const router = express.Router();

const {
  updateProfile,
  deleteAccount,
  getAllUserDetails,
  getEnrolledCourses,
  updateDisplayPicture,
  instructorDashboard,
} = require("../controllers/ProfileController");
const { authMiddleware, isInstructor } = require("../middlewares/AuthMiddleware");

router.put("/update-profile",authMiddleware,updateProfile)
router.put("/update-display-picture",authMiddleware,updateDisplayPicture);
router.get("/getAllUserDetails",authMiddleware,getAllUserDetails);
router.get("/getEnrolledCourses",authMiddleware,getEnrolledCourses);
router.delete("/deleteAccount",authMiddleware,deleteAccount);
router.get("/instructorDashboard", authMiddleware, isInstructor, instructorDashboard)

module.exports = router;