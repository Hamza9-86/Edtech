const Course = require("../models/Course");
const RatingAndReview = require("../models/RatingAndReview");

exports.createRating = async (req, res) => {
  try {
    const userId = req.user.id;
    const { rating, review, courseId } = req.body;
    
    const courseDetails = await Course.findOne(
      { _id:courseId },
      {
        studentsEnrolled: { $elemMatch: { $eq: userId } },
      }
    );
    console.log("coursedetails",courseDetails);
    if (!courseDetails) {
      return res.status(404).json({
        success: false,
        message: "Student not enrolled in course",
      });
    }
    const reviewed = await RatingAndReview.findOne({
      user: userId,
      course: courseId,
    });
    if (reviewed) {
      return res.status(403).json({
        success: false,
        message: "Course already reviewed by the user",
      });
    }
    const ratingAndReview = await RatingAndReview.create({
      rating,
      review,
      course: courseId,
      user: userId,
    });

    const updateCourse = await Course.findByIdAndUpdate(
      {_id : courseId },
      {
        $push: {
          ratingAndReviews: ratingAndReview._id,
        },
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      ratingAndReview,
      message: "Rating and Review submitted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAverageRating = async (req, res) => {
  try {
    const { courseId } = req.body; 

    const result = await RatingAndReview.aggregate({
      $match: {
        course: new mongoose.Types.ObjectId(courseId),
      },
      $group: {
        _id: null,
        averageRating: { $avg: "$rating" },
      },
    });
  
    if (result.length > 0) {
      return res.status(200).json({
        success: true,
        averageRating: result[0].averageRating,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Average Rating is 0, no ratings given till now",
      averageRating: 0,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllRatingAndReview = async (req, res) => {
  try {
    const allRatingAndReview = await RatingAndReview.find({})
      .sort({ rating: "desc" })
      .populate({ path: "user", select: "firstName lastName email image" })
      .populate({ path: "course", select: "courseName" })
      .exec();

      return res.status(200).json({
        success:true,
        message:"All reviews fetched successfully",
        data:allRatingAndReview,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
