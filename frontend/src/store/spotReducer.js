import { csrfFetch } from './csrf';

const READ_ALL_SPOTS = "spots/READ_ALL_SPOTS";
const READ_SINGLE_SPOT = "spots/READ_SINGLE_SPOT";
const CREATE_SPOT = "spots/CREATE_SPOT";

const loadSpots = (spots) => {
    return {
        type: READ_ALL_SPOTS,
        spots
    }
}

const loadSingleSpot = (spot) => {
    return {
        type: READ_SINGLE_SPOT,
        spot
    }
}

const createSpot = (spot) => {
    return {
        type: CREATE_SPOT,
        spot
    }
}

export function fetchSpots(){
    return async (dispatch) => {
        const res = await csrfFetch('/api/spots');

        if(res.ok){
            const spots = await res.json();
            dispatch(loadSpots(spots));
        }
    }
}

export function fetchSingleSpot(spotId){
    return async (dispatch) => {
        const res = await csrfFetch(`/api/spots/${spotId}`);

        if(res.ok){
            const spot = await res.json();
            dispatch(loadSingleSpot(spot));
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
        // TO-DO: add logic to update the state
        const newSpot = action.spot;
        newSpot.avgRating = null;
        newSpot.previewImage= null;
        newState = {...state, allSpots: {...state.allSpots, [action.spot.id]: newSpot}};
        return newState;
    default:
      return state;
  }
};

export default spotReducer;