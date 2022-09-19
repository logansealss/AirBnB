import { Link } from "react-router-dom";
import "./Spot.css"

function Spot({ spot }) {

    return (
        <div>
            <Link to={`/spots/${spot.id}`} className="spot-link">
                {spot.previewImage
                    ?   (
                            <div className="image-container">
                                <img src={spot.previewImage} className="spot-image" />
                            </div>
                        )
                    :   (   
                            <div className="image-container no-preview-image">
                                <i class="fa-regular fa-image fa-2xl"></i>
                            </div>
                        )
                }
                <div className="name spot-text-bold">
                    {spot.name}
                </div>
                <div className="area-rating" >
                    <div>{spot.city}, {spot.state}</div>
                    <div>
                        <i class="fa-solid fa-star fa-2xs"></i>
                        <span>{spot.avgRating ? ` ${spot.avgRating}` : ` New`}</span>
                    </div>
                </div>
                <div className="price-per-night">
                    <span className="spot-text-bold">
                    {`$${spot.price} `}
                    </span>
                    night
                </div>
            </Link>
        </div>
    )
}

export default Spot;