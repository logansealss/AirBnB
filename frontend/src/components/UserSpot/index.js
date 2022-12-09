import { Link, useHistory } from "react-router-dom";

import UpdateSpotModal from "../UpdateSpotModal";
import DeleteModal from "../DeleteModal";
import BadImage from "../../images/badpic.svg"
import "./UserSpot.css"


function UserSpot({ spot }) {

    const history = useHistory()
    
    function redirectToPhotos(){
        history.push(`/spots/${spot.id}/photos`)
    }

    return (
        <div
            className="individual-spot-container"
        >
            <div>
                <div>
                    <Link to={`/spots/${spot.id}`} className="spot-link">
                        <div className="image-container">
                            <img
                                src={spot.previewImage || BadImage}
                                onError={(e) => { e.target.src = BadImage; e.target.className = "bad-image" }}
                                className={spot.previewImage ? "spot-image" : "bad-image"}
                            />
                        </div>
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
                    <UpdateSpotModal
                        className="spot-owner-buttons"
                        spot={spot}
                    />
                        <button
                            className="spot-owner-buttons"
                            onClick={redirectToPhotos}
                        >
                            Update photos
                        </button>
                    <DeleteModal
                        className="spot-owner-buttons"
                        spot={spot}
                    />
                </div>
            </div>
        </div>
    )
}

export default UserSpot;