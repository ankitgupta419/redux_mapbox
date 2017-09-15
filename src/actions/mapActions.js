import * as types from './actionTypes';
export const addVenueSuccess = (venue,direction) => ({type: types.ADD_VENUE_SUCCESS, venue,direction});
export const removeVenue = (place) => ({type: types.REMOVE_VENUE_SUCCESS, place});
export const selectVenue = (venue) => ({type: types.SELECT_VENUE_SUCCESS, venue});
export const removeVenueByName = (venue) => ({type: types.REMOVENAME_VENUE_SUCCESS, venue});
