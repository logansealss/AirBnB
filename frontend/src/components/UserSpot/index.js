import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteSpot } from "../../store/spotReducer";
import UpdateSpotModal from "../UpdateSpotModal";

import "./UserSpot.css"

function UserSpot({ spot }) {

    const dispatch = useDispatch();
    const history = useHistory();

    function deleteSpotClickEvent() {
        dispatch(deleteSpot(spot.id));
    }

    return (
        <div
            className="individual-spot-container"
        >
            <div>
                <div>
                    <Link to={`/spots/${spot.id}`} className="spot-link">
                        {spot.previewImage
                            ? (
                                <div className="image-container">
                                    <img src={spot.previewImage} className="spot-image" />
                                </div>
                            )
                            : (
                                <div className="image-container no-preview-image">
                                    <i className="fa-regular fa-image fa-2xl"></i>
                                </div>
                            )
                        }
                        <div id="spot-info">
                            <div className="spot-header" >
                                <div className="spot-text-bold">{spot.name}</div>
                                <div>
                                    <i className="fa-solid fa-star fa-2xs"></i>
                                    <span>{spot.avgRating ? ` ${spot.avgRating}` : ` New`}</span>
                                </div>
                            </div>
                            <div id="spot-address">
                                <div>
                                    {spot.address}
                                </div>
                                <div>
                                    {`${spot.city}, ${spot.state}`}
                                </div>
                            </div>
                            <div className="price-per-night">
                                <span className="spot-text-bold">
                                    {`$${spot.price} `}
                                </span>
                                night
                            </div>
                        </div>
                    </Link>
                </div>
                <div id="owner-buttons-container">
                    <UpdateSpotModal className="spot-owner-buttons" spot={spot}></UpdateSpotModal>
                    {/* <button onClick={() => history.push(`/updatespot/${spot.id}`)} className="spot-owner-buttons">Update spot</button> */}
                    <button onClick={deleteSpotClickEvent} className="spot-owner-buttons">Delete spot</button>
                </div>
            </div>
        </div>
    )
}

export default UserSpot;