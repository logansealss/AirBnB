import { csrfFetch } from './csrf';

const READ_ALL_SPOTS = "spots/READ_ALL_SPOTS";
const READ_SINGLE_SPOT = "spots/READ_SINGLE_SPOT";
const CREATE_SPOT = "spots/CREATE_SPOT";
const UPDATE_SPOT = "spots/UPDATE_SPOT";
const DELETE_SPOT = 'spots/DELETE_SPOT';

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

export function fetchSpots(){
    return async (dispatch) => {
        const res = await csrfFetch('/api/spots');

        if(res.ok){
            const spots = await res.json();
            dispatch(loadSpotsActionCreator(spots));
        }
    }
}

export function fetchSingleSpot(spotId){
    return async (dispatch) => {
        const res = await csrfFetch(`/api/spots/${spotId}`);

        if(res.ok){
            const spot = await res.json();
            dispatch(loadSingleSpotActionCreator(spot));
        }
    }
}

export function createNewSpot(newSpot, user){
    return async (dispatch) => {
        const res = await csrfFetch(`/api/spots/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newSpot)
        }).catch(res => res)


        if(res.ok){
            const spot = await res.json();
            dispatch(createSpotActionCreator(spot));
            return spot;
        }else{
            const result = await res.json();
            return result;
        }
    }
}

export function updateSpot(updatedSpot, spotId){
    return async (dispatch) => {
        const res = await csrfFetch(`/api/spots/${spotId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedSpot)
        }).catch(res => res)

        if(res.ok){
            const spot = await res.json();
            dispatch(updateSpotActionCreator(spot));
        }else{
            const result = await res.json();
            return result;
        }
    }
}

export function deleteSpot(spotId){
    return async (dispatch) => {
        const res = await csrfFetch(`/api/spots/${spotId}`, {
            method: "DELETE"
        });

        if(res.ok){
            dispatch(deleteSpotActionCreator(spotId));
        }
    }
}

const initialState = {  allSpots: {}, singleSpot: {}  };

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
    case READ_SINGLE_SPOT:
        newState = { ...state };
        newState.singleSpot = action.spot;
        return newState;
    case CREATE_SPOT:
        const newSpot = action.spot;
        newSpot.avgRating = null;
        newSpot.previewImage= null;
        newState = {...state, allSpots: {...state.allSpots, [action.spot.id]: newSpot}};
        return newState
    case UPDATE_SPOT:
        newState = { allSpots: {...state.allSpots}, singleSpot: {...state.singleSpot, ...action.spot}};
        if(newState.allSpots[action.spot.id]){
            const updatedSpot = {...newState.allSpots[action.spot.id], ...action.spot};
            newState.allSpots[action.spot.id] = updatedSpot;
        }
        return newState;
    case DELETE_SPOT:
        newState = { allSpots: {...state.allSpots}, singleSpot: {...state.singleSpot}};
        delete newState.allSpots[action.spotId];
        if(newState.singleSpot.id === action.spotId){
            newState.singleSpot = {};
        }
        return newState;
    default:
      return state;
  }
};

export default spotReducer;