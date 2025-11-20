import reviewModel from "../models/reviewModel.js";
import productModel from "../models/productModel.js";
import userModel from "../models/userModel.js";

// Create a new review
const createReview = async (req, res) => {
  try {
    const { productId, rating, description } = req.body;
    const userId = req.body.userId;

    const newReview = new reviewModel({
      user: userId,
      product: productId,
      rating,
      description,
    });

    const savedReview = await newReview.save();

    await productModel.findByIdAndUpdate(productId, {
      $push: { reviews: savedReview._id },
    });
    await userModel.findByIdAndUpdate(userId, {
      $push: { reviews: savedReview._id },
    });

    res.json({
      success: true,
      message: "Review added successfully",
      review: savedReview,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error adding review: " + error.message,
    });
  }
};

// Get all reviews for a product
const getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;
    const reviews = await reviewModel
      .find({ product: productId })
      .populate("user", "name");
    res.json({ success: true, reviews });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error fetching reviews" });
  }
};

// Delete a review
const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const userId = req.body.userId;

    const review = await reviewModel.findById(reviewId);

    if (!review) {
      return res.json({ success: false, message: "Review not found" });
    }

    if (review.user.toString() !== userId) {
      return res.json({
        success: false,
        message: "Not authorized to delete this review",
      });
    }

    await reviewModel.findByIdAndDelete(reviewId);

    await productModel.findByIdAndUpdate(review.product, {
      $pull: { reviews: reviewId },
    });
    await userModel.findByIdAndUpdate(review.user, {
      $pull: { reviews: reviewId },
    });

    res.json({ success: true, message: "Review deleted successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error deleting review" });
  }
};

export { createReview, getProductReviews, deleteReview };
