import { combineReducers } from 'redux';
import userReducer from 'modules/user/reducer';
import searchResultReducer from 'modules/search/reducer';

const rootReducer = combineReducers({
  user: userReducer,
  searchResult: searchResultReducer
});

export default rootReducer;
