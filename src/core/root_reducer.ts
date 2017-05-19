import { combineReducers } from 'redux';
import searchResultReducer from 'modules/search/reducer';
import postReducer from 'modules/post/reducer';
import userReducer from 'core/navbar/reducer';

const rootReducer = combineReducers({
  searchResult: searchResultReducer,
  post: postReducer,
  user: userReducer
});

export default rootReducer;
