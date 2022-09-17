import { csrfFetch } from './csrf';

const READ_ALL_SPOTS = "spots/READ_ALL_SPOTS";

const loadSpots = (spots) => {
    return {
        type: READ_ALL_SPOTS,
        spots
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
    default:
      return state;
  }
};

export default spotReducer;