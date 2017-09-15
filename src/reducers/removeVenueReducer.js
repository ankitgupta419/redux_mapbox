import * as types from '../actions/actionTypes';


export default function selectVenue(state = null, action) {
  switch(action.type) {
   
    case types.REMOVENAME_VENUE_SUCCESS:
      return action.venue
    default:
      return state;
  }
}