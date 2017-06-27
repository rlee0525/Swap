import { combineReducers } from 'redux';
import userReducer from 'core/navbar/reducer';
import postReducer from 'modules/post/reducer';
import dashboardReducer from 'modules/dashboard/reducer';
import queryReducer from 'modules/search/queryReducer';
import searchResultReducer from 'modules/search/searchResultReducer';

const rootReducer = combineReducers({
  searchResult: searchResultReducer,
  post: postReducer,
  user: userReducer,
  dashboard: dashboardReducer,
  currentQuery: queryReducer
});

export default rootReducer;
