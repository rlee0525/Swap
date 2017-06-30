import { combineReducers } from 'redux';

import userReducer from 'core/navbar/reducer';
import chatReducer from 'common/chatReducer';
import postReducer from 'modules/post/reducer';
import queryReducer from 'modules/search/queryReducer';
import dashboardReducer from 'modules/dashboard/reducer';
import searchResultReducer from 'modules/search/searchResultReducer';

const rootReducer = combineReducers({
  chat: chatReducer,
  currentQuery: queryReducer,
  dashboard: dashboardReducer,
  post: postReducer,
  searchResult: searchResultReducer,
  user: userReducer
});

export default rootReducer;
