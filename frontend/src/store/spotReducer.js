import { csrfFetch } from './csrf';

const READ_ALL_SPOTS = "spots/READ_ALL_SPOTS";
const READ_USER_SPOTS = "spots/READ_USER_SPOTS";
const READ_SINGLE_SPOT = "spots/READ_SINGLE_SPOT";
const CREATE_SPOT = "spots/CREATE_SPOT";
const UPDATE_SPOT = "spots/UPDATE_SPOT";
const DELETE_SPOT = 'spots/DELETE_SPOT';
const RESET_ALL_SPOTS = "spots/RESET_ALL_SPOTS"
const DELETE_SPOT_IMAGE = "spots/DELETE_SPOT_IMAGE"
const ADD_SPOT_IMAGE = "spots/ADD_SPOT_IMAGE"

export const resetAllSpotsActionCreator = () => {
    return {
        type: RESET_ALL_SPOTS
    }
}

const loadUserSpotsActionCreator = (spots) => {
    return {
        type: READ_USER_SPOTS,
        spots
    }
}

const loadSpotsActionCreator = (spots) => {
    return {
        type: READ_ALL_SPOTS,
        spots
    }
}

const loadSingleSpotActionCreator = (spot) => {
    return {
        type: READ_SINGLE_SPOT,
        spot
    }
}

const createSpotActionCreator = (spot) => {
    return {
        type: CREATE_SPOT,
        spot
    }
}

const updateSpotActionCreator = (spot) => {
    return {
        type: UPDATE_SPOT,
        spot
    }
}

const deleteSpotActionCreator = (spotId) => {
    return {
        type: DELETE_SPOT,
        spotId
    }
}

const deleteSpotImageActionCreator = (imageId) => {
    return {
        type: DELETE_SPOT_IMAGE,
        imageId
    }
}

const addSpotImageActionCreator = (image) => {
    return {
        type: ADD_SPOT_IMAGE,
        image
    }
}

export function fetchUserSpots() {
    return async (dispatch) => {
        const res = await csrfFetch('/api/spots/current');

        if (res.ok) {
            const spots = await res.json();
            dispatch(loadUserSpotsActionCreator(spots));
        }
    }
}

export function fetchSpots() {
    return async (dispatch) => {
        const res = await csrfFetch('/api/spots');

        if (res.ok) {
            const spots = await res.json();
            dispatch(loadSpotsActionCreator(spots));
        }
    }
}

export function fetchSingleSpot(spotId) {
    return async (dispatch) => {
        const res = await csrfFetch(`/api/spots/${spotId}`);

        if (res.ok) {
            const spot = await res.json();
            dispatch(loadSingleSpotActionCreator(spot));
            return true;
        } else {
            return false;
        }
    }
}

export function createNewSpot(newSpot, user) {
    return async (dispatch) => {
        const res = await csrfFetch(`/api/spots/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newSpot)
        }).catch(res => res)


        if (res.ok) {
            const spot = await res.json();
            if (newSpot.image) {

                const formData = new FormData();
                formData.append("image", newSpot.image)
                formData.append("preview", true)

                const res = await csrfFetch(`/api/spots/${spot.id}/images`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    body: formData
                }).catch(res => res)

                if (res.ok) {
                    const imageObj = await res.json()
                    spot.previewImage = imageObj.url;
                }
            }

            if (!spot.previewImage) {
                spot.previewImage = null;
            }

            dispatch(createSpotActionCreator(spot));
            return spot;
        } else {
            const result = await res.json();
            return result;
        }
    }
}

export function updateSpot(updatedSpot, spotId) {
    return async (dispatch) => {
        const res = await csrfFetch(`/api/spots/${spotId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedSpot)
        }).catch(res => res)

        if (res.ok) {
            const spot = await res.json();
            dispatch(updateSpotActionCreator(spot));
        } else {
            const result = await res.json();
            return result;
        }
    }
}

export function deleteSpot(spotId) {
    return async (dispatch) => {
        const res = await csrfFetch(`/api/spots/${spotId}`, {
            method: "DELETE"
        });

        if (res.ok) {
            dispatch(deleteSpotActionCreator(spotId));
        }
    }
}

export function deleteSpotImage(imageId) {
    return async (dispatch) => {
        const res = await csrfFetch(`/api/spot-images/${imageId}`, {
            method: "DELETE"
        });

        if (res.ok) {
            dispatch(deleteSpotImageActionCreator(imageId));
        }
    }
}

export function addSpotImage(spotId, image, preview) {
    return async (dispatch) => {

        const formData = new FormData()
        formData.append("image", image)
        if (preview) {
            formData.append("preview", true)
        }

        const res = await csrfFetch(`/api/spots/${spotId}/images`, {
            method: "POST",
            headers: {
                "Content-Type": "multipart/form-data",
            },
            body: formData
        }).catch(res => res)

        if (res.ok) {
            const newImage = await res.json()
            dispatch(addSpotImageActionCreator(newImage));
        }
    }
}

const initialState = { allSpots: {}, singleSpot: {} };

const spotReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case READ_ALL_SPOTS:
            newState = { ...state };
            const normalizedSpots = action.spots.Spots.reduce((obj, curSpot) => {
                obj[curSpot.id] = curSpot;
                return obj;
            }, {});
            newState.allSpots = normalizedSpots;
            return newState;
        case READ_USER_SPOTS:
            newState = { ...state };
            const normalizedUserSpots = action.spots.Spots.reduce((obj, curSpot) => {
                obj[curSpot.id] = curSpot;
                return obj;
            }, {});
            newState.allSpots = normalizedUserSpots;
            return newState;
        case READ_SINGLE_SPOT:
            newState = { ...state };
            action.spot.SpotImages = action.spot.SpotImages.reduce((obj, img) => {
                obj[img.id] = img
                return obj
            }, {})
            newState.singleSpot = action.spot;
            return newState;
        case CREATE_SPOT:
            const newSpot = action.spot;
            newSpot.avgRating = null;
            newState = { ...state, allSpots: { ...state.allSpots, [action.spot.id]: newSpot } };
            return newState
        case UPDATE_SPOT:
            newState = { allSpots: { ...state.allSpots }, singleSpot: { ...state.singleSpot, ...action.spot } };
            if (newState.allSpots[action.spot.id]) {
                const updatedSpot = { ...newState.allSpots[action.spot.id], ...action.spot };
                newState.allSpots[action.spot.id] = updatedSpot;
            }
            return newState;
        case DELETE_SPOT:
            newState = { allSpots: { ...state.allSpots }, singleSpot: { ...state.singleSpot } };
            delete newState.allSpots[action.spotId];
            if (newState.singleSpot.id === action.spotId) {
                newState.singleSpot = {};
            }
            return newState;
        case RESET_ALL_SPOTS:
            newState = { ...state };
            newState.allSpots = {};
            return newState;
        case DELETE_SPOT_IMAGE:
            newState = { ...state.singleSpot.SpotImages };
            delete newState[action.imageId]
            return {
                ...state,
                singleSpot: {
                    ...state.singleSpot,
                    SpotImages: newState
                }
            }
        case ADD_SPOT_IMAGE:
            return {
                allSpots: { ...state.allSpots},
                singleSpot: {
                    ...state.singleSpot,
                    SpotImages: { 
                        ...state.singleSpot.SpotImages,
                        [action.image.id]: action.image
                    }
                }
            }
        default:
            return state;
    }
};

export default spotReducer;