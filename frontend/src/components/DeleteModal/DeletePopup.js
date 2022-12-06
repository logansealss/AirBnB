import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom"
import { deleteBooking } from "../../store/bookingsReducer";


import { deleteReview } from "../../store/reviewsReducer";
import { deleteSpot, fetchSingleSpot } from "../../store/spotReducer";

import "./DeletePopup.css"

export default function DeletePopup({ onCompletion, spot, review, booking }) {

    const history = useHistory()
    const dispatch = useDispatch()

    async function onDelete() {
        if (spot) {
            dispatch(deleteSpot(spot.id))
            if(history.location.pathname === `/spots/${spot.id}`){
                history.push('/')
            }
        }
        if (review) {
            await dispatch(deleteReview(review.id))
            if(history.location.pathname === `/spots/${review.spotId}`){
                dispatch(fetchSingleSpot(review.spotId))
            }
        }
        if (booking) {
            await dispatch(deleteBooking(booking.id))
        }
    }

    let type

    if(booking){
      type = "booking"
    }
  
    if(spot){
      type = "spot"
    }
  
    if(review){
      type = "review"
    }

    return (
        <>
            <div className="header-div">
                {`Delete ${type}`}
            </div>
            <div className="content-div">
                <div
                    className="delete-prompt"
                >
                    <div>
                        {`Are you sure that you want to delete this ${type}?`}
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
                        {`Delete ${type}`}
                    </button>
                </div>
            </div>
        </>
    )
}