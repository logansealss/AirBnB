import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { fetchUserSpots } from "../../store/spotReducer";

import "./UserSpots.css";

function UserSpots() {

    const dispatch = useDispatch();
    const spots = useSelector(state => state.spots.allSpots);

    useEffect(() => {
        dispatch(fetchUserSpots());
    }, [dispatch]);

    return (
        <>
            <div>
                User's spots
            </div>
            {spots && Object.values(spots).map(spot => (
                <>
                    <div>
                        {spot.id}
                    </div>
                    <div>
                        {spot.spot}
                    </div>
                    <div>
                        {spot.name}
                    </div>
                </>
            ))}
        </>
    )
}

export default UserSpots;