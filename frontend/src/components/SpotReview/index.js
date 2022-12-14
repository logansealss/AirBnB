import { useDispatch, useSelector } from "react-redux";
import OwnerDropdown from "../UpdateDropdown";

import "./SpotReview.css"

const MONTH = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"];

function SpotReview({ review }) {

    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);

    const date = new Date(Date.parse(review.createdAt));
    const year = date.getFullYear();
    const month = MONTH[date.getMonth()];

    return (
        <div className="review-container">
            <div className="review-header">
                <div className="review-info-container">
                    <div
                        className="review-user-info"
                    >
                        <div className="review-user-name">
                            {review.User.firstName}
                        </div>
                        <div className="review-user-date">{`${month} ${year}`}</div>
                    </div>
                    {user && user.id === review.userId &&
                        <OwnerDropdown
                            review={review}
                        />
                    }
                </div>
            </div>
            <div className="users-review">
                {review.review}
            </div>
        </div>
    )
}

export default SpotReview;