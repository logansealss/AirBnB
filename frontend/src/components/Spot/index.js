import { Link } from "react-router-dom";
import "./Spot.css"

function Spot({ spot }) {

    return (
        <Link to={`/spots/${spot.id}`} className="spot-link">
            <div>
                <div>
                    <img src={spot.previewImage} className="spot-image" />
                </div>
                <div className="area-rating">
                    <div>{spot.city}, {spot.state}</div>
                    <div>{spot.avgRating || `-`}</div>
                </div>
                <div>{`$${spot.price} night`}</div>
            </div>
        </Link>
    )
}

export default Spot;