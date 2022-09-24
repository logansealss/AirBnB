import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import { fetchSingleSpot } from "../../store/spotReducer";
import { updateSpot } from "../../store/spotReducer";
import "./UpdateSpotForm.css";

function UpdateSpotForm({spot, onUpdate}) {

    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);

    const [spotId, setSpotId] = useState(spot.id);
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
        if (user) {
            if (user.id !== spot.ownerId) {
                setErrors(["You must own the spot to update it."]);
            } else {
                setErrors([]);
            }
        } else {
            setErrors(["You must be logged in to update a spot."]);
        }
    }, [user, spot]);

    useEffect(() => {
        dispatch(fetchSingleSpot(spotId));
    }, [dispatch, spotId]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = [];

        if(name.length === 0){
            newErrors.push("Name is required");
        }else if(name.length > 49){
            newErrors.push("Name must be less than 50 characters");
        }

        if(description.length === 0){
            newErrors.push("Description is required");
        }else if(description.length > 255){
            newErrors.push("Description must be less than 256 characters");
        }

        if(address.length === 0){
            newErrors.push("Address is required");
        }else if(address.length > 40){
            newErrors.push("Address must be less than 41 characters");
        }

        if(city.length === 0){
            newErrors.push("City is required");
        }else if(city.length > 40){
            newErrors.push("City must be less than 41 characters");
        }

        if(state.length === 0){
            newErrors.push("State is required");
        }else if(state.length > 40){
            newErrors.push("State must be less than 41 characters");
        }

        if(country.length === 0){
            newErrors.push("Country is required");
        }else if(country.length > 40){
            newErrors.push("Country must be less than 41 characters");
        }

        if(lat < -90 || lat > 90){
            newErrors.push("Latitude must be between -90 and 90");
        }

        if(long < -180 || long > 180){
            newErrors.push("Longitude must be between -180 and 180");
        }

        if(price < 0){
            newErrors.push("Price must be greater than 0");
        }

        setErrors(newErrors);

        if(newErrors.length > 0){
            return;
        }

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

        if(onUpdate){
            onUpdate();
        }
    };

    return (
        <>
            <div className="header-div">
                Update Spot
            </div>
            <div className="content-div">

                <form
                    onSubmit={handleSubmit}
                    className="signup-form"
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
                    <div id="form-button-container">
                        <button
                            type="submit"
                            disabled={user === null}
                            className="spot-submit-button"
                        >Update Spot</button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default UpdateSpotForm;