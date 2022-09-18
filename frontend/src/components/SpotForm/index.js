import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { createNewSpot } from "../../store/spotReducer";
import "./SpotForm.css"

function SpotForm(props) {

    const spot = props.spot || {};

    const [address, setAddress] = useState(spot.address || "");
    const [city, setCity] = useState(spot.city || "");
    const [state, setState] = useState(spot.state || "");
    const [country, setCountry] = useState(spot.country || "");
    const [lat, setLat] = useState(spot.lat || 0);
    const [long, setLong] = useState(spot.lng || 0);
    const [name, setName] = useState(spot.name || "");
    const [description, setDescription] = useState(spot.description || "");
    const [price, setPrice] = useState(spot.price || 0);
    const [errors, setErrors] = useState([]);

    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    useEffect(() => {
        if(user){
            setErrors([]);
        }else{
            setErrors(["You must be logged in to create a spot"])
        }
    }, [user]);

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

        console.log(newSpot);
        const result = await dispatch(createNewSpot(newSpot));

        console.log(result);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                {errors.map((error, idx) => <div key={idx}>{error}</div>)}
            </div>
            <div>
                <label>
                    Name
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </label>
            </div>
            <div>
                <label>
                    Description
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </label>
            </div>
            <div>
                <label>
                    Address
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                </label>
            </div>
            <div>
                <label>
                    City
                    <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                    />
                </label>
            </div>
            <div>
                <label>
                    State
                    <input
                        type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        required
                    />
                </label>
            </div>
            <div>
                <label>
                    Country
                    <input
                        type="text"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        required
                    />
                </label>
            </div>
            <div>
                <label>
                    Price
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </label>
            </div>
            <div>
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
            </div>
            <button type="submit" disabled={user === null}>Create Spot</button>
        </form>
    );
}

export default SpotForm;