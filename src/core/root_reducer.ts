import { combineReducers } from 'redux';
import userReducer from 'modules/user/reducer';
import searchReducer from 'modules/search/reducer';

const rootReducer = combineReducers({
  user: userReducer,
  search: searchReducer
});

export default rootReducer;
