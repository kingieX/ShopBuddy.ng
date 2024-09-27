import React from 'react';
import { FaStar, FaStarHalfAlt, FaStar as FaStarEmpty } from 'react-icons/fa';

const RatingReviews = () => {
  // Dummy data
  const totalReviews = 595;
  const averageRating = 4.5;
  const ratings = {
    5: 420,
    4: 90,
    3: 33,
    2: 12,
    1: 40,
  };

  return (
    <div className="max-w-lg py-4">
      <h2 className="mb-4 text-xl font-bold">Ratings & Reviews</h2>
      <div className="mb-4 flex items-center">
        {/* Average Rating */}
        <div className="text-5xl font-bold">{averageRating}</div>
        <div className="ml-4">
          {/* Star Rating */}
          <div className="flex items-center">
            {Array.from({ length: 5 }, (_, i) => (
              <span key={i}>
                {averageRating >= i + 1 ? (
                  <FaStar className="text-yellow-500" />
                ) : averageRating >= i + 0.5 ? (
                  <FaStarHalfAlt className="text-yellow-500" />
                ) : (
                  <FaStarEmpty className="text-gray-300" />
                )}
              </span>
            ))}
          </div>
          {/* Verified Buyers */}
          <div className="text-sm text-gray-600">
            {totalReviews} Verified Buyers
          </div>
        </div>
      </div>

      {/* Rating Breakdown */}
      {Object.entries(ratings).map(([star, count]) => (
        <div key={star} className="mb-2 flex items-center">
          <div className="flex space-x-1">
            <span className="text-sm font-medium text-gray-500">{star}</span>
            <FaStar className="inline text-gray-500" />
          </div>
          <div className="mx-2 h-2 w-full rounded-full bg-gray-200">
            <div
              className={`h-2 rounded-full ${
                Number(star) === 5
                  ? 'bg-green-500'
                  : Number(star) === 4
                    ? 'bg-green-400'
                    : Number(star) === 3
                      ? 'bg-yellow-500'
                      : Number(star) === 2
                        ? 'bg-yellow-400'
                        : 'bg-red-500'
              }`}
              style={{ width: `${(count / totalReviews) * 100}%` }}
            ></div>
          </div>
          <span className="text-sm font-medium">{count}</span>
        </div>
      ))}
    </div>
  );
};

export default RatingReviews;
