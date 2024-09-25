import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

interface StarRatingProps {
  rating: number; // Rating out of 5 (can be decimal like 4.5)
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  const totalStars = 5;

  const renderStar = (index: number) => {
    if (index < Math.floor(rating)) {
      // Full star if the index is less than the whole part of the rating
      return <FaStar key={index} className="text-yellow-500" />;
    } else if (index < rating && rating % 1 !== 0) {
      // Half star if there's a decimal part in the rating
      return <FaStarHalfAlt key={index} className="text-yellow-500" />;
    } else {
      // Empty star if the index is greater than the rating
      return <FaRegStar key={index} className="text-yellow-500" />;
    }
  };

  return (
    <div className="flex space-x-1">
      {[...Array(totalStars)].map((_, index) => renderStar(index))}
    </div>
  );
};

export default StarRating;
