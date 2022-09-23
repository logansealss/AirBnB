import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Redirect } from "react-router-dom";

import { fetchReviewsForUser } from "../../store/reviewsReducer";
import UserReview from "../UserReview";
import "./UserReviews.css";

function UserReviews() {

    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const reviews = useSelector(state => state.reviews.user);

    useEffect(() => {
        dispatch(fetchReviewsForUser());
    }, [dispatch]);

    if (!user) {
        return <Redirect to="/"></Redirect>
    }

    return (
        <>
            <div id="user-reviews-header-container">
                <h1 id="user-reviews-header">
                    {Object.values(reviews).length > 0 ? `${user.username}'s reviews` : "You don't have any reviews"}
                </h1>
            </div>
            <div id="review-page-content">
                <div id="review-page-container">
                    {reviews && Object.values(reviews).map(review => (
                        <UserReview key={review.id} review={review}></UserReview>
                    ))}
                </div>
            </div>
        </>
    )
}

export default UserReviews;