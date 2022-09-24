import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as sessionActions from "../../store/session";
import { createNewReview } from "../../store/reviewsReducer";
import "./CreateReviewForm.css"

function CreateReviewForm({ onCreation, spotId }) {
  const dispatch = useDispatch();
  const [review, setReview] = useState("");
  const [stars, setStars] = useState(3);
  const [errors, setErrors] = useState([]);
  const user = useSelector(state => state.session.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);

    const newErrors = [];

    if(review.length > 255 || review.length < 10){
      newErrors.push("Review must be between 10 and 256 characters");
    }

    setErrors(newErrors);

    if(newErrors.length){
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
          <div className="input-container">
            <label>
              Stars
            </label>
            <input
              type="number"
              value={stars}
              onChange={(e) => setStars(e.target.value)}
              className="input"
              min="1"
              max="5"
              step="1"
              required
            />
          </div>
          <div id="form-button-container" className="button-container">
            <button type="submit" className="submit-button">Create review</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default CreateReviewForm;