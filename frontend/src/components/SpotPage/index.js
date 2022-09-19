import {useParams, useHistory} from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleSpot, deleteSpot } from "../../store/spotReducer";

import "./SpotPage.css"

function SpotPage(){

    const params = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const [spotId, setSpotId] = useState(+(params.spotId));
    const spot = useSelector(state => state.spots.singleSpot);
    const user = useSelector(state => state.session.user);

    let loggedInUserIsSpotOwner = false;
    if(user && user.id === spot.ownerId){
        loggedInUserIsSpotOwner = true;
    }

    let spotLoaded = false;
    if(spotId === spot.id){
        spotLoaded = true;
    }

    useEffect(() => {
        dispatch(fetchSingleSpot(spotId));
    }, [dispatch, spotId]);

    function deleteSpotClickEvent(){
        dispatch(deleteSpot(spot.id));
        history.push("/");
    }

    if(Object.keys(spot).length === 0) return null;

    let spotImages = [...spot.SpotImages];
    let previewImageIndex = spotImages.findIndex(image => image.preview === true);
    let previewImage;
    if(previewImageIndex < 0){
        previewImage = spotImages[0];
    }else{
        previewImage = spotImages[previewImageIndex];
        spotImages.splice(previewImageIndex, 1);
    }

    if(!spotLoaded){
        return null;
    }

    return (
        <div>
            Spot Page {spotId}
                <div>
                    <div>
                        {spot.name}
                    </div>
                    <div className="spot-stats">
                        <div>
                            <i className="fa-solid fa-star"></i>
                        </div>
                        <div>
                            {spot.avgStarRating === null ? "New" : `${spot.avgStarRating}`}
                        </div>
                    </div>
                    <div className="picture-container">
                        <div className="preview-image"> 
                            {previewImage !== undefined ? 
                                (<img src={previewImage.url}/>) : 
                                (<i className="fa-solid fa-image"></i>)
                            }
                        </div>
                        <div>

                        </div>
                    </div>
                    <div>
                        {spot.description}
                    </div>
                    <div>
                        {spot.price}
                    </div>
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