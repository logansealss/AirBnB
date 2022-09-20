import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import { fetchSingleSpot } from "../../store/spotReducer";
import { updateSpot } from "../../store/spotReducer";
import "./UpdateSpotForm.css";

function UpdateSpotForm() {

    const params = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    const user = useSelector(state => state.session.user);
    const spot = useSelector(state => state.spots.singleSpot);

    const [spotId, setSpotId] = useState(+(params.spotId));
    const [address, setAddress] = useState(spot.address);
    const [city, setCity] = useState(spot.city);
    const [state, setState] = useState(spot.state);
    const [country, setCountry] = useState(spot.country);
    const [lat, setLat] = useState(spot.lat);
    const [long, setLong] = useState(spot.lng);
    const [name, setName] = useState(spot.name);
    const [description, setDescription] = useState(spot.description);
    const [price, setPrice] = useState(spot.price);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        if(user){
            if(user.id !== spot.ownerId){
                setErrors(["You must own the spot to update it."]);
            }else{
                setErrors([]);
            }
        }else{
            setErrors(["You must be logged in to update a spot."]);
        }
    }, [user, spot]);

    useEffect(() => {
        dispatch(fetchSingleSpot(spotId));
    }, [dispatch, spotId]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newSpot = {
            name,
            description,
            address,
            city,
            state,
            country,
            lat,
            lng: long,
            price
        }

        await dispatch(updateSpot(newSpot, spot.id));
        history.push(`/spots/${spot.id}`);
    };

    return (
        <div className="body-container">
            <div className="body-header">
                Update a spot
            </div>
            <div className="spot-form-container">
                <form 
                    onSubmit={handleSubmit}
                    className="spot-form"
                >
                    <div className="errors">
                        {errors.map((error, idx) => <div key={idx}>{error}</div>)}
                    </div>
                    <div className="spot-input-container">
                        <label>
                            Name
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="input"
                            required
                        />
                    </div>
                    <div className="spot-input-container">
                        <label>
                            Address
                        </label>
                        <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="input"
                            required
                        />
                    </div>
                    <div className="spot-input-container">
                        <label>
                            City
                        </label>
                        <input
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="input"
                            required
                        />
                    </div>
                    <div className="spot-input-container">
                        <label>
                            State
                        </label>
                        <input
                            type="text"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            className="input"
                            required
                        />
                    </div>
                    <div className="spot-input-container">
                        <label>
                            Country
                        </label>
                        <input
                            type="text"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            className="input"
                            required
                        />
                    </div>
                    <div className="spot-input-container">
                        <label>
                            Price
                        </label>
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="input"
                            min="0"
                            required
                        />
                    </div>
                    <div className="spot-input-container spot-textarea-container">
                        <label>
                            Description
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            className="spot-textarea spot-input-container input"
                        />
                    </div>

                    {/* removed lat and long requirements for adding a spot */}
                    {/* add in later when necessary */}

                    {/* <div>
                <label>
                    Latitude
                    <input
                        type="number"
                        value={lat}
                        onChange={(e) => setLat(e.target.value)}
                        min="-90"
                        max="90"
                        required
                    />
                </label>
            </div>
            <div>
                <label>
                    Longitude
                    <input
                        type="number"
                        value={long}
                        onChange={(e) => setLong(e.target.value)}
                        min="-180"
                        max="180"
                        required
                    />
                </label>
            </div> */}
                    <div>
                        <button
                            type="submit"
                            disabled={user === null}
                            className="spot-submit-button"
                        >Update Spot</button>
                    </div>
                </form>
            </div>
        </div>

        // <form onSubmit={handleSubmit}>
        //     <div>
        //         {errors.map((error, idx) => <div key={idx}>{error}</div>)}
        //     </div>
        //     <div>
        //         <label>
        //             Name
        //             <input
        //                 type="text"
        //                 value={name}
        //                 onChange={(e) => setName(e.target.value)}
        //                 required
        //             />
        //         </label>
        //     </div>
        //     <div>
        //         <label>
        //             Description
        //             <textarea
        //                 value={description}
        //                 onChange={(e) => setDescription(e.target.value)}
        //                 required
        //             />
        //         </label>
        //     </div>
        //     <div>
        //         <label>
        //             Address
        //             <input
        //                 type="text"
        //                 value={address}
        //                 onChange={(e) => setAddress(e.target.value)}
        //                 required
        //             />
        //         </label>
        //     </div>
        //     <div>
        //         <label>
        //             City
        //             <input
        //                 type="text"
        //                 value={city}
        //                 onChange={(e) => setCity(e.target.value)}
        //                 required
        //             />
        //         </label>
        //     </div>
        //     <div>
        //         <label>
        //             State
        //             <input
        //                 type="text"
        //                 value={state}
        //                 onChange={(e) => setState(e.target.value)}
        //                 required
        //             />
        //         </label>
        //     </div>
        //     <div>
        //         <label>
        //             Country
        //             <input
        //                 type="text"
        //                 value={country}
        //                 onChange={(e) => setCountry(e.target.value)}
        //                 required
        //             />
        //         </label>
        //     </div>
        //     <div>
        //         <label>
        //             Price
        //             <input
        //                 type="number"
        //                 value={price}
        //                 onChange={(e) => setPrice(e.target.value)}
        //                 required
        //             />
        //         </label>
        //     </div>
        //     {/* <div>
        //         <label>
        //             Latitude
        //             <input
        //                 type="number"
        //                 value={lat}
        //                 onChange={(e) => setLat(e.target.value)}
        //                 required
        //             />
        //         </label>
        //     </div>
        //     <div>
        //         <label>
        //             Longitude
        //             <input
        //                 type="number"
        //                 value={long}
        //                 onChange={(e) => setLong(e.target.value)}
        //                 required
        //             />
        //         </label>
        //     </div> */}
        //     <button type="submit" disabled={errors.length > 0}>Update spot</button>
        // </form>
    );
}

export default UpdateSpotForm;