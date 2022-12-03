import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteSpot } from "../../store/spotReducer";
import UpdateSpotModal from "../UpdateSpotModal";
import DeleteModal from "../DeleteModal";

function UserBooking({ booking }) {

    function getDateStr(date) {
        return date.toJSON().slice(0, 10)
    }

    function getExtendedDateStr(date) {
        const dateStr = new Date(date)
        return dateStr.toString().slice(4, 15)
    }

    return (
        <div
            className="individual-spot-container"
        >
            <div>
                <div>
                    <Link to={`/spots/${booking.Spot.id}`} className="spot-link">
                        {booking.Spot.previewImage
                            ? (
                                <div className="image-container">
                                    <img src={booking.Spot.previewImage} className="spot-image" />
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
                                <div className="spot-text-bold">{booking.Spot.name}</div>
                                <div className="price-per-night">
                                    <span className="spot-text-bold">
                                        {`$${booking.Spot.price} `}
                                    </span>
                                    night
                                </div>
                            </div>
                            <div>
                                {getExtendedDateStr(booking.startDate)}
                            </div>
                            <div>
                                {getExtendedDateStr(booking.endDate)}
                            </div>
                        </div>
                    </Link>
                </div>
                {getDateStr(new Date(Date.now())) < booking.startDate && 

                    <div id="owner-buttons-container">
                        {/* <UpdateSpotModal
                        className="spot-owner-buttons"
                        booking={booking}
                    /> */}
                        <DeleteModal
                            className="spot-owner-buttons"
                            booking={booking}
                        />
                    </div>
                }
            </div>
        </div>
    )
}

export default UserBooking;