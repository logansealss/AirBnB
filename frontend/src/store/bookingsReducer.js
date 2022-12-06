import { csrfFetch } from './csrf';

const READ_BOOKINGS_USER = "bookings/READ_BOOKINGS_USER";
const READ_BOOKINGS_SPOT_OWNER = "bookings/READ_BOOKINGS_SPOT_OWNER";
const DELETE_BOOKING = 'bookings/DELETE_BOOKING'
const UPDATE_BOOKING = 'bookings/UPDATE_BOOKING'


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

function updateBooking(booking) {
    return {
        type: UPDATE_BOOKING,
        booking
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

export function updateBookingThunk(bookingId, newBooking) {
    return async (dispatch) => {
        const res = await csrfFetch(`/api/bookings/${bookingId}`, {
            method: "PUT",
            body: JSON.stringify(newBooking)
        }).catch(res => res.json())
            .catch(res => console.log(res.message))

        if (res.ok) {
            const updatedBooking = await res.json()
            dispatch(updateBooking(updatedBooking))
            return updateBooking
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
        case UPDATE_BOOKING:
            return {
                spot: {
                    ...state.spot
                },
                user: {
                    ...state.user,
                    [action.booking.id]: { ...state.user[action.booking.id], ...action.booking }
                }
            }
        default:
            return state;
    }
};

export default bookingReducer;
