import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {useParams} from "react-router-dom";
import { fetchSingleSpot } from "../../store/spotReducer";

import SpotForm from "../CreateSpotForm";
import "./SpotFormPage.css"

function SpotFormPage(){

    const currentSpot = useSelector(state => state.spots.singleSpot);
    const dispatch = useDispatch();
    const params = useParams();
    const [spotId, setSpotId] = useState(+(params.spotId));

    useEffect(() => {
        dispatch(fetchSingleSpot(spotId));
    }, [dispatch, spotId]);

    if(!currentSpot) return null;

    console.log(currentSpot);


    return (
        <>
            <div>
                Spot Form Page {spotId}
            </div>
            <SpotForm spot={currentSpot}></SpotForm>
        </>
    )
}

export default SpotFormPage;