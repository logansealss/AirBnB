import { useSelector } from 'react-redux'
import { useState, useEffect } from "react"

import "./BookingCard.css"

export default function ({ spot, reviewValues }) {

    const user = useSelector(state => state.session.user)

    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [dateErr, setDateErr] = useState()

    useEffect(() => {
        if (endDate && startDate) {
            if (endDate <= startDate) {
                setEndDate('')
            }
        }
    }, [startDate, endDate])


    function getMinEndDate() {
        if (!startDate) {
            return new Date(Date.now()).toJSON().slice(0, 10)
        }
        const nextDay = new Date(startDate)
        nextDay.setDate(nextDay.getDate() + 1)
        return nextDay.toJSON().slice(0, 10)
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
                <form
                    className="reservation-form"
                >
                    <div
                        className="reservation-form-container"
                    >
                        <div
                            className="reservation-form-dates"
                        >
                            <input
                                className="reservation-form-date-left"
                                value={startDate}
                                onChange={e => setStartDate(e.target.value)}
                                min={new Date(Date.now()).toJSON().slice(0, 10)}
                                type="date"
                            />
                            <input
                                className="reservation-form-date-right"
                                value={endDate}
                                onChange={e => setEndDate(e.target.value)}
                                min={getMinEndDate()}
                                type="date"
                            />
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
                {user && endDate && startDate &&
                    <>
                        <div
                            className="booking-data-flex"
                        >
                            <div>
                                You won't be charged yet.
                            </div>
                        </div>

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
            </div>
        </div>
    )
}
