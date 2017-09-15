import {combineReducers} from 'redux';
import mapBox from './mapBoxReducer';
import selectVenue from './selectVenueReducer';
import removeVenue from './removeVenueReducer';

const rootReducer = combineReducers({
  mapBox,
  selectVenue,
  removeVenue
});

export default rootReducer;
