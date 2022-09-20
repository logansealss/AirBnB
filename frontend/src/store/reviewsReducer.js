import { csrfFetch } from './csrf';

const READ_ALL_REVIEWS = "reviews/READ_ALL_REVIEWS";
const READ_REVIEWS_SPOT = "reviews/READ_REVIEWS_SPOT";

const loadReviewsForSpotActionCreator = (reviews) => {
    return {
        type: READ_REVIEWS_SPOT,
        reviews
    }
}

export function fetchReviewsForSpot(spotId){
    return async (dispatch) => {
        const res = await csrfFetch(`/api/spots/${spotId}/reviews`);

        if(res.ok){
            const reviews = await res.json();
            dispatch(loadReviewsForSpotActionCreator(reviews));
        }
    }
}

const initialState = {  spot: {}, user: {}  };

const reviewReducer = (state = initialState, action) => {
    let newState;
    switch (action.type){
        case READ_REVIEWS_SPOT:
            const normalizedReviews = action.reviews.Reviews.reduce((accum, review) => {
                accum[review.id] = review;
                return accum;
            }, {})
            newState = { ...state, spot: normalizedReviews };
            return newState;
        default:
            return state;
    }
};

export default reviewReducer;