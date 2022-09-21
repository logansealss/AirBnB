import { useParams, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchSingleSpot, deleteSpot } from "../../store/spotReducer";
import { fetchReviewsForSpot } from "../../store/reviewsReducer";
import { deleteReview } from "../../store/reviewsReducer";
import CreateReviewFormModal from "../CreateReviewFormModal";

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
        dispatch(fetchSingleSpot(spotId));
        dispatch(fetchReviewsForSpot(spotId));
    }, [dispatch, spotId]);

    async function deleteSpotClickEvent() {
        await dispatch(deleteSpot(spot.id));
        history.push("/");
    }

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
    if(user){
        for(let i = 0; i < reviewValues.length; i++){
            if(reviewValues[i].userId === user.id){
                userHasReview = true;
            }
        }
    }else{
        userHasReview = true;
    }

    return (
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
                        <div>
                            <i className="fa-solid fa-star"></i>
                        </div>
                        <div>
                            {spot.avgStarRating === null ? "New" : `${spot.avgStarRating}`}
                        </div>
                        <div>·</div>
                        <div>{reviewValues.length} {reviewValues.length === 1 ? "review" : "reviews"}</div>
                        <div>·</div>
                        <div>{`${spot.city}, ${spot.state}, ${spot.country}`}</div>
                    </div>
                </div>
                <div className="pictures-container">
                    <div className="single-picture-container">
                        <div className="preview-image">
                            {previewImage !== undefined ?
                                (<img src={previewImage.url} />) :
                                (<i className="fa-solid fa-image"></i>)
                            }
                        </div>
                        <div className="image-column-2">
                            {/* {spotImages.slice(0, 2).map(image => <></>
                                image !== undefined ?
                                (<img key={image.id} src={image.url} />) :
                                (<i key={image.id} className="fa-solid fa-image"></i>)
                            )} */}
                        </div>
                        <div className="image-column-3">
                            {/* {spotImages.slice(2, 4).map(image => <></>
                                image !== undefined ?
                                (<img key={image.id} src={image.url} />) :
                                (<i key={image.id} className="fa-solid fa-image"></i>)
                            )} */}
                        </div>
                    </div>
                </div>
                <div>
                    {`$${spot.price} night`}
                </div>
                <div className="spot-description-container">
                    {spot.description}
                </div>
                <div className="spot-stats">
                    <div>
                        <i className="fa-solid fa-star"></i>
                    </div>
                    <div>
                        {spot.avgStarRating === null ? "New" : `${spot.avgStarRating}`}
                    </div>
                    <div>·</div>
                    <div>{reviewValues.length} {reviewValues.length === 1 ? "review" : "reviews"}</div>
                    {!loggedInUserIsSpotOwner && !userHasReview && <CreateReviewFormModal spotId={spotId}/>}
                </div>
                {reviewsLoaded && (
                    <>
                        {reviewValues.map(review => (
                            <div key={review.id}>
                                <div>{review.User.firstName}</div>
                                <div>
                                    {review.review}
                                </div>
                                {user && (user.id === review.userId) && (
                                    <button onClick={() => dispatch(deleteReview(review.id))}>Delete review</button>
                                )}
                            </div>
                            
                        ))}
                    </>)
                }
                {loggedInUserIsSpotOwner && (
                    <>
                        <button onClick={deleteSpotClickEvent}>Delete spot</button>
                        <button onClick={() => history.push(`/updatespot/${spot.id}`)}>Update spot</button>
                    </>
                )}
            </div>
        </div>
    );
}

export default SpotPage;