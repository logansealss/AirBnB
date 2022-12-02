import { csrfFetch } from './csrf';

const READ_BOOKINGS_USER = "bookings/READ_BOOKINGS_USER";
const READ_BOOKINGS_SPOT_OWNER = "bookings/READ_BOOKINGS_SPOT_OWNER";

function loadBookingsUser(bookings) {
    return {
        type: READ_BOOKINGS_USER,
        bookings
    }
}

function loadBookingsSpotOwner(bookings) {
    return {
        type: READ_BOOKINGS_SPOT_OWNER,
        bookings
    }
}

export function fetchBookingsForUser() {
    return async (dispatch) => {
        const res = await csrfFetch(`/api/bookings/current`);

        if (res.ok) {
            const bookings = await res.json();
            dispatch(loadBookingsUser(bookings));
        }
    }
}

const initialState = { spot: {}, user: {} };

const bookingReducer = (state = initialState, action) => {
    switch (action.type) {
        case READ_BOOKINGS_USER:
            return {
                spot: { ...state.spot },
                user: {
                    ...action.bookings.Bookings.reduce((obj, booking) => {
                        obj[booking.id] = booking
                        return obj
                    }, {})
                }
            }
        case READ_BOOKINGS_SPOT_OWNER:
            return {
                user: { ...state.user, },
                spot: {
                    ...action.bookings.Bookings.reduce((obj, booking) => {
                        obj[booking.id] = booking
                        return obj
                    }, {})
                }

            }
        default:
            return state;
    }
};

export default bookingReducer;
