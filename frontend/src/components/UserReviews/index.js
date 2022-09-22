import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { fetchReviewsForUser } from "../../store/reviewsReducer";

function UserReviews() {

    const dispatch = useDispatch();
    const reviews = useSelector(state => state.reviews.user);

    useEffect(() => {
        dispatch(fetchReviewsForUser());
    }, [dispatch]);

    return (
        <>
            <div>
                User's reviews
            </div>

            {reviews && Object.values(reviews).map(review => (
                <>
                    <div>
                        {review.id}
                    </div>
                    <div>
                        {review.review}
                    </div>
                    <div>
                        {review.User.firstName}
                    </div>
                    <div>
                        {review.User.lastName}
                    </div>
                </>
            ))}
        </>
    )
}

export default UserReviews;