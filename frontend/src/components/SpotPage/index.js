import {useParams} from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleSpot } from "../../store/spotReducer";

function SpotPage(){

    const params = useParams();
    const dispatch = useDispatch();
    const [spotId, setSpotId] = useState(+(params.spotId));
    const spot = useSelector(state => state.spots.singleSpot);

    useEffect(() => {
        dispatch(fetchSingleSpot(spotId));
    }, [dispatch, spotId]);

    return (
        <div>
            Spot Page {spotId}
            {spot && (
                <div>
                    {spot.description}
                </div>
            )}
        </div>
    );
}

export default SpotPage;