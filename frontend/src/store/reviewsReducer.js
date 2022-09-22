import { csrfFetch } from './csrf';

const READ_REVIEWS_USER = "reviews/READ_REVIEWS_USER";
const READ_REVIEWS_SPOT = "reviews/READ_REVIEWS_SPOT";
const DELETE_REVIEW = "reviews/DELETE_REVIEW";
const CREATE_REVIEW = "reviews/CREATE_REVIEW";

const loadReviewsForUserActionCreator = (reviews) => {
    return {
        type: READ_REVIEWS_USER,
        reviews
    }
}

const loadReviewsForSpotActionCreator = (reviews) => {
    return {
        type: READ_REVIEWS_SPOT,
        reviews
    }
}

const deleteReviewActionCreator = (reviewId) => {
    return {
        type: DELETE_REVIEW,
        reviewId
    }
}

const createReviewActionCreator = (review) => {
    return {
        type: CREATE_REVIEW,
        review
    }
}

export function fetchReviewsForUser(userId){
    return async (dispatch) => {
        const res = await csrfFetch(`/api/reviews/current`);

        if(res.ok){
            const reviews = await res.json();
            dispatch(loadReviewsForUserActionCreator(reviews));
        }
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

export function deleteReview(reviewId){
    return async (dispatch) => {
        const res = await csrfFetch(`/api/reviews/${reviewId}`, {
            method: "DELETE"
        });

        if(res.ok){
            dispatch(deleteReviewActionCreator(reviewId));
        }
    }
}

export function createNewReview(newReview, spotId, user){
    return async (dispatch) => {
        const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newReview)
        }).catch(res => res)

        if(res.ok){
            const review = await res.json();
            const newUser = {};
            newUser.firstName = user.firstName;
            newUser.lastName = user.lastName;
            newUser.id = user.id;
            review.User = newUser;
            review.ReviewImages = [];
            dispatch(createReviewActionCreator(review));
            return review;
        }else{
            const result = await res.json();
            return result;
        }
    }
}

const initialState = {  spot: {}, user: {}  };

const reviewReducer = (state = initialState, action) => {
    let newState;
    switch (action.type){
        case READ_REVIEWS_USER:
            newState = {...state};
            const userReviews = action.reviews.Reviews.reduce((accum, review) => {
                accum[review.id] = review;
                return accum;
            }, {});
            newState.user = userReviews;
            return newState;
        case READ_REVIEWS_SPOT:
            const normalizedReviews = action.reviews.Reviews.reduce((accum, review) => {
                accum[review.id] = review;
                return accum;
            }, {})
            newState = { ...state, spot: normalizedReviews };
            return newState;
        case DELETE_REVIEW:
            newState = {spot: {...state.spot}, user: {...state.user}};
            delete newState.spot[action.reviewId];
            delete newState.user[action.reviewId];
            return newState;
        case CREATE_REVIEW:
            newState = { ...state, spot: {...state.spot}};
            newState.spot[action.review.id] = action.review;
            return newState;
        default:
            return state;
    }
};

export default reviewReducer;