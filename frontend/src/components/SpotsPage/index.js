import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import LoadingIcon from "../LoadingIcon/LoadingIcon"
import { fetchSpots, resetAllSpotsActionCreator } from "../../store/spotReducer";
import Spot from "../Spot";

import "./SpotsPage.css"


function SpotsPage() {

    const dispatch = useDispatch();
    const spots = useSelector(state => state.spots.allSpots);
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {

        (async () => {
            await dispatch(fetchSpots());
            setLoaded(true)
        })()

        // return (() => dispatch(resetAllSpotsActionCreator()));
    }, [dispatch]);

    if(!loaded){
        return <LoadingIcon />
    }

    return (
        <>
            <div className="centering-spot-container">
                <div>
                    <div className="spot-container">
                        {Object.values(spots).map(spot => (
                            <Spot key={spot.id} spot={spot}></Spot>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default SpotsPage;