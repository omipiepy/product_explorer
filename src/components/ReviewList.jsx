import { FaStar } from "react-icons/fa";

const ReviewList = ({ reviews }) => {
  if (!reviews || reviews.length === 0) {
    return <p className="text-gray-600 dark:text-gray-600">No reviews yet.</p>;
  }

  return (
    <ul className="space-y-4">
      {reviews.map((review, index) => (
        <li key={index} className="rounded shadow-xl p-4 dark:text-gray-300 ">
          <div className="flex items-center justify-between">
            <p className="font-medium">{review.reviewerName}</p>
            <p className="text-sm text-gray-500">
              {new Date(review.date).toLocaleDateString()}
            </p>
          </div>
          <p className="mt-1">
            <span aria-label={`Rated ${review.rating} out of 5`}>
              <FaStar className="inline" aria-hidden="true"/> {review.rating}/5
            </span>
          </p>
          <p className="mt-2 text-gray-700 dark:text-gray-300">{review.comment}</p>
        </li>
      ))}
    </ul>
  );
}

export default ReviewList;