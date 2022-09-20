import {useEffect} from "react";
import {useSelector, useDispatch, createDispatchHook} from "react-redux";
import {fetchSpots} from "../../store/spotReducer";
import Spot from "../Spot";
import "./SpotsPage.css"


function SpotsPage(){

    const dispatch = useDispatch();
    const spots = useSelector(state => state.spots.allSpots);

    useEffect(() => {
        dispatch(fetchSpots());
    }, [dispatch]);

    return (
        <>
            <div className="centering-spot-container">
                <div className="spot-container">
                    {Object.values(spots).map(spot => (
                        <Spot key={spot.id} spot={spot}></Spot>
                    ))}
                </div>
            </div>
            <div className="push-for-footer"></div>
            <div className="footer-container"> 
                <div className="footer">
                    <div>
                        An Airbnb clone by Logan Seals
                    </div>
                    <div>
                        <a 
                            href="https://github.com/logansealss"
                            target="_blank"
                        >
                            GitHub
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SpotsPage;