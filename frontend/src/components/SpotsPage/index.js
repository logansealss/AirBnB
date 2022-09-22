import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchSpots } from "../../store/spotReducer";
import Spot from "../Spot";

import "./SpotsPage.css"


function SpotsPage() {

    const dispatch = useDispatch();
    const spots = useSelector(state => state.spots.allSpots);

    useEffect(() => {
        dispatch(fetchSpots());
    }, [dispatch]);

    return (
        <>
            <div className="centering-spot-container">
                <div>
                    <div className="spot-container">
                        {Object.values(spots).map(spot => (
                            // <div key={spot.id}>
                            <Spot key={spot.id} spot={spot}></Spot>
                            // </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default SpotsPage;