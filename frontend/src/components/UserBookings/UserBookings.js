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
    const [future, setFuture] = useState(true)

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
                    {`${user.username}'s bookings`}
                </h1>
            </div>
            <div
                className="header-options-container"
            >
                <div
                    className={future ? 'header-option-active' : 'header-options-inactive'}
                >
                    Future
                </div>
                <div>
                    Past
                </div>
            </div>
            <div className="centering-spot-container">
                <div>
                    <div className="spot-container">
                        {Object.values(bookings).map(booking => (
                            <UserBooking key={booking.id} booking={booking}></UserBooking>
                            // <div>
                            //    { booking.id}
                            // </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}