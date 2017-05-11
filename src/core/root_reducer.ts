import { combineReducers } from 'redux';
import userReducer from 'modules/user/reducer';
import searchResultReducer from 'modules/search/reducer';
import postsReducer from 'modules/browse/reducer'
import postReducer from 'modules/post/reducer';

const rootReducer = combineReducers({
  user: userReducer,
  searchResult: searchResultReducer,
  post: postReducer,
  posts: postsReducer
});

export default rootReducer;
