import { useDispatch } from "react-redux";
import { deleteReview } from "../../store/reviewsReducer";
import { deleteSpot } from "../../store/spotReducer";

import "./DeletePopup.css"

export default function DeletePopup({ onCompletion, spot, review }) {

    const dispatch = useDispatch()

    async function onDelete() {
        if (spot) {
            await dispatch(deleteSpot(spot.id))
        }
        if (review) {
            await dispatch(deleteReview(review.id))
        }
    }

    return (
        <>
            <div className="header-div">
                {spot ? 'Delete spot' : 'Delete review'}
            </div>
            <div className="content-div">
                <div
                    className="delete-prompt"
                >
                    <div>
                        {`Are you sure that you want to delete this ${spot ? 'spot' : 'review'}?`}
                    </div>
                </div>
                <div
                    id="owner-buttons-container"
                >
                    <button
                        className="spot-owner-buttons"
                        onClick={onCompletion}
                    >
                        Cancel
                    </button>
                    <button
                        className="spot-owner-buttons"
                        onClick={onDelete}
                    >
                        {spot ? 'Delete spot' : 'Delete review'}
                    </button>
                </div>
                {/* <form onSubmit={handleSubmit} className="review-form">
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
                        />
                    </div>
                    <div id="form-button-container" className="button-container">
                        <button type="submit" className="submit-button">{!reviewToUpdate ? 'Create review' : 'Update review'}</button>
                    </div>
                </form> */}
            </div>
        </>
    )
}