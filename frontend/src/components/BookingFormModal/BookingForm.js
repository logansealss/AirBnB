import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { updateBookingThunk } from "../../store/bookingsReducer"

import { getDateStr } from "../BookingCard/BookingCard"


export default function BookingForm({ booking, onCompletion }) {

    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const bookingErr = "This spot is booked for those dates. Please try again."

    const [startDate, setStartDate] = useState(booking.startDate)
    const [endDate, setEndDate] = useState(booking.endDate)
    const [dateErr, setDateErr] = useState()
    const [submitted, setSubmitted] = useState(false)

    function isDateError() {

        if (!startDate) {
            setDateErr('Select a check-in date')
            return true
        }

        if (startDate <= getDateStr(new Date(Date.now()))) {
            setDateErr('Check-in date cannot be on or before today')
            return true
        }

        if (!endDate) {
            setDateErr('Select a checkout date')
            return true
        }

        if (startDate && endDate) {

            if (endDate <= startDate) {
                setDateErr('Checkout date must be after check-in date')
                return true
            }
        }

        setDateErr('')
        return false
    }

    useEffect(() => {

        isDateError()

    }, [startDate, endDate])

    async function onSubmit(e) {
        e.preventDefault()
        setSubmitted(true)

        if (!dateErr) {
            console.log("no error")
            const newDates = {
                startDate,
                endDate
            }
            const res = await dispatch(updateBookingThunk(booking.id, newDates))

            if(!res){
                setDateErr("This spot is booked for those dates. Please try again.")
                return
            }

            onCompletion()
        }
    }

    function datePlusDays(days, startDate) {
        const nextDay = new Date(startDate || Date.now())
        nextDay.setDate(nextDay.getDate() + days)
        return getDateStr(nextDay)
    }


    function getMinEndDate() {
        if (!startDate || startDate <= datePlusDays(0)) {
            return datePlusDays(2)
        }

        return datePlusDays(1, startDate)
    }

    let numDays
    let cost
    let serviceFee
    let total
    if (startDate && endDate) {
        numDays = (new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 3600 * 24)
        cost = Math.round(booking.Spot.price * numDays)
        serviceFee = Math.round(cost * .05)
        total = cost + serviceFee
    }

    return (
        <>
            <div className="header-div">
                {`Update booking for ${booking.Spot.name}`}
            </div>
            <div className="content-div">

                <>
                    <form
                        onSubmit={onSubmit}
                    >
                        <div
                            className="reservation-form-container"
                        >
                            <div
                                className="reservation-form-dates"
                            >
                                <div
                                    className='reservation-date-holder'
                                >
                                    <label
                                        htmlFor="reservation-date-left"
                                    >
                                        CHECK-IN
                                    </label>
                                    <input
                                        id="reservation-date-left"
                                        className="reservation-form-date-left"
                                        value={startDate}
                                        onChange={e => setStartDate(e.target.value)}
                                        min={datePlusDays(1)}
                                        type="date"
                                    />
                                </div>
                                <div
                                    className='reservation-date-holder'
                                >
                                    <label
                                        htmlFor="reservation-date-right"
                                    >
                                        CHECKOUT
                                    </label>
                                    <input
                                        id="reservation-date-right"
                                        className="reservation-form-date-right"
                                        value={endDate}
                                        onChange={e => setEndDate(e.target.value)}
                                        min={getMinEndDate()}
                                        type="date"
                                    />
                                </div>
                            </div>
                            {dateErr &&
                                <div
                                    className="reservation-dates-error"
                                >
                                    <div>
                                        {dateErr}
                                    </div>
                                </div>
                            }
                        </div>
                    </form>
                    {(endDate && startDate && (!dateErr || dateErr === bookingErr)) &&
                        <>
                            {user && (
                                <div
                                    className="booking-data-flex"
                                >
                                    <div>
                                        You won't be charged yet.
                                    </div>
                                </div>
                            )}

                            <div
                                className="booking-prices-container"
                            >
                                <div
                                    className="booking-prices-flex"
                                >
                                    <div>
                                        {`$${booking.Spot.price} x ${numDays} ${numDays === 1 ? 'night' : 'nights'}`}
                                    </div>
                                    <div>
                                        {`$${cost}`}
                                    </div>
                                </div>
                                <div
                                    className="booking-prices-flex"
                                >
                                    <div>
                                        Service Fee
                                    </div>
                                    <div>
                                        {`$${serviceFee}`}
                                    </div>
                                </div>
                                <div
                                    className="booking-prices-total"
                                >
                                    <div>
                                        Total before taxes
                                    </div>
                                    <div>
                                        {`$${total}`}
                                    </div>
                                </div>
                            </div>
                        </>
                    }
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
                            className="reserve-button"
                            onClick={onSubmit}
                        >Update booking</button>
                    </div>
                </>
            </div>
        </>
    )
}
