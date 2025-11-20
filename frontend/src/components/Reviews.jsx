import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ShopContext } from "../context/ShopContext";
import StarRating from "./StarRating";
import { createReview, deleteReview, getProductReviews } from "../services/api";
import { jwtDecode } from "jwt-decode";

const Reviews = ({ productId }) => {
  const { token } = useContext(ShopContext);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState("");
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserId(decodedToken.id);
    }
  }, [token]);

  const fetchReviews = async () => {
    try {
      const response = await getProductReviews(productId);
      if (response.data.success) {
        setReviews(response.data.reviews);
      }
    } catch (error) {
      console.error("Error fetching reviews", error);
    }
  };

  useEffect(() => {
    if (productId) {
      fetchReviews();
    }
  }, [productId]);

  const submitReview = async (e) => {
    e.preventDefault();
    try {
      const response = await createReview({ productId, rating, description });
      console.log("response " + JSON.stringify(response.data));
      if (response.data.success) {
        toast.success("Review submitted successfully");
        setRating(0);
        setDescription("");
        fetchReviews(); // Refetch reviews after submission
      } else {
        toast.error("Submitreview/Reviews.jsx Failed to submit review");
      }
    } catch (error) {
      toast.error(
        "(Submitreview/Reviews.jsx) - Failed to submit review, " + error.message
      );
    }
  };

  const handleDeleteReview = async (reviewId) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      try {
        const response = await deleteReview(reviewId);
        if (response.data.success) {
          toast.success("Review deleted successfully");
          fetchReviews();
        } else {
          toast.error("Failed to delete review");
        }
      } catch (error) {
        toast.error("Failed to delete review");
      }
    }
  };

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((acc, item) => acc + item.rating, 0) / reviews.length
      : 0;

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold mb-4">Reviews</h2>

      {/* Average Rating */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold">
          Average Rating: {averageRating.toFixed(1)} / 5
        </h3>
        <StarRating rating={averageRating} />
      </div>

      {/* Existing Reviews */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review._id} className="border p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <p className="font-semibold">{review.user.name}</p>
              <div className="ml-4">
                <StarRating rating={review.rating} />
              </div>
              {userId === review.user._id && (
                <button
                  onClick={() => handleDeleteReview(review._id)}
                  className="ml-auto bg-red-500 text-white px-2 py-1 rounded text-xs"
                >
                  Delete
                </button>
              )}
            </div>
            <p className="text-gray-600">{review.description}</p>
          </div>
        ))}
      </div>

      {/* Add Review Form */}
      {token && (
        <form onSubmit={submitReview} className="mt-8">
          <h3 className="text-xl font-semibold mb-2">Add your review</h3>
          <div className="mb-4">
            <label className="block mb-1">Your Rating</label>
            <StarRating
              rating={rating}
              setRating={setRating}
              interactive={true}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Your Review</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border rounded"
              rows="4"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-black text-white px-6 py-2 rounded"
          >
            Submit Review
          </button>
        </form>
      )}
    </div>
  );
};

export default Reviews;
