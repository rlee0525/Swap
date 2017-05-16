import { combineReducers } from 'redux';
import searchResultReducer from 'modules/search/reducer';
import postReducer from 'modules/post/reducer';

const rootReducer = combineReducers({
  searchResult: searchResultReducer,
  post: postReducer
});

export default rootReducer;
