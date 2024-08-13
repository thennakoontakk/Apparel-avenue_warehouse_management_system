// DriverRating.js

import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

function DriverRating({ driverName, currentRating, onRatingUpdate }) {
  const [hoverRating, setHoverRating] = useState(0);

  const handleClick = (value) => {
    onRatingUpdate(value);
  };

  const handleMouseOver = (value) => {
    setHoverRating(value);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  return (
    <div>
      <h1>Rate {driverName}</h1>
      <div>
        {[...Array(5)].map((star, i) => {
          const ratingValue = i + 1;
          return (
            <label key={i}>
              <input
                type="radio"
                name="rating"
                value={ratingValue}
                onClick={() => handleClick(ratingValue)}
              />
              <FaStar
                className="star"
                color={
                  (hoverRating || ratingValue) <= currentRating
                    ? "#ffc107"
                    : "#e4e5e9"
                }
                size={30}
                onMouseOver={() => handleMouseOver(ratingValue)}
                onMouseLeave={handleMouseLeave}
              />
            </label>
          );
        })}
      </div>
      <p>You rated {driverName}: {currentRating} stars</p>
    </div>
  );
}

export default DriverRating;
