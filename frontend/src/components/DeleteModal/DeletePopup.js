import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom"


import { deleteReview } from "../../store/reviewsReducer";
import { deleteSpot } from "../../store/spotReducer";

import "./DeletePopup.css"

export default function DeletePopup({ onCompletion, spot, review }) {

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
            </div>
        </>
    )
}