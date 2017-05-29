import { combineReducers } from 'redux';
import postReducer from 'modules/post/reducer';
import userReducer from 'core/navbar/reducer';
import dashboardReducer from 'modules/dashboard/reducer';
import searchResultReducer from 'modules/search/searchResultReducer';
import queryReducer from 'modules/search/queryReducer';

const rootReducer = combineReducers({
  searchResult: searchResultReducer,
  post: postReducer,
  user: userReducer,
  dashboard: dashboardReducer,
  currentQuery: queryReducer
});

export default rootReducer;
