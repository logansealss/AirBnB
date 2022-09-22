import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { fetchUserSpots } from "../../store/spotReducer";
import UserSpot from "../UserSpot";

import "./UserSpots.css";

function UserSpots() {

    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const spots = useSelector(state => state.spots.allSpots);

    useEffect(() => {
        dispatch(fetchUserSpots());
    }, [dispatch]);

    let body;
    if (user) {
        body = (
            <>
                <div id="user-spots-header-container">
                    <div id="user-spots-header">
                        {`${user.username}'s spots`}
                    </div>
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
    } else {
        body = (
            <div id="user-spots-header">
                {`Log in to see your spots`}
            </div>
        )
    }

    return (
        <>
            {body}
        </>
    )
}

export default UserSpots;