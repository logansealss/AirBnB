import { csrfFetch } from './csrf';

const READ_BOOKINGS_USER = "bookings/READ_BOOKINGS_USER";
const READ_BOOKINGS_SPOT_OWNER = "bookings/READ_BOOKINGS_SPOT_OWNER";
const DELETE_BOOKING = 'bookings/DELETE_BOOKING'

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

function deleteBookingUser(id) {
    return {
        type: DELETE_BOOKING,
        id
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

export function deleteBooking(bookingId) {
    return async (dispatch) => {
        const res = await csrfFetch(`/api/bookings/${bookingId}`, {
            method: "DELETE"
        });

        if (res.ok) {
            dispatch(deleteBookingUser(bookingId));
        }
    }
}

const initialState = { spot: {}, user: {} };

const bookingReducer = (state = initialState, action) => {
    let newUser
    let newSpot
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
        case DELETE_BOOKING:
            newUser = { ...state.user }
            delete newUser[action.id]
            newSpot = { ...state.spot }
            delete newSpot[action.id]
            return {
                spot: newSpot,
                user: newUser
            }
        default:
            return state;
    }
};

export default bookingReducer;
