const Categories = require("../models/Categories");
const mongoose = require("mongoose");

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

exports.createCategories = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name || !description) {
      return res.status(401).json({
        success: false,
        message: "Invalid category",
      });
    }
    const result = await Categories.create({
      name: name,
      description: description,
    });
    return res.status(200).json({
      success: true,
      message: "Category created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Error while creating Category , ${error.message}`,
    });
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    const result = await Categories.find(
      {},
      { name: true, description: true, courses: true }
    );
    return res.status(200).json({
      success: true,
      message: "Categoires fetched successfully",
      result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Error while getting all Category , ${error.message}`,
    });
  }
};

// exports.categoryDetails = async (req, res) => {
//   try {
//     const { categoryId } = req.body;

//     const cid = new mongoose.Types.ObjectId(categoryId);
//     console.log("id",cid);
//     const courseDetails = await Categories.findById(cid)
//       //.populate("courses")
//       .exec();
//     if (!courseDetails) {
//       return res.status(404).json({
//         succsess: false,
//         message: "Course not found",
//       });
//     }

//     const otherCourses = await Categories.find({
//       _id: { $ne: cid },
//     })
//       //.populate("courses")
//       .exec();

//       return res.status(200).json({
//         success:true,
//         data: {
//             courseDetails,
//             otherCourses,
//         },
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

exports.categoryPageDetails = async (req, res) => {
  try {
    const { categoryId } = req.body;

    // Get courses for the specified category
    const selectedCategory = await Categories.findById(categoryId)
      .populate({
        path: "courses",
        match: { status: "Published" },
        populate: "ratingAndReviews",
      })
      .exec();

    console.log("SELECTED COURSE", selectedCategory);
    // Handle the case when the category is not found
    if (!selectedCategory) {
      console.log("Category not found.");
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }
    // Handle the case when there are no courses
    if (selectedCategory.courses.length === 0) {
      console.log("No courses found for the selected category.");
      return res.status(404).json({
        success: false,
        message: "No courses found for the selected category.",
      });
    }

    // Get courses for other categories
    const categoriesExceptSelected = await Categories.find({
      _id: { $ne: categoryId },
    });
    let differentCategory = await Categories.findOne(
      categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]
        ._id
    )
      .populate({
        path: "courses",
        match: { status: "Published" },
      })
      .exec();
    console.log();
    // Get top-selling courses across all categories
    const allCategories = await Categories.find()
      .populate({
        path: "courses",
        match: { status: "Published" },
      })
      .exec();
    const allCourses = allCategories.flatMap((category) => category.courses);
    const mostSellingCourses = allCourses
      .sort((a, b) => b.sold - a.sold)
      .slice(0, 10);

    res.status(200).json({
      success: true,
      data: {
        selectedCategory,
        differentCategory,
        mostSellingCourses,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
