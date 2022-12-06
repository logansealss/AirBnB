import { Link } from "react-router-dom";
import BookingModal from "../BookingFormModal";

import DeleteModal from "../DeleteModal";
import "./UserBooking.css"

function UserBooking({ booking }) {

    function getDateStr(date) {
        return date.toJSON().slice(0, 10)
    }

    function getExtendedDateStr(date) {
        const dateStr = new Date(date)
        dateStr.setDate(dateStr.getDate() + 1)
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
                                <div>
                                    <span className="spot-text-bold">
                                        {`$${booking.Spot.price} `}
                                    </span>
                                    night
                                </div>
                            </div>
                            <div
                                className="booking-date-container"
                            >
                                <div
                                    className="booking-date"
                                >
                                    <div
                                        className="booking-date-header"
                                    >
                                        CHECK-IN
                                    </div>
                                    <div>
                                        {getExtendedDateStr(booking.startDate)}
                                    </div>
                                </div>
                                <div
                                    className="date-divider"
                                />
                                <div
                                    className="booking-date"
                                >
                                    <div
                                        className="booking-date-header date-right"
                                    >
                                        CHECK-OUT
                                    </div>
                                    <div>
                                        {getExtendedDateStr(booking.endDate)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
                {getDateStr(new Date(Date.now())) < booking.startDate &&

                    <div id="owner-buttons-container">
                        <BookingModal
                            className="spot-owner-buttons"
                            booking={booking}
                        />
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