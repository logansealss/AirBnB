import { useParams, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchSingleSpot } from "../../store/spotReducer";
import { fetchReviewsForSpot } from "../../store/reviewsReducer";
import CreateReviewFormModal from "../CreateReviewFormModal";
import SpotReview from "../SpotReview";

import "./SpotPage.css"

function SpotPage() {

    const params = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const [spotId, setSpotId] = useState(+(params.spotId));

    const spot = useSelector(state => state.spots.singleSpot);
    const reviews = useSelector(state => state.reviews.spot);
    const user = useSelector(state => state.session.user);

    let loggedInUserIsSpotOwner = false;
    if (user && user.id === spot.ownerId) {
        loggedInUserIsSpotOwner = true;
    }

    let spotLoaded = false;
    if (spotId === spot.id) {
        spotLoaded = true;
    }

    useEffect(() => {
        async function getSpotAndReviews() {

            const spotExists = await dispatch(fetchSingleSpot(spotId))
                .catch(() => false)

            if (spotExists) {
                dispatch(fetchReviewsForSpot(spotId));
            } else {
                history.push("/pagenotfound")
            }
        }

        getSpotAndReviews();
    }, [dispatch, spotId]);

    if (Object.keys(spot).length === 0) return null;

    let spotImages = [...spot.SpotImages];
    let previewImageIndex = spotImages.findIndex(image => image.preview === true);
    let previewImage;
    if (previewImageIndex < 0) {
        previewImage = spotImages[0];
    } else {
        previewImage = spotImages[previewImageIndex];
        spotImages.splice(previewImageIndex, 1);
    }

    if (!spotLoaded) {
        return null;
    }

    const reviewValues = Object.values(reviews);
    let reviewsLoaded = false;
    if (reviewValues.length === 0 || reviewValues[0].spotId === spot.id) {
        reviewsLoaded = true;
    }

    let userHasReview = false;
    if (user) {
        for (let i = 0; i < reviewValues.length; i++) {
            if (reviewValues[i].userId === user.id) {
                userHasReview = true;
            }
        }
    } else {
        userHasReview = true;
    }

    return (
        <div id="content-container">
            <div className="spot-body-container">
                <div>
                    <div>
                        <div className="spot-name-container">
                            <span>
                                <h1>
                                    {spot.name}
                                </h1>
                            </span>
                        </div>
                        <div className="spot-stats">
                            <div id="stats-star-container">
                                <i className="fa-solid fa-star"></i>
                            </div>
                            <div>
                                {spot.avgStarRating === null ? "New ·" : `${spot.avgStarRating} ·`}
                            </div>
                            <div id="stats-num-reviews">{reviewValues.length} {reviewValues.length === 1 ? "review ·" : "reviews ·"}</div>
                            <div id="stats-location">{`${spot.city}, ${spot.state}, ${spot.country}`}</div>
                        </div>
                    </div>
                    <div id="spot-pictures-container">
                        <div id="single-picture-container">
                            <div id="picture-container-div">
                                {previewImage !== undefined ?
                                    (<img src={previewImage.url} />) :
                                    (<i className="fa-solid fa-image fa-2xl"></i>)
                                }
                            </div>
                        </div>
                        <div className="image-columns">
                            <div className="image-rows">
                                <div className="row-image top-row-image">
                                    {spotImages[0] !== undefined ?
                                        (<img src={spotImages[0].url} />) :
                                        (<i className="fa-solid fa-image fa-2xl"></i>)
                                    }
                                </div>
                                <div className="row-image">
                                    {spotImages[1] !== undefined ?
                                        (<img src={spotImages[1].url} />) :
                                        (<i className="fa-solid fa-image fa-2xl"></i>)
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="image-columns">
                            <div className="image-rows">
                                <div className="row-image top-row-image top-right">
                                    {spotImages[2] !== undefined ?
                                        (<img src={spotImages[2].url} />) :
                                        (<i className="fa-solid fa-image fa-2xl"></i>)
                                    }
                                </div>
                                <div className="row-image bottom-right">
                                    {spotImages[3] !== undefined ?
                                        (<img src={spotImages[3].url} />) :
                                        (<i className="fa-solid fa-image fa-2xl"></i>)
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="spot-info-header">
                        <div id="spot-info-left">
                            <div id="spot-info-name-owner">
                                {`${spot.name} hosted by ${spot.Owner.firstName} ${spot.Owner.lastName}`}
                            </div>
                            <div
                                id="spot-description-container"
                                className="bottom-containers"
                            >
                                {spot.description}
                            </div>
                        </div>
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
                                                min={new Date(Date.now()).toJSON().slice(0, 10)}
                                                type="date"
                                            />
                                            <input
                                                className="reservation-form-date-right"
                                                min={new Date(Date.now()).toJSON().slice(0, 10)}
                                                type="date"
                                            />
                                        </div>
                                        <div
                                            className="reservation-dates-error"
                                        >
                                            <div>
                                                Those dates are not available.
                                            </div>
                                        </div>
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
                            </div>
                        </div>
                    </div>
                    <div
                        id="big-stats"
                        className="bottom-containers spot-stats"
                    >
                        <div id="big-star">
                            <i className="fa-solid fa-star"></i>
                        </div>
                        <div>
                            {spot.avgStarRating === null ? "New ·" : `${spot.avgStarRating} ·`}
                        </div>
                        <div id="big-review-count">{reviewValues.length} {reviewValues.length === 1 ? "review" : "reviews"}</div>
                        {!loggedInUserIsSpotOwner && !userHasReview && <CreateReviewFormModal spotId={spotId} className="review-button" />}
                    </div>
                    {reviewsLoaded && (
                        <>
                            {reviewValues.map(review => (
                                <SpotReview key={review.id} review={review}></SpotReview>
                            ))}
                        </>)
                    }
                </div>
            </div>
        </div>
    );
}

export default SpotPage;