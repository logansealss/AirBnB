import { useParams, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import BookingCard from "../BookingCard/BookingCard";
import { fetchSingleSpot } from "../../store/spotReducer";
import { fetchReviewsForSpot } from "../../store/reviewsReducer";
import CreateReviewFormModal from "../CreateReviewFormModal";
import SpotReview from "../SpotReview";
import LoadingIcon from "../LoadingIcon/LoadingIcon";
import OwnerDropdown from "../UpdateDropdown";

import BadImage from "../../images/badpic.svg"
import "./SpotPage.css"

function SpotPage() {

    const params = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const [spotId, setSpotId] = useState(+(params.spotId));
    const [loaded, setLoaded] = useState(false)

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
                await dispatch(fetchReviewsForSpot(spotId));
                setLoaded(true)
            } else {
                history.push("/pagenotfound")
            }
        }

        getSpotAndReviews();
    }, [dispatch, spotId]);

    if (!loaded) {
        return <LoadingIcon />
    }

    let spotImages = { ...spot.SpotImages };

    let previewImage
    for (const img of Object.values(spotImages)) {
        if (img.preview) {
            previewImage = img
            break
        }
        if (!previewImage) {
            previewImage = img
        }
    }

    if (previewImage) {
        delete spotImages[previewImage.id]
    }

    spotImages = Object.values(spotImages)

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
                    <div
                        className="spot-header"
                    >

                        <div
                            className="spot-header-info-flex"
                        >
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
                        {user && user.id === spot.ownerId &&
                            <OwnerDropdown spot={spot} />
                        }
                    </div>
                    <div id="spot-pictures-container">
                        <div id="single-picture-container">
                            <div id="picture-container-div">
                                {
                                    <img
                                        src={previewImage ? previewImage.url : BadImage}
                                        onError={(e) => { e.target.src = BadImage; e.target.className = "bad-image" }}
                                        className={previewImage ? "single-picture-container" : "bad-image"}
                                    />
                                }
                            </div>
                        </div>
                        <div className="image-columns">
                            <div className="image-rows">
                                <div className="row-image top-row-image">
                                    {
                                        <img
                                            src={spotImages[0] ? spotImages[0].url : BadImage}
                                            onError={(e) => { e.target.src = BadImage; e.target.className = "bad-image" }}
                                            className={spotImages[0] ? "smaller-images" : "bad-image"}
                                        />
                                    }
                                </div>
                                <div className="row-image">
                                    {
                                        <img
                                            src={spotImages[2] ? spotImages[2].url : BadImage}
                                            onError={(e) => { e.target.src = BadImage; e.target.className = "bad-image" }}
                                            className={spotImages[2] ? "smaller-images" : "bad-image"}
                                        />
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="image-columns">
                            <div className="image-rows">
                                <div className="row-image top-row-image top-right">
                                    {
                                        <img
                                            src={spotImages[1] ? spotImages[1].url : BadImage}
                                            onError={(e) => { e.target.src = BadImage; e.target.className = "bad-image" }}
                                            className={spotImages[1] ? "smaller-images" : "bad-image"}
                                        />
                                    }
                                </div>
                                <div className="row-image bottom-right">
                                    {
                                        <img
                                            src={spotImages[3] ? spotImages[3].url : BadImage}
                                            onError={(e) => { e.target.src = BadImage; e.target.className = "bad-image" }}
                                            className={spotImages[3] ? "smaller-images" : "bad-image"}
                                        />
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
                        <BookingCard
                            spot={spot}
                            reviewValues={reviewValues}
                        ></BookingCard>
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