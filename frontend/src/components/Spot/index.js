import { Link } from "react-router-dom";

import BadImage from "../../images/badpic.svg"
import "./Spot.css"

function Spot({ spot }) {

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
                                onError={(e) => {e.target.src = BadImage; e.target.className = "bad-image"}}
                                className={spot.previewImage ? "spot-image" : "bad-image"} />
                        </div>
                        <div id="spot-info">
                            <div className="spot-header" >
                                <div className="spot-text-bold">{spot.city}, {spot.state}</div>
                                <div>
                                    <i className="fa-solid fa-star fa-2xs"></i>
                                    <span>{spot.avgRating ? ` ${spot.avgRating}` : ` New`}</span>
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
            </div>
        </div>
    )
}

export default Spot;