import { useSelector } from 'react-redux'
import { useState, useEffect } from "react"
import { useHistory } from 'react-router-dom'

import { csrfFetch } from '../../store/csrf'
import "./BookingCard.css"

export function getDateStr(date) {
    return date.toJSON().slice(0, 10)
}

export default function ({ spot, reviewValues }) {

    const history = useHistory()
    const user = useSelector(state => state.session.user)
    const bookingErr = "This spot is booked for those dates. Please try again."

    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [dateErr, setDateErr] = useState()
    const [submitted, setSubmitted] = useState(false)

    function areDatesFilledIn() {
        if (!startDate) {
            setDateErr('Select a check-in date')
            return false
        }

        if (!endDate) {
            setDateErr('Select a checkout date')
            return false
        }

        return true
    }

    function isDateError() {

        if (submitted) {
            if (!startDate) {
                setDateErr('Select a check-in date')
                return true
            }

            if (!endDate) {
                setDateErr('Select a checkout date')
                return true
            }
        }

        if (startDate && startDate <= getDateStr(new Date(Date.now()))) {
            setDateErr('Check-in date cannot be on or before today')
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

    function onSubmit(e) {
        e.preventDefault()
        setSubmitted(true)

        if (!dateErr && areDatesFilledIn()) {
            console.log("no error")
            csrfFetch(`/api/spots/${spot.id}/bookings`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    startDate,
                    endDate
                })
            }).then(res => {
                if(res.ok){
                    console.log("booking created!")
                    // redirect to user bookings page
                    history.push('/mybookings')
                }
            }).catch(res => {
                if(res.status === 403){
                    setDateErr(bookingErr)
                }
            })
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
        cost = Math.round(spot.price * numDays)
        serviceFee = Math.round(cost * .05)
        total = cost + serviceFee
    }

    return (

        <div id="spot-info-right">
            <div id="raised-spot-card">
                <div
                    id="raised-spot-card-header"
                    className="spot-stats"
                >
                    <div id="spot-price">
                        <span className="big-spot-info">${spot.price}</span>
                        <span> night</span>
                    </div>
                    <div id="spot-card-review-stats">
                        <div id="stats-star-container">
                            <i className="fa-solid fa-star"></i>
                        </div>
                        <div id="spot-raised-card-ratings">
                            <div>
                                {spot.avgStarRating === null ? "New ·" : `${spot.avgStarRating} ·`}
                            </div>
                            <div id="stats-num-reviews">{reviewValues.length} {reviewValues.length === 1 ? "review" : "reviews"}</div>
                        </div>
                    </div>
                </div>
                {(!user || (user && user.id !== spot.ownerId)) &&
                    <>
                        <form
                            onSubmit={onSubmit}
                            className="reservation-form"
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
                            {user ?
                                <button
                                    className="reserve-button"
                                >Reserve</button>
                                :
                                <div
                                    className='booking-no-user'
                                >
                                    <div>
                                        Log in or sign up to book
                                    </div>
                                </div>
                            }
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
                                            {`$${spot.price} x ${numDays} ${numDays === 1 ? 'night' : 'nights'}`}
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
                    </>
                }
            </div>
        </div>
    )
}
