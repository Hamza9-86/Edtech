const express = require("express");
const router = express.Router();

const {
  createCourse,
  getCourseDetails,
  getAllCourses,
  getFullCourseDetails,
  editCourse,
  getInstructorCourses,
  deleteCourse,
} = require("../controllers/CourseController");

const {
  createCategories,
  getAllCategories,
  categoryPageDetails,
} = require("../controllers/CategoriesController");

const {
  createSection,
  updateSection,
  deleteSection,
} = require("../controllers/SectionController");

const {
  createSubSection,
  updateSubSection,
  deleteSubSection,
} = require("../controllers/SubSectionController");

const {
  createRating,
  getAllRatingAndReview,
  getAverageRating,
} = require("../controllers/RatingAndReviewController");

const {
  isAdmin,
  isInstructor,
  isStudent,
  authMiddleware,
} = require("../middlewares/AuthMiddleware");
const { updateCourseProgress } = require("../controllers/CourseProgressController");

router.post("/create-course", authMiddleware, isInstructor, createCourse);
router.post("/add-section", authMiddleware, isInstructor, createSection);
router.post("/update-section", authMiddleware, isInstructor, updateSection);
router.delete("/delete-section", authMiddleware, isInstructor, deleteSection);
router.post("/create-subsection", authMiddleware, isInstructor, createSubSection);
router.post("/update-subsection", authMiddleware, isInstructor, updateSubSection);
router.delete("/delete-subsection", authMiddleware, isInstructor, deleteSubSection);
router.get("/getAllCourses", getAllCourses);
router.post("/getCourseDetails", getCourseDetails);
router.post("/getFullCourseDetails", authMiddleware, getFullCourseDetails)
router.post("/editCourse", authMiddleware, isInstructor, editCourse)
router.get("/getInstructorCourses", authMiddleware , isInstructor, getInstructorCourses)
router.delete("/deleteCourse", deleteCourse)
router.post("/updateCourseProgress", authMiddleware, isStudent, updateCourseProgress);
 
router.post("/createCategory", authMiddleware, isAdmin, createCategories);
router.get("/showAllCategories", getAllCategories);
router.post("/getCategoryPageDetails", categoryPageDetails);

router.post("/createRating", authMiddleware, isStudent, createRating);
router.get("/getRatings", getAllRatingAndReview);
router.get("/getAvgRating", getAverageRating);

module.exports = router;
