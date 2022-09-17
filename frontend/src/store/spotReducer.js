import { csrfFetch } from './csrf';

const READ_ALL_SPOTS = "spots/READ_ALL_SPOTS";

const loadSpots = (arrOfSpots) => {
    return {
        action: READ_ALL_SPOTS,
        arrOfSpots
    }
}

export function fetchSpots(){
    return async (dispatch) => {
        const res = await csrfFetch('/api/spots');

        if(res.ok){
            const arrOfSpots = await res.json();
            dispatch(loadSpots(arrOfSpots));
        }
    }
}

const initialState = {  allSpots: {}, singleSpot: {}  };

const spotReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case READ_ALL_SPOTS:
        newState = { ...state, singleSpot: { ...state.singleSpot } };
        const normalizedSpots = action.arrOfSpots.reduce((obj, spot) => {
            obj[spot.id] = spot;
        }, {});
        newState.allSpots = normalizedSpots;
        return newState;
    default:
      return state;
  }
};

export default spotReducer;