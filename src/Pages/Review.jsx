import React, { useState } from 'react';
import { BsStarFill, BsStarHalf } from 'react-icons/bs'; // Import stars from react-icons
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const Review = () => {
  const reviewData = {
    username: 'John Doe',
    rating: 4.5,
    reviewText:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ac eros euismod, consectetur ligula vel, fermentum velit. Aliquam erat volutpat.',
    date: 'July 3, 2024',
  };

  const [feedback, setFeedback] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting feedback:', feedback);
    // Handle submission logic here (e.g., sending feedback to server)
    // Optionally, reset the feedback state after submission
    setFeedback('');
  };

  // Function to generate star icons based on rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<BsStarFill key={i} className="text-warning" />);
    }

    if (hasHalfStar) {
      stars.push(<BsStarHalf key="half" className="text-warning" />);
    }

    return stars;
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-8">
          <div className="card mb-3">
            <div className="card-body">
              <div className="d-flex align-items-center mb-3">
                <div className="avatar">
                  <img src="https://via.placeholder.com/50" alt="User Avatar" className="rounded-circle" />
                </div>
                <div className="ms-3">
                  <h5 className="card-title mb-0">{reviewData.username}</h5>
                  <div className="rating">
                    {renderStars(reviewData.rating)}
                    <small className="text-muted ms-1">{reviewData.rating.toFixed(1)}</small>
                  </div>
                </div>
              </div>
              <p className="card-text">{reviewData.reviewText}</p>
              <p className="card-text">
                <small className="text-muted">Reviewed on {reviewData.date}</small>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <h3 className="mb-4">Leave Your Feedback</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <textarea
                    className="form-control"
                    rows="4"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Write your feedback here..."
                    required
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">
                  Submit Feedback
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
