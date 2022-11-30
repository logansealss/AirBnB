import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { createNewReview } from "../../store/reviewsReducer";
import "./CreateReviewForm.css"

function CreateReviewForm({ spotId, reviewToUpdate }) {
  const dispatch = useDispatch();
  const [review, setReview] = useState(reviewToUpdate ? reviewToUpdate.review : "");
  const [stars, setStars] = useState(reviewToUpdate ? reviewToUpdate.stars : 3);
  const [hoverStars, setHoverStars] = useState(0)
  const [errors, setErrors] = useState([]);
  const user = useSelector(state => state.session.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);

    const newErrors = [];

    if (review.length > 255 || review.length < 1) {
      newErrors.push("Review must be between 1 and 256 characters");
    }

    setErrors(newErrors);

    if (newErrors.length) {
      return;
    }

    const newReview = {
      review,
      stars
    };

    dispatch(createNewReview(newReview, spotId, user));
  };

  return (
    <>
      <div className="header-div">
        Create a review
      </div>
      <div className="content-div">
        <form onSubmit={handleSubmit} className="review-form">
          <div className="errors">
            {errors.map((error, idx) => <div key={idx}>{error}</div>)}
          </div>
          <div className="input-container review-textarea-container">
            <label
            >
              Review
            </label>
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              className="input"
              required
            />
          </div>
          <div>
            Stars
          </div>
          <div id="rating-container">
            <div
              onClick={() => setStars(1)}
              onMouseEnter={() => setHoverStars(1)}
              onMouseLeave={() => setHoverStars(0)}
            >
              {stars >= 1 && hoverStars === 0 || hoverStars >= 1 ?
                <i className="fa-solid fa-star fa-2xl"></i> :
                <i className="fa-regular fa-star  fa-2xl"></i>
              }
            </div>
            <div
              onClick={() => setStars(2)}
              onMouseEnter={() => setHoverStars(2)}
              onMouseLeave={() => setHoverStars(0)}
            >
              {stars >= 2 && hoverStars === 0 || hoverStars >= 2 ?
                <i className="fa-solid fa-star fa-2xl"></i> :
                <i className="fa-regular fa-star  fa-2xl"></i>
              }
            </div>
            <div
              onClick={() => setStars(3)}
              onMouseEnter={() => setHoverStars(3)}
              onMouseLeave={() => setHoverStars(0)}
            >
              {stars >= 3 && hoverStars === 0 || hoverStars >= 3 ?
                <i className="fa-solid fa-star fa-2xl"></i> :
                <i className="fa-regular fa-star  fa-2xl"></i>
              }
            </div>
            <div
              onClick={() => setStars(4)}
              onMouseEnter={() => setHoverStars(4)}
              onMouseLeave={() => setHoverStars(0)}
            >
              {stars >= 4 && hoverStars === 0 || hoverStars >= 4 ?
                <i className="fa-solid fa-star fa-2xl"></i> :
                <i className="fa-regular fa-star  fa-2xl"></i>
              }
            </div>
            <div
              onClick={() => setStars(5)}
              onMouseEnter={() => setHoverStars(5)}
              onMouseLeave={() => setHoverStars(0)}
            >
              {stars >= 5 && hoverStars === 0 || hoverStars >= 5 ?
                <i className="fa-solid fa-star fa-2xl"></i> :
                <i className="fa-regular fa-star  fa-2xl"></i>
              }
            </div>
          </div>
          <div id="form-button-container" className="button-container">
            <button type="submit" className="submit-button">{!reviewToUpdate ? 'Create review' : 'Update review'}</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default CreateReviewForm;