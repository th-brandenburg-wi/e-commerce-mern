import React from "react";

const StarRating = ({ rating, setRating, interactive = false }) => {
  return (
    <div className="flex">
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1;
        return (
          <span
            key={starValue}
            className={`text-2xl ${
              starValue <= rating ? "text-yellow-500" : "text-gray-300"
            } ${interactive ? "cursor-pointer" : ""}`}
            onClick={() => interactive && setRating(starValue)}
          >
            &#9733;
          </span>
        );
      })}
    </div>
  );
};

export default StarRating;
