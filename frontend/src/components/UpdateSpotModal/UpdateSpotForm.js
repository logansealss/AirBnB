import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { updateSpot } from "../../store/spotReducer";
import "./UpdateSpotForm.css";

function UpdateSpotForm({ spot, onCompletion }) {

    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);

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

    // useEffect(() => {
    //     dispatch(fetchSingleSpot(spotId));
    // }, [dispatch, spotId]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = [];

        if (name.length < 4 || name.length > 49) {
            newErrors.push("Name must be between 4 and 49 characters");
        }

        if (address.length < 4 || address.length > 40) {
            newErrors.push("Address must be between 4 and 40 characters");
        }

        if (city.length < 4 || city.length > 40) {
            newErrors.push("City must be between 4 and 40 characters");
        }

        if (state.length < 4 || state.length > 40) {
            newErrors.push("State must be between 4 and 40 characters");
        }

        if (country.length < 4 || country.length > 40) {
            newErrors.push("Country must be between 4 and 40 characters");
        }

        if (lat < -90 || lat > 90) {
            newErrors.push("Latitude must be between -90 and 90");
        }

        if (long < -180 || long > 180) {
            newErrors.push("Longitude must be between -180 and 180");
        }

        if (price < 0) {
            newErrors.push("Price must be greater than or equal to 0");
        }

        if (description.length < 10 || description.length > 255) {
            newErrors.push("Description must be between 10 and 255 characters");
        }

        setErrors(newErrors);

        if (newErrors.length > 0) {
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

        if (onCompletion) {
            onCompletion();
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
                    <div
                        id="owner-buttons-container"
                    >
                        <button
                            className="spot-owner-buttons"
                            onClick={onCompletion}
                        >
                            Cancel
                        </button>
                        <button
                            className="spot-owner-buttons"
                            type="submit"
                            disabled={user === null}
                        >
                            Update Spot
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default UpdateSpotForm;