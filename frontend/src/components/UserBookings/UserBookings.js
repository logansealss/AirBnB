import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";

import UserBooking from "../UserBooking/UserBooking"
import { fetchBookingsForUser } from "../../store/bookingsReducer";
import LoadingIcon from "../LoadingIcon/LoadingIcon";

import "./UserBookings.css"

export default function UserBookings() {

    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const bookings = useSelector(state => state.bookings.user);
    const [loaded, setLoaded] = useState(false)
    const sortedBookings = Object.values(bookings).sort((a, b) => a.startDate > b.startDate ? -1 : 1)

    useEffect(() => {

        (async () => {
            await dispatch(fetchBookingsForUser());
            setLoaded(true)
        })()

    }, [dispatch]);

    if (!user) {
        return <Redirect to="/"></Redirect>
    }

    if (!loaded) {
        return <LoadingIcon />
    }

    return (
        <>
            <div id="user-spots-header-container">
                <h1 id="user-spots-header">
                    {sortedBookings.length > 0 ? `${user.username}'s bookings` : "You don't have any bookings"}
                </h1>
            </div>
            <div className="centering-spot-container">
                <div>
                    <div className="spot-container">
                        {sortedBookings.map(booking => (
                            <UserBooking key={booking.id} booking={booking}></UserBooking>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}