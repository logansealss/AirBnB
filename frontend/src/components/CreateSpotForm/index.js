import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { createNewSpot } from "../../store/spotReducer";
import "./CreateSpotForm.css"

function CreateSpotForm() {

    const dispatch = useDispatch();
    const history = useHistory();

    const user = useSelector(state => state.session.user);

    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [lat, setLat] = useState(0);
    const [long, setLong] = useState(0);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    // const [imageURL, setImageURL] = useState("");
    const [image, setImage] = useState(null);
    const [price, setPrice] = useState(0);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        if (user) {
            setErrors([]);
        } else {
            setErrors(["You must be logged in to create a spot"])
        }
    }, [user]);

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

        // if(imageURL.length > 255){
        //     newErrors.push("Image URL must be less than 256 characters");
        // }

        if (description.length < 10 || description.length > 255) {
            newErrors.push("Description must be between 10 and 255 characters");
        }

        if (newErrors.length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors([]);

        const newSpot = {
            name,
            description,
            address,
            city,
            state,
            country,
            lat,
            lng: long,
            price,
            image
        }

        console.log("spot to be created", newSpot)

        const response = await dispatch(createNewSpot(newSpot))
            .then(async (res) => {
                if (res.errors) {
                    setErrors(Object.values(res.errors));
                } else {
                    history.push(`/spots/${res.id}`);
                }
            })
    };

    const updateFile = (e) => {
        const file = e.target.files[0];
        if (file) setImage(file);
    };

    return (
        <div className="body-container">
            <div className="body-header">
                Create a spot
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
                    <div 
                        className="spot-input-container preview-image-input"
                    >
                        <label>
                            Preview Image
                        </label>
                        <input
                            type="file"
                            onChange={updateFile}
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
                        >Create Spot</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateSpotForm;