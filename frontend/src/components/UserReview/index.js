import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { deleteReview } from "../../store/reviewsReducer";
import "./UserReview.css";
import CreateReviewFormModal from "../CreateReviewFormModal";

const MONTH = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"];

function UserReview({ review }) {

    const dispatch = useDispatch();
    const date = new Date(Date.parse(review.createdAt));
    const year = date.getFullYear();
    const month = MONTH[date.getMonth()];

    return (
        <div className="individual-review-container">
            <div>

                <div>
                    <div className="individual-review-header">
                        <span>For </span>
                        <Link
                            to={`/spots/${review.Spot.id}`}
                            className="link-to-spot"
                        >
                            <span>{review.Spot.name}</span>
                        </Link>
                    </div>
                    <div id="review-stats">
                        <div id="review-rating">
                            <div>
                                <i className="fa-solid fa-star"></i>
                            </div>
                            <div className="individual-review-rating">
                                {review.stars}
                            </div>
                        </div>
                        <div>
                            {`${month} ${year}`}
                        </div>
                    </div>
                    <div className="review-review">
                        {review.review}
                    </div>
                </div>
            </div>
            <div
                id="owner-buttons-container"
            >
                <CreateReviewFormModal
                    className="spot-owner-buttons"
                    review={review}
                ></CreateReviewFormModal>
                <button
                    className="review-buttons"
                    onClick={() => dispatch(deleteReview(review.id))}
                >
                    Delete review
                </button>
            </div>
        </div>
    )
}

export default UserReview;