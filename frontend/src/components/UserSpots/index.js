import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";

import { fetchUserSpots, resetAllSpotsActionCreator } from "../../store/spotReducer";
import UserSpot from "../UserSpot";
import LoadingIcon from "../LoadingIcon/LoadingIcon";

import "./UserSpots.css";

function UserSpots() {

    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const spots = useSelector(state => state.spots.allSpots);
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        
        (async () => {
            await dispatch(fetchUserSpots());
            setLoaded(true)
        })()

        // return (() => dispatch(resetAllSpotsActionCreator()));
    }, [dispatch]);

    if (!user) {
        return <Redirect to="/"></Redirect>
    }

    if(!loaded){
        return <LoadingIcon />
    }

    return (
        <>
            <div id="user-spots-header-container">
                <h1 id="user-spots-header">
                    {Object.values(spots).length > 0 ? `${user.username}'s spots` : "You don't have any spots"}
                </h1>
            </div>
            <div className="centering-spot-container">
                <div>
                    <div className="spot-container">
                        {Object.values(spots).map(spot => (
                            <UserSpot key={spot.id} spot={spot}></UserSpot>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserSpots;