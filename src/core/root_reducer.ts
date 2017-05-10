import { combineReducers } from 'redux';
import userReducer from 'modules/user/reducer';
import searchResultReducer from 'modules/search/reducer';
import postReducer from 'modules/post/reducer';

const rootReducer = combineReducers({
  user: userReducer,
  searchResult: searchResultReducer,
  post: postReducer
});

export default rootReducer;
