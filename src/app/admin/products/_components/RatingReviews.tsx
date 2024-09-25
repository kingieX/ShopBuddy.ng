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
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Ratings & Reviews</h2>
      <div className="flex items-center mb-4">
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
          <div className="text-gray-600 text-sm">
            {totalReviews} Verified Buyers
          </div>
        </div>
      </div>
      
      {/* Rating Breakdown */}
      {Object.entries(ratings).map(([star, count]) => (
        <div key={star} className="flex items-center mb-2">
            <span className="w-6 text-sm font-medium">{star} <FaStar className="inline text-yellow-500" /></span>
            <div className="w-full bg-gray-200 rounded-full h-2 mx-2">
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
