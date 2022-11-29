
import { useState, useEffect } from "react"
import "./BookingCard.css"

export default function ({ spot, reviewValues }) {

    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()
    const [dateErr, setDateErr] = useState()

    useEffect(() => {
        if (endDate && startDate) {
            if (endDate <= startDate) {
                setDateErr('End date must be after start date.')
            } else {
                setDateErr()
            }
        }
    }, [startDate, endDate])

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
                                min={new Date(Date.now()).toJSON().slice(0, 10)}
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
                    <button
                        className="reserve-button"
                    >Reserve</button>
                </form>
                <div
                    className="booking-data-flex"
                >
                    <div>
                        You won't be charged yet.
                    </div>
                </div>
                {endDate && startDate && !dateErr &&

                    <div
                        className="booking-prices-container"
                    >
                        <div
                            className="booking-prices-flex"
                        >
                            <div>
                                $99 x 3 nights
                            </div>
                            <div>
                                $297
                            </div>
                        </div>
                        <div
                            className="booking-prices-flex"
                        >
                            <div>
                                Service Fee
                            </div>
                            <div>
                                $300
                            </div>
                        </div>
                        <div
                            className="booking-prices-total"
                        >
                            <div>
                                Total before taxes
                            </div>
                            <div>
                                $2161
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}
