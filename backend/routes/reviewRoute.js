import express from "express";
import {
  createReview,
  deleteReview,
  getProductReviews,
} from "../controllers/reviewController.js";
import authMiddleware from "../middleware/auth.js";

const reviewRouter = express.Router();

reviewRouter.post("/", authMiddleware, createReview);
reviewRouter.get("/:productId", getProductReviews);
reviewRouter.delete("/:reviewId", authMiddleware, deleteReview);

export default reviewRouter;
