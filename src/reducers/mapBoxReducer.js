import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function mapBoxReducer(state = initialState.venueData, action) {
  switch(action.type) {
   case types.ADD_VENUE_SUCCESS:
      let data={
      	venue:action.venue,
      	direction:action.direction
      }
      return [
        ...state,
        data
      ]
    case types.REMOVE_VENUE_SUCCESS:
      console.log(action.place)
      return state.filter(item =>item.venue !== action.place)
    default:
      return state;
  }
}