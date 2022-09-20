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
    const [price, setPrice] = useState(0);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        if (user) {
            setErrors([]);
        } else {
            setErrors(["You must be logged in to create a spot"])
        }
    }, [user]);

    // useEffect(() => {

    //     if()

    // }, [address, city, state, country, lat, long, name, description, price])

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

        const response = dispatch(createNewSpot(newSpot))
            .then((res) => {
                if(res.errors){
                    setErrors(Object.values(res.errors));
                }else{
                    history.push("/");
                }
            })
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
                            className="spot-textarea spot-input-container"
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
                        required
                    />
                </label>
            </div> */}
                    <div>
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